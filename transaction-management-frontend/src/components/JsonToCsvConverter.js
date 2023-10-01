import React, { useState } from "react";

import { downloadIntoCSV } from "../downloadIntoCSV";

function JsonToCsvConverter({ transactions }) {
  const handleExportToCsv = () => {
    if (transactions.length > 0) {
      downloadIntoCSV(transactions);
    }
  };

  return (
    <div className="jsonToCsvConverter text-white py-6">
      <button 
      className="rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-green-600 font-bold hover:bg-green-700"
      onClick={handleExportToCsv}>Export to CSV</button>
    </div>
  );
}

export default JsonToCsvConverter;
