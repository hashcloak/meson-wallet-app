import { Dialog } from '@headlessui/react';
import SelectHardhatSignerDetail from './SelectHardhatSignerDetail';
import SelectLedgerSignerDetail from './SelectLedgerSignerDetail';
import SelectTrezorSignerDetail from './SelectTrezorSignerDetail';

export type NewOwnerType = {
  newOwnerAddress: string;
  newOwnerName: string;
  confirmation?: string;
};

const SelectSignerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  wallet?: 'trezor' | 'ledger' | 'hardhat';
}> = ({ isOpen, onClose, wallet }) => {
  return (
    <>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className='fixed z-[99] inset-0 overflow-y-auto'
          // static
        >
          <div className='flex items-center justify-center min-h-screen'>
            <Dialog.Overlay
              className='fixed inset-0 bg-neutral-900 opacity-30'
              aria-hidden='true'
            />
            <Dialog.Panel className='relative bg-bgGrayMid dark:bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textGray dark:text-textWhite text-2xl font-bold'>
                Select signer
              </span>

              <div className='py-6'>
                {/* Description */}

                {wallet === 'trezor' && (
                  <SelectTrezorSignerDetail onClose={onClose} />
                )}
                {wallet === 'ledger' && (
                  <SelectLedgerSignerDetail onClose={onClose} />
                )}
                {wallet === 'hardhat' && (
                  <SelectHardhatSignerDetail onClose={onClose} />
                )}

                {/* Description */}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SelectSignerModal;
