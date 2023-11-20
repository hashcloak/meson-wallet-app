import { getPriceFeed } from '~/service';

describe('Price feed', () => {
  it('is fetched for sepolia', async () => {
    const rawPriceFeed = await getPriceFeed('sepolia', 'ETH/USD');
    const priceFeed = rawPriceFeed.map((bigNum) => bigNum.toString());

    expect(Array.isArray(priceFeed)).toBe(true);
    expect(typeof priceFeed[0]).toBe('string');
  }, 180000);

  it('is fetched for goerli', async () => {
    const rawPriceFeed = await getPriceFeed('goerli', 'ETH/USD');
    const priceFeed = rawPriceFeed.map((bigNum) => bigNum.toString());

    expect(Array.isArray(priceFeed)).toBe(true);
    expect(typeof priceFeed[0]).toBe('string');
  }, 180000);

});
