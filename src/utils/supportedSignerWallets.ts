import { LogoTypes } from '~/components/atoms/Icon/Logo';

export const supportedSignerWallets: Array<{ [k in LogoTypes]?: string }> = [
  { TrezorLogo: 'Trezor' },
  { WalletConnectLogo: 'WalletConnect' },
  { LedgerLogo: 'Ledger' },
  // { MetamaskLogo: 'Metamask' },
];
