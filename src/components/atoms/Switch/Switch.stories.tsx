import { action } from '@storybook/addon-actions'

import Switch from '.'

export default {
  title: 'Components/Atmos/Switch',
  component: Switch,
  argTypes: { onClick: { action: 'clicked' } },
}

export const Default = (): React.ReactElement => (
  <Switch label={{ on: 'ON', off: 'OFF' }} handleClick={action('clicked')} />
)
