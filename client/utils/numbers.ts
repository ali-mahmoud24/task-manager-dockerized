export const isNumber = (number: any): boolean => {
  return !isNaN(parseFloat(number)) && isFinite(number);
};
