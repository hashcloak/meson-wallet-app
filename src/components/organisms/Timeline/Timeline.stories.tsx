import Timeline, { TransactionType } from '.'

export default {
  title: 'Components/Organisms/Timeline',
  component: 'Timeline',
}

export const transactions: TransactionType[] = [
  {
    id: 1,
    token: 'ethereum',
    amount: 0.00062,
    ethAddress: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    status: 'Received',
    isSuccess: true,
    timestamp: 1675211794,
  },
  {
    id: 2,
    token: 'ethereum',
    amount: 0.0008,
    ethAddress: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    status: 'Sent',
    isSuccess: false,
    timestamp: 1675989394,
  },
  {
    id: 3,
    token: 'ethereum',
    amount: 0,
    ethAddress: '0x9F87C1aCaF3Afc6a5557c58284D9F8609470b571',
    status: 'OwnerChange',
    isSuccess: true,
    timestamp: 1675667105,
  },
  {
    id: 4,
    token: 'ethereum',
    amount: 0,
    ethAddress: '0x9F87C1aCaF3Afc6a5557c58284D9F8609470b571',
    status: 'OnChainRejection',
    isSuccess: true,
    timestamp: 1676421394,
  },
  {
    id: 5,
    token: 'ethereum',
    amount: 0.00062,
    ethAddress: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    status: 'Received',
    isSuccess: true,
    timestamp: 1673749886,
  },
  {
    id: 6,
    token: 'ethereum',
    amount: 0.0008,
    ethAddress: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
    status: 'Sent',
    isSuccess: false,
    timestamp: 1672885886,
  },
  {
    id: 7,
    token: 'ethereum',
    amount: 0,
    ethAddress: '0x9F87C1aCaF3Afc6a5557c58284D9F8609470b571',
    status: 'OwnerChange',
    isSuccess: true,
    timestamp: 1674009086,
  },
  {
    id: 8,
    token: 'ethereum',
    amount: 0,
    ethAddress: '0x9F87C1aCaF3Afc6a5557c58284D9F8609470b571',
    status: 'OnChainRejection',
    isSuccess: true,
    timestamp: 1674012686,
  },
]

export const Default = (): React.ReactElement => <Timeline txs={transactions} />
