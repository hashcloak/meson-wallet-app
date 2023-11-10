import { useCallback, useEffect, useRef, useState } from 'react';
import { utils } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { ConversionState, setConversion } from '~/features/conversion';
import { RootState } from '~/features/reducers';
import { getPriceFeed } from '~/service';

const UPDATE_INTERVAL_TIMEOUT = 180000; // 3 minutes

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetFiatPrice = () => {
  const { conversionRate, conversionDate } = useSelector<
    RootState,
    ConversionState
  >((state) => state.conversion);

  const prevConversionRateRef = useRef(conversionRate);
  const prevConversionDateRef = useRef(conversionDate);
  const [isFetching, setIsFetching] = useState(false);
  const updateInterval = useRef<ReturnType<typeof setTimeout>>();

  const dispatch = useDispatch();

  const updateAssetPrice = useCallback(async () => {
    let latestConversionDate: number, latestConversionRate: number;

    try {
      setIsFetching(true);
      const roundData = await getPriceFeed();

      latestConversionDate = Number(roundData[3].toString()) * 1000;
      latestConversionRate = Number(utils.formatUnits(roundData[1], 8));
      prevConversionRateRef.current = latestConversionRate;
      prevConversionDateRef.current = latestConversionRate;

      if (conversionRate !== prevConversionRateRef.current) {
        dispatch(
          setConversion({
            conversionRate: latestConversionRate,
            conversionDate: latestConversionDate,
          })
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`error: ${error}`);

        throw new Error(error.message ?? error);
      }
    } finally {
      setIsFetching(false);
    }
  }, []);

  const startUpdate = async () => {
    stopUpdate();

    await updateAssetPrice();

    updateInterval.current = setInterval(async () => {
      if (conversionRate !== prevConversionRateRef.current) {
        await updateAssetPrice();
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

  const state = {
    conversionRate: prevConversionRateRef.current,
    conversionDate: prevConversionDateRef.current,
  };

  return { state, isFetching };
};
