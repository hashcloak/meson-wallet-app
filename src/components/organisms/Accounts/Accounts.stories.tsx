import Accounts from '.'

export default {
  title: 'Components/Organisms/Accounts',
  component: Accounts,
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Accounts />
      </div>
    </div>
  )
}
