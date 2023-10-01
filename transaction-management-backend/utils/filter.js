import {
  getEndOfDayFromDate ,
  getStartOfDayFromDate,
} from "./convertDate.js";
const filter = (searchCriteria) => {
  const query = {};

  if (searchCriteria.minAmount) {
    query.amount = { $gte: parseFloat(searchCriteria.minAmount) };
  }
  if (searchCriteria.maxAmount) {
    query.amount = {
      ...query.amount,
      $lte: parseFloat(searchCriteria.maxAmount),
    };
  }
  if (searchCriteria.startDate) {
    query.dateTime = {
      $gte: new Date(getStartOfDayFromDate(searchCriteria.startDate)),
    };
  }
  if (searchCriteria.endDate) {
    query.dateTime = {
      ...query.dateTime,
      $lte: new Date(getEndOfDayFromDate(searchCriteria.endDate)),
    };
  }
  if (searchCriteria.description) {
    query.description = { $regex: searchCriteria.description, $options: "i" };
  }
  return query;
};

export default filter;
