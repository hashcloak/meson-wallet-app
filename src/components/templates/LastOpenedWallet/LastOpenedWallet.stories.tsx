import { mockLastOpenedWallets } from '~/utils/Mock';
import LastOpenedWallet from '.';

export default {
  title: 'Components/Templates/LastOpenedWallet',
  component: LastOpenedWallet,
};

export const Default: React.FC = () => (
  <LastOpenedWallet wallets={mockLastOpenedWallets} />
);
