import { utils } from 'ethers';
import { string as stringSchema } from 'yup';

import { isExist } from '@shared/helpers';

export const addressSchema = () =>
  stringSchema().test('is-address', 'Invalid address', value => {
    if (!isExist(value)) {
      return true;
    }

    return utils.isAddress(value);
  });
