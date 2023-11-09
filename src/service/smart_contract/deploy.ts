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
import { deployEntryPoint } from './deploy-entryPoint';
import { TrezorSigner } from '~/utils/Trezor';
import { LedgerSigner } from '@ethersproject/hardware-wallets';

const ENCRYPT_PASS = import.meta.env.VITE_ENCRYPT_PASS;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  deposit: number
): Promise<
  | {
      mesonWalletAddress: string;
      smartContract: string;
      encryptedWallet: string;
      entryPoint: string;
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
        senderWallet = new LedgerSigner(
          provider,
          'default',
          "m/44'/60'/0'/0/0"
        );
        break;
      default:
        senderWallet = new ethers.Wallet(signerWallet.publicKey, provider);
    }

    const entryPoint = await deployEntryPoint(senderWallet!);
    const factory = new ethers.ContractFactory(abi, binary, senderWallet);
    const smartContract = await factory.deploy(entryPoint);
    const smartContractReceipt = await smartContract.deployed();
    console.log('smart contract was deployed:', smartContractReceipt);

    // Transfer funds to the created wallet
    if (Number(deposit) > 0) {
      const gasPrice = await provider.getGasPrice();

      // tx params
      const txParams = {
        to: mesonWalletAddress,
        value: value,
        data: '0x',
        nonce: '0x0',
        chainId: selectedNetwork.chainId,
        gasPrice: Number(ethers.utils.formatUnits(gasPrice, 'wei')),
        gasLimit: 21000,
        // gasLimit: 8000000,
        // gasPrice: 20000000000,
      };
      await sendTx(txParams, signerWallet!, selectedNetwork.network);
    }

    return {
      mesonWalletAddress,
      smartContract: smartContractReceipt.address,
      encryptedWallet,
      entryPoint: entryPoint ?? '',
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
