/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { sendTx } from '../sendTx';
import { getProvider } from '../getProvider';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  deposit: number
): Promise<{ address: string; smartContract: string } | undefined> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const provider = getProvider(selectedNetwork.network);

  const mesonWallet = ethers.Wallet.createRandom().connect(provider);

  const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
  const mesonWalletAddress = await mesonWallet.getAddress();
  const gasPrice = await provider.getGasPrice();
  const gasLimit = 21000;

  const iFace = new ethers.utils.Interface(abi);
  const deploymentData = iFace.encodeDeploy([mesonWalletAddress]);
  const estimatedGas = await mesonWallet.estimateGas({ data: deploymentData });
  const transactionFee = gasPrice.mul(estimatedGas);

  const value =
    deposit > 0
      ? ethers.utils.parseEther((deposit + 0.0017).toString())
      : ethers.utils.parseEther('0.0017');

  console.log('deposit: ', deposit);
  console.log('contract factory: ', contractFactory);
  console.log('meson wallet Address: ', mesonWalletAddress);
  console.log('value: ', value);
  console.log(
    'estimatedGas: ' + ethers.utils.formatUnits(estimatedGas, 'ether')
  );
  console.log(
    'transactionFee in ether: ' +
      ethers.utils.formatUnits(transactionFee, 'ether')
  );

  const txParams = {
    to: mesonWalletAddress,
    value: value,
    data: '0x',
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: Number(ethers.utils.formatUnits(gasPrice, 'wei')),
    gasLimit: gasLimit,
    // gasLimit: 8000000,
    // gasPrice: 20000000000,
  };

  const gas =
    Number(ethers.utils.formatEther(txParams.gasPrice)) *
    Number(ethers.utils.formatEther(txParams.gasLimit));
  console.log('expected gas: ', gas);

  try {
    // Transfer funds to the created wallet
    await sendTx(
      txParams,
      contractFactory,
      signerWallet!,
      selectedNetwork.network
    );

    console.log('Tx was sent');
    console.log('Deploying...');

    const overrides = {
      gasPrice: gasPrice,
      // gasLimit: 300000,
    };

    const contract = await contractFactory.deploy(
      mesonWalletAddress,
      overrides
    );

    await contract.deployed();

    const contractAddress = contract.address;
    await contract.initialize(contractAddress);

    // return contract;

    return {
      address: mesonWalletAddress,
      smartContract: contract.address,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
