import type { FC } from 'react';
import Providers from './Providers';
import Alert from './components/atoms/Alert';
import IndexRoutes from './routes';

const App: FC = () => {
  return (
    <Providers>
      <Alert />
      <IndexRoutes />
    </Providers>
  );
};

export default App;
