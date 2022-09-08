import { TransactionResponse } from '@ethersproject/abstract-provider';
import { CallOverrides } from 'ethers';

import { ContractWrapper } from '@blockchain/contract-wrapper';

type OwnerContractMethods = {
  getOwner: (overrides?: CallOverrides) => Promise<string>;
  changeOwner: (newOwner: string, overrides?: CallOverrides) => Promise<TransactionResponse>;
};

export class OwnerContractWrapper extends ContractWrapper<OwnerContractMethods> {
  async getOwner(overrides?: CallOverrides): Promise<string> {
    return ContractWrapper.executeContractFunction(this.internalContract.getOwner, overrides);
  }

  async changeOwner(newOwner: string, overrides?: CallOverrides): Promise<TransactionResponse> {
    return ContractWrapper.executeContractFunction(this.internalContract.changeOwner, overrides, newOwner);
  }
}
