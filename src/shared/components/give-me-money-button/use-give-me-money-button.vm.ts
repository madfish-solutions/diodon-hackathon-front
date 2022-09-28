import { useState } from 'react';

import axios from 'axios';

import { useAuthStore } from '../../hooks';
import { useToasts } from '../../utils/toasts';

export const useGiveMeMoneyButtonViewModel = () => {
  const { address } = useAuthStore();
  const { showErrorToast, showSuccessToast } = useToasts();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!address) {
      throw new Error('No address');
    }
    setIsLoading(true);
    try {
      const resp = await axios.post('http://localhost:3000/api/v2/', {}, { headers: { PKH: address } });
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      showSuccessToast(`Klay & dDAI Successfully sent to ${address}`);
    } catch (error) {
      showErrorToast(`Error: ${(error as Error).message}`);
    }
    setIsLoading(false);
  };

  return { handleClick, isLoading, isVisible: !!address };
};
