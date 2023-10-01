
export const getStartOfDayFromDate = (inputDate) => {
  const startOfDay = new Date(inputDate);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};

export const getEndOfDayFromDate = (inputDate) => {
  const endOfDay = new Date(inputDate);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
};
