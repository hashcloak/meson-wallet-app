import { BigNumber, ethers } from 'ethers';
import { getProvider } from './getProvider';

const refreshBalance = (
  network: string,
  address: string,
  lastBalance: string
): void => {
  const provider = getProvider(network);

  provider.on('block', () => {
    console.log('lastBalance', lastBalance);

    void provider.getBalance(address).then((balance) => {
      if (!balance.eq(BigNumber.from(String(Number(lastBalance))))) {
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log(`balance: ${balanceInEth} ETH`);
      }
    });
  });
};

export { refreshBalance };
