import { useState } from 'react';
import { Dialog } from '@headlessui/react';

import ChangeThresholdDetails from './ChangeThresholdDetails';
import ChangeThresholdInput from './ChangeThresholdInput';

const ChangeThresholdModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [pageChange, setPageChange] = useState(false);
  const [newConfirmation, onNewConfirmation] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = () => {
    setPageChange(!pageChange);
  };

  const handleLoading = () => {
    setIsLoading(!isLoading);

    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 5000);
  };

  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-10 inset-0 overflow-y-auto'
          static={!!isLoading}
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Change threshold{' '}
                {!pageChange ? (
                  <span className='text-sm text-textGrayLight'>(1/2)</span>
                ) : (
                  <span className='text-sm text-textGrayLight'>(2/2)</span>
                )}
              </span>

              {/* Description */}

              {!pageChange ? (
                <ChangeThresholdInput
                  onClose={onClose}
                  onPageChange={handlePageChange}
                  onNewConfirmation={onNewConfirmation}
                />
              ) : (
                <ChangeThresholdDetails
                  onClose={onClose}
                  newConfirmation={newConfirmation}
                  onPageChange={handlePageChange}
                  onLoad={handleLoading}
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

export default ChangeThresholdModal;
