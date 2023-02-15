import { Tab } from '@headlessui/react'
import { useState } from 'react'

import { TableLongRow } from '../../organisms/Table/CustomTable'

export const Queue = () => {
  return (
    <>
      <div className='flex flex-row justify-between items-center w-full'>
        <span className='text-2xl font-bold text-textWhite'>Queue</span>
        <div>Filter</div>
      </div>
      <div className='rounded-2xl bg-bgDarkMid px-8 py-4 w-full h-full overflow-scroll  box-border'>
        <div className='grid grid-cols-2 gap-32 box-border text-textGrayLight w-full px-4 mb-2'>
          <div className='grid grid-cols-2 '>
            <span className='col-span-1'>Action</span>
            <span className='col-span-1'>Amount</span>
          </div>
          <div className='grid grid-cols-3 '>
            <span className='col-span-1'>Date</span>
            <span className='col-span-1'>Confirmation</span>
            <span className='col-span-1'>Status</span>
          </div>
        </div>
        <div className='box-border grid grid-cols-1 gap-2'>
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
          <TableLongRow />
        </div>
      </div>
    </>
  )
}

export const History = () => {
  return (
    <>
      <div className='flex flex-row justify-between w-full'>
        <span className='text-2xl font-bold text-textWhite'>History</span>
        <div>Filter</div>
      </div>
      <div className='rounded-2xl bg-bgDarkMid px-8 py-4 w-full h-full'>
        <li className='flex flex-row justify-between'>
          <ul>Action</ul>
          <ul>Amount</ul>
          <ul>Date</ul>
          <ul>Confirmation</ul>
          <ul>Status</ul>
        </li>
        <div className='flex justify-center items-center h-full'>
          <span className='text-2xl font-bold text-textGray'>
            No pending transaction
          </span>
        </div>
      </div>
    </>
  )
}

type Props = {
  tabList: { [key: string]: JSX.Element }[]
}

const Tabs: React.FC<Props> = ({ tabList }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='w-full h-full flex flex-col box-border'>
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index)
          console.log('Changed selected tab to:', index)
        }}
      >
        <Tab.List className='flex flex-row items-center space-x-1 p-1 box-border'>
          {tabList.map((item, idx) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  'rounded-none	px-2.5 text-center text-base font-medium text-textWhite',
                  'focus:outline-none focus:ring-2',
                  selected ? 'bg-dark' : 'hover:bg-dark'
                )
              }
              key={idx}
            >
              {Object.keys(item)}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='flex flex-col h-full box-border overflow-clip'>
          {Object.values(tabList[selectedIndex])}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
export default Tabs
