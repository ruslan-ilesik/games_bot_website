'use client';
import React, { useEffect, useState } from "react";
import { usePremium } from '../PremiumContext';
import { saveAs } from 'file-saver';

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const HistoryTable = () => {
  const [orderOptions, setOrderOptions] = useState([]);
  const [rowsOptions, setRowsOptions] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(
    localStorage.getItem("selectedOrder") || ""
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(localStorage.getItem("rowsPerPage"), 10) || 10
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage"), 10) || 0
  );
  const [maxPage, setMaxPage] = useState(0);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [customPageInput, setCustomPageInput] = useState("");
  const { isPremium } = usePremium();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch("/api/dashboard/get-history-table-order-options");
        if (!response.ok) throw new Error("Failed to fetch options");
        const data = await response.json();

        setOrderOptions(data.order_by);
        setRowsOptions(data.rows_cnt);

        if (!selectedOrder) {
          setSelectedOrder(data.order_by[0]);
          localStorage.setItem("selectedOrder", data.order_by[0]);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [selectedOrder]);

  useEffect(() => {
    localStorage.setItem("selectedOrder", selectedOrder);
    localStorage.setItem("rowsPerPage", rowsPerPage);
    localStorage.setItem("currentPage", currentPage);
  }, [selectedOrder, rowsPerPage, currentPage]);

  useEffect(() => {
    const fetchTableData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/dashboard/get-history-table?sort=${selectedOrder}&rows=${rowsPerPage}&page=${currentPage}`
        );
        if (!response.ok) throw new Error("Failed to fetch table data");

        const data = await response.json();
        setTimeout(() => {
          setRecords(data.records);
          setMaxPage(parseInt(data.page_cnt, 10) - 1);

          if (data.records.length === 0 && currentPage > data.page_cnt - 1) {
            setCurrentPage(data.page_cnt - 1);
          }
          setIsLoading(false);
        }, 500); // Match with animation duration
      } catch (error) {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [selectedOrder, rowsPerPage, currentPage]);

  const handleExport = async () => {
    try {
      const response = await fetch("/api/dashboard/get-games-history-cvs");
      if (!response.ok) throw new Error("Failed to fetch CSV");
      const blob = await response.blob();
      saveAs(blob, "games-history.csv");
    } catch (error) {
      console.error("Error exporting CSV:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPage + 1) {
      setCurrentPage(page - 1);
      setCustomPageInput("");
    }
  };

  const handleCustomPageSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(customPageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= maxPage + 1) {
      setCurrentPage(page - 1);
    }
  };

  return (
    <div className="fonts-assign content-center flex flex-col justify-center items-center">
      <h1 className="text-highlight text-center" style={{ fontSize: "2.3em" }}>
        Games history
      </h1>
      <div className="darker-block p-4 m-4" style={{ maxWidth: "calc(100vw - 20px)"}}>
        <div className="history-table p-4 rounded-md">
          <div className="filters flex flex-wrap gap-4 mb-4 fonts-assign">
            <div className="w-full sm:w-auto">
              <label className="flex flex-col sm:flex-row sm:items-center space-x-2">
                <span className="text-highlight font-semibold">Sort by:</span>
                <select
                  className="px-2 py-1 bg-black text-highlight border border-gray-500 rounded-md"
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                >
                  {orderOptions.map((label, index) => (
                    <option key={index} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="w-full sm:w-auto">
              <label className="flex flex-col sm:flex-row sm:items-center space-x-2">
                <span className="text-highlight font-semibold">Rows per page:</span>
                <select
                  className="px-2 py-1 bg-black text-highlight border border-gray-500 rounded-md"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                >
                  {rowsOptions.map((rows, index) => (
                    <option key={index} value={rows}>
                      {rows}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {isPremium ? (
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleExport}
                  className="text-white rounded-md px-4 py-1"
                  style={{ backgroundColor: "var(--btn-color)" }}
                >
                  Export CSV
                </button>
              </div>
            ) : (
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => alert("Exporting CSV is a premium feature.")}
                  className="text-white rounded-md px-4 py-1 bg-gray-500 cursor-not-allowed"
                >
                  Export CSV
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`table-container overflow-x-auto ${
            isLoading ? "loading" : "animate-fade"
          }`}
        >
          <table className="history-table table-auto w-full text-left border-collapse min-w-[600px] max-w-[1000px]">
            <thead>
              <tr>
                <th className="p-2 border border-gray-700">Game</th>
                <th className="p-2 border border-gray-700">Result</th>
                <th className="p-2 border border-gray-700">Datetime</th>
                <th className="p-2 border border-gray-700">Time Played</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-alt-row-bg-color" : "bg-alt-row-bg-color2"
                  } text-gray-300`}
                >
                  <td className="p-2 border border-gray-700">
                    {titleCase(record.game_name.replace("_", " "))}
                  </td>
                  <td style={
                    {color: (record.result == 'WIN' ? 'limegreen' : (record.result == 'DRAW' ? 'yellow' : (record.result == 'UNKNOWN'? '' : 'red')))}
                  } className="p-2 border border-gray-700">{record.result}</td>
                  <td className="p-2 border border-gray-700">
                    {new Date(record.start_time + " UTC").toLocaleString(undefined, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="p-2 border border-gray-700">{record.time_played}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



    <div className="pagination mt-4 text-highlight fonts-assign flex flex-col sm:flex-row sm:items-center sm:justify-center">

    {/* Page Numbers in a Separate Row for Small Screens */}
    <div className="my-2 flex justify-center sm:my-0 sm:ml-2 sm:flex sm:space-x-1">
        {(() => {
        const pageButtons = [];
        const totalPages = maxPage + 1;
        const currentPage1Based = currentPage + 1;

        if (totalPages > 1) {
            pageButtons.push(
            <button
                key={1}
                onClick={() => handlePageChange(1)}
                className={`px-2 py-1 rounded-md ${
                currentPage1Based === 1
                    ? "bg-btn-hover-color text-white font-bold underline"
                    : "hover:bg-gray-700"
                }`}
            >
                1
            </button>
            );

            if (currentPage1Based > 3) {
            pageButtons.push(<span key="left-ellipsis">...</span>);
            }

            for (
            let page = Math.max(2, currentPage1Based - 2);
            page <= Math.min(totalPages - 1, currentPage1Based + 2);
            page++
            ) {
            pageButtons.push(
                <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-2 py-1 rounded-md ${
                    page === currentPage1Based
                    ? "bg-btn-hover-color text-white font-bold underline"
                    : "hover:bg-gray-700"
                }`}
                >
                {page}
                </button>
            );
            }

            if (currentPage1Based < totalPages - 2) {
            pageButtons.push(<span key="right-ellipsis">...</span>);
            }

            pageButtons.push(
            <button
                key={totalPages}
                onClick={() => handlePageChange(totalPages)}
                className={`px-2 py-1 rounded-md ${
                currentPage1Based === totalPages
                    ? "bg-btn-hover-color text-white font-bold underline"
                    : "hover:bg-gray-700"
                }`}
            >
                {totalPages}
            </button>
            );
        }
        return pageButtons;
        })()}
    </div>

    {/* Custom Page Input in a Separate Row for Small Screens */}
    <div className="mt-2 sm:mt-0 sm:ml-4 flex justify-center">
        <form onSubmit={handleCustomPageSubmit} className="flex space-x-2">
        <input
            type="number"
            style={{'minWidth':'100px'}}
            className="px-2 py-1 text-white rounded-md border border-gray-500 bg-alt-row-bg-color2"
            value={customPageInput}
            min={1}
            max={maxPage + 1}
            onChange={(e) => setCustomPageInput(e.target.value)}
            placeholder="Page"
        />
        <button
            type="submit"
            className="bg-btn-color hover:bg-btn-hover-color px-2 py-1 rounded-md text-white"
        >
            Go
        </button>
        </form>
    </div>
   </div>

    </div>    
    </div>


  );
};

export default HistoryTable;
