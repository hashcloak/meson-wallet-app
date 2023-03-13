import Tabs from '../../molecules/Tab/Tabs'
import HistoryTable from '../../organisms/HistoryTable/HistoryTable'
import QueueTable from '../../organisms/QueueTable/QueueTable'
import TxsOverview from '../TxsOverview/TxsOverview'

const TxsContents = () => {
  const tabList: { [key: string]: JSX.Element }[] = [
    { Overview: <TxsOverview /> },
    { Queue: <QueueTable /> },
    { History: <HistoryTable /> },
  ]
  return (
    <div className='flex flex-col justify-center items-center w-full h-full box-border'>
      <Tabs tabList={tabList} />
    </div>
  )
}

export default TxsContents
