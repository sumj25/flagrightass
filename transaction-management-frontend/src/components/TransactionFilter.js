import React, { useState } from "react";

const TransactionFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [description, setdescription] = useState("");

  const handleFilter = () => {
    onFilter({ startDate, endDate, minAmount, maxAmount, description });
  };

  return (
    <div className="transactionFilter text-white py-6">
      <h2>Transaction Filter</h2>
      <div>
        <label>Start Date:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>Min Amount:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Max Amount:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <button
        className="rounded-xl text-sm px-6 border-none mt-4 outline-none p-2 text-white bg-green-600 font-bold hover:bg-green-700"
        onClick={handleFilter}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default TransactionFilter;
