/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { TransactionResponse } from '@ethersproject/abstract-provider';
import { getProvider } from './getProvider';

// const quickNode =
//   'wss://boldest-hidden-spree.ethereum-sepolia.discover.quiknode.pro/7226d458610936bcc45b9c51d2d64ef4e5d37acf/';

export const getPendingTxs = (network: string): TransactionResponse[] => {
  const provider = getProvider(network);
  // const provider = new ethers.providers.WebSocketProvider(quickNode);

  // Listen for new pending transactions
  provider.on('pending', (txHash: string) => {
    void provider.getTransaction(txHash).then((pendingTx) => {
      console.log(pendingTx);
      if (pendingTx !== undefined) {
        if (pendingTx.data.includes('0xbaa2abde')) {
          console.log(pendingTx);
        }
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return txHash;
  });

  // const filter = {
  //   address: 'dai.tokens.ethers.eth',
  //   topics: [ethers.utils.id('Transfer(address,address,uint256)')],
  // };
  // provider.on(filter, (log, event) => {
  //   // Emitted whenever a DAI token transfer occurs
  //   console.log('log',log);
  //   console.log('event',event);
  // });

  return [];
};
