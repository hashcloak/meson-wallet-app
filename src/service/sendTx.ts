import { ContractFactory, Transaction, ethers } from 'ethers';
import { EthereumTransaction } from 'trezor-connect';
import { signTxLocally } from './smart_contract/signTx';
import { signTxTrezor } from './trezor';
import { SignerState } from '~/features/signerWallet';

// const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY as string;

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

    if (signedTx !== undefined) {
      console.log('Sending...');

      // return await provider.sendTransaction(signedTx);
      const sent = await provider.sendTransaction(signedTx);
      const transactionReceipt = await sent.wait(1);
      const add = await contractFactory.signer.getAddress();
      const balance = await provider.getBalance(add);

      console.log('transactionReceipt: ', transactionReceipt);
      console.log('deposited balance: ', ethers.utils.formatUnits(balance));

      return sent;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message ?? error);
    }
  }
};
