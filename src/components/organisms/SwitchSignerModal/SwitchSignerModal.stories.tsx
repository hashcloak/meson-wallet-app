import { useState } from 'react';
import { Wallet } from 'ethers';
import { MockWagmiDecorator } from '../../../../.storybook/decorators';
import SwitchSignerModal from '.';

const demoWallet = new Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
);

export default {
  title: 'Components/Organisms/SwitchSigner',
  component: SwitchSignerModal,
  decorators: [MockWagmiDecorator(demoWallet)],
};

export const Default: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return <SwitchSignerModal isOpen={isOpen} onClose={handleIsOpen} />;
};
