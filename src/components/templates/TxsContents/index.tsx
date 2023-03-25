import TxsOverview from '../TxsOverview'
import { BasicTabs } from '@/components/molecules/Tabs'
import HistoryTable from '@/components/organisms/HistoryTable'
import QueueTable from '@/components/organisms/QueueTable'

const TxsContents = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Overview: <TxsOverview /> },
    // { Queue: <QueueTable /> },
    // { History: <HistoryTable /> },
  ]
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <BasicTabs tabList={tabList} />
    </div>
  )
}

export default TxsContents
