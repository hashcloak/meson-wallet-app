import type { FC, PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import reducers from '../src/features/reducers';

const { provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    infuraProvider({
      apiKey: String(import.meta.env.VITE_INFURA_API_KEY),
    }),
  ]
);

const client = createClient({
  connectors: [],
  provider,
  webSocketProvider,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <WagmiConfig client={client}>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>{children}</Router>
      </PersistGate>
    </ReduxProvider>
  </WagmiConfig>
);

export default Providers;
