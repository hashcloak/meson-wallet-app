import { ethers } from 'ethers';
// import { TrezorSigner } from '~/utils/Trezor';
import { getProvider } from '~/service';
import { deployEntryPoint } from '~/service/smart_contract/deploy-entryPoint';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY as string;

describe('Entry Point', () => {
  const provider = getProvider('localhost');

  it('is deployed with hardhat in localhost', async () => {
    const signerWallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const result = await deployEntryPoint(signerWallet);
    const ethAddressValidator =
      result !== undefined ? ethers.utils.isAddress(result) : false;

    console.log('entry point:', result);

    expect(ethAddressValidator).toBe(true);
  });

  // it('is deployed with trezor account in localhost', async () => {
  //   const trezorAccount = {
  //     signerWalletAddress: '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F',
  //     publicKey:
  //       '0x02f159991221e3c5cc4e8beb786409ceb69b794771c321d95e61bb17bf29cdcb97',
  //     serializedPath: "m/44'/1'/0'/0/",
  //     balance: '0.029684104201055217',
  //     isConnected: true,
  //     wallet: 'Trezor',
  //   };

  //   const provider = getProvider('sepolia');
  //   const signerWallet: ethers.Signer = new TrezorSigner(
  //     provider,
  //     trezorAccount.serializedPath,
  //     0,
  //     trezorAccount.signerWalletAddress,
  //     'trezor-signer'
  //   );

  //   const result = await deployEntryPoint(signerWallet);
  //   console.log('entry point:', result);
  //   const ethAddressValidator =
  //     result !== undefined ? ethers.utils.isAddress(result) : false;

  //   expect(ethAddressValidator).toBe(true);
  // }, 180000);
});
