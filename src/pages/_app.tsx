import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { WagmiConfig, createClient, configureChains, goerli, mainnet } from 'wagmi'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const admin = router.route.startsWith('/admin') ? true : false

  const { chains, provider, webSocketProvider } = configureChains(
    [goerli, mainnet],
    [infuraProvider({ apiKey: process.env.INFURA_API! })],
  )

  const client = createClient({
    autoConnect: true,
    connectors: [
      new WalletConnectConnector({
        chains: [goerli, mainnet],
        options: {
          projectId: process.env.WALLETCONNECT_PROJECT_ID!,
        },
      }),
    ],
    provider,
    webSocketProvider,
  })

  // const getLayout = admin
  //   ? (page: ReactNode) => <AdminLayout>{page}</AdminLayout>
  //   : (page: ReactNode) => <Layout>{page}</Layout>

  // return <>{getLayout(<Component {...pageProps} />)}</>
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
