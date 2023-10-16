/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, ContractFactory, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { sendTx } from '../sendTx';
import { getProvider } from '../getProvider';
import { signTxLocally } from './signTx';
import { deployEntryPoint } from './deploy-entryPoint';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState,
  deposit: number
): Promise<
  | { address: string; smartContract: string; encryptedWallet: string }
  | undefined
> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;
  const provider = getProvider(selectedNetwork.network);

  const mesonWallet = ethers.Wallet.createRandom().connect(provider);
  const encryptedWallet = await mesonWallet.encrypt('password');

  // const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
  const mesonWalletAddress = await mesonWallet.getAddress();
  const gasPrice = await provider.getGasPrice();
  const value =
    deposit > 0
      ? ethers.utils.parseEther(deposit.toString())
      : ethers.utils.parseEther('0');

  const iFace = new ethers.utils.Interface(abi);
  const deploymentData = iFace.encodeDeploy([mesonWalletAddress]) as BytesLike;

  // Deployment params
  const deploymentParams = {
    to: '',
    value: ethers.utils.parseEther('0'),
    data: deploymentData,
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: gasPrice,
    gasLimit: 80000,
  };

  // tx params
  const txParams = {
    to: mesonWalletAddress,
    value: value,
    data: '0x',
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: Number(ethers.utils.formatUnits(gasPrice, 'wei')),
    gasLimit: 21000,
    // gasLimit: 8000000,
    // gasPrice: 20000000000,
  };

  try {
    console.log('Deploying...');
    const signedDeploymentTx = await signTxLocally(
      deploymentParams,
      signerWallet
    );

    const contract = await provider.sendTransaction(signedDeploymentTx!);
    const transactionReceipt = await contract.wait(1);
    console.log('contract was deployed:', contract);
    console.log('transactionReceipt:', transactionReceipt);

    // Transfer funds to the created wallet
    if (Number(txParams.value) > 0) {
      await sendTx(txParams, signerWallet!, selectedNetwork.network);
    }

    // Entry Point
    console.log('Entry point...');
    const entryPoint = await deployEntryPoint(
      signerWallet,
      selectedNetwork,
      mesonWallet
    );

    const from = transactionReceipt.from;
    const block = await provider.getBlock(transactionReceipt.blockNumber);
    const contractAddress = ethers.utils.getContractAddress({
      from,
      nonce: block.nonce,
    });
    console.log(contractAddress);
    const smartContract = new ethers.Contract(
      contractAddress,
      abi,
      mesonWallet
    );
    await smartContract.deployed();
    const initSmartContract = smartContract.functions.initialize(entryPoint);
    console.log('initSmartContract:', initSmartContract);

    return {
      address: mesonWalletAddress,
      smartContract: transactionReceipt.contractAddress,
      encryptedWallet,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}

// 1 - Create a transaction payload for the contract deployment but don't send it.
// 2 - Forward this payload to the hardware wallet to be signed.
// 3- Once signed, broadcast the signed transaction to the network

// initialize(address)
// entryPoint()
// addDeposit()
// execute(address,uint256,bytes)
// executeBatch(address[],bytes[])
// getDeposit()
// getNonce()
// owner()
// proxiableUUID()
// upgradeTo(address)
// upgradeToAndCall(address,bytes)
// validateUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256)
// withdrawDepositTo(address,uint256)

// Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
// Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
// Contract call:       <UnrecognizedContract>
// Transaction:         0x8288c9cdc61b273214dfeea835afd3d4b85b9398aafb45596d5b6ddc4fbec435
// From:                0xa223795c975fafdfaffe50e3c182af76d39e10f9
// To:                  0x3259c6315b8b11a2439cc77615356b1f382c9ede
// Value:               0 ETH
// Gas used:            69488 of 70844
// Block #21:           0xe359d1e82cef024b5447cbf72d51201de1fc494cbbac88b6df20adc42f7745ae

// ##### anvil-hardhat
// ✅  [Success]Hash: 0x012f742f513f7c6286febfc0ca6febcdc170fa47580a6cbcb9b9025f89ef77f4
// Contract Address: 0x663F3ad617193148711d28f5334eE4Ed07016602
// Block: 1
// Paid: 0.014462418375 ETH (3732237 gas * 3.875 gwei)

// ##### anvil-hardhat
// ✅  [Success]Hash: 0xda6c47263cc11a5d42edf0a3530e88592900c6699032460b7ed7b66906a81de1
// Contract Address: 0x2E983A1Ba5e8b38AAAeC4B440B9dDcFBf72E15d1
// Block: 2
// Paid: 0.00723207205668033 ETH (1906770 gas * 3.792839229 gwei)
