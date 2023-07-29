/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BytesLike, Signer, ethers } from 'ethers';
import * as json from './SmartWalletLogic.json';
import { NetworkState } from '~/features/network';
import { SignerState } from '~/features/signerWallet';
import { sendTx } from '../sendTx';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY;
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;
const METAMASK_PRIVATE_KEY = import.meta.env.VITE_METAMASK_PRIVATE_KEY;

export async function deploy(
  signerWallet: SignerState,
  selectedNetwork: NetworkState
): Promise<ethers.Contract | undefined> {
  const abi = json.abi;
  const binary: BytesLike = json.bytecode.object;

  let provider;
  if (selectedNetwork.network !== 'localhost') {
    provider = ethers.getDefaultProvider(selectedNetwork.network, {
      infura: INFURA_API_KEY,
      alchemy: ALCHEMY_API_KEY,
      etherscan: ETHERSCAN_API_KEY,
    });
    // privateKey = METAMASK_PRIVATE_KEY;
  } else {
    provider = ethers.getDefaultProvider(selectedNetwork.url);
  }

  const mesonWallet: Signer = ethers.Wallet.createRandom().connect(provider);
  const contractFactory = new ethers.ContractFactory(abi, binary, mesonWallet);
  const mesonWalletAddress = await mesonWallet.getAddress();
  const gasPrice = await provider.getGasPrice();
  const gasLimit = 21000;

  console.log('contract factory: ', contractFactory);
  console.log('meson wallet Address: ', mesonWalletAddress);

  const txParams = {
    to: mesonWalletAddress,
    value: ethers.utils.parseEther('1'),
    data: '0x',
    nonce: '0x0',
    chainId: selectedNetwork.chainId,
    gasPrice: Number(ethers.utils.formatUnits(gasPrice, 'wei')),
    gasLimit: gasLimit,
    // gasLimit: 8000000,
    // gasPrice: 20000000000,
  };

  const gas =
    Number(ethers.utils.formatEther(txParams.gasPrice)) *
    Number(ethers.utils.formatEther(txParams.gasLimit));
  console.log('expected gas: ', gas);

  try {
    // Transfer funds to the created wallet
    await sendTx(
      txParams,
      contractFactory,
      signerWallet!,
      selectedNetwork.network
    );

    console.log('Tx was sent');
    console.log('Deploying...');

    const overrides = {
      gasPrice: gasPrice,
      // gasLimit: 300000,
    };
    const contract = await contractFactory.deploy(
      mesonWalletAddress,
      overrides
    );

    await contract.deployed();
    console.log('Deployed');

    const contractAddress = contract.address;
    await contract.initialize(contractAddress);

    console.log('End');

    return contract;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`error: ${error}`);

      throw new Error(error.message ?? error);
    }
  }
}
