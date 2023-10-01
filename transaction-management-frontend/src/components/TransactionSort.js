import React, { useState } from "react";

const TransactionSort = ({ onSort }) => {
  const [sortOption, setSortOption] = useState("dateTime");
  const [sortingOrder, setsortingOrder] = useState("desc");

  const handleSort = () => {
    onSort(sortOption, sortingOrder);
  };

  return (
    <div className="transactionSort  text-white py-6">
      <h2>Transaction Sorting</h2>
      <div>
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
        >
          <option value="">-- Select --</option>
          <option value="dateTime">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
      <div>
        <label>Sorting Order:</label>
        <select
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          value={sortingOrder}
          onChange={(e) => setsortingOrder(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <button
        className="rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-green-600 font-bold hover:bg-green-700"
        onClick={handleSort}
      >
        Apply Sorting
      </button>
    </div>
  );
};

export default TransactionSort;
