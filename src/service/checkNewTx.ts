import { getProvider } from './getProvider';

export const checkNewTx = (network: string): void => {
  const provider = getProvider(network);

  // Listen for new blocks, and retrieve all transactions in each block
  // provider.on('block', async (blockNumber: number) => {
  //   const block = await provider.getBlock(blockNumber);
  //   // console.log('New block:', block);
  //   console.log('Transactions:', block.transactions);
  // });
};
