export const formatNumberWithCommas = (num) => {
  if (num === undefined || num === null || isNaN(num)) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};