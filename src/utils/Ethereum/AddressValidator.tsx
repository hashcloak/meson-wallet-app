import { ethers } from 'ethers';

export const validateEthAddress = (address: string): boolean =>
  ethers.utils.isAddress(address);
