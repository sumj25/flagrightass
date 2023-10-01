import Transaction from "./models/transac.js";
import filter from "./utils/filter.js";
import {
  getEndOfDayFromDate,
  getStartOfDayFromDate,
} from "./utils/convertDate.js";

export const createTransactionService = async (transactionData) => {
  return Transaction.create(transactionData);
};

export const getTransactionByIDService = async (transactionID) => {
  return Transaction.findOne({ transactionID });
};

export const searchTransactionsService = async (
  searchCriteria,
  page,
  pageSize,
  sortOptions
) => {
  const query = filter(searchCriteria);
  const totalResults = await Transaction.countDocuments(query);
  const totalPages = Math.ceil(totalResults / pageSize);

  const transactions = await Transaction.find(query)
    .sort(sortOptions)
    .skip((page - 1) * pageSize)
    .limit(pageSize);
  return {
    transactions,
    totalPages,
    currentPage: page,
  };
};

export const generateTransactionReportService = async (reportCriteria) => {
  const { startDate, endDate } = reportCriteria;
  const startTime = getStartOfDayFromDate(startDate);
  const endTime = getEndOfDayFromDate(endDate);
  const report = await Transaction.aggregate([
    {
      $match: {
        dateTime: {
          $gte: new Date(startTime),
          $lte: new Date(endTime),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
        count: 1,
      },
    },
  ]);

  return report[0] || { totalAmount: 0, count: 0 };
};
