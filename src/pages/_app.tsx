import '@/styles/globals.css'
import { configureStore } from '@reduxjs/toolkit'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import { WagmiConfig, createClient, configureChains, goerli, mainnet } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import reducers from '@/features/reducers'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const admin = router.route.startsWith('/admin') ? true : false

  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_NEXT_PUBLIC_INFURA_API! })],
  )

  const client = createClient({
    connectors: [],
    provider,
    webSocketProvider,
  })

  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = configureStore({ reducer: persistedReducer })
  const persistor = persistStore(store)

  return (
    <WagmiConfig client={client}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </ReduxProvider>
    </WagmiConfig>
  )
}
