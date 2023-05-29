import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ledgerActions } from '~/features/ledgerWallet';
import { getLedgerAccounts, getLedgerCustomAccount } from '~/service';

export type LedgerAccountType = {
  publicKey: string;
  address: string;
};

type ReturnValue = {
  getFullAccounts: () => Promise<LedgerAccountType[]>;
  getAccount: (arg0: string) => Promise<LedgerAccountType>;
};

export const useConnectLedger = (): ReturnValue => {
  const dispatch = useDispatch();

  const getFullAccounts = useCallback(async () => {
    try {
      const ledgerAddresses: LedgerAccountType[] = await getLedgerAccounts();

      dispatch(ledgerActions.setLedgerAccounts(ledgerAddresses));

      return ledgerAddresses;
    } catch (e: any) {
      throw new Error('Please connect your Ledger hardware wallet');
    }
  }, [dispatch]);

  const getAccount = useCallback(
    async (accountNumber: string) => {
      try {
        const ledgerAddress: LedgerAccountType = await getLedgerCustomAccount(
          accountNumber
        );

        dispatch(ledgerActions.setLedgerAccounts([ledgerAddress]));

        return ledgerAddress;
      } catch (e: any) {
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
  };
};
