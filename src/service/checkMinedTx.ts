import { getProvider } from './getProvider';

export const checkMinedTx = (network: string, txHash: string): void => {
  const provider = getProvider(network);

  provider.once(txHash, (transaction) => {
    // Emitted when the transaction has been mined
    console.log(transaction);
  });
};
