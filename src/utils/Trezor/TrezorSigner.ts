/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/naming-convention */
import { Buffer } from 'buffer';
import {
  TypedDataSigner,
  Signer,
  TypedDataDomain,
  TypedDataField,
} from '@ethersproject/abstract-signer';
import { transformTypedData } from '@trezor/connect-plugin-ethereum';
import TrezorConnect, {
  Response,
  EthereumSignTransaction,
  Params,
  EthereumSignTypedDataTypes,
  EthereumSignTypedHash,
} from '@trezor/connect-web';
import { utils, providers, UnsignedTransaction, ethers } from 'ethers';
import HDkey from 'hdkey';

const manifest = {
  appUrl: (import.meta.env.VITE_PUBLIC_APP_URL as string) ?? '',
  email: 'my_email@example.com',
};

const config = {
  manifest,
  lazyLoad: true,
  // popup: false,
  // webusb: false,
  // debug: false,
  // lazyLoad: false,
  // env: "node"
};

const HD_WALLET_PATH_BASE = `m`;
const DEFAULT_HD_PATH_STRING = "m/44'/60'/0'/0"; // TODO: handle <chainId>
const DEFAULT_SESSION_NAME = 'trezor-signer';

const handleResponse = async <T>(p: Response<T>) => {
  console.log('handleResponse', await p);

  // browser code
  const response = await p;

  if (response.success) {
    return response.payload;
  }

  // throw new Error(response.payload.error);
  throw {
    message: response.payload.error,
    code: response.payload.code,
  };
};

export class TrezorSigner extends Signer implements TypedDataSigner {
  private _path: string | undefined;
  private readonly _derivePath: string;
  private _address?: string;

  private _isInitialized: boolean;
  private readonly _isLoggedIn: boolean;
  private _isPrepared: boolean;

  private readonly _sessionName: string;
  private readonly _hdk: HDkey;
  private readonly _pathTable: { [key: string]: any };

  readonly _reqIndex?: string | number;
  readonly _reqAddress: string;

  constructor(
    provider: providers.Provider,
    derivePath?: string,
    index?: number,
    address?: string,
    sessionName?: string
  ) {
    super();

    // if (index !== undefined && address !== undefined) {
    //   throw new Error(
    //     'Specify account by either wallet index or address. Default index is 0.'
    //   );
    // }

    if (!(index !== undefined) && !(address !== undefined)) {
      index = 0;
    }

    this._reqIndex = index;
    this._reqAddress = address ?? '';

    this._sessionName = sessionName ?? DEFAULT_SESSION_NAME;
    this._derivePath = derivePath ?? DEFAULT_HD_PATH_STRING;
    this._hdk = new HDkey();
    this._isInitialized = false;
    this._isLoggedIn = false;
    this._isPrepared = false;
    this._pathTable = {};

    utils.defineReadOnly(this, 'provider', provider);
  }

  public async prepare(): Promise<any> {
    if (this._isPrepared) {
      return;
    }

    console.log('_address: ', this._address);
    console.log('derivePath: ', this._derivePath);

    this._isPrepared = true;

    await this.init();
    // await this.login();
    // await this.getAccountsFromDevice();
    await this.setHdKey();

    if (this._reqAddress !== undefined) {
      this._address = this._reqAddress;
      this._path = this.pathFromAddress(this._reqAddress);
    }

    if (this._reqIndex !== undefined) {
      this._path = this.concatWalletPath(this._reqIndex);
      this._address = this.addressFromIndex(
        HD_WALLET_PATH_BASE,
        this._reqIndex
      );
    }
  }

  public async init(): Promise<any> {
    if (this._isInitialized) {
      return;
    }

    console.info('Init trezor...');
    this._isInitialized = true;

    return await TrezorConnect.init(config);
  }

  // public async login(): Promise<any> {
  //   if (this._isLoggedIn) {
  //     return;
  //   }

  //   console.info('Login to trezor...');
  //   this._isLoggedIn = true;

  //   // TODO: change to random handshake info
  //   const loginInfo = await TrezorConnect.requestLogin({
  //     challengeHidden: '0123456789abcdef',
  //     challengeVisual: `Login to ${this._sessionName}`,
  //   });

