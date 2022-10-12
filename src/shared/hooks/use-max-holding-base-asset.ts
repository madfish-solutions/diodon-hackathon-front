import { useMemo, useState } from 'react';

import BigNumber from 'bignumber.js';
import { debounce } from 'throttle-debounce';

import { Amm } from '@blockchain/facades/amm';
import { DDAI_DECIMALS } from '@config/constants';
import { toReal } from '@shared/helpers/bignumber';

import { Nullable } from '../types';

export const useMaxHoldingBaseAsset = (amm: Nullable<Amm>) => {
  const [maxHoldingBaseAsset, setMaxHoldingBaseAsset] = useState(new BigNumber(Infinity));

  const updateMaxHoldingBaseAsset = useMemo(
    () =>
      debounce(100, async () => {
        if (!amm) {
          return;
        }

        try {
          setMaxHoldingBaseAsset(toReal(await amm.getMaxHoldingBaseAsset(), DDAI_DECIMALS));
        } finally {
          // do nothing
        }
      }),
    [amm]
  );

  return { maxHoldingBaseAsset, updateMaxHoldingBaseAsset };
};
