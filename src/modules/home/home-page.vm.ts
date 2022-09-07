import { useCallback, useEffect } from 'react';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';
import { useRootStore } from '@providers/root-store.provider';
import { OperationRejectionError } from '@shared/errors';
import { transformMetamaskError } from '@shared/helpers';
import { useAuthStore, useStoreInitialization } from '@shared/hooks';
import { useToasts } from '@shared/utils/toasts';

import { useHomePageStore } from './hooks/use-home-page-store';

const TEST_MESSAGE = 'Hello, World!';

export const useHomePageViewModel = () => {
  const rootStore = useRootStore();
  const { connection, address } = useAuthStore();
  const { connect: connectEthereum, disconnect } = useConnectEthereum();
  const homePageStore = useHomePageStore();
  const { showErrorToast, showSuccessToast } = useToasts();
  const owner = homePageStore?.ownerContractOwner;
  const ownerLoading = homePageStore?.ownerContractOwnerLoading;
  const ownerLabel = owner ?? (ownerLoading ? 'Loading...' : 'Unknown');
  const ownerViewContract = homePageStore?.ownerViewContract;

  const initializeFn = useCallback(async () => {
    await rootStore.createHomePageStore();
  }, [rootStore]);
  const isInitialized = useStoreInitialization(initializeFn);

  const loadOwnerContractOwner = useCallback(async () => {
    try {
      await homePageStore?.ownerContractOwnerStore.load();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      showErrorToast(transformMetamaskError(e as Error));
    }
  }, [homePageStore, showErrorToast]);

  useEffect(() => {
    homePageStore?.updateContracts();
  }, [homePageStore, connection]);

  useEffect(() => void loadOwnerContractOwner(), [loadOwnerContractOwner]);

  useEffect(() => {
    if (ownerViewContract) {
      const filter = {
        address: ownerViewContract.address,
        topics: [ownerViewContract.interface.getEventTopic('OwnerSet')]
      };

      const ownerChangeListener = (oldOwner: string, newOwner: string) => {
        // eslint-disable-next-line no-console
        console.log(`Owner changed from ${oldOwner} to ${newOwner}`);
        void loadOwnerContractOwner();
      };

      ownerViewContract.on(filter, ownerChangeListener);

      return () => ownerViewContract.off(filter, ownerChangeListener);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [ownerViewContract, loadOwnerContractOwner]);

  const signTestMessage = useCallback(async () => {
    if (!connection || !address) {
      return;
    }

    try {
      const signature = await connection.signer.signMessage(TEST_MESSAGE);
      showSuccessToast(`Signature: ${signature}`);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      const transformedError = transformMetamaskError(e as Error);
      if (!(transformedError instanceof OperationRejectionError)) {
        showErrorToast(`Failed to sign message: ${transformedError.message}`);
      }
    }
  }, [connection, address, showSuccessToast, showErrorToast]);

  const connectMetamask = useCallback(async () => await connectEthereum(), [connectEthereum]);

  return {
    address,
    connectMetamask,
    disconnect,
    isInitialized,
    ownerLabel,
    signTestMessage
  };
};
