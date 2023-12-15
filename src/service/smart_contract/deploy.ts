/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { sendTx } from '../sendTx';
import { getProvider } from '../getProvider';
import { TrezorSigner } from '~/utils/Trezor';
import { signLedgerTx } from '../ledger';
import { concat, hexlify } from 'ethers/lib/utils.js';
import { TransactionReceipt } from 'viem';

const ENCRYPT_PASS = import.meta.env.VITE_ENCRYPT_PASS;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  deposit: number,
): Promise<
  | {
      mesonWalletAddress: string;
      smartContract: string;
      encryptedWallet: string;
    }
  | undefined
> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const provider = getProvider(selectedNetwork.network);

  const mesonWallet = ethers.Wallet.createRandom().connect(provider);
  const encryptedWallet = await mesonWallet.encrypt(ENCRYPT_PASS);
  const mesonWalletAddress = await mesonWallet.getAddress();

  const value =
    deposit > 0
      ? ethers.utils.parseEther(deposit.toString())
      : ethers.utils.parseEther('0');

  try {
    let senderWallet;
    switch (signerWallet.wallet) {
      case 'Trezor':
        senderWallet = new TrezorSigner(
          provider,
          signerWallet.serializedPath,
          0,
          signerWallet.signerWalletAddress,
          'trezor-signer'
        ) as ethers.Signer;
        break;
      case 'Ledger':

        break;
      case 'WalletConnect':

        break;
      default:
        senderWallet = new ethers.Wallet(signerWallet.publicKey, provider);
    }
    const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';
    const iFace = new ethers.utils.Interface(abi);
    const deploymentData = iFace.encodeDeploy([entryPoint]) as BytesLike;

    const txData = hexlify(concat([binary, deploymentData]));
    const nonce = await provider.getTransactionCount(signerWallet.signerWalletAddress);
    const latestBlock = await provider.getBlock('latest');
    let smartContractReceipt;

    if(signerWallet.wallet === 'Ledger') {
      const deploymentParams = {
        num: "0",
        chainId: '5',
        value: '0',
        to: '',
        nonce: String(nonce),
        gas:String(9000000000),
        priorityFee: String(9000000000),
        maxFee: String(latestBlock.gasLimit),
        data:txData
      };
      const signedTx =  await signLedgerTx(deploymentParams)
      const txResponse = await provider.sendTransaction(signedTx);
      smartContractReceipt = await txResponse.wait(2);
      console.log(smartContractReceipt)
    } else {
        const factory = new ethers.ContractFactory(abi, binary, senderWallet);
        const smartContract = await factory.deploy(entryPoint);
        console.log('smart contract is being deployed:', smartContract)
        smartContractReceipt = await smartContract.deployed();
    }

    // Transfer funds to the created wallet
    if (Number(deposit) > 0) {
      console.log('sending deposit...', smartContractReceipt);
      const gasPrice = await provider.getGasPrice();
      const latestBlock = await provider.getBlock('latest');

      // tx params
      const txParams = {
        // to: smartContractReceipt.address,
        to: mesonWalletAddress,
        value: value,
        data: '0x',
        nonce: '0x0',
        chainId: selectedNetwork.chainId,
        gasPrice:
          selectedNetwork.network !== 'mainnet'
            ? Number(999999999)
            : Number(ethers.utils.formatUnits(gasPrice, 'wei')),
        gasLimit: latestBlock.gasLimit,
      };
      await sendTx(txParams, signerWallet!, selectedNetwork.network);
    }

    console.log('deploy mesonWalletAddress',mesonWalletAddress)
    console.log('deploy smartContractReceipt',smartContractReceipt)

    return {
      mesonWalletAddress,
      smartContract: smartContractReceipt.address,
      encryptedWallet,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
