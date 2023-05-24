import { mockNetworks } from '~/utils/Mock';
import Option from './Option';

export default {
  title: 'Components/Atmos/Option',
  component: Option,
};

export const Default: React.FC = (): React.ReactElement => (
  <Option options={mockNetworks} />
);
