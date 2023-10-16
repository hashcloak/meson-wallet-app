import { BytesLike, ethers } from 'ethers';
import * as json from './AccountFactory.json';
import * as deployAFJson from './DeployAccountFactory.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { getProvider } from '../getProvider';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployAccountFactory(
  mesonWallet: ethers.Wallet,
  entryPoint: string
): Promise<void> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  console.log('AccountFactory Deploying...');

  const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
  const deployAFcontractFactory = new ethers.ContractFactory(
    deployAFJson.abi,
    deployAFJson.bytecode.object,
    mesonWallet
  );

  try {
    const contractInstance = await contractFactory.deploy(entryPoint);
    const deployAFInstance = await deployAFcontractFactory.deploy();

    const contractReceipt = await contractInstance.deployed();
    console.log('AccountFactory:', contractReceipt);
    const deployAFReceipt = await deployAFInstance.deployed();
    console.log('deployAFReceipt:', deployAFReceipt);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
