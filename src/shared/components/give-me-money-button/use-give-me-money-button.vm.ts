import { useState } from 'react';

import axios from 'axios';

import { useConnectEthereum } from '@blockchain/use-connect-ethereum';

import { useAccountStore, useAuthStore } from '../../hooks';
import { useToasts } from '../../utils/toasts';

export const useGiveMeMoneyButtonViewModel = () => {
  const { address } = useAuthStore();
  const { showErrorToast, showSuccessToast } = useToasts();
  const { addToken } = useConnectEthereum();
  const { dDAIBalanceInUSD } = useAccountStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!address) {
      throw new Error('No address');
    }
    setIsLoading(true);
    try {
      const resp = await axios.post('https://diodon-faucet.fly.dev/api/v2/', {}, { headers: { PKH: address } });
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      showSuccessToast(`Klay & dDAI Successfully sent to ${address}`);
      await addToken();
      showSuccessToast(`dDAI Successfully added to the wallet`);
    } catch (error) {
      showErrorToast(`Error: ${(error as Error).message}`);
    }
    setIsLoading(false);
  };

  const getButtonLabel = () => {
    if (!dDAIBalanceInUSD) {
      return 'Give me test money';
    }

    if (dDAIBalanceInUSD < 15000) {
      return 'Give me more money';
    }

    if (dDAIBalanceInUSD < 20000) {
      return 'I want all money!';
    }

    return 'I am rich!';
  };

  return {
    handleClick,
    isLoading,
    isVisible: !!address,
    buttonLabel: getButtonLabel(),
    disabled: dDAIBalanceInUSD >= 30000
  };
};
