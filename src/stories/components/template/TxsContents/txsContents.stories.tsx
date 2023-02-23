import TxsContents from './TxsContents'

import Spacer from '~/utils/Spacer'

export default {
  title: 'Components/Template/TxsContents',
  component: TxsContents,
}

export const Default = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <TxsContents />
    </div>
  )
}
