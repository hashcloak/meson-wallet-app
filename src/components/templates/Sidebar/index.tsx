import { Footer } from '@/components/molecules/Footer'
import { SidebarIconText } from '@/components/molecules/IconText'
import Stepper from '@/components/molecules/Stepper'
import NewTx from '@/components/organisms/NewTx'
import Spacer from '@/utils/Spacer'

type Props = {
  isStepper?: boolean
  isCreateNew?: boolean
  currentStep?: number
}

const Sidebar: React.FC<Props> = ({ isStepper = false, isCreateNew, currentStep }) => {
  return (
    <div className='flex flex-col items-center justify-between w-[5.5rem] h-full box-border py-4 bg-bgDarkMid'>
      {isStepper ? (
        <Stepper isCreateNew={isCreateNew!} currentStep={currentStep!} />
      ) : (
        <>
          <div>
            <div className='flex flex-col'>
              <SidebarIconText type={'Home'} text={'Home'} />
              <SidebarIconText type={'Transactions'} text={'Transactions'} />
              <SidebarIconText type={'Contacts'} text={'Contacts'} />
              <SidebarIconText type={'Settings'} text={'Settings'} />
              <SidebarIconText type={'Help'} text={'Help'} />
            </div>
            <Spacer size={24} axis={'vertical'} />
            <NewTx />
          </div>
          <div>
            <SidebarIconText type={'AddCircle'} text={'Add new'} />
            <Spacer size={16} axis={'vertical'} />
            <Footer />
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
