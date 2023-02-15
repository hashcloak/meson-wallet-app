import { action } from '@storybook/addon-actions'

import Switch from './Switch'

import { DisplayBox } from '~/utils/DisplayBox'

export default {
  title: 'Components/Atmos/Switches',
  component: Switch,
  argTypes: { onClick: { action: 'clicked' } },
}

export const Switches = (): React.ReactElement => {
  return (
    <div className='flex flex-row w-screen flex-wrap'>
      <DisplayBox title={'Switch'}>
        <div className='flex flex-row flex-wrap w-full'>
          <Switch
            label={{ on: 'ON', off: 'OFF' }}
            handleClick={action('clicked')}
          />
        </div>
      </DisplayBox>
    </div>
  )
}
