import { ethers } from 'ethers';
import TrezorConnect, { EthereumAddress } from 'trezor-connect';
import { NewTrezorAccountType } from '~/components/organisms/SelectSignerModal copy/SelectSignerDetail';
import { TrezorError } from '~/utils/Trezor';

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

export const getAccounts = async (): Promise<EthereumAddress[]> => {
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

export const getCustomAccount = async (
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

export const getBalance = async (
  trezorAccounts: EthereumAddress[]
): Promise<NewTrezorAccountType[]> => {
  const network = 'mainnet';
  const provider = ethers.getDefaultProvider(network, {
    etherscan: import.meta.env.VITE_ETHERSCAN_API as string,
  });

  const updateAccounts: NewTrezorAccountType[] = await Promise.all(
    trezorAccounts.map(async (account: EthereumAddress) => {
      const balance = await provider.getBalance(account.address);
      const balanceInEth = ethers.utils.formatEther(balance);
      const fullAccount = {
        serializedPath: account.serializedPath,
        address: account.address,
        balance: balanceInEth,
      };

      return fullAccount;
    })
  );

  return updateAccounts;
};
