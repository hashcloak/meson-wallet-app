import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoricalTxType, setHistoricalTxs } from '~/features/historicalTxs';
import { setLoading } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getHistoricalTxs } from '~/service';

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
  const [txs, setTxs] = useState<HistoricalTxType[]>([]);
  const dispatch = useDispatch();
  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  useEffect(() => {
    const load = async () => {
      if (mesonWallet?.address === undefined) return;
      try {
        // const historicalTxs = await getHistoricalTxs(mesonWallet?.address);
        const historicalTxs = await getHistoricalTxs(
          '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F'
        );

        if (historicalTxs.length > 0) {
          setTxs(historicalTxs);
        }
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`error: ${error}`);

          throw new Error(error.message ?? error);
        }
      }
    };
    dispatch(setLoading());

    if (network !== 'localhost') {
      void load();
      dispatch(setHistoricalTxs({ historicalTxs: txs }));
    }
  }, [mesonWallet]);

  return txs;
};

export { useGetHistoricalTxs };
