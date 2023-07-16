/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const METAMASK_PRIVATE_KEY = import.meta.env.VITE_METAMASK_PRIVATE_KEY;

export async function deploy(
  signer: string,
  selectedNetwork: NetworkState
): Promise<ethers.Contract> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;

  let provider, privateKey;
  if (selectedNetwork.network !== 'localhost') {
    provider = ethers.getDefaultProvider(selectedNetwork.network, {
      infura: INFURA_API_KEY,
      alchemy: ALCHEMY_API_KEY,
      etherscan: ETHERSCAN_API_KEY,
    });
    privateKey = ethers.utils.computeAddress(signer);
    // privateKey = METAMASK_PRIVATE_KEY;
  } else {
    provider = ethers.getDefaultProvider(selectedNetwork.url);
    privateKey = PRIVATE_KEY;
  }
  // const wallet: Signer = new ethers.Wallet(privateKey, provider);
  // const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  const gasPrice = (await provider.getGasPrice()).toString();
  const wallet: Signer = ethers.Wallet.createRandom().connect(provider);
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  try {
    const walletAddress = await wallet.getAddress();
    const overrides = {
      gasLimit: gasPrice,
    };

    const contract = await contractFactory.deploy(walletAddress, overrides);
    console.log(contract);

    await contract.deployed();

    const contractAddress = contract.address;
    await contract.initialize(contractAddress);

    console.log('End');

    return contract;
  } catch (error) {
    console.log(error);

    throw new Error('Deploy failed');
  }
}
