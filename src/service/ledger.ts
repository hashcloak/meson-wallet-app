import { invoke } from '@tauri-apps/api/tauri';
import { FullAccountType, getHardwareWalletBalance } from './etherscan';

export type LedgerAccountType = {
  publicKey: string;
  address: string;
};

const getAccounts = async (): Promise<LedgerAccountType[]> => {
  try {
    const ledgerAddresses: LedgerAccountType[] = [];

    for (let index = 0; index < 25; index++) {
      const response: string = await invoke('get_pk', {
        num: String(index),
      });
      const pk: string = '0x' + response.split('\n')[0].split(':')[1];
      const address: string = response.split('Addr:')[1];

      ledgerAddresses.push({ publicKey: pk, address });
    }

    return ledgerAddresses;
  } catch (error) {
    throw new Error('Please connect your Ledger hardware wallet');
  }
};

const getCustomAccount = async (
  accountNumber: string
): Promise<LedgerAccountType> => {
  try {
    const response: string = await invoke('get_pk', {
      num: accountNumber.toString(),
    });

    const pk: string = '0x' + response.split('\n')[0].split(':')[1];
    const address: string = response.split('Addr:')[1];
    const ledgerAddress: LedgerAccountType = { publicKey: pk, address };

    return ledgerAddress;
  } catch (error) {
    throw new Error('Please connect your Ledger hardware wallet');
  }
};

export const getFullLedgerAccounts = async (
  network: string
): Promise<FullAccountType[]> => {
  try {
    const ledgerAccounts: LedgerAccountType[] = await getAccounts();
    const ledgerFullAccounts: FullAccountType[] =
      await getHardwareWalletBalance(ledgerAccounts, network);

    return ledgerFullAccounts;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};

export const getCustomLedgerAccount = async (
  accountNumber: string
): Promise<FullAccountType[]> => {
  try {
    const customAccount: LedgerAccountType = await getCustomAccount(
      accountNumber
    );
    const ledgerCustomAccount: FullAccountType[] =
      await getHardwareWalletBalance([customAccount]);

    return ledgerCustomAccount;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};

export const signLedgerTx = async (
  tx: {
    to: string;
    value: number;
    data: string;
    nonce: number | undefined;
    chainId: number;
    gasPrice: number;
  },
  path: string,
  priorityFeePerGas: unknown,
  maxFeePerGas: unknown
): Promise<any> => {
  try {
    const response: any = await invoke('sign_tx', {
      to: tx.to,
      path,
      eth_amount: tx.value,
      nonce: tx.nonce,
      max_priority_fee_per_gas: priorityFeePerGas,
      max_fee_per_gas: maxFeePerGas,
      gas: tx.gasPrice,
      chain_id: tx.chainId,
      hex_data: tx.data,
    });

    console.log(response);
  } catch (error) {
    throw new Error('Please connect your Ledger hardware wallet');
  }
};
