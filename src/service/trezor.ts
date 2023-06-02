import TrezorConnect, { EthereumAddress } from 'trezor-connect';
import { TrezorError } from '~/utils/Trezor';
import { FullAccountType, getBalance } from './etherscan';

const baseEthereumPath = "m/44'/60'/0'/0/";

// export const get50Accounts = async (): Promise<EthereumAddress[]> => {
//   TrezorConnect.manifest({
//     appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
//     email: 'my_email@example.com',
//   });
//   const baseEthereumPath = "m/44'/60'/0'/0/";
//   const bundle = [];

//   for (let i = 0; i < 50; i++) {
//     bundle.push({
//       path: `${baseEthereumPath}${i}`,
//       showOnTrezor: false,
//     });
//   }

//   return await TrezorConnect.ethereumGetAddress({
//     bundle,
//   });
// };

const getAccounts = async (): Promise<EthereumAddress[]> => {
  TrezorConnect.manifest({
    appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
    email: 'my_email@example.com',
  });

  const bundle: Array<{ path: string; showOnTrezor: boolean }> = [];

  for (let i = 0; i < 25; i++) {
    bundle.push({
      path: `${baseEthereumPath}${i}`,
      showOnTrezor: false,
    });
  }

  const response = await TrezorConnect.ethereumGetAddress({ bundle });

  if (!response.success) {
    throw new TrezorError({
      errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
      message: 'Please connect trezor device',
      originError: response.payload.error,
    });
  }
  console.log(response.payload);

  return response.payload;
};

const getCustomAccount = async (
  customPath: string
): Promise<EthereumAddress> => {
  TrezorConnect.manifest({
    appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
    email: 'my_email@example.com',
  });

  const response = await TrezorConnect.ethereumGetAddress({
    path: customPath,
    showOnTrezor: false,
  });

  if (!response.success) {
    throw new TrezorError({
      errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
      message: 'Please connect trezor device',
      originError: response.payload.error,
    });
  }
  console.log(response);

  return response.payload;
};

export const getFullTrezorAccounts = async (): Promise<FullAccountType[]> => {
  try {
    const trezorAccounts: EthereumAddress[] = await getAccounts();
    const trezorFullAccounts: FullAccountType[] = await getBalance(
      trezorAccounts
    );

    return trezorFullAccounts;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};

export const getCustomTrezorAccount = async (
  path: string
): Promise<FullAccountType[]> => {
  try {
    const customAccount: EthereumAddress = await getCustomAccount(path);
    const trezorCustomAccount: FullAccountType[] = await getBalance([
      customAccount,
    ]);

    return trezorCustomAccount;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};
