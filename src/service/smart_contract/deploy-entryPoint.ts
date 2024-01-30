import { BytesLike, ethers } from 'ethers';
import * as json from './EntryPoint.json';
// import { signLedgerTx } from '../ledger';
import { hexlify } from 'ethers/lib/utils.js';
import { concat } from 'ethers/lib/utils.js';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deployEntryPoint(
  signerWallet: ethers.Wallet | ethers.Signer
): Promise<string | undefined> {
  console.log('deployEntryPoint');

  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  // const iFace = new ethers.utils.Interface(abi);
  // const deploymentData = iFace.encodeDeploy([]) as BytesLike;

  // const txData = hexlify(concat([binary, deploymentData]));
  // const nonce = await signerWallet.provider?.getTransactionCount(
  //   '0x3973779d29b608c7860F1c368903aD6EC4CD8f21'
  // );

  // const deploymentParams = {
  //   to: '',
  //   // value: ethers.utils.parseEther('0'),
  //   value: 0.0,
  //   data: txData,
  //   nonce,
  //   chainId: 5,
  //   gasPrice: 500000000,
  // };

  try {
    console.log('Deploying entry point...');

    // const signTx = await signLedgerTx(
    //   deploymentParams,
    //   "0",
    //   500000000,
    //   500000000
    // );
    // const override = { gasPrice: 500000000 };

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
