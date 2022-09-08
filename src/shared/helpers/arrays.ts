import { Nullable } from '../types';

export const isEmptyArray = (array: Nullable<unknown[]>) => (array ? array.length === 0 : true);
export const isNotEmptyArray = <T>(array: Nullable<T[]>): array is T[] => (array ? array.length !== 0 : false);
