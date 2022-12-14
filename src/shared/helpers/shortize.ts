const FISRT_INDEX = 0;
const LEFT_LENGTH = 6;
const RIGHT_LENGTH = 4;
export const shortize = (str: string, length?: number) => {
  if (!str) {
    return '';
  }

  const wrapLeftLenght = length ?? LEFT_LENGTH;
  const wrapRightLenght = length ?? RIGHT_LENGTH;

  return `${str.slice(FISRT_INDEX, wrapLeftLenght)}...${str.slice(-wrapRightLenght)}`;
};
