import { ethers } from 'ethers';
import { TrezorSigner } from '~/utils/Trezor/TrezorSigner';
import { getProvider } from '~/service/';

describe('Trezor', () => {
  it('instanciates trezor signer', () => {
    const trezorAccount = {
      signerWalletAddress: '0xd3dDC85bDc627D979A18607e4323eEAF75cDeB5F',
      publicKey:
        '0x02f159991221e3c5cc4e8beb786409ceb69b794771c321d95e61bb17bf29cdcb97',
      serializedPath: "m/44'/60'/0'/0/0",
      balance: '0.029684104201055217',
      isConnected: true,
      wallet: 'Trezor',
    };

    const provider = getProvider('localhost');
    const signerWallet = new TrezorSigner(
      provider,
      trezorAccount.serializedPath,
      0,
      trezorAccount.signerWalletAddress,
      'trezor-signer'
    );

    console.log('TrezorSigner:::', TrezorSigner);
    expectTypeOf(signerWallet).toMatchTypeOf<ethers.Signer>();
  });
});
