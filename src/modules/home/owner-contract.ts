import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, CallOverrides } from 'ethers';

import { ContractWrapper } from '@blockchain/contract-wrapper';

type OwnerContractEstimateGas = {
  setOwner: (newOwner: string, overrides?: CallOverrides) => Promise<BigNumber>;
};

export class OwnerContractWrapper extends ContractWrapper<OwnerContractEstimateGas> {
  async getOwner(overrides?: CallOverrides): Promise<string> {
    return ContractWrapper.executeContractFunction(this.internalContract.getOwner, overrides);
  }

  async changeOwner(newOwner: string, overrides?: CallOverrides): Promise<TransactionResponse> {
    return ContractWrapper.executeContractFunction(this.internalContract.changeOwner, overrides, newOwner);
  }
}
