import { BytesLike, ethers } from 'ethers';
import * as json from './EntryPoint.json';
import { NetworkState } from '~/features/network';
import { getProvider } from '../getProvider';
import { SignerState } from '~/features/signerWallet';
import { signTxLocally } from './signTx';
import { hexlify, concat } from 'ethers/lib/utils.js';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployEntryPoint(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  mesonWallet: ethers.Wallet
): Promise<string | undefined> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const provider = getProvider(selectedNetwork.network);

  const mesonWalletAddress = await mesonWallet.getAddress();
  const iFace = new ethers.utils.Interface(abi);
  const constructorEncodedData = iFace.encodeDeploy([]);
  const txData = hexlify(concat([binary, constructorEncodedData]));

  const gasPrice = await provider.getGasPrice();
  // const deploymentData = iFace.encodeDeploy();
  // console.log('deploymentData', deploymentData);

  // Deployment params
  const deploymentParams = {
    to: '',
    value: ethers.utils.parseEther('0'),
    data: txData,
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: gasPrice,
    gasLimit: 1000000,
  };

  try {
    console.log('Deploying entry point...');
    // const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
    // const entryPointInstance = await contractFactory.deploy();
    // const entryPointReceipt = await entryPointInstance.deployed();
    // console.log('entry point was deployed', entryPointInstance);

    const signedDeploymentTx = await signTxLocally(
      deploymentParams,
      signerWallet
    );

    const contract = await provider.sendTransaction(signedDeploymentTx!);
    const transactionReceipt = await contract.wait(1);
    console.log('contract is sending...:', contract);
    console.log('transactionReceipt:', transactionReceipt);

    const contractAddress = '0x663F3ad617193148711d28f5334eE4Ed07016602';
    // const entryPoint = new ethers.Contract( contractAddress , abi , mesonWallet )
    // await entryPoint.deployed()

    return contractAddress;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
