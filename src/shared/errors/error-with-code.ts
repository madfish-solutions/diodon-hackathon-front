export interface ErrorWithCode extends Error {
  code: number;
}

export const isErrorWithCode = (e: Error): e is ErrorWithCode => {
  return 'code' in e;
};
