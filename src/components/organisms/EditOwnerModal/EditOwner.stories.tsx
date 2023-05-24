import { useState } from 'react';
import { mockOwners } from '~/utils/Mock';
import EditOwnerModal from '.';

export default {
  title: 'Components/Organisms/EditOwnerModal',
  component: EditOwnerModal,
};

export const Default: React.FC = (): React.ReactElement => {
  const [isOpenEditOwnerModal, setIsOpenEditOwnerModal] = useState(false);

  const handleEditOwnerModal = (): void => {
    setIsOpenEditOwnerModal(!isOpenEditOwnerModal);
  };

  return (
    <EditOwnerModal
      isOpen={isOpenEditOwnerModal}
      onClose={handleEditOwnerModal}
      name={mockOwners[0].name}
      address={mockOwners[0].address}
    />
  );
};
