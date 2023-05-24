import { useState } from 'react';
import { mockOwners } from '~/utils/Mock';
import ReplaceOwnerModal from '.';

export default {
  title: 'Components/Organisms/ReplaceOwnerModal',
  component: ReplaceOwnerModal,
};

export const Default: React.FC = (): React.ReactElement => {
  const [isOpenReplaceOwnerModal, setIsOpenReplaceOwnerModal] = useState(true);
  const handleReplaceOwnerModal = () => {
    setIsOpenReplaceOwnerModal(!isOpenReplaceOwnerModal);
  };

  return (
    <ReplaceOwnerModal
      isOpen={isOpenReplaceOwnerModal}
      onClose={handleReplaceOwnerModal}
      name={mockOwners[0].address}
      address={mockOwners[0].address}
    />
  );
};
