import { Tab } from '@headlessui/react'
import { useState } from 'react'

type Props = {
  tabList: { [key: string]: JSX.Element }[]
}

const BasicTabs: React.FC<Props> = ({ tabList }) => {
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
        }}
      >
        <Tab.List className='flex flex-row items-center space-x-1 p-1 box-border'>
          {tabList.map((item, idx) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  'rounded-xl	px-2.5 text-center text-base font-medium text-textWhite',
                  'focus:outline-none focus:ring-2',
                  selected ? 'bg-dark' : 'hover:bg-dark',
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

export default BasicTabs
