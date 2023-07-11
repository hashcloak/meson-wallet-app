/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deploy(
  signer: string,
  selectedNetwork: NetworkState
): Promise<ethers.Contract> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  console.log(selectedNetwork.url);

  const provider = ethers.getDefaultProvider(selectedNetwork.url);
  const singerAddress =
    selectedNetwork.network === 'localhost' ? PRIVATE_KEY : signer;
  const wallet: Signer = new ethers.Wallet(singerAddress, provider);
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  try {
    const walletAddress = await wallet.getAddress();

    const contract = await contractFactory.deploy(walletAddress);
    console.log('contract', contract);

    await contract.deployed();

    const contractAddress = contract.address;
    await contract.initialize(contractAddress);

    console.log('End');

    return contract;
  } catch (error) {
    throw new Error('Deploy failed');
  }
}
