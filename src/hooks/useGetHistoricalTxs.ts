import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HistoricalTxType,
  HistoricalTxsState,
  setHistoricalTxs,
} from '~/features/historicalTxs';
import { setLoading } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import {
  getHistoricalTxs,
  getLocalHistoricalTxs,
  getProvider,
} from '~/service';

type txs = Array<{ Date: string; Received: number; Sent: number }>;
export type HistoricalAssetsType = {
  year: txs;
  sixMonths: txs;
  threeMonths: txs;
  month: txs;
  week: txs;
};

const useGetHistoricalTxs = (): HistoricalTxType[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [txs, setTxs] = useState<HistoricalTxType[]>([]);
  const prevTxsRef = useRef<HistoricalTxType[]>([]);

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
  const provider = getProvider(network);

  const fetchTxs = useCallback(async () => {
    dispatch(setLoading());

    if (network !== 'localhost') {
      await load();
    } else {
      await localLoad();
    }

    if (historicalTxs !== prevTxsRef.current) {
      dispatch(setHistoricalTxs({ historicalTxs: prevTxsRef.current }));
      prevTxsRef.current = historicalTxs;
    }
  }, []);

  useEffect(() => {
    void fetchTxs();
  }, [fetchTxs]);

  useEffect(() => {
    provider.on('block', fetchTxs);

    return () => {
      provider.off('block', fetchTxs);
    };
  }, [fetchTxs]);

  const load = async () => {
    if (mesonWallet?.mesonWalletAddress === undefined) return;
    try {
      // const historicalTxs = await getHistoricalTxs(mesonWallet?.mesonWalletAddress);
      const historicalTxs = await getHistoricalTxs(
        '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F'
      );

      if (historicalTxs.length > 0) {
        prevTxsRef.current = historicalTxs;
      }
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`error: ${error}`);

        throw new Error(error.message ?? error);
      }
    }
  };

  const localLoad = async () => {
    if (mesonWallet?.mesonWalletAddress !== undefined) {
      const localHistoricalTxs = await getLocalHistoricalTxs(
        mesonWallet.mesonWalletAddress,
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
  };

  useEffect(() => {
    dispatch(setLoading());

    if (network !== 'localhost') {
      void load();
    } else {
      void localLoad();
    }
    dispatch(setHistoricalTxs({ historicalTxs: prevTxsRef.current }));
  }, [mesonWallet]);

  return prevTxsRef.current;
};

export { useGetHistoricalTxs };
