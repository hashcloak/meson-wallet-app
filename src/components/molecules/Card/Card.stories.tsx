import Card from '.'
import { TransactionType } from '@/components/organisms/Timeline'

export default {
  title: 'Components/Molecules/Cards',
  component: 'Cards',
}

const tx: TransactionType = {
  id: 1,
  token: 'ethereum',
  amount: 0.00062,
  ethAddress: '0xf86B25473cC08F04DA275B2847F2448cf041Fbd5',
  status: 'Received',
  isSuccess: true,
  timestamp: 1675211794,
}

export const Cards = (): React.ReactElement => {
  return <Card tx={tx} />
}
