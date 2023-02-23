import { useEffect, useState } from 'react'

import Chart from '../../atoms/Chart/Chart'
import Stat from '../../atoms/Stat/Stat'
import Tabs from '../../molecules/Tab/Tabs'

const TransactionAmount = () => {
  const [queueCount, setQueueCount] = useState(0)
  const [historiedCount, setHistoriedCount] = useState(0)

  const week = [
    { name: 'Sun', 'Queued Txs': 1, 'Historied Txs': 5 },
    { name: 'Mon', 'Queued Txs': 24, 'Historied Txs': 5 },
    { name: 'Tue', 'Queued Txs': 3, 'Historied Txs': 5 },
    { name: 'Wed', 'Queued Txs': 27, 'Historied Txs': 24 },
    { name: 'Thu', 'Queued Txs': 23, 'Historied Txs': 16 },
    { name: 'Fri', 'Queued Txs': 30, 'Historied Txs': 16 },
    { name: 'Sat ', 'Queued Txs': 4, 'Historied Txs': 16 },
    { name: 'Sun', 'Queued Txs': 1, 'Historied Txs': 16 },
  ]

  const month = [
    { name: '22 Mar', 'Queued Txs': 1, 'Historied Txs': 16 },
    { name: '22 Apr', 'Queued Txs': 24, 'Historied Txs': 16 },
    { name: '22 May', 'Queued Txs': 5, 'Historied Txs': 16 },
    { name: '22 Jun', 'Queued Txs': 1, 'Historied Txs': 16 },
    { name: '22 Jul', 'Queued Txs': 5, 'Historied Txs': 16 },
    { name: '22 Aug', 'Queued Txs': 24, 'Historied Txs': 16 },
    { name: '22 Mar', 'Queued Txs': 1, 'Historied Txs': 16 },
    { name: '22 Apr', 'Queued Txs': 1, 'Historied Txs': 5 },
    { name: '22 May', 'Queued Txs': 1, 'Historied Txs': 24 },
    { name: '22 Jun', 'Queued Txs': 1, 'Historied Txs': 16 },
    { name: '22 Jul', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Aug', 'Queued Txs': 1, 'Historied Txs': 1 },
  ]

  const year = [
    { name: '22 Mar', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Apr', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 May', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Jun', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Jul', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Aug', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Sep', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Oct', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Nov', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Dec', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Jan', 'Queued Txs': 1, 'Historied Txs': 1 },
    { name: '22 Feb', 'Queued Txs': 1, 'Historied Txs': 1 },
  ]

  const tabList: { [key: string]: JSX.Element }[] = [
    { Weekly: <Chart data={week} isBar={true} /> },
    { Monthly: <Chart data={month} isBar={true} /> },
    { Yearly: <Chart data={year} isBar={true} /> },
  ]

  const txCounter = () => {
    const totalTxs = [week, month, year]

    totalTxs.forEach((unit) => {
      unit.forEach((tx) => {
        if (tx['Queued Txs']) {
          setQueueCount((prevCount) => prevCount + tx['Queued Txs'])
        }
        if (tx['Historied Txs']) {
          setHistoriedCount((prevCount) => prevCount + tx['Historied Txs'])
        }
      })
    })
  }

  useEffect(() => {
    txCounter()
  }, [])

  return (
    <div className='flex flex-col w-full'>
      <span className='text-textWhite text-2xl font-bold'>
        Transaction amount
      </span>
      <div className='flex flex-col justify-center rounded-2xl text-textWhite bg-bgDarkMid px-8 py-6  h-full box-border'>
        <Tabs tabList={tabList} />
        <div className='flex flex-row w-full justify-around'>
          <Stat title={'queue'} data={queueCount} />
          <Stat title={'historied'} data={historiedCount} />
        </div>
      </div>
    </div>
  )
}

export default TransactionAmount
