import { Tab } from '@headlessui/react'

const Tabs = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Tab 1</Tab>
        <Tab>
          <button className='ui-selected:bg-blue-500 text-white bg-white text-black'>
            Tab 1
          </button>
        </Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}
export default Tabs
