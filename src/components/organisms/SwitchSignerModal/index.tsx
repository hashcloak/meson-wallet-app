import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import SelectLedgerSignerDetail from '../SelectSignerModal/SelectLedgerSignerDetail';
import SelectTrezorSignerDetail from '../SelectSignerModal/SelectTrezorSignerDetail';
import { RootState } from '~/features/reducers';
import { SignerState } from '~/features/signerWallet';

export type NewOwnerType = {
  newOwnerAddress: string;
  newOwnerName: string;
  confirmation?: string;
};

const SwitchSignerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { wallet } = useSelector<RootState, SignerState>(
    (state) => state.signerWallet
  );

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
            <Dialog.Panel className='relative bg-bgDarkMid rounded-2xl py-6 px-8'>
              <span className='text-textWhite text-2xl font-bold'>
                Switch signer
              </span>

              <Dialog.Description className='py-6'>
                {/* Description */}
                {wallet === 'Trezor' && (
                  <SelectTrezorSignerDetail onClose={onClose} />
                )}
                {wallet === 'Ledger' && (
                  <SelectLedgerSignerDetail onClose={onClose} />
                )}
                {/* Description */}
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default SwitchSignerModal;
