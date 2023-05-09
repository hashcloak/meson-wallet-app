import { LogoTypes } from '@/components/atoms/Icon/Logo'

export const supportedSignerWallets: { [k in LogoTypes]?: string }[] = [
  { TrezorLogo: 'Trezor' },
  { WalletConnectLogo: 'WalletConnect' },
  { LedgerLogo: 'Ledger' },
  // { MetamaskLogo: 'Metamask' },
]
