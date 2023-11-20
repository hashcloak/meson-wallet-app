/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import TrezorConnect from '@trezor/connect-web';
import { UnsignedTransaction, ethers, utils } from 'ethers';
import {
  EthereumAddress,
  EthereumTransaction,
  HDNodeResponse,
} from 'trezor-connect';
import { TrezorError } from '~/utils/Trezor';
import { FullAccountType, getHardwareWalletBalance } from './etherscan';
import { NetworkState } from '~/features/network';

const baseEthereumPath = "m/44'/60'/0'/0/";
const baseTestnetPath = "m/44'/1'/0'/0/";

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
  void TrezorConnect.init({
    lazyLoad: true,
    manifest: {
      appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
      email: 'my_email@example.com',
    },
  });

  const bundle: Array<{ path: string; showOnTrezor: boolean; coin?: string }> =
    [];

  switch (network.network) {
    case 'sepolia':
      for (let i = 0; i < 25; i++) {
        bundle.push({
          path: `${baseTestnetPath}${i}`,
          showOnTrezor: false,
          coin: 'SepoliaETH',
        });
      }
      break;
    case 'goerli':
      for (let i = 0; i < 25; i++) {
        bundle.push({
          path: `${baseTestnetPath}${i}`,
          showOnTrezor: false,
          coin: 'tGOR',
        });
      }
      break;
    case 'localhost':
      for (let i = 0; i < 25; i++) {
        bundle.push({
          path: `${baseEthereumPath}${i}`,
          showOnTrezor: false,
        });
      }
      break;
    default:
      for (let i = 0; i < 25; i++) {
        bundle.push({
          path: `${baseEthereumPath}${i}`,
          showOnTrezor: false,
          coin: network.shortcut,
        });
      }
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
  void TrezorConnect.init({
    lazyLoad: true,
    manifest: {
      appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
      email: 'my_email@example.com',
    },
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
  console.log('getting trezor accounts');
  try {
    const trezorAccounts: HDNodeResponse[] = await getAccounts(network);

    const newTrezorAccounts: EthereumAddress[] = trezorAccounts.map(
      (account) => {
        const pk = '0x' + account.publicKey;
        const address = ethers.utils.computeAddress(pk);

        return { ...account, publicKey: pk, address };
      }
    );

    const trezorFullAccounts: FullAccountType[] =
      await getHardwareWalletBalance(newTrezorAccounts, network.network);

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

    const trezorCustomAccount: FullAccountType[] =
      await getHardwareWalletBalance([newTrezorAccount]);

    return trezorCustomAccount;
  } catch (e: unknown) {
    throw new Error('Something went wrong. Please retry.');
  }
};

// signMessage = async message => {
//   return await new Promise(async (resolve, reject) => {
//       const result = await TrezorConnect.ethereumSignMessage({
//           path: this.path + '/0',
//           message
//       });

//       if (result.success) {
//           resolve(result.payload.signature);
//       } else {
//           console.error('Error:', result.payload.error); // error message
//           reject(result.payload.error);
//       }
//   });
// };

export const signTxTrezor = async (
  txParams: EthereumTransaction,
  provider: ethers.providers.BaseProvider,
  address: string,
  path: string
): Promise<string | undefined> => {
  const unsignedTx = JSON.parse(
    JSON.stringify(txParams)
  ) as unknown as UnsignedTransaction;

  if (txParams.value) {
    txParams.value = utils.hexlify(txParams.value);
    unsignedTx.value = txParams.value;
  }
  if (txParams.gasPrice) {
    txParams.gasPrice = utils.hexlify(txParams.gasPrice);
    // unsignedTx.gasPrice = txParams.gasPrice;
  }
  // if (txParams.gasLimit) {
    // txParams.gasLimit = utils.hexlify(txParams.gasLimit);
    // unsignedTx.gasLimit = txParams.gasLimit;
  // }

  if (txParams.maxFeePerGas) {
    txParams.maxFeePerGas = undefined;
  }
  if (txParams.maxPriorityFeePerGas) {
    txParams.maxPriorityFeePerGas = undefined;
  }
  if (!txParams.maxFeePerGas && !txParams.maxPriorityFeePerGas) {
    Object.assign(
      txParams,
      { maxFeePerGas: undefined },
      { maxPriorityFeePerGas: undefined }
    );
  }

  txParams.nonce = utils.hexlify(await provider.getTransactionCount(address));

  try {
    TrezorConnect.manifest({
      appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
      email: 'my_email@example.com',
    });

    const result = await TrezorConnect.ethereumSignTransaction({
      path,
      transaction: txParams,
    });

    if (result.success) {
      delete unsignedTx.maxFeePerGas;
      delete unsignedTx.maxPriorityFeePerGas;
      unsignedTx.gasLimit?.toString();
      unsignedTx.gasPrice?.toString();

      console.log('Result success: ', unsignedTx);

      const sig = {
        v: parseInt(result.payload.v.substring(2), 16),
        r: result.payload.r,
        s: result.payload.s,
      };

      const serializedTransaction = utils.serializeTransaction(unsignedTx, sig);

      return serializedTransaction;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};
