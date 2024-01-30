export const trimAddress = (address: string): string =>
  `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
