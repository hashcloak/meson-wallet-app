import { ethers } from 'ethers';
import { getProvider } from '~/service';
import { deployEntryPoint } from '~/service/smart_contract/deploy-entryPoint';

const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY as string;

describe('Entry Point', () => {
  const provider = getProvider('localhost');

  it('is deployed in localhost', async () => {
    const signerWallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const result = await deployEntryPoint(signerWallet);
    const ethAddressValidator =
      result !== undefined ? ethers.utils.isAddress(result) : false;

    console.log('entry point:', result);

    expect(ethAddressValidator).toBe(true);
  });

  it('is deployed in localhost', async () => {
    const provider = getProvider('localhost');
    const signerWallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const result = await deployEntryPoint(signerWallet);
    const ethAddressValidator =
      result !== undefined ? ethers.utils.isAddress(result) : false;

    console.log('entry point:', result);

    expect(ethAddressValidator).toBe(true);
  });
});
