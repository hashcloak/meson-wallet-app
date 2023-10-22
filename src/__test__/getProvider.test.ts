import { ethers } from 'ethers';
import { NetworkState } from '~/features/network';
import { getProvider } from '~/service/';

describe('Provider', () => {
  const network: NetworkState = {
    network: 'localhost',
    chainId: 31337,
    url: 'http://127.0.0.1:8545/',
  };

  it('instantiates new provider in localhost', () => {
    const result = getProvider(network.network);

    expectTypeOf(result).toEqualTypeOf<ethers.providers.BaseProvider>();
  });
});
