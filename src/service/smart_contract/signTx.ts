import { BytesLike, ethers } from 'ethers';
import { getProvider } from '../getProvider';
import { SignerState } from '~/features/signerWallet';

const signTxLocally = async (
  txParams: ethers.providers.TransactionRequest,
  signerWallet: SignerState
) => {
  const provider = getProvider('localhost');
  const senderWallet = new ethers.Wallet(signerWallet.publicKey, provider);

  try {
    const balance = await provider.getBalance(await senderWallet.getAddress());

    txParams.nonce = await senderWallet.getTransactionCount();

    const signedTx = await senderWallet.signTransaction(txParams);

    console.log('Sender balance: ', ethers.utils.formatUnits(balance));
    console.log('Transaction signed: ', signedTx);

    return signedTx;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};

export { signTxLocally };
