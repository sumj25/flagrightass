import React, { useState } from "react";

const GenerateReport = ({ onGenerate }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerate = () => {
    onGenerate({ startDate, endDate });
  };

  return (
    <div className="generateReport text-white py-6">
      <h2>Generate Report</h2>
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
      <button
        className="rounded-xl text-sm px-6 border-none outline-none mt-4 p-2 text-white bg-green-600 font-bold hover:bg-green-700"
        onClick={handleGenerate}
      >
        Generate Report
      </button>
    </div>
  );
};

export default GenerateReport;
