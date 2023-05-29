import { invoke } from '@tauri-apps/api/tauri';
import { LedgerAccountType } from '~/hooks/wagumi/useConnectLedger';

// const test = [
//   `PK:041bd931b43d86b55d43acaa2cbd646a636e74e6f21672cb226fdf5a3b3e6914f2ce498e8d9e4881f7c2fdf062455fc39ee5cd56eb02acae9a4783484ca46cf26b\nAddr:0x3973779d29b608c7860F1c368903aD6EC4CD8f21`, `PK:044fcd97ed413ecd671cfcc2212949fd88ec39c6bdb1ddebe9b3421c626936fbfeadbc19327e8668a57911ea50523f4d0b8a249f84dd7e2ef7592b8b4cdef82059$\nAddr:0x194939889e3D750B3C19cc2B9Fb287EC271DeC3a`]

export const getLedgerAccounts = async (): Promise<LedgerAccountType[]> => {
  try {
    const ledgerAddresses: LedgerAccountType[] = [];

    for (let index = 0; index < 24; index++) {
      console.log('index', index);

      const response: string = await invoke('get_pk', {
        num: String(index),
      });
      console.log('response', response);

      const pk: string = '0x' + response.split('\n')[0].split(':')[1];
      const address: string = response.split('Addr:')[1];

      ledgerAddresses.push({ publicKey: pk, address });
    }

    return ledgerAddresses;
  } catch (error) {
    throw new Error('Please connect your Ledger hardware wallet');
  }
};

export const getLedgerCustomAccount = async (
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
