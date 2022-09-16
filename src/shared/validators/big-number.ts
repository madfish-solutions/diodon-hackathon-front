import { BigNumber } from 'bignumber.js';
import { object, SchemaOf } from 'yup';

import { Optional } from '@shared/types';

const basicBigNumberSchema: SchemaOf<BigNumber> = object()
  .shape({})
  .test(
    'value-type',
    () => 'Must be a number',
    value => !value || value instanceof BigNumber
  ) as SchemaOf<BigNumber>;

export const bigNumberSchema = (min?: Optional<BigNumber.Value>, max?: Optional<BigNumber.Value>, message?: string) => {
  const schema = basicBigNumberSchema.clone();
  const actualMin = min && new BigNumber(min).isFinite() ? new BigNumber(min) : null;
  const actualMax = max && new BigNumber(max).isFinite() ? new BigNumber(max) : null;

  if (actualMin && actualMax) {
    return schema.test(
      'min-max-value',
      () => message ?? `Value has to be a number between ${actualMin.toFixed()} and ${actualMax.toFixed()}` ?? '',
      value => !(value instanceof BigNumber) || (value.gte(actualMin) && value.lte(actualMax))
    );
  }
  if (actualMin) {
    return schema.test(
      'min-value',
      () => message ?? `Minimal value is ${actualMin.toFixed()}` ?? '',
      value => !(value instanceof BigNumber) || value.gte(actualMin)
    );
  }
  if (actualMax) {
    return schema.test(
      'max-value',
      () => message ?? `Maximal value is ${actualMax.toFixed()}` ?? '',
      value => !(value instanceof BigNumber) || value.lte(actualMax)
    );
  }

  return schema;
};
