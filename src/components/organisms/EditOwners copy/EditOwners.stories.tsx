import { useState } from 'react';
import { mockOwners } from '~/utils/Mock';
import EditOwners from '.';

export default {
  title: 'Components/Organisms/EditOwners',
  component: EditOwners,
};

export const Default: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <EditOwners
      isOpen={isOpen}
      onClose={function (): void {
        setIsOpen(!isOpen);
      }}
      owners={mockOwners}
    />
  );
};
