import { Tab } from '@headlessui/react'
import { useState } from 'react'

import { Icon } from '../../atoms/Icon/Icon'

type Props = {
  tabList: { [key: string]: JSX.Element }[]
}

const TabsVertical: React.FC<Props> = ({ tabList }) => {
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
        <div className='grid grid-cols-[20%_1fr] gap-6 h-full'>
          <Tab.List className='flex flex-col items-center space-x-1 box-border rounded-2xl bg-bgDarkLight p-4 h-full'>
            {tabList.map((item, idx) => (
              <Tab
                className={({ selected }) =>
                  classNames(
                    'rounded-3xl h-12 w-full text-center text-xl font-medium text-textWhite',
                    'focus:outline-none focus:ring-2 mb-2',
                    selected ? 'bg-dark' : 'hover:bg-dark'
                  )
                }
                key={idx}
              >
                <div className='flex flex-row justify-between w-full px-4'>
                  {Object.keys(item)}
                  <Icon type={'ChevronRight'} size={'lg'} color={'white'} />
                </div>
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='flex flex-col h-full w-full box-border overflow-clip'>
            {Object.values(tabList[selectedIndex])}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  )
}

export default TabsVertical
