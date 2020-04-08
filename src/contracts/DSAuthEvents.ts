import { ethers } from 'ethers';
// @ts-ignore
import { Contract, TransactionWrapper } from '../Contract';

export class DSAuthEvents extends Contract {
  public readonly ethers: DSAuthEventsEthersContract;

  constructor(addressOrName: string, providerOrSigner: ethers.Signer | ethers.providers.Provider) {
    super(new.target.abi, addressOrName, providerOrSigner);
  }

  static abi: string[] = [
    'event LogSetAuthority(address indexed authority)',
    'event LogSetOwner(address indexed owner)',
  ];
}

export interface DSAuthEventsEthersContract extends ethers.Contract {
  functions: {};

  callStatic: {};

  estimateGas: {};

  populateTransaction: {};
}