"use client";
import { ReactNode, useState } from "react";
import Pagination from "./pagination";

function Table({
  data,
  header,
  addedItems,
  isLoading,
  totalPages = 1
}: {
  data: any[];
  header: any[];
  addedItems?: ReactNode;
  isLoading: boolean;
  totalPages?: number;
}) {
  const [current, setCurrent] = useState(1);
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
    <div className="flex overflow-auto">
      <table className="w-full overflow-visible border-[#E9EAEB] border-2">
        <thead>
          <tr>
            {header.map((head, idx) => (
              <th
                key={idx}
                className="h-auto w-auto border-[#E9EAEB] border-b-2 bg-[#FAFAFA] px-5 py-4 text-[14px] md:text-[16px] text-center font-medium truncate text-[#535862]"
              >
                {head}
              </th>
            ))}
            {/* {addedItems && (
              <th className="h-auto w-auto border-collapse bg-[#031021] px-2 py-1 text-[14px] md:text-[16px] text-center font-normal truncate text-white">
                Actions
              </th>
            )} */}
          </tr>
        </thead>
        <tbody>
          {
            // isLoading ?
            // (
            //   Array.from({ length: 5 }).map((_, idx) => (
            //     <tr key={idx}>
            //       {header.map((_, idx) => (
            //         <td
            //           key={idx}
            //           className="h-auto w-auto border-[#E9EAEB] border-b-2 px-5 py-4 text-[14px] md:text-[16px] text-center font-medium text-[#181D27]"
            //         >
            //           <div className="h-4 w-full animate-pulse bg-gray-subtext bg-opacity-10"></div>
            //         </td>
            //       ))}
            //     </tr>
            //   ))
            // )
            data.length > 0 ? (
              data.map((obj, idx) => (
                <tr key={idx} className={"overflow-visible"}>
                  {Object.values(obj).map((cell, idx) => (
                    <td
                      key={idx}
                      className="h-auto w-auto border-[#E9EAEB] border-b-2 px-5 py-4 text-[14px] md:text-[16px] text-center font-medium text-[#181D27] min-w-max align-middle"
                    >
                      {renderCell(cell)}
                    </td>
                  ))}

                  {/* {addedItems && (
                    <td className="h-auto w-auto border-collapse px-1 lg:px-2 py-2 text-[14px] md:text-[16px] text-center min-w-max align-top">
                      {addedItems}
                    </td>
                  )} */}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={header.length + (addedItems ? 1 : 0)}
                  className="h-auto w-auto border-collapse px-2 py-5 text-[14px] md:text-[16px] text-center"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            )
          }
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={header.length}
              className="px-5 py-4 bg-white"
            >
              <Pagination
                totalPages={totalPages}
                current={(page) => setCurrent(page)}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
