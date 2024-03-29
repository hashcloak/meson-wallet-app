import { useState } from 'react';
import Button from '~/components/atoms/Button/Button';
import Spacer from '~/utils/Spacer';
import AddOwnerModal from '../AddOwnerModal';
import ChangeThresholdModal from '../ChangeThresholdModal';
import OwnerRow from './OwnerRow';
import { Owner } from '~/features/mesonWallet';

const EditOwnersDetails: React.FC<{
  owners: Owner[];
  onClose: () => void;
}> = ({ owners, onClose }) => {
  const [isOpenChangeThresholdModal, setIsOpenChangeThresholdModal] =
    useState(false);
  const [isOpenAddOwnerModal, setIsOpenAddOwnerModal] = useState(false);

  const handleChangeThresholdModal = () => {
    setIsOpenChangeThresholdModal(!isOpenChangeThresholdModal);
  };
  const handleAddOwnerModal = () => {
    setIsOpenAddOwnerModal(!isOpenAddOwnerModal);
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center text-textGray dark:text-textWhite'>
        <div>
          <span className='text-left'>Owners</span>
          <div className='rounded-2xl bg-bgGrayLight  dark:bg-bgDarkLight p-4'>
            {owners?.map((owner) => (
              <OwnerRow owner={owner} key={owner.ownerAddress} />
            ))}
          </div>
          <Spacer size={32} axis={'vertical'} />

          <div className='flex flex-row justify-around'>
            <Button
              btnVariant={'text'}
              btnSize={'md'}
              btnType={'button'}
              handleClick={onClose}
            >
              <span className='text-lg'>Close</span>
            </Button>
            <Button
              btnVariant={'border'}
              btnSize={'md'}
              btnType={'submit'}
              handleClick={handleChangeThresholdModal}
            >
              Change threshold
            </Button>
            <Button
              btnVariant={'primary'}
              btnSize={'md'}
              btnType={'submit'}
              // handleClick={onClose}
              handleClick={handleAddOwnerModal}
            >
              Add new owner
            </Button>
          </div>

          <ChangeThresholdModal
            isOpen={isOpenChangeThresholdModal}
            onClose={handleChangeThresholdModal}
          />
          <AddOwnerModal
            isOpen={isOpenAddOwnerModal}
            onClose={handleAddOwnerModal}
          />
        </div>
      </div>
    </>
  );
};

export default EditOwnersDetails;
