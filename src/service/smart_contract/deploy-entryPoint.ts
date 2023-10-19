import { BytesLike, ethers } from 'ethers';
import * as json from './EntryPoint.json';
import { NetworkState } from '~/features/network';
import { getProvider } from '../getProvider';
import { SignerState } from '~/features/signerWallet';
import { signTxLocally } from './signTx';
import { hexlify, concat } from 'ethers/lib/utils.js';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployEntryPoint(
  signerWallet: ethers.Wallet
): Promise<string | undefined> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;

  try {
    console.log('Deploying entry point...');
    const contractFactory = new ethers.ContractFactory(
      abi,
      binary,
      signerWallet
    );
    const entryPointInstance = await contractFactory.deploy();
    const entryPointReceipt = await entryPointInstance.deployed();
    console.log('entry point was deployed', entryPointReceipt);

    return entryPointReceipt.address;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
