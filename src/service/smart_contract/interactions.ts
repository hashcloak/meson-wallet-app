/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ethers } from 'ethers';

const updateDeposit = async (contract: ethers.Contract): Promise<void> => {
  const txResponse = await contract.addDeposit();
  await txResponse.wait(1);
  console.log(txResponse);
};

export { updateDeposit };
