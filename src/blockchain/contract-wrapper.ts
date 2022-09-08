import { Listener, Provider } from '@ethersproject/abstract-provider';
import { CallOverrides, ContractFunction } from '@ethersproject/contracts';
import { Contract, ContractInterface, EventFilter, Signer } from 'ethers';

import { Optional } from '@shared/types';

export class ContractWrapper<T extends Record<string, ContractFunction>> {
  protected internalContract: Contract;
  estimateGas: T;

  constructor(addressOrName: string, abi: ContractInterface, provider?: Provider | Signer) {
    this.internalContract = new Contract(addressOrName, abi, provider);
    this.estimateGas = this.internalContract.estimateGas as T;
  }

  get address() {
    return this.internalContract.address;
  }

  get interface() {
    return this.internalContract.interface;
  }

  on(event: EventFilter | string, listener: Listener) {
    this.internalContract.on(event, listener);
  }

  once(event: EventFilter | string, listener: Listener) {
    this.internalContract.once(event, listener);
  }

  off(event: EventFilter | string, listener: Listener) {
    this.internalContract.off(event, listener);
  }

  static async executeContractFunction(fn: ContractFunction, overrides: Optional<CallOverrides>, ...args: unknown[]) {
    if (overrides) {
      return fn(...args, overrides);
    }

    return fn(...args);
  }
}
