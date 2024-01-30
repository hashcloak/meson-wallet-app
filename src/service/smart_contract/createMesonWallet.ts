import { ethers } from 'ethers';
import { NetworkState } from '~/features/network';
import { getProvider } from '../getProvider';

const ENCRYPT_PASS = import.meta.env.VITE_ENCRYPT_PASS;

export async function createMesonWallet(selectedNetwork: NetworkState): Promise<
  | {
      mesonWalletAddress: string;
      encryptedWallet: string;
    }
  | undefined
> {
  try {
    const provider = getProvider(selectedNetwork.network);
    const mesonWallet = ethers.Wallet.createRandom().connect(provider);
    const encryptedWallet = await mesonWallet.encrypt(ENCRYPT_PASS);
    const mesonWalletAddress = await mesonWallet.getAddress();

    return {
      mesonWalletAddress,
      encryptedWallet,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
