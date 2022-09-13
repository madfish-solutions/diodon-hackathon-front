export const capitalize = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`;

export const isEmptyString = (str: string) => str.length === 0 || str === '';
export const getLastChar = (str: string) => str[str.length - 1];

export const isString = <T>(str: string | T): str is string => typeof str === 'string';
