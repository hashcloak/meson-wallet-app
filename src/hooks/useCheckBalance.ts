import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSelector } from 'react-redux';

import { NetworkState } from '~/features/network';
import { RootState } from '~/features/reducers';
import { getProvider } from '~/service';

export const useCheckBalance = (
  senderWalletAddress: string,
  value: number
): boolean => {
  const [isSufficientFunds, setIsSufficientFunds] = useState(true);
  const { network } = useSelector<RootState, NetworkState>(
    (state) => state.network
  );

  const provider = getProvider(network);

  useEffect(() => {
    const load = async () => {
      const balance = await provider.getBalance(senderWalletAddress);
      const accountBalance = ethers.utils.formatEther(balance);
      const inputAmount = ethers.utils.parseEther(String(value));

      if (
        parseFloat(accountBalance) >=
        parseFloat(ethers.utils.formatEther(inputAmount))
      ) {
        console.log('Sufficient funds.');
        setIsSufficientFunds(true);
      } else {
        console.log('Insufficient funds.');
        setIsSufficientFunds(false);
      }
    };
    void load();
  }, [value]);

  return isSufficientFunds;
};
