import Dialog from '../../atoms/Dialog/Dialog'

import { Notification, NotificationBtn } from './Notification'

export default {
  title: 'Components/Organisms/Notification',
  component: Notification,
}

export const Notifications = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <div className='flex flex-row flex-wrap w-full mt-8'>
        <Dialog
          popupBtn={<NotificationBtn />}
          popupContent={<Notification />}
        />
      </div>
    </div>
  )
}
