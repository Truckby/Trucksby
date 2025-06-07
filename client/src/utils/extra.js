export const formatNumberWithCommas = (num) => {
  if (num === undefined || num === null || isNaN(num)) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPhoneNumber = (value) => {
  if (value === undefined || value === null) return value;
  // strip out non‐digits
  const digits = value.toString().replace(/\D/g, '').slice(-10);
  if (digits.length !== 10) return value;
  // format as 123-456-7890
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
};
// ...existing code...