import { useCallback, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { mockTokensVals } from '~/utils/Mock';
import { useGetFiatPrice } from './useGetFiatPrice';
import { MesonWalletState, setBalance } from '~/features/mesonWallet';
import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getProvider } from '~/service';
import { trimCurrency, trimEth } from '~/utils/trimDecimal';

type TokenType = {
  type: string;
  abbrev: string;
  token: string;
  amount: string;
  fiatPrice: string;
};

type ReturnValue = {
  isLoading: boolean;
  tokens: TokenType[];
  totalAsset: number;
};

export const useLoadPortfolio = (): ReturnValue => {
  const {
    state: { conversionRate },
  } = useGetFiatPrice();
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, setTokens] = useState(mockTokensVals);
  const [totalAsset, setTotalAsset] = useState(0);
  const [currentEth, setCurrentEth] = useState('0');
  const prevEthBalanceRef = useRef('0');
  const prevTotalAssetRef = useRef(0);

  const dispatch = useDispatch();

  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const provider: ethers.providers.BaseProvider = getProvider(network);

  const fetchCurrentEthBalance = useCallback(async () => {
    if (mesonWallet !== undefined) {
      const rawBalance = await provider.getBalance(
        mesonWallet?.mesonWalletAddress
      );

      // Format ETH balance and parse it to JS number
      const value = parseFloat(ethers.utils.formatEther(rawBalance)).toString();
      // Optimization: check that user balance has actually changed before
      // updating state and triggering the consuming component re-render
      if (value !== prevEthBalanceRef.current) {
        prevEthBalanceRef.current = value;
        setCurrentEth(value);
        updateTokens(value);
      }
    }
  }, []);

  useEffect(() => {
    void fetchCurrentEthBalance();
  }, [fetchCurrentEthBalance]);

  useEffect(() => {
    // Fetch user balance on each block
    provider.on('block', fetchCurrentEthBalance);

    // Cleanup function is used to unsubscribe from 'block' event and prevent
    // a possible memory leak in your application.
    return () => {
      provider.off('block', fetchCurrentEthBalance);
    };
  }, [fetchCurrentEthBalance]);

  const updateTokens = (eth: string) => {
    const balance = { eth };
    dispatch(setBalance({ balance }));

    const updatedEthVal = {
      type: 'EthLogo',
      abbrev: 'ETH',
      token: 'Ethereum',
      amount: trimEth(eth),
      fiatPrice: trimCurrency((Number(eth) * conversionRate).toString()),
    };

    setTokens((prevState) =>
      prevState.map((obj) => (obj.abbrev === 'ETH' ? updatedEthVal : obj))
    );
  };

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        if (mesonWallet?.mesonWalletAddress != null) {
          const currentEthBalance = await provider.getBalance(
            mesonWallet?.mesonWalletAddress
          );
          const eth = ethers.utils.formatUnits(currentEthBalance);
          setCurrentEth(eth);
          updateTokens(eth);
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
  }, [conversionRate]);

  useEffect(() => {
    let currentAsset = 0;
    tokens.forEach((token) => {
      if (token.fiatPrice) {
        currentAsset = currentAsset + Number(token.fiatPrice);
      }
    });
    if (currentAsset !== prevTotalAssetRef.current) {
      prevTotalAssetRef.current = currentAsset;
      setTotalAsset(currentAsset);
      setIsLoading(false);
    }
  }, [tokens, currentEth]);

  return { isLoading, tokens, totalAsset };
};
