import { ethers } from 'ethers';
import TrezorConnect, { EthereumAddress, HDNodeResponse } from 'trezor-connect';
import { TrezorError } from '~/utils/Trezor';
import { FullAccountType, getBalance } from './etherscan';
import { NetworkState } from '~/features/network';

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

const getAccounts = async (
  network: NetworkState
): Promise<HDNodeResponse[]> => {
  TrezorConnect.manifest({
    appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
    email: 'my_email@example.com',
  });

  const bundle: Array<{ path: string; showOnTrezor: boolean; coin: string }> =
    [];

  if (network.shortcut !== undefined) {
    for (let i = 0; i < 25; i++) {
      bundle.push({
        path: `${baseEthereumPath}${i}`,
        showOnTrezor: false,
        coin: network.shortcut,
      });
    }
  } else {
    // TODO: Display the error message on the screen
    throw new TrezorError({
      errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Trezor does not support ${network.shortcut}`,
    });
  }

  const response = await TrezorConnect.getPublicKey({ bundle });

  if (!response.success) {
    throw new TrezorError({
      errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
      message: 'Please connect trezor device',
      originError: response.payload.error,
    });
  }

  return response.payload;
};

const getCustomAccount = async (
  customPath: string
): Promise<HDNodeResponse> => {
  TrezorConnect.manifest({
    appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
    email: 'my_email@example.com',
  });

  // const response = await TrezorConnect.ethereumGetAddress({
  //   path: customPath,
  //   showOnTrezor: false,
  // });
  const response = await TrezorConnect.getPublicKey({
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

  return response.payload;
};

export const getFullTrezorAccounts = async (
  network: NetworkState
): Promise<FullAccountType[]> => {
  try {
    const trezorAccounts: HDNodeResponse[] = await getAccounts(network);

    const newTrezorAccounts: EthereumAddress[] = trezorAccounts.map(
      (account) => {
        const pk = '0x' + account.publicKey;
        const address = ethers.utils.computeAddress(pk);

        return { ...account, publicKey: pk, address };
      }
    );

    const trezorFullAccounts: FullAccountType[] = await getBalance(
      newTrezorAccounts
    );

    return trezorFullAccounts;
  } catch (error) {
    throw new Error('Connection failed. Please retry.');
  }
};

export const getCustomTrezorAccount = async (
  path: string
): Promise<FullAccountType[]> => {
  try {
    const trezorAccount: HDNodeResponse = await getCustomAccount(path);
    const pk = '0x' + trezorAccount.publicKey;
    const address = ethers.utils.computeAddress(pk);
    const newTrezorAccount = { ...trezorAccount, publicKey: pk, address };

    const trezorCustomAccount: FullAccountType[] = await getBalance([
      newTrezorAccount,
    ]);

    return trezorCustomAccount;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};
