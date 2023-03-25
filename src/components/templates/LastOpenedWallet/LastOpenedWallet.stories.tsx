import LastOpenedWallet from '.'
import { mockLastOpenedWallets } from '@/utils/Mock'

export default {
  title: 'Components/Templates/LastOpenedWallet',
  component: LastOpenedWallet,
}

export const Default = () => <LastOpenedWallet wallets={mockLastOpenedWallets} />
