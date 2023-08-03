import { ethers } from 'ethers';
import { EthereumAddress } from 'trezor-connect';
import { LedgerAccountType } from './ledger';

export type FullAccountType = {
  address: string;
  serializedPath?: string;
  balance: string;
  publicKey?: string;
};

export const getHardwareWalletBalance = async (
  accounts: EthereumAddress[] | LedgerAccountType[]
): Promise<FullAccountType[]> => {
  const network = 'mainnet';
  const provider = ethers.getDefaultProvider(network, {
    alchemy: import.meta.env.VITE_ALCHEMY_API_KEY as string,
    infura: import.meta.env.VITE_INFURA_API_KEY as string,
    etherscan: import.meta.env.VITE_ETHERSCAN_API_KEY as string,
  });
  try {
    const updateAccounts: FullAccountType[] = await Promise.all(
      accounts.map(async (account: EthereumAddress | LedgerAccountType) => {
        const balance = await provider.getBalance(account.address);
        const balanceInEth = ethers.utils.formatEther(balance);
        const fullAccount = {
          ...account,
          balance: balanceInEth,
        };

        return fullAccount;
      })
    );

    return updateAccounts;
  } catch (error) {
    throw new Error('API connection failed');
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getNetwork = async () => {
  const network = 'mainnet';
  const provider = ethers.getDefaultProvider(network, {
    alchemy: import.meta.env.VITE_ALCHEMY_API_KEY as string,
    infura: import.meta.env.VITE_INFURA_API_KEY as string,
    etherscan: import.meta.env.VITE_ETHERSCAN_API_KEY as string,
  });
  try {
    const chainId = await provider.getNetwork();
    console.log('Chain ID: ', chainId);
  } catch (error) {
    throw new Error('API connection failed');
  }
};
