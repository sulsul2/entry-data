"use client";
import { ReactNode, useState } from "react";
import Pagination from "./pagination";

function Table({
  data,
  header,
  addedItems,
  isLoading,
  totalPages = 1,
  current,
}: {
  data: any[];
  header: any[];
  addedItems?: ReactNode;
  isLoading: boolean;
  totalPages?: number;
  current: (x: number) => void | undefined;
}) {
  const Load = () => {
    const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return dummy.map((idx: number) => (
      <tr key={idx}>
        {header.map((idx: number) => {
          return (
            <td
              key={idx}
              className="h-auto w-auto border-collapse px-2 py-1 text-[14px] md:text-[16px] text-center lg:px-4"
            >
              <div className="h-4 w-full animate-pulse bg-gray-600 bg-opacity-10"></div>
            </td>
          );
        })}
      </tr>
    ));
  };

  const renderCell = (cell: any) => {
    if (Array.isArray(cell)) {
      return (
        <ul className="list-disc pl-5 text-start w-full">
          {cell.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else {
      return cell;
    }
  };

  return (
    <div className="flex flex-col border border-[#E9EAEB] rounded-lg">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-[#E9EAEB] justify-center items-center">
          {/* Table Header */}
          <thead>
            <tr>
              {header.map((head, idx) => (
                <th
                  key={idx}
                  className="h-auto w-auto border-b-2 border-[#E9EAEB] bg-[#FAFAFA] px-1 py-2 md:px-3 md:py-4 text-xs sm:text-sm md:text-[16px] text-center font-medium truncate text-[#535862]"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <Load />
            ) : data.length > 0 ? (
              data.map((obj, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {Object.values(obj).map((cell, idx) => (
                    <td
                      key={idx}
                      className="h-auto w-auto border-b border-[#E9EAEB] px-1 py-2 md:px-3 md:py-4 text-xs sm:text-sm md:text-[16px] text-center font-medium text-[#181D27] align-middle"
                    >
                      {renderCell(cell)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={header.length + (addedItems ? 1 : 0)}
                  className="h-auto w-auto border-collapse px-3 py-5 text-xs sm:text-sm md:text-[16px] text-center text-gray-500"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Fixed Pagination */}
      <div className="p-2 justify-center sticky w-full bg-white rounded-lg">
        <Pagination totalPages={totalPages} current={current} />
      </div>
    </div>
  );
}

export default Table;
