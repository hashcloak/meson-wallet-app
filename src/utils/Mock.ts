import { ContactType } from '@/components/organisms/ContactRow'
import { OwnerType } from '@/components/organisms/EditOwners'
import { RowBodyType } from '@/components/organisms/RowBody'

export const mockNetworks = [
  {
    value: 'ethreaum',
    label: 'Ethereum',
    bg: 'bg-gradient-to-r from-[#CFC3FA] to-[#A5FCF4] text-textBlack',
  },
  {
    value: 'polygon',
    label: 'Polygon',
    bg: 'bg-[#8249E4] text-textWhite',
  },
  {
    value: 'goerli',
    label: 'Goerli',
    bg: 'bg-[#4C98EB] text-textWhite',
  },
  {
    value: 'bnb_smart_chain',
    label: 'BNB Smart Chain',
    bg: 'bg-[#F1B80B] text-textBlack',
  },
]

export const mockTransactions: RowBodyType[] = [
  {
    amount: '- 0.00062',
    token: 'Eth',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1677055246,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
  {
    amount: '+ 0.00062',
    token: 'Dai',
    to: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    from: undefined,
    timestamp: 1674376846,
    status: 'Send',
    numOfConfirmation: 1,
    isSuccess: false,
  },
  {
    amount: undefined,
    token: undefined,
    to: undefined,
    from: undefined,
    timestamp: 1674376846,
    status: 'OnChainRejection',
    numOfConfirmation: 1,
    isSuccess: false,
  },
]

export const mockOwners: OwnerType[] = [
  { address: '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7', name: 'Owner1' },
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: '' },
]

export const mockContacts: ContactType[] = [
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: 'test1' },
  { address: '0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E', name: 'Kang' },
]

export const mockTokens = [
  {
    value: 'ethereum',
    label: 'Ethereum',
    id: 'eth',
  },
  {
    value: 'dai',
    label: 'Dai',
    id: 'dai',
  },
  {
    value: 'usdc',
    label: 'USDC',
    id: 'usdc',
  },
  {
    value: 'bnb',
    label: 'BNB Binance',
    id: 'bnb',
  },
]

export const mockTokensVals = [
  { type: 'EthLogo', abbrev: 'ETH', token: 'Ethereum', amount: '0.080' },
  {
    type: 'DaiLogo',
    abbrev: 'DAI',
    token: 'Dai Stablecoin',
    amount: '0.00000',
  },
  { type: 'UsdcLogo', abbrev: 'USDC', token: 'USD Coin', amount: '0.00000' },
  {
    type: 'BnbLogo',
    abbrev: 'BNB',
    token: 'BNB Smart Chain',
    amount: '0.00000',
  },
]

export const mockLastOpenedWallets = [
  {
    id: 1,
    walletName: 'My wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674012686,
  },
  {
    id: 2,
    walletName: 'Sample wallet2',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1649565211,
  },
  {
    id: 6,
    walletName: 'Sample wallet6',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1674011500,
  },
  {
    id: 3,
    walletName: 'Sample wallet4',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1660970011,
  },
  {
    id: 5,
    walletName: 'Sample wallet3',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1665376411,
  },
  {
    id: 4,
    walletName: 'Sample wallet',
    ethAddress: '0x7bbe9EEc7a61Ac4E655ffEFed478d5F833181422',
    lastOpened: 1662784411,
  },
]
