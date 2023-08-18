import { useEffect, useRef, useState } from 'react';
import { utils } from 'ethers';
import { getPriceFeed } from '~/service';

const UPDATE_INTERVAL_TIMEOUT = 180000; // 3 minutes

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAssetPrice = () => {
  const [state, setState] = useState({ conversionRate: 0, conversionDate: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const updateInterval = useRef<ReturnType<typeof setTimeout>>();

  const updateAssetPrice = async () => {
    let conversionDate, conversionRate;

    try {
      const roundData = await getPriceFeed();

      conversionDate = Number(roundData[3].toString()) * 1000;
      conversionRate = Number(utils.formatUnits(roundData[1], 8));

      setState({ conversionDate, conversionRate });
    } catch (error) {
      if (error instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`error: ${error}`);

        throw new Error(error.message ?? error);
      }
    }
  };

  const startUpdate = async () => {
    stopUpdate();

    await updateAssetPrice();

    updateInterval.current = setInterval(async () => {
      await updateAssetPrice();
    }, UPDATE_INTERVAL_TIMEOUT);
  };

  const stopUpdate = () => {
    if (updateInterval.current) {
      clearInterval(updateInterval.current);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsFetching(true);
      try {
        await startUpdate();
      } catch (error) {
        if (error instanceof Error) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`error: ${error}`);
          throw new Error(error.message ?? error);
        }
      } finally {
        setIsFetching(false);
      }
    };

    void load();

    return stopUpdate;
  }, []);

  return { state, isFetching };
};
