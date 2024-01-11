import { Dialog } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { Button } from '~/components/atoms/Button';
import { InputControl } from '~/components/atoms/Input';
import Spacer from '~/utils/Spacer';
import { setError } from '~/features/error';
import { MesonWalletState, editContacts } from '~/features/mesonWallet';
import { RootState } from '~/features/reducers';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  address: string;
};

type EditContactDetailsType = {
  onClose: () => void;
  name: string;
  address: string;
};

const EditContactDetails: React.FC<EditContactDetailsType> = ({
  onClose,
  name,
  address,
}) => {
  const dispatch = useDispatch();
  const { contacts,owners } = useSelector<RootState, MesonWalletState>(
    (state) => state.mesonWallet
  );

  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    address: z
      .string()
      .min(1, { message: 'Please input valid eth address' })
      .refine(
        (val) => {
          if(ethers.utils.isAddress(val)){
            const checkOwners = owners?.filter((o) => o.ownerAddress.toLowerCase() === val.toLowerCase()) ?? []

            return !(checkOwners.length > 0);
          };
        },
        {
          message: 'Please input valid eth address',
        }
      ),
  });

  const methods = useForm({
    defaultValues: {
      name,
      address,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { name: string; address: string }) => {
    const validateNewContact = contacts?.filter(
      (c) => c.address.toLowerCase() === data.address.toLowerCase() && data.address.toLowerCase() !== address.toLowerCase()
    );
    console.log(validateNewContact)
    if (validateNewContact !== undefined && validateNewContact?.length === 0) {
      dispatch(editContacts({ removingAddress: address, newContact: data }));
      onClose();
    } else {
      dispatch(
        setError({ error: 'The same address has already been registered.' })
      );
    }
  };

  return (
    <div className='flex flex-col text-textWhite'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputControl
            label='Name'
            placeholder='Name*'
            type='text'
            registeredName={'name'}
          />
          <Spacer size={8} axis={'vertical'} />
          <InputControl
            label='Address'
            placeholder='0xfF0000000000000000000000000000000000*'
            type='text'
            registeredName={'address'}
          />

          <Spacer size={32} axis={'vertical'} />
          <div className='flex flex-row justify-around'>
            <Button
              btnVariant={'text'}
              btnSize={'lg'}
              btnType={'button'}
              handleClick={onClose}
            >
              <span className='text-lg'>Cancel</span>
            </Button>
            <Button btnVariant={'primary'} btnSize={'lg'} btnType={'submit'}>
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

const EditContactModal: React.FC<Props> = ({
  isOpen,
  onClose,
  name,
  address,
}) => {
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
                Edit contact
              </span>

                {/* Description */}
                <EditContactDetails
                  onClose={onClose}
                  name={name}
                  address={address}
                />
                {/* Description */}
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default EditContactModal;
