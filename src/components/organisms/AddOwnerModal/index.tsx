import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import AddOwnerDetails from './AddOwnerDetails';
import AddOwnerInput from './AddOwnerInput';
import { Owner } from '~/features/mesonWallet';

const AddOwnerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [pageChange, setPageChange] = useState(false);
  const [newOwner, setNewOwner] = useState<Owner>({
    ownerAddress: '',
    name: '',
  });
  const [newConfirmation, setNewConfirmation] = useState<number>(1);

  const handlePageChange = () => {
    setPageChange(!pageChange);
  };

  useEffect(() => {
    setPageChange(false);
  }, []);

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          // static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Add new owner{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

              {/* Description */}

              {!pageChange ? (
                <AddOwnerInput
                  onClose={onClose}
                  onPageChange={handlePageChange}
                  onSetNewOwner={setNewOwner}
                  onSetNewConfirmation={setNewConfirmation}
                />
              ) : (
                <AddOwnerDetails
                  onPageChange={handlePageChange}
                  newOwner={newOwner}
                  newConfirmation={newConfirmation}
                />
              )}
              {/* Description */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default AddOwnerModal;
