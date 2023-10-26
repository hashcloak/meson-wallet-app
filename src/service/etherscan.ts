import { ethers } from 'ethers';
import { EthereumAddress } from 'trezor-connect';
import { getProvider } from './getProvider';
import { LedgerAccountType } from './ledger';
import { HistoricalTxType } from '~/features/historicalTxs';

export type FullAccountType = {
  address: string;
  serializedPath?: string;
  balance: string;
  publicKey?: string;
};

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY as string;

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
): Promise<HistoricalTxType[] | undefined> => {
  const etherscanProvider = new ethers.providers.EtherscanProvider(
    network,
    ETHERSCAN_API_KEY
  );
  try {
    const transactions: unknown[] = await etherscanProvider.getHistory(address);

    return transactions as HistoricalTxType[];
  } catch (error) {
    if (error instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
};

type ResponseValue = {
  message: string;
  result: HistoricalTxType[];
  status: string;
};

export const getHistoricalTxs = async (
  walletAddress: string
): Promise<HistoricalTxType[]> => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

  const response = await fetch(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json: ResponseValue = await response.json();

  return json.result;
};
