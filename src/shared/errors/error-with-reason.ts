import { isExist } from '../types';

export interface ErrorWithReason extends Error {
  reason: string;
}

export const isErrorWithReason = (e: Error): e is ErrorWithReason => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'reason' in e && isExist((e as any).reason);
};
