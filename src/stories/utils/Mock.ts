import { ContactType } from '../components/molecules/ContactRow/ContactRow'
import { OwnerType } from '../components/organisms/EditOwners/EditOwners'
import { RowBodyType } from '../components/organisms/Table/CustomTable'

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
]

export const mockOwners: OwnerType[] = [
  { address: '0xfF501B324DC6d78dC9F983f140B9211c3EdB4dc7', name: 'Owner1' },
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: '' },
]

export const mockContacts: ContactType[] = [
  { address: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5', name: 'test1' },
  { address: '0xc740145D4b8b95F44Cd9e00acEA006B02d505E2E', name: 'Kang' },
]
