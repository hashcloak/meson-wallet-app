import { ContractFactory, Transaction, ethers } from 'ethers';
import { EthereumTransaction } from 'trezor-connect';
import { signTxTrezor } from './trezor';
import { SignerState } from '~/features/signerWallet';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY as string;
const LOCALHOST = import.meta.env.VITE_LOCALHOST as string;

const signTxLocally = async (txParams: ethers.providers.TransactionRequest) => {
  const senderProvider = ethers.getDefaultProvider(LOCALHOST);
  const senderWallet = new ethers.Wallet(PRIVATE_KEY, senderProvider);

  try {
    const balance = await senderProvider.getBalance(
      await senderWallet.getAddress()
    );
    console.log('Sender balance: ', ethers.utils.formatUnits(balance));

    txParams.nonce = await senderWallet.getTransactionCount();

    const signedTx = await senderWallet.signTransaction(txParams);
    console.log('Transaction signed: ', signedTx);

    return signedTx;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};

export const sendTx = async (
  txParams: ethers.utils.Deferrable<ethers.providers.TransactionRequest>,
  contractFactory: ContractFactory,
  signerWallet: SignerState,
  network = 'localhost'
): Promise<Transaction | undefined> => {
  const provider = contractFactory.signer
    .provider as ethers.providers.BaseProvider;

  try {
    let signedTx;
    if (network === 'localhost') {
      signedTx = await signTxLocally(
        txParams as ethers.providers.TransactionRequest
      );
    } else if (signerWallet.wallet === 'Trezor') {
      signedTx = await signTxTrezor(
        txParams as EthereumTransaction,
        provider,
        signerWallet.signerWalletAddress,
        signerWallet.serializedPath ?? "m/44'/60'/0'/0/0"
      );
    }

    if (signedTx !== undefined) {
      console.log('Sending...');

      return await provider.sendTransaction(signedTx);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};
