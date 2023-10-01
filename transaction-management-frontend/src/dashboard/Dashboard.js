import React, { useEffect, useState } from "react";

import TransactionList from "../components/TransactionList";
import TransactionFilter from "../components/TransactionFilter";
import TransactionSort from "../components/TransactionSort";
import CreateNewTransaction from "../components/CreateNewTransaction";
import GenerateReport from "../components/GenerateReport";
import CronSchedule from "../components/CronSchedule";

import { createNewTransactionApi } from "../apiCalls/createNewTransactionApi.js";
import { fetchTransactionsApi } from "../apiCalls/fetchTransactionsApi";
import { generateCustomReportApi } from "../apiCalls/generateCustomReportApi";
import { initializeCron, terminateCron } from "../apiCalls/cronScheduleApi";
import TransactionReportResult from "../components/TransactionReportResult";
import JsonToCsvConverter from "../components/JsonToCsvConverter";

function Dashboard({ JWTtoken }) {
  const [tableLoading, settableLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalPage, settotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(0);
  const [transactionReport, settransactionReport] = useState({});
  const [showtransactionReport, setshowtransactionReport] = useState(false);
  const [reportDuration, setreportDuration] = useState();
  const [isCronRunning, setIsCronRunning] = useState(false);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "dateTime",
    sortOrder: "desc",
    description: "",
  });

  // Handle filter changes
  const handleFilter = (filterData) => {
    setFilters(filterData);
  };

  // Handle sorting changes
  const handleSort = (sortOption, order) => {
    setFilters({ ...filters, sortBy: sortOption, sortOrder: order });
  };

  // Add a new transaction
  const handleAddTransaction = (newTransaction) => {
    createNewTransactionApi(JWTtoken, newTransaction);
  };

  // Generate a report
  const handleGenerateCustomReportApi = (reportCriteria) => {
    setreportDuration(reportCriteria);
  };

  // Start the cron job
  const handleInitializeCron = () => {
    initializeCron(JWTtoken);
    setIsCronRunning(true);
  };

  // Stop the cron job
  const handleTerminateCron = () => {
    terminateCron(JWTtoken);
    setIsCronRunning(false);
  };

  const handleReportClose = () => {
    setshowtransactionReport(false);
  };

  useEffect(() => {
    settableLoading(true);
    fetchTransactionsApi(JWTtoken, filters)
      .then((res) => {
        setTransactions(res?.transactions);
        settotalPage(res?.totalPages);
        setcurrentPage(res?.currentPage);
        settableLoading(false);
      })
      .catch((err) => {
        settableLoading(false);
      });
  }, []);

  useEffect(() => {
    settableLoading(true);
    fetchTransactionsApi(JWTtoken, filters, currentPage)
      .then((res) => {
        setTransactions(res?.transactions);
        settableLoading(false);
      })
      .catch((err) => {
        settableLoading(false);
      });
  }, [currentPage, filters]);

  useEffect(() => {
    settableLoading(true);
    fetchTransactionsApi(JWTtoken, filters)
      .then((res) => {
        setTransactions(res?.transactions);
        settotalPage(res?.totalPages);
        setcurrentPage(res?.currentPage);
        settableLoading(false);
      })
      .catch((err) => {
        settableLoading(false);
      });
  }, [filters]);

  useEffect(() => {
    if (reportDuration) {
      settableLoading(true);
      generateCustomReportApi(JWTtoken, reportDuration)
        .then((res) => {
          settransactionReport(res);
          setshowtransactionReport(true);
          settableLoading(false);
        })
        .catch((err) => {
          settableLoading(false);
        });
    }
  }, [reportDuration]);

  const handleNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage > totalPage) nextPage = 1;
    setcurrentPage(nextPage);
  };
  window.addEventListener("unload", function () {
    if (!isCronRunning) return;
    terminateCron(JWTtoken);
    setIsCronRunning(false);
  });

  const menuList = [
    "Cron Control",
    "Add Transaction",
    "Generate Report",
    "Json to CSV Converter",
    "Transaction Filter",
    "Transaction Sorting",
  ];

  const [selectedFilterSection, setSelectedFilterSection] =
    useState("Cron Control");

  function handleSelectedItemChange(e) {
    setSelectedFilterSection(e.target.value);
  }

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-full gap-6">
        <div className="col-span-3 bg-menuBg p-4 shadow-md">
          <select
            className="outline-none border-none rounded-xl p-2 bg-gray-400 bg-opacity-25 text-white"
            onChange={handleSelectedItemChange}
          >
            {menuList.map((item, index) => {
              return (
                <option
                  className="text-white bg-menuBg shadow-lg"
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              );
            })}
          </select>

          <div>
            {selectedFilterSection === "Cron Control" ? (
              <CronSchedule
                isCronRunning={isCronRunning}
                onStartCron={handleInitializeCron}
                onStopCron={handleTerminateCron}
              />
            ) : selectedFilterSection === "Add Transaction" ? (
              <CreateNewTransaction onAdd={handleAddTransaction} />
            ) : selectedFilterSection === "Generate Report" ? (
              <GenerateReport onGenerate={handleGenerateCustomReportApi} />
            ) : selectedFilterSection === "Json to CSV Converter" ? (
              <JsonToCsvConverter transactions={transactions} />
            ) : selectedFilterSection === "Transaction Filter" ? (
              <TransactionFilter onFilter={handleFilter} />
            ) : (
              <TransactionSort onSort={handleSort} />
            )}
          </div>
        </div>
        <div className="col-span-9 p-4">
          <div className="w-full">
            <TransactionList
              tableLoading={tableLoading}
              transactions={transactions}
              totalPage={totalPage}
              currentPage={currentPage}
              onPage={handleNextPage}
            />
          </div>

          {showtransactionReport && (
            <TransactionReportResult
              handleReportClose={handleReportClose}
              reportDuration={reportDuration}
              transactionReport={transactionReport}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
