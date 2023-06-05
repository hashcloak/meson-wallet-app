import { ethers } from 'ethers';
import TrezorConnect, { EthereumAddress, HDNodeResponse } from 'trezor-connect';
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

const getAccounts = async (): Promise<HDNodeResponse[]> => {
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

  // const response = await TrezorConnect.ethereumGetAddress({ bundle });
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

export const getFullTrezorAccounts = async (): Promise<FullAccountType[]> => {
  try {
    const trezorAccounts: HDNodeResponse[] = await getAccounts();

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
  } catch {
    throw new Error('Something went wrong. Please retry.');
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

// 02f159991221e3c5cc4e8beb786409ceb69b794771c321d95e61bb17bf29cdcb97
// 024f5559240ad292a5a7b014c4e1301c069382abe0bfd980bb771ab0a869123c9d
// 03825ba5b9f5e83291b982c0e14f516deba34f42d3740566662fea978e6ddf665e
// 02ed5d55189d39d5399fb4be1eec758841f2ee3b7179e93234878a9cba8d9a40a4
// 03d60c2e89e060f0e6259bd7d461a1e6095381120937c2cde42c37bcbd3001ca61
// 02538d4ca550f9738b19df6227d4ab3c81b7565c620174d99fd598d93c962bd211
// 03fc70a78eb5cead91a234ec7df814580fd8615ac4c63e901f723aa6311ac6fe00
// 024145701570c24a5a0a7cc6b7316c3179b090c40d25970dfc1924d05b585583d6
// 03c5a779016edc92a06f41836f884f9dbe84a2b293ef6cd6f73ed97b88f82183a7
// 02812271c4777065637b8ef04e9ed316e9c2af09de90559b81050c60d19cb1928c
// 03fd5cdd0cbcc32a777c0d32b0b3646e00a1106c705cab69dafafacad703e8464d
// 02dd8ceec89e6e6886b08480ad332c28cf5007d95d1954b92a625a02e248dce9ea
// 028970cd5bc1eb21117a8a818300a91660601f0022ccc6f575f035f8ef5b10e474
// 0246103e35f1ab0723204d7883a052e0ba310a01b24f2159da2f8a86e07281b3f5
// 03a2b99dc496e1c2e488c78eb8b934c8230662f2e4216a6d7040956e794ba1eabd
// 02084d8450641c3873a05c28076958f348043e100a9bdd1ea563e95f2005cd4780
// 0340a3deed44ce9672364d501884d0e4443cf31ee3ca8ed8186f893bdf57732336
// 02f208acdda4e9d947210cb3cc631aced1748f5de7f77032e4b2bb250d84823f3d
// 032996fc52dddb294acffaa291c03a6bf6e460a894bc54204497224154561e3dc0
// 0332d59369aabbb7d6712dce0276b1c2838458e512d76b8d7aa1086d43180b6065
// 02d8b559e9675422e8e26cfa66a6a2830448aad59a1e7ff3392dc01472b4dac89d
// 0211ccee199c10a16849d533616606befe59d99b8d9751be9a9444c45b04c250a6
// 03c551e5f30bba497ab480a076a02da0399bf49bbf5c1dd9e4db7d046ee506cb76
// 0228dc223897b2352b04db68e3d0da8e2a167015b5ef6f1a8859e2c04c8189b109
// 0390719503448faaa8ce828071b45bc08e55c9d4c8b2cad75e1ef27404c9a3400e
