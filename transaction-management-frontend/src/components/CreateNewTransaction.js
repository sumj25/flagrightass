import React, { useState } from "react";
import { createUniqueTransactionID } from "../createUniqueTransactionID";

const CreateNewTransaction = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const handleAdd = () => {
    const currentDateTime = new Date().toISOString();
    const newTransaction = {
      dateTime: currentDateTime,
      amount: parseInt(amount),
      description,
      transactionID: createUniqueTransactionID(),
    };

    onAdd(newTransaction);

    // Clear the input fields after adding
    setAmount("");
    setDescription("");
  };

  return (
    <div className="pt-6 addTransaction text-white">
      <div>
        <label>Amount:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        className="rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-green-600 font-bold hover:bg-green-700"
        onClick={handleAdd}
      >
        Add Transaction
      </button>
    </div>
  );
};

export default CreateNewTransaction;
