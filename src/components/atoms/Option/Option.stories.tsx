import Option from './Option'
import { mockNetworks } from '@/utils/Mock'

export default {
  title: 'Components/Atmos/Option',
  component: Option,
}

export const Default = (): React.ReactElement => <Option options={mockNetworks} />