  //   return loginInfo;
  // }

  // private async getAccountsFromDevice(
  //   fromIndex = 0,
  //   toIndex = 100
  // ): Promise<any> {
  //   console.log('getAccountsFromDevice')

  //   if (toIndex < 0 || fromIndex < 0) {
  //     throw new Error('Invalid from and to');
  //   }
  //   await this.setHdKey();

  //   const result = [];
  //   for (let i = fromIndex; i < toIndex; i++) {
  //     const address = this.addressFromIndex(HD_WALLET_PATH_BASE, i);
  //     result.push(address.toLowerCase());
  //     this._pathTable[utils.getAddress(address)] = i;
  //   }
  //   console.log('this._pathTable',this._pathTable)

  //   return result;
  // }

  private async setHdKey(): Promise<any> {
    if (this._hdk.publicKey.length > 0 && this._hdk.chainCode.length > 0) {
      return;
    }

    const result = (await this.getDerivePublicKey()) as HDkey;
    console.log('setHdKey', result);

    this._hdk.publicKey = Buffer.from(
      result.publicKey as unknown as string,
      'hex'
    );
    this._hdk.chainCode = Buffer.from(
      result.chainCode as unknown as string,
      'hex'
    );

    console.log('this._hdk.publicKey', this._hdk.publicKey);
    console.log('this._hdk.chainCode', this._hdk.chainCode);

    return this._hdk;
  }

  private async getDerivePublicKey(): Promise<any> {
    console.log('getDerivePublicKey');

    const result = await this.makeRequest(
      async () => await TrezorConnect.getPublicKey({ path: this._derivePath })
    );

    return result;
  }

  public async getAddress(): Promise<string> {
    console.log('getAddress');

    this._address = this._reqAddress?.toLowerCase();

    if (this._address == null) {
      const result = await this.makeRequest(
        async () =>
          await TrezorConnect.ethereumGetAddress({
            path: this._path ?? this._derivePath,
          })
      );
      this._address = result.address ? utils.getAddress(result.address) : '';
    }

    return this._address;
  }

  public async signMessage(message: string | utils.Bytes): Promise<string> {
    console.log('signMessage');
    const result = await this.makeRequest(
      async () =>
        await TrezorConnect.ethereumSignMessage({
          path: this._path ?? this._derivePath,
          message: message as string,
        })
    );

    return result.signature;
  }

