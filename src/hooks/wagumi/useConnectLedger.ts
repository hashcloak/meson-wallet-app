import { useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

type ReturnValue = {
  getPublicKey: () => Promise<Array<{ publicKey: string; address: string }>>;
  isLoading: boolean;
};

export const useConnectLedger = (): ReturnValue => {
  //   currentSignerAddress || ''
  // );
  // const [errorMessage, setErrorMessage] = useState('');
  // const { setSignerWallet } = signerWalletSlice.actions;
  const [ledgerAddresses, setLedgerAddresses] = useState<
    Array<{ publicKey: string; address: string }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPublicKey = async () => {
    try {
      setIsLoading(true);

      for (let index = 0; index < 24; index++) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const response: string = await invoke('get_pk', {
          num: String(Number(index)),
        });

        const pk: string = '0x' + response.split('\n')[0].split(':')[1];
        const address: string = response.split('Addr:')[1];

        setLedgerAddresses([...ledgerAddresses, { publicKey: pk, address }]);
        setIsLoading(false);
      }

      return ledgerAddresses;
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('Error:');
      setIsLoading(false);
      throw new Error('Please connect your Ledger hardware wallet');
    }
  };

  // async function sign_data() {
  //   dataMsgEl.textContent = "Comfirm on Ledger";
  //   invoke("sign_data", { num: dataPkInputEl.value, msg: dataInputEl.value, chainId: dataChainIdInputEl.value })
  //     .then((sig) => dataMsgEl.textContent = sig)
  //     .catch((error) => dataMsgEl.textContent = error);
  // }

  // async function sign_tx() {
  //   txMsgEl.textContent = "Comfirm on Ledger";
  //   invoke("sign_tx", { num: txPkInputEl.value, chainId: txChainIdInputEl.value, value: txValInputEl.value, to: txToInputEl.value, nonce: txNonceInputEl.value, priorityFee: txPriorityFeeInputEl.value, maxFee: txMaxFeeInputEl.value })
  //     .then((sigTx) => txMsgEl.textContent = sigTx)
  //     .catch((error) => txMsgEl.textContent = error);
  // }

  return {
    getPublicKey,
    isLoading,
  };
};
