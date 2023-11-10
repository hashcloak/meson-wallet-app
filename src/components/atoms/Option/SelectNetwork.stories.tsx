/* eslint-disable import/extensions */
import SelectNetwork from './SelectNetwork';
import { NetworksState } from '~/features/network';
import * as networksJson from '~/utils/networkList.json';

export default {
  title: 'Components/Atmos/SelectNetwork',
  component: SelectNetwork,
};

export const Default: React.FC = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const networks = JSON.parse(JSON.stringify(networksJson))
    .default as NetworksState;

  const handleNetworkSelect = (currentVal: keyof NetworksState) => {
    console.log(networks[currentVal]);
  };

  return (
    <SelectNetwork networks={networks} handleChange={handleNetworkSelect} />
  );
};
