import { useState } from 'react';
import { Dialog } from '@headlessui/react';

import { EditOwnerModalType as ReplaceOwnerModalType } from '../EditOwnerModal';

import ReplaceOwnerDetails from './ReplaceOwnerDetails';
import ReplaceOwnerInput from './ReplaceOwnerInput';
import { Owner } from '~/features/mesonWallet';

const ReplaceOwnerModal: React.FC<ReplaceOwnerModalType> = ({
  isOpen,
  onClose,
  name,
  address,
}) => {
  const [pageChange, setPageChange] = useState(false);
  const [newOwner, setNewOwner] = useState<Owner>({
    ownerAddress: '',
    name: '',
  });

  const handlePageChange = () => setPageChange(!pageChange);

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
                Replace owner{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

                {/* Description */}

                {!pageChange ? (
                  <ReplaceOwnerInput
                    onClose={onClose}
                    name={name}
                    address={address}
                    onPageChange={handlePageChange}
                    onSetNewOwner={setNewOwner}
                  />
                ) : (
                  <ReplaceOwnerDetails
                    onClose={onClose}
                    newOwner={newOwner}
                    name={name}
                    address={address}
                    onPageChange={handlePageChange}
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

export default ReplaceOwnerModal;
