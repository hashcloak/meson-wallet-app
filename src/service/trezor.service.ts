import TrezorConnect, { EthereumAddress } from 'trezor-connect'
import { TrezorError } from '@/utils/Trezor'

const baseEthereumPath = "m/44'/60'/0'/0/"

export const get50Accounts = async () => {
  TrezorConnect.manifest({
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
    email: 'my_email@example.com',
  })
  const baseEthereumPath = "m/44'/60'/0'/0/"
  const bundle = []

  for (let i = 0; i < 50; i++) {
    bundle.push({
      path: `${baseEthereumPath}${i}`,
      showOnTrezor: false,
    })
  }

  return TrezorConnect.ethereumGetAddress({
    bundle,
  })
}

export const getAccounts = async (): Promise<EthereumAddress[]> => {
  TrezorConnect.manifest({
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? '',
    email: 'my_email@example.com',
  })

  const bundle: any = []

  for (let i = 0; i < 5; i++) {
    bundle.push({
      path: `${baseEthereumPath}${i}`,
      showOnTrezor: false,
    })
  }

  const response = await TrezorConnect.ethereumGetAddress({ bundle })

  if (!response.success) {
    throw new TrezorError({
      errorKey: TrezorError.ErrorKeys.CONNECT_TREZOR_DEVICE,
      message: 'Please connect trezor device',
      originError: response.payload.error,
    })
  }

  return response.payload
}
