import { ethers } from 'ethers';

const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY as string;
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY as string;
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY as string;
const VITE_LOCALHOST = import.meta.env.VITE_LOCALHOST as string;

export const getProvider = (network: string): ethers.providers.BaseProvider => {
  if (network !== 'localhost') {
    return ethers.getDefaultProvider(network, {
      infura: INFURA_API_KEY,
      alchemy: ALCHEMY_API_KEY,
      etherscan: ETHERSCAN_API_KEY,
    });
  } else {
    return ethers.getDefaultProvider(VITE_LOCALHOST);
  }
};
