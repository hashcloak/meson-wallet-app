import { NotificationBtn, Notification } from '.'
import Dialog from '@/components/atoms/Dialog'

export default {
  title: 'Components/Organisms/Notification',
  component: { Notification, NotificationBtn },
}

export const Default = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog popupBtn={<NotificationBtn />} popupContent={<Notification />} />
      </div>
    </div>
  )
}
