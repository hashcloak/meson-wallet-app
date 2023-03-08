import TxConflict from './TxConflict'
import TxDetails from './TxDetails'

export default {
  title: 'Components/Template/TxDetails',
  component: TxDetails,
}

export const Default = () => {
  return <TxDetails />
}

export const TransactionConflict = () => {
  return <TxConflict />
}
