import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ledgerActions } from '~/features/ledgerWallet';
import { getLedgerAccounts, getLedgerCustomAccount } from '~/service';

export type LedgerAccountType = {
  publicKey: string;
  address: string;
};

type ReturnValue = {
  getFullAccounts: () => Promise<LedgerAccountType[]>;
  getAccount: (arg0: string) => Promise<LedgerAccountType[]>;
  isLoading: boolean;
};

export const useConnectLedger = (): ReturnValue => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getFullAccounts = useCallback(async () => {
    setIsLoading(true);
    try {
      const ledgerAddresses: LedgerAccountType[] = await getLedgerAccounts();

      dispatch(ledgerActions.setLedgerAccounts(ledgerAddresses));

      setIsLoading(false);

      return ledgerAddresses;
    } catch (e: any) {
      setIsLoading(false);
      throw new Error('Please connect your Ledger hardware wallet');
    }
  }, [dispatch]);

  const getAccount = useCallback(
    async (accountNumber: string) => {
      setIsLoading(true);

      try {
        const ledgerAddress: LedgerAccountType = await getLedgerCustomAccount(
          accountNumber
        );

        dispatch(ledgerActions.setLedgerAccounts([ledgerAddress]));

        // const customAccount: FullAccountType[] = await getBalance([
        //   ledgerAddress,
        // ]);
        // console.log(customAccount);

        setIsLoading(false);

        return ledgerAddress;
      } catch (e: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.error('Error:');
        setIsLoading(false);
        throw new Error('Please connect your Ledger hardware wallet');
      }
    },
    [dispatch]
  );

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
    getFullAccounts,
    getAccount,
    isLoading,
  };
};
