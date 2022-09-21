import { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider';

import { isEmptyArray } from '@shared/helpers';

export async function executeTransactionsBatch(
  transactionsFunctions: Array<() => Promise<TransactionResponse>>
): Promise<TransactionReceipt[]> {
  if (isEmptyArray(transactionsFunctions)) {
    return [];
  }

  const [operationFn, ...rest] = transactionsFunctions;

  const response = await operationFn();
  const receipt = await response.wait(1);

  return [receipt, ...(await executeTransactionsBatch(rest))];
}
