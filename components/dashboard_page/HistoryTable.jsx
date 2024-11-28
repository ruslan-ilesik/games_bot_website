'use client';
import React, { useEffect, useState } from "react";


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
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
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [customPageInput, setCustomPageInput] = useState(""); // For manual page input



  useEffect(() => {
    // Fetch filter options from the API
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
    // Save selected filters to localStorage
    localStorage.setItem("selectedOrder", selectedOrder);
    localStorage.setItem("rowsPerPage", rowsPerPage);
  }, [selectedOrder, rowsPerPage]);

  useEffect(() => {
    // Fetch table data from the API whenever filters or page changes
    const fetchTableData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(
          `/api/dashboard/get-history-table?sort=${selectedOrder}&rows=${rowsPerPage}&page=${currentPage}`
        );

        if (!response.ok) {
          if (response.status === 400) throw new Error("Invalid request parameters");
          throw new Error("Failed to fetch table data");
        }

        const data = await response.json();
        setRecords(data.records);
        setMaxPage(parseInt(data.page_cnt, 10) - 1);

        if (data.records.length === 0 && currentPage > data.page_cnt - 1) {
          setCurrentPage(data.page_cnt - 1);
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTableData();
  }, [selectedOrder, rowsPerPage, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPage + 1) { // Ensure 1-based logic for users
      setCurrentPage(page - 1); // Store zero-based index
      setCustomPageInput(""); // Reset custom input field
    }
  };

  const handleCustomPageSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(customPageInput, 10); // User-visible number
    if (!isNaN(page) && page >= 1 && page <= maxPage + 1) {
      setCurrentPage(page - 1); // Convert to zero-based index
    }
  };
  
  return (
<div className="history-table p-4 rounded-md darker-block">
  <div className="filters inline-container mb-4 fonts-assign">
    {/* Sort Filter */}
    <label className="flex items-center space-x-2">
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

    {/* Rows Per Page */}
    <label className="flex items-center space-x-2">
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

  {/* Table */}
  <table className="table-auto w-full text-left border-collapse">
    <thead className="bg-premium-table-bg-color text-white">
      <tr>
        <th className="p-2 border border-gray-700">Game Name</th>
        <th className="p-2 border border-gray-700">Result</th>
        <th className="p-2 border border-gray-700">Start Time</th>
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
          <td className="p-2 border border-gray-700">{titleCase(record.game_name.replace('_',' '))}</td>
          <td className="p-2 border border-gray-700">{record.result}</td>
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

  {/* Pagination */}
  <div className="pagination mt-4 flex justify-center items-center text-highlight fonts-assign space-x-2">
{/* Previous Button */}
<button
  className="bg-btn-color hover:bg-btn-hover-color px-3 py-1 rounded-md text-white"
  onClick={() => handlePageChange(currentPage)} // Convert 0-based to 1-based
  disabled={currentPage === 0} // Disable when at the first page
>
  Previous
</button>



  {/* Vertical Separator */}
  <div className="h-6 w-px bg-gray-500"></div>

  {/* Page Number Buttons */}
  <div className="inline-flex items-center space-x-1">
    {[...Array(5).keys()].map((offset) => {
        const page = currentPage + 1 - 2 + offset; // User-visible pages
        if (page > 0 && page <= maxPage + 1) {
        return (
            <button
            key={page}
            onClick={() => handlePageChange(page)} // User-visible page
            className={`px-2 py-1 rounded-md ${
                page - 1 === currentPage // Match zero-based logic
                ? "bg-btn-hover-color text-white font-bold underline"
                : "hover:bg-gray-700"
            }`}
            >
            {page} {/* Display 1-based page */}
            </button>
        );
        }
        return null;
    })}
    </div>

  {/* Vertical Separator */}
  <div className="h-6 w-px bg-gray-500"></div>
    {/* Next Button */}
    <button
    className="bg-btn-color hover:bg-btn-hover-color px-3 py-1 rounded-md text-white"
    onClick={() => handlePageChange(currentPage + 2)} // Account for user display
    disabled={currentPage === maxPage} // Disable at last page
    >
    Next
    </button>

  {/* Custom Page Input */}
  <form onSubmit={handleCustomPageSubmit} className="inline-flex items-center ml-4 space-x-2">
    <input
        type="number"
        className="px-2 py-1 text-white rounded-md border border-gray-500 bg-alt-row-bg-color2"
        value={customPageInput}
        min={0}
        max={maxPage+1}
        onChange={(e) => setCustomPageInput(e.target.value)}
        placeholder="Go to page..."
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


  );
};

export default HistoryTable;
