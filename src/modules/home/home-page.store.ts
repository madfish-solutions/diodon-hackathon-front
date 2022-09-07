import { action, computed, makeObservable, observable } from 'mobx';

import ownerContractAbi from '@abis/owner-contract.json';
import { FALLBACK_PROVIDER } from '@config/constants';
import { Led, ModelBuilder } from '@shared/model-builder';
import { LoadingErrorData, RootStore } from '@shared/store';
import { Nullable } from '@shared/types';

import { OwnerContractOwnerModel } from './models';
import { OwnerContractWrapper } from './owner-contract';

const OWNER_CONTRACT_ADDRESS = '0x04Bc70Bf89eF7af019fc2bFD0f1e7b2B0Fd25788';

@ModelBuilder()
export class HomePageStore {
  //#region "Owner" contract owner store
  @Led({
    default: { value: null },
    loader: async self => await self.getContractOwner(),
    model: OwnerContractOwnerModel
  })
  readonly ownerContractOwnerStore: LoadingErrorData<OwnerContractOwnerModel, { value: null }>;

  get ownerContractOwner() {
    return this.ownerContractOwnerStore.model.value;
  }

  get ownerContractOwnerLoading() {
    return this.ownerContractOwnerStore.isLoading;
  }
  //#endregion "Owner" contract owner store

  ownerViewContract = new OwnerContractWrapper(OWNER_CONTRACT_ADDRESS, ownerContractAbi, FALLBACK_PROVIDER);
  ownerTransactionsContract: Nullable<OwnerContractWrapper> = null;

  constructor(private rootStore: RootStore) {
    makeObservable(this, {
      ownerViewContract: observable,
      ownerTransactionsContract: observable,
      ownerContractOwnerStore: observable,

      ownerContractOwner: computed,
      ownerContractOwnerLoading: computed,

      reconnectOwnerViewContract: action,
      setOwnerTransactionsContract: action
    });
  }

  reconnectOwnerViewContract() {
    const { connection } = this.rootStore.authStore;
    this.ownerViewContract.connect(connection?.provider ?? FALLBACK_PROVIDER);
  }

  setOwnerTransactionsContract(newContract: Nullable<OwnerContractWrapper>) {
    this.ownerTransactionsContract = newContract;
  }

  updateContracts() {
    const { connection } = this.rootStore.authStore;

    this.reconnectOwnerViewContract();
    this.setOwnerTransactionsContract(
      connection ? new OwnerContractWrapper(OWNER_CONTRACT_ADDRESS, ownerContractAbi, connection.signer) : null
    );
  }

  async getContractOwner() {
    return { value: await this.ownerViewContract.getOwner() };
  }
}
