/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, ContractFactory, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { sendTx } from '../sendTx';
import { getProvider } from '../getProvider';
import { signTxLocally } from './signTx';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  deposit: number
): Promise<
  | { address: string; smartContract: string; encryptedWallet: string }
  | undefined
> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const provider = getProvider(selectedNetwork.network);

  const mesonWallet = ethers.Wallet.createRandom().connect(provider);
  const encryptedWallet = await mesonWallet.encrypt('password');

  // const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
  const mesonWalletAddress = await mesonWallet.getAddress();
  const gasPrice = await provider.getGasPrice();
  const value =
    deposit > 0
      ? ethers.utils.parseEther(deposit.toString())
      : ethers.utils.parseEther('0');

  const iFace = new ethers.utils.Interface(abi);
  const deploymentData = iFace.encodeDeploy([mesonWalletAddress]) as BytesLike;

  const estimatedGas = await mesonWallet.estimateGas({ data: deploymentData });

  // Deployment params
  const deploymentParams = {
    to: '',
    value: ethers.utils.parseEther('0'),
    data: deploymentData,
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: gasPrice,
    gasLimit: 80000,
  };

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

  try {
    console.log('Deploying...');
    const signedDeplpymentTx = await signTxLocally(
      deploymentParams,
      signerWallet
    );

    const contract = await provider.sendTransaction(signedDeplpymentTx!);
    const transactionReceipt = await contract.wait(1);
    console.log('contract was deployed:', contract);
    console.log('transactionReceipt:', transactionReceipt);

    // Transfer funds to the created wallet
    if (Number(txParams.value) > 0) {
      await sendTx(txParams, signerWallet!, selectedNetwork.network);
    }

    // Deploy smart contract
    const factory = new ethers.ContractFactory(abi, binary, mesonWallet);
    const contractInstance = await factory.deploy(mesonWallet.address);

    const contractInitialize = await contractInstance.functions.initialize(
      mesonWallet.address
    );

    return {
      address: mesonWalletAddress,
      smartContract: transactionReceipt.contractAddress,
      encryptedWallet,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}

// 1 - Create a transaction payload for the contract deployment but don't send it.
// 2 - Forward this payload to the hardware wallet to be signed.
// 3- Once signed, broadcast the signed transaction to the network
