import Transactions from './Transactions'
import TxResult from './TxResult'

export default {
  title: 'Components/Page/Transactions',
  component: { Transactions, TxResult },
}

export const Default = () => {
  return <Transactions />
}

export const TransactionResult = () => {
  return <TxResult />
}
