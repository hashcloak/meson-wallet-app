import { Transaction, ethers } from 'ethers';
import { EthereumTransaction } from 'trezor-connect';
import { getProvider } from './getProvider';
import { signTxLocally } from './smart_contract/signTx';
import { signTxTrezor } from './trezor';
import { SignerState } from '~/features/signerWallet';

// const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY as string;

export const sendTx = async (
  txParams: ethers.utils.Deferrable<ethers.providers.TransactionRequest>,
  signerWallet: SignerState,
  network = 'localhost',
  encryptedWallet?: string
): Promise<Transaction | undefined> => {
  const provider = getProvider(network);

  try {
    let signedTx;
    if (network === 'localhost') {
      signedTx = await signTxLocally(
        txParams as ethers.providers.TransactionRequest,
        signerWallet
      );
    } else if (signerWallet.wallet === 'Trezor') {
      signedTx = await signTxTrezor(
        txParams as EthereumTransaction,
        provider,
        signerWallet.signerWalletAddress,
        signerWallet.serializedPath ?? "m/44'/60'/0'/0/0"
      );
    }

    if (encryptedWallet !== undefined) {
      console.log('Decrypting meson wallet...');

      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
        encryptedWallet,
        'password'
      );
      const wallet = decryptedWallet.connect(provider);

      txParams.nonce = await provider.getTransactionCount(
        decryptedWallet.address
      );
      console.log('decrypted', wallet, txParams);

      const sent = await wallet.sendTransaction(txParams);

      const transactionReceipt = await sent.wait(1);
      console.log('transactionReceipt', transactionReceipt);
    }

    if (signedTx !== undefined && encryptedWallet === undefined) {
      console.log('Sending...');

      const sent = await provider.sendTransaction(signedTx);
      const transactionReceipt = await sent.wait(1);

      console.log('transactionReceipt: ', transactionReceipt);

      return sent;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};
