import { BytesLike, ethers } from 'ethers';
import * as json from './EntryPoint.json';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployEntryPoint(
  signerWallet: ethers.Wallet | ethers.Signer
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

    return entryPointReceipt.address;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
