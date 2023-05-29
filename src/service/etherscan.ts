import { ethers } from 'ethers';
import { EthereumAddress } from 'trezor-connect';
import { LedgerAccountType } from '~/hooks/wagumi/useConnectLedger';

export type FullAccountType = {
  address: string;
  serializedPath?: string;
  balance: string;
  publicKey?: string;
};

export const getBalance = async (
  accounts: EthereumAddress[] | LedgerAccountType[]
): Promise<FullAccountType[]> => {
  const network = 'mainnet';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: import.meta.env.VITE_ETHERSCAN_API as string,
  });
  try {
    const updateAccounts: FullAccountType[] = await Promise.all(
      accounts.map(async (account: EthereumAddress | LedgerAccountType) => {
        console.log('updateAccounts', account);

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
