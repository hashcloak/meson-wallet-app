import { useEffect, useState } from 'react';
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

  const { mesonWallet } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        if (mesonWallet?.address != null) {
          const provider: ethers.providers.BaseProvider = getProvider(network);
          const currentEthBalance = await provider.getBalance(
            mesonWallet?.address
          );
          const eth = ethers.utils.formatUnits(currentEthBalance);
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
    setTotalAsset(currentAsset);
    setIsLoading(false);
  }, [tokens]);

  return { isLoading, tokens, totalAsset };
};
