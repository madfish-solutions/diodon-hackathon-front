import { isErrorWithReason, MetamaskError, OperationExecutionError, OperationRejectionError } from '@shared/errors';

import { capitalize } from './strings';

const EXECUTION_ERROR_PREFIX = 'execution reverted:';
const USER_REJECTION_ERRORS = ['user rejected signing', 'user rejected transaction'];

export const transformMetamaskError = (e: Error) => {
  if (isErrorWithReason(e)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { reason } = e;

    if (reason.startsWith(EXECUTION_ERROR_PREFIX)) {
      const [, description] = reason.split(EXECUTION_ERROR_PREFIX);

      return new OperationExecutionError(description);
    }

    if (USER_REJECTION_ERRORS.includes(reason)) {
      return new OperationRejectionError(capitalize(reason));
    }

    return new MetamaskError(capitalize(reason));
  }

  return e;
};
