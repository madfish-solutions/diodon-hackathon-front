import { Listener, Provider } from '@ethersproject/abstract-provider';
import { ContractFunction } from '@ethersproject/contracts';
import { BigNumber, Contract, ContractInterface, EventFilter, Signer } from 'ethers';

import { Nullable } from '@shared/types';

type EstimateGasMethods<T extends Record<string, ContractFunction>> = {
  [K in keyof T]: T[K] extends (...args: infer A) => unknown ? (...args: A) => Promise<BigNumber> : never;
};

type TopicSet<T extends unknown[]> = T extends [...infer Rest, infer E] ? [...TopicSet<Rest>, Nullable<E> | E[]] : [];

export abstract class ContractWrapper<T extends Record<string, ContractFunction>, E extends Record<string, unknown[]>> {
  protected internalContract: Contract;
  estimateGas: EstimateGasMethods<T>;
  methods: T;
  filters: {
    [K in keyof E]: (...args: TopicSet<E[K]>) => EventFilter;
  };

  constructor(addressOrName: string, abi: ContractInterface, provider?: Provider | Signer) {
    this.internalContract = new Contract(addressOrName, abi, provider);
    this.estimateGas = this.internalContract.estimateGas as EstimateGasMethods<T>;
    this.methods = {} as T;
    this.filters = {} as typeof this.filters;
    for (const fnName in this.internalContract.functions) {
      this.methods[fnName as keyof T] = this.internalContract[fnName];
    }
    for (const eventName in this.internalContract.filters) {
      this.filters[eventName as keyof E] = this.internalContract.filters[eventName];
    }
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
}
