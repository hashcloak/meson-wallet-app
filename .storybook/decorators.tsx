import { Story } from '@storybook/react';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { Wallet } from 'ethers';
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducers from '../src/features/reducers';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [infuraProvider({ apiKey: 'e31737b3710d4bdca5886411fd8d169f' })]
);

const client = createClient({
  connectors: [],
  provider,
  webSocketProvider,
});

export const WagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={client}>
      <Story />
    </WagmiConfig>
  );
};

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = (wallet: Wallet) =>
  createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
      new MockConnector({
        chains,
        options: {
          signer: wallet,
          chainId: 31337,
        },
      }),
    ],
  });
const store = configureStore({ reducer: reducers });

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
// eslint-disable-next-line react/display-name
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
  return (
    <WagmiConfig client={mockWagmiClient(wallet)}>
      <Provider store={store}>
        <Story />
      </Provider>
    </WagmiConfig>
  );
};
