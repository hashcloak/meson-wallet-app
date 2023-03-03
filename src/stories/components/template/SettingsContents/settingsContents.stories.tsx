import SettingsContents from './SettingsContents'

export default {
  title: 'Components/Template/SettingsContents',
  component: SettingsContents,
}

export const SettingsContentss = () => {
  return (
    <div className='flex flex-col justify-between w-screen'>
      <SettingsContents />
    </div>
  )
}
