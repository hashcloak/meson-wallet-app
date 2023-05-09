import { Story } from '@storybook/react'
import { MockConnector } from '@wagmi/core/connectors/mock'
import { Wallet } from 'ethers'
import React from 'react'
import { configureChains, createClient, goerli, mainnet, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'

const { chains, provider, webSocketProvider } = configureChains(
  [goerli, mainnet],
  [infuraProvider({ apiKey: process.env.INFURA_API! })],
)

const client = createClient({
  autoConnect: true,
  connectors: [],
  provider,
  webSocketProvider,
})

export const WagmiDecorator = (Story: Story) => {
  return (
    <WagmiConfig client={client}>
      <Story />
    </WagmiConfig>
  )
}

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
  })

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
// eslint-disable-next-line react/display-name
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
  return (
    <WagmiConfig client={mockWagmiClient(wallet)}>
      <Story />
    </WagmiConfig>
  )
}
