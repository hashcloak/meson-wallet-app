import { Dialog } from '@headlessui/react';
import EditOwnersDetails from './EditOwnersDetails';
import { Owner } from '~/features/mesonWallet';

type Props = {
  isOpen: boolean | undefined;
  owners: Owner[];
  onClose: () => void;
};

const EditOwners: React.FC<Props> = ({ isOpen, onClose, owners }) => {
  return (
    <>
      {(isOpen ?? false) && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8 '>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Edit owners
              </span>
              {/* Description */}
              <EditOwnersDetails owners={owners} onClose={onClose} />
              {/* Description */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default EditOwners;
