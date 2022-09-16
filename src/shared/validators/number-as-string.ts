import { BigNumber } from 'bignumber.js';
import { string as stringSchema, StringSchema } from 'yup';

import { formatBalance, prepareNumberAsString } from '@shared/helpers';
import { Optional } from '@shared/types';

export type NumberAsStringSchema = StringSchema<string | undefined, Record<string, unknown>, string | undefined>;

interface RangeBoundary {
  value: BigNumber.Value;
  isInclusive: boolean;
}

interface ValidatedRangeBoundary extends RangeBoundary {
  value: BigNumber;
}

export const makeNumberAsStringTestFn = (testFn: (value: BigNumber) => boolean) => {
  return (value: Optional<string>) => typeof value !== 'string' || testFn(new BigNumber(value));
};

export const makeLowerBoundaryTestFn = (boundary: ValidatedRangeBoundary) =>
  makeNumberAsStringTestFn(value =>
    boundary.isInclusive ? value.isGreaterThanOrEqualTo(boundary.value) : value.isGreaterThan(boundary.value)
  );

export const makeUpperBoundaryTestFn = (boundary: ValidatedRangeBoundary) =>
  makeNumberAsStringTestFn(value =>
    boundary.isInclusive ? value.isLessThanOrEqualTo(boundary.value) : value.isLessThan(boundary.value)
  );

const getLowerBoundaryErrorMessage = (boundary: ValidatedRangeBoundary, suggestedMessage: Optional<string>) => {
  const formattedBoundaryValue = formatBalance(boundary.value.toFixed());
  const fallbackMessage = boundary.isInclusive
    ? `Minimal value is ${formattedBoundaryValue}`
    : `The value should be greater than ${formattedBoundaryValue}`;

  return suggestedMessage ?? fallbackMessage ?? '';
};

const addLowerBoundaryTest = (
  schema: NumberAsStringSchema,
  message: Optional<string>,
  boundary: ValidatedRangeBoundary
) => schema.test('min-value', () => getLowerBoundaryErrorMessage(boundary, message), makeLowerBoundaryTestFn(boundary));

const getUpperBoundaryErrorMessage = (boundary: ValidatedRangeBoundary, suggestedMessage: Optional<string>) => {
  const formattedBoundaryValue = formatBalance(boundary.value.toFixed());
  const fallbackMessage = boundary.isInclusive
    ? `Maximal value is ${formattedBoundaryValue}`
    : `The value should be lower that ${formattedBoundaryValue}`;

  return suggestedMessage ?? fallbackMessage ?? '';
};

const addUpperBoundaryTest = (
  schema: NumberAsStringSchema,
  message: Optional<string>,
  boundary: ValidatedRangeBoundary
) => schema.test('max-value', () => getUpperBoundaryErrorMessage(boundary, message), makeUpperBoundaryTestFn(boundary));

const getValidatedBoundary = (boundary: RangeBoundary) => {
  const valueAsBigNumber = new BigNumber(boundary.value);

  return valueAsBigNumber.isFinite() ? { ...boundary, value: valueAsBigNumber } : null;
};

export function numberAsStringSchema(
  lower: RangeBoundary,
  upper: RangeBoundary,
  outOfLowerMessage: string,
  outOfUpperMessage: string
): NumberAsStringSchema;
export function numberAsStringSchema(
  lower?: Optional<RangeBoundary>,
  upper?: Optional<RangeBoundary>,
  outOfRangeMessage?: string
): NumberAsStringSchema;
export function numberAsStringSchema(
  lower?: Optional<RangeBoundary>,
  upper?: Optional<RangeBoundary>,
  message1?: string,
  message2?: string
): NumberAsStringSchema {
  const schema = stringSchema()
    .transform(value => (typeof value === 'string' ? prepareNumberAsString(value) : value))
    .test(
      'is-valid',
      `The input value is invalid. Only valid numbers with dot or comma separator are accepted.` ?? '',
      makeNumberAsStringTestFn(value => !value.isNaN())
    );

  const validatedLower = lower ? getValidatedBoundary(lower) : null;
  const validatedUpper = upper ? getValidatedBoundary(upper) : null;

  if (validatedLower && validatedUpper && message1 && message2) {
    return addUpperBoundaryTest(addLowerBoundaryTest(schema, message1, validatedLower), message2, validatedUpper);
  }
  if (validatedLower && validatedUpper) {
    const lowerBoundaryTestFn = makeLowerBoundaryTestFn(validatedLower);
    const upperBoundaryTestFn = makeUpperBoundaryTestFn(validatedUpper);

    return schema.test(
      'min-max-value',
      () =>
        message1 ??
        `Value has to be a number between ${formatBalance(validatedLower.value.toFixed())} and ${formatBalance(
          validatedUpper.value.toFixed()
        )}` ??
        '',
      makeNumberAsStringTestFn(value => lowerBoundaryTestFn(value.toFixed()) && upperBoundaryTestFn(value.toFixed()))
    );
  }
  if (validatedLower) {
    return addLowerBoundaryTest(schema, message1, validatedLower);
  }
  if (validatedUpper) {
    return addLowerBoundaryTest(schema, message1, validatedUpper);
  }

  return schema;
}
