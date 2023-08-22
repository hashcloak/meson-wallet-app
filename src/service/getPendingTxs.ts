/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { getProvider } from './getProvider';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPendingTxs = (network: string) => {
  const provider = getProvider(network);

  // Listen for new pending transactions
  provider.on('pending', (tx: any) => {
    console.log('New pending transaction:', tx);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return tx;
  });

  // Listen for new blocks, and retrieve all transactions in each block
  // provider.on("block", async (blockNumber:number) => {
  //  const block = await provider.getBlock(blockNumber);
  //  console.log("New block:", block);
  //  console.log("Transactions:", block.transactions);
  // });
};
