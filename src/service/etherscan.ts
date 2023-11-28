import { ethers } from 'ethers';
import { EthereumAddress } from 'trezor-connect';
import { getProvider } from './getProvider';
import { LedgerAccountType } from './ledger';
import { ExtendedTransactionResponse } from '~/features/historicalTxs';

export type FullAccountType = {
  address: string;
  serializedPath?: string;
  balance: string;
  publicKey?: string;
};

export const getHardwareWalletBalance = async (
  accounts: EthereumAddress[] | LedgerAccountType[],
  network = 'mainnet'
): Promise<FullAccountType[]> => {
  const provider = getProvider(network);
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

export const getTxHistory = async (
  address: string,
  network: string
): Promise<ExtendedTransactionResponse[] | undefined> => {
  const etherscanProvider = new ethers.providers.EtherscanProvider(network);
  try {
    const transactions: ethers.providers.TransactionResponse[] =
      await etherscanProvider.getHistory(address);
    const formatTxs = transactions.map((tx) => {
      const gasPrice =
        tx.gasPrice === undefined ? '0' : ethers.utils.formatUnits(tx.gasPrice);
      const gasLimit = ethers.utils.formatUnits(tx.gasLimit);
      const value = ethers.utils.formatUnits(tx.value);
      const timeStamp = tx.timestamp !== undefined ? Number(tx.timestamp) : 0;

      return {
        ...tx,
        gasPrice,
        gasLimit,
        value,
        timeStamp,
      };
    });

    return formatTxs;
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
};
