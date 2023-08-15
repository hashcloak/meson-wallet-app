import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoricalTxType, setHistoricalTxs } from '~/features/historicalTxs';
import { resetLoading, setLoading } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';
import { getHistoricalTxs } from '~/service';
import { sortByLastFewMonths, sortByWeek, sortByYear } from '~/utils/sortTxs';

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

  useEffect(() => {
    const load = async () => {
      if (mesonWallet?.address === undefined) return;
      dispatch(setLoading());
      try {
        // const historicalTxs = await getHistoricalTxs(mesonWallet?.address);
        const historicalTxs = await getHistoricalTxs(
          '0x220866b1a2219f40e72f5c628b65d54268ca3a9d'
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
    void load();
    dispatch(setHistoricalTxs({ historicalTxs: txs }));
  }, [mesonWallet]);

  return txs;
};

const useGetHistoricalAssets = (
  historicalTxs: HistoricalTxType[]
): HistoricalAssetsType => {
  const [historicalAssets, setHistoricalAssets] = useState({
    year: [{ Date: '', Received: 0, Sent: 0 }],
    sixMonths: [{ Date: '', Received: 0, Sent: 0 }],
    threeMonths: [{ Date: '', Received: 0, Sent: 0 }],
    month: [{ Date: '', Received: 0, Sent: 0 }],
    week: [{ Date: '', Received: 0, Sent: 0 }],
  });
  const dispatch = useDispatch();

  // const { mesonWallet } = useSelector<RootState, MesonWalletState>(
  //   (state) => state.mesonWallet
  // );
  const mesonWallet = { address: '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F' };

  useEffect(() => {
    const load = () => {
      console.log('loading assets...');

      if (mesonWallet?.address !== undefined) {
        const txInThisYear = sortByYear(historicalTxs, mesonWallet.address);
        const txIn6Months = sortByLastFewMonths(
          historicalTxs,
          mesonWallet.address,
          6
        );
        const txIn3Months = sortByLastFewMonths(
          historicalTxs,
          mesonWallet.address,
          3
        );
        const txInMonth = sortByLastFewMonths(
          historicalTxs,
          mesonWallet.address,
          0
        );
        const txInThisWeek = sortByWeek(historicalTxs, mesonWallet.address);

        setHistoricalAssets({
          year: txInThisYear,
          sixMonths: txIn6Months,
          threeMonths: txIn3Months,
          month: txInMonth,
          week: txInThisWeek,
        });
      }
    };

    if (historicalTxs.length > 0) {
      void load();
      dispatch(resetLoading({ message: '' }));
      dispatch(resetLoading({ message: '' }));
    }
  }, [historicalTxs]);

  return historicalAssets;
};

export { useGetHistoricalTxs, useGetHistoricalAssets };
