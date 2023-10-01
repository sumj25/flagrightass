import React from "react";

import { IsoToText } from "../IsoToText";

const TransactionList = ({
  transactions,
  onPage,
  currentPage,
  totalPage,
  tableLoading,
}) => {
  return (
    <div className="transactionList">
      <h2 className="w-full text-center text-3xl font-bold my-2">
        Transaction List
      </h2>
      <table className="border-2 w-full mt-6 border-solid border-gray-700">
     
        <thead>
          <tr className="border-2 h-12 border-gray-700">
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr className="border-2 h-10 border-gray-700" key={index}>
              <td className="border-2 border-gray-700 px-4">
                {IsoToText(transaction.dateTime)}
              </td>
              <td className="border-2 border-gray-700 px-4">
                {transaction.amount}
              </td>
              <td className="border-2 border-gray-700 px-4">
                {transaction.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center w-full justify-between">
        <button
          className="rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-blue-600 font-bold hover:bg-blue-700"
          onClick={() => onPage()}
        >
          Next Page
        </button>
        <div className="transactionList-pagenum flex items-center gap-1">
          <span>Page</span>
          <span>{currentPage}</span>
          <span>of</span>
          <span>{totalPage}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