  public async signTransaction(
    transaction: utils.Deferrable<providers.TransactionRequest>
  ): Promise<string> {
    console.log('signTransaction', transaction);

    const tx = await utils.resolveProperties(transaction);
    const nonce =
      tx.nonce !== undefined
        ? parseInt(JSON.stringify(tx.nonce).toString())
        : await this.provider?.getTransactionCount(this._reqAddress);
    const gasPrice = await this.provider?.getGasPrice();

    const unsignedTx: UnsignedTransaction = {
      to: tx.to,
      nonce,
      gasLimit: tx.gasLimit,
      gasPrice: Number(ethers.utils.formatUnits(gasPrice ?? '0x', 'wei')),
      data: tx.data,
      value: tx.value,
      chainId: tx.chainId,
    };

    // TODO: handle tx.type
    // EIP-1559; Type 2
    if (tx.maxPriorityFeePerGas !== undefined)
      unsignedTx.maxPriorityFeePerGas = tx.maxPriorityFeePerGas;
    if (tx.maxFeePerGas !== undefined)
      unsignedTx.maxFeePerGas = tx.maxFeePerGas;

    const trezorTx: EthereumSignTransaction = {
      path: this._path ?? this._derivePath,
      transaction: {
        to: (tx.to !== undefined || '').toString(),
        value: utils.hexlify(tx.value ?? 0),
        gasPrice: utils.hexlify(tx.gasPrice ?? 0),
        gasLimit: utils.hexlify(tx.gasLimit ?? 0),
        nonce: utils.hexlify(tx.nonce as number),
        data: utils.hexlify(tx.data ?? '0x'),
        chainId: tx.chainId as number,
      },
    };

    // const { v, r, s } = await this.makeRequest(
    //   async () => await TrezorConnect.ethereumSignTransaction(trezorTx),
    //   1
    // );
    // console.log('v, r, s ;',v, r, s );

    // const signature = utils.joinSignature({
    //   r,
    //   s,
    //   v: parseInt(v),
    // });

    // const signedTx = utils.serializeTransaction(unsignedTx, signature);

    const result = await TrezorConnect.ethereumSignTransaction(trezorTx);

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
    } else {
      throw { message: 'Seriaize error' };
    }
  }

  public connect(provider: providers.Provider): TrezorSigner {
    return new TrezorSigner(provider, this._path);
  }

  public async _signTypedData(
    domain: TypedDataDomain,
    types: Record<string, TypedDataField[]>,
    value: Record<string, any>
  ): Promise<string> {
    const EIP712Domain: Array<{
      name: string;
      type: string;
    }> = [];
    const domainPropertyTypes = [
      'string',
      'uint256',
      'bytes32',
      'address',
      'string',
    ];
    const domainProperties: Array<keyof TypedDataDomain> = [
      'name',
      'chainId',
      'salt',
      'verifyingContract',
      'version',
    ];
    domainProperties.forEach((property, index) => {
      if (domain[property] !== undefined) {
        EIP712Domain.push({
          type: domainPropertyTypes[index],
          name: property,
        });
      }
    });
    const eip712Data = {
      domain,
      types: {
        EIP712Domain,
        ...types,
      },
      message: value,
      primaryType: Object.keys(types)[0],
    };
    console.log('EIP712 Data: ', JSON.stringify(eip712Data, null, 4));
    const { domain_separator_hash, message_hash } = transformTypedData(
      eip712Data as Parameters<typeof transformTypedData>[0],
      true
    );
    console.log('Domain separator hash: ', domain_separator_hash);
    console.log('Message hash: ', message_hash);
    console.log('_signTypedData');

    const txParams = {
      path: this._path ?? this._derivePath,
      metamask_v4_compat: true,
      data: eip712Data,
      domain_separator_hash,
      message_hash,
    };

    const result = await this.makeRequest(
      async () =>
        await TrezorConnect.ethereumSignTypedData(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          txParams as unknown as Params<
            EthereumSignTypedHash<EthereumSignTypedDataTypes>
          >
        )
    );

    return result.signature;
  }

  private addressFromIndex(pathBase: string, index: number | string): string {
    const derivedKey = this._hdk.derive(`${pathBase}/${index}`);
    const address = utils.computeAddress(derivedKey.publicKey);

    return utils.getAddress(address);
  }

  private pathFromAddress(address: string): string {
    const checksummedAddress = utils.getAddress(address);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let index = this._pathTable[checksummedAddress];
    console.log('this._pathTable', this._pathTable);
    console.log('index', index);

    if (typeof index === 'undefined') {
      for (let i = 0; i < 1000; i++) {
        if (
          checksummedAddress === this.addressFromIndex(HD_WALLET_PATH_BASE, i)
        ) {
          index = i;
          break;
        }
      }
    }

    if (typeof index === 'undefined') {
      throw new Error('Unknown address in trezor');
    }

    return this.concatWalletPath(index as string);
  }

  private concatWalletPath(index: string | number) {
    return `${this._derivePath}/${index.toString(10)}`;
  }

  private async makeRequest<T>(fn: () => Response<T>, retries = 20) {
    try {
      await this.prepare();

      const result = await handleResponse(fn());
      console.log('result', result);

      return result;
    } catch (e: unknown) {
      if (retries === 0) {
        throw new Error('Trezor unreachable, please try again');
      }

      const err = e as ConnectError;

      if (err.code === 'Device_CallInProgress') {
        return await new Promise<T>((resolve) => {
          setTimeout(() => {
            console.warn('request conflict, trying again in 400ms', err);
            resolve(this.makeRequest(fn, retries - 1));
          }, 400);
        });
      } else {
        throw err;
      }
    }
  }
}

export class ConnectError extends Error {
  readonly code;

  constructor(msg: string, code?: string) {
    super(msg);

    this.code = code;
  }
}
