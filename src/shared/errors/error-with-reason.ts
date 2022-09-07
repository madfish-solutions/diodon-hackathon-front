export interface ErrorWithReason extends Error {
  reason: string;
}

export const isErrorWithReason = (e: Error): e is ErrorWithReason => {
  return 'reason' in e;
};
