import Sidebar from './Sidebar'

export default {
  title: 'Components/Template/Sidebar',
  component: Sidebar,
}

export const Sidebars = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <Sidebar />
    </div>
  )
}
