import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HistoricalAssetsType } from './useGetHistoricalTxs';
import { HistoricalTxType, setHistoricalTxs } from '~/features/historicalTxs';
import { resetLoading } from '~/features/loading';
import { MesonWalletState } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getLocalHistoricalTxs, localSortByWeek } from '~/service';
import { sortByLastFewMonths, sortByWeek, sortByYear } from '~/utils/sortTxs';

export const useGetHistoricalAssets = (
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

  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  // const mesonWallet = { address: '0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8' };

  useEffect(() => {
    const load = () => {
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
        dispatch(resetLoading({ message: '' }));
      }
    };

    const localLoad = async () => {
      if (mesonWallet?.address !== undefined) {
        const localHistoricalTxs = await getLocalHistoricalTxs(
          mesonWallet.address,
          network
        );
        const filteredTxs = localHistoricalTxs.filter((tx) => tx.to !== '');
        dispatch(
          setHistoricalTxs({
            historicalTxs: filteredTxs,
          })
        );

        const txInThisWeek = localSortByWeek(
          localHistoricalTxs as HistoricalTxType[],
          mesonWallet.address
        );

        setHistoricalAssets({
          year: txInThisWeek,
          sixMonths: txInThisWeek,
          threeMonths: txInThisWeek,
          month: txInThisWeek,
          week: txInThisWeek,
        });

        dispatch(resetLoading({ message: '' }));
      }
    };

    if (historicalTxs.length > 0 && network !== 'localhost') void load();
    if (network === 'localhost') void localLoad();
    //   if (historicalTxs.length > 0 && network === 'localhost') void load();
  }, [historicalTxs]);

  return historicalAssets;
};
