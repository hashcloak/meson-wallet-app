import Stepper from './Stepper'

export default {
  title: 'Components/Molecules/Step',
  component: 'Step',
}

export const Steps = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='max-w-[5.5rem] py-4 px-2 bg-bgDarkMid'>
        <Stepper />
      </div>
    </div>
  )
}
