"use client";
import React from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaDownload } from "react-icons/fa";

function CustomTable({ data, header, onAction }) {
  const [expandedRows, setExpandedRows] = useState({});

//   const toggleExpansion = (rowIndex) => {
//     setExpandedRows((prevState) => ({
//       ...prevState,
//       [rowIndex]: !prevState[rowIndex],
//     }));
//   };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {header.map((head, index) => (
            <th
              key={index}
              className="bg-gray-200 p-2 text-left text-gray-800 font-medium"
            >
              {head}
            </th>
          ))}
          <th className="bg-gray-200 p-2 text-left text-gray-800 font-medium">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <tr
              className={`bg-white border-b hover:bg-gray-100 cursor-pointer ${
                expandedRows[rowIndex] ? "bg-gray-100" : ""
              }`}
              onClick={() => toggleExpansion(rowIndex)}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-gray-800 font-medium"
                >
                  {cell}
                </td>
              ))}
              <td className="px-4 py-3 text-gray-800 font-medium">
                <div className="flex items-center space-x-2">
                  <button
                    className="text-indigo-600 hover:text-indigo-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction(row, "export");
                    }}
                  >
                    <FaDownload size={16} />
                  </button>
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction(row, "more");
                    }}
                  >
                    {expandedRows[rowIndex] ? (
                      <FaChevronDown size={16} />
                    ) : (
                      <FaChevronRight size={16} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
            {expandedRows[rowIndex] && (
              <tr>
                <td colSpan={header.length + 1} className="px-4 py-3">
                  {/* Additional details for the expanded row */}
                  <div className="bg-gray-100 p-4 rounded-md">
                    <p>Additional details for the expanded row</p>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CustomTable;
