import { Provider, TransactionResponse } from '@ethersproject/abstract-provider';
import { CallOverrides, Signer } from 'ethers';

import ownerContractAbi from '@abis/owner-contract.json';
import { ContractWrapper } from '@blockchain/contract-wrapper';

type OwnerContractMethods = {
  getOwner: (overrides?: CallOverrides) => Promise<string>;
  changeOwner: (newOwner: string, overrides?: CallOverrides) => Promise<TransactionResponse>;
};

type OwnerContractEvents = {
  OwnerSet: [string, string];
};

export class OwnerContractWrapper extends ContractWrapper<OwnerContractMethods, OwnerContractEvents> {
  constructor(address: string, provider?: Provider | Signer) {
    super(address, ownerContractAbi, provider);
  }
}
