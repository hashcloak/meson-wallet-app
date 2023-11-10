import { BytesLike, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import * as entryPointJson from './EntryPoint.json';
import * as deployAFJson from './DeployAccountFactory.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { getProvider } from '../getProvider';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployContract(
  mesonWallet: ethers.Wallet,
  entryPoint: string
): Promise<string | undefined> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);

  try {
    console.log('Deploying smart contract...');

    const contractInstance = await contractFactory.deploy(entryPoint);
    const contractReceipt = await contractInstance.deployed();

    console.log('smart contract was deployed:', contractReceipt);

    return contractReceipt.transactionAddress;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
