import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExtendedTransactionResponse, HistoricalTxType, HistoricalTxsState, setHistoricalTxs } from '~/features/historicalTxs';
import { setLoading } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import {
  getLocalHistoricalTxs,
  getTxHistory,
} from '~/service';

type txs = Array<{ Date: string; Received: number; Sent: number }>;

export type HistoricalAssetsType = {
  year: txs;
  sixMonths: txs;
  threeMonths: txs;
  month: txs;
  week: txs;
};

const UPDATE_INTERVAL_TIMEOUT = 180000; // 3 minutes

const useGetHistoricalTxs = (): ExtendedTransactionResponse[]| HistoricalTxType[] => {
  const prevTxsRef = useRef<ExtendedTransactionResponse[] | HistoricalTxType[]>(
    []
  );
  const updateInterval = useRef<ReturnType<typeof setTimeout>>();

  const dispatch = useDispatch();
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const { historicalTxs } = useSelector<RootState, HistoricalTxsState>(
    (state) => state.historicalTxs
  );
  // const provider = getProvider(network);

  // useEffect(() => {
  //   void fetchTxs();
  // }, []);

  // useEffect(() => {
  //   provider.on('block', fetchTxs);

  //   return () => {
  //     provider.off('block', fetchTxs);
  //   };
  // }, [fetchTxs]);

  const fetchTxs = useCallback(async () => {
    if (mesonWallet?.smartContract === undefined) return;
    try {
      const historicalTxs = await getTxHistory(
        mesonWallet?.smartContract,
        network
      );

      if (historicalTxs !== undefined && historicalTxs?.length > 0) {
        prevTxsRef.current = historicalTxs;
      }
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`error: ${error}`);

        throw new Error(error.message ?? error);
      }
    }
  }, []);

  const localFetchTxs = useCallback(async () => {
    if (mesonWallet?.smartContract !== undefined) {
      const localHistoricalTxs = await getLocalHistoricalTxs(
        mesonWallet.smartContract,
        mesonWallet.smartContract,
        network
      );
      const filteredTxs = localHistoricalTxs.filter(
        (tx) => tx.contractAddress !== '' || tx.to !== ''
      );

      if (filteredTxs.length > 0) {
        prevTxsRef.current = filteredTxs;
      }
    }
  }, []);

  const startUpdate = async () => {
    stopUpdate();

    dispatch(setLoading());

    if (network !== 'localhost') {
      await fetchTxs();
    } else {
      await localFetchTxs();
    }

    dispatch(setHistoricalTxs({ historicalTxs: prevTxsRef.current }));

    updateInterval.current = setInterval(async () => {
      if (historicalTxs !== prevTxsRef.current) {
        if (network !== 'localhost') {
          await fetchTxs();
        } else {
          await localFetchTxs();
        }
      }
    }, UPDATE_INTERVAL_TIMEOUT);
  };

  const stopUpdate = () => {
    if (updateInterval.current) {
      clearInterval(updateInterval.current);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        await startUpdate();
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`error: ${error}`);
          throw new Error(error.message ?? error);
        }
      }
    };

    void load();

    return stopUpdate;
  }, []);

  return prevTxsRef.current;
};

export { useGetHistoricalTxs };
