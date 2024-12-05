"use client";

import React, { useRef, useState } from "react";


const DynamicTable = () => {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [tableData, setTableData] = useState([]);
  const tbl = useRef(null);


  const createTable = () => {
    const newTableData = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    );
    setTableData(newTableData);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block mb-2">
          Number of Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            min="0"
          />
        </label>
        <label className="block mb-2">
          Number of Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            min="0"
          />
        </label>
        <button
          onClick={createTable}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Table
        </button>
      </div>

      <div>
        {tableData.length > 0 && (
          <table ref={tbl} className="border border-gray-500 w-full text-center">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-500 p-2"
                    >
                      {""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DynamicTable;


    {/* <table ref={tbl} className="mt-10 w-full h-fit border border-black border-collapse text-center text-sm">
                <tbody>
                  {Array.from({ length: 10 }).map((_, colIndex) => (
                    <tr key={colIndex} className="border border-black border-collapse">
                      {Array.from({ length: Math.ceil(modResults.length / 10) }).map((_, rowIndex) => {
                        const index = rowIndex * 10 + colIndex;
                        return (
                          <td key={index} className="border border-black text-xs border-collapse">
                            {modResults[index] || ''}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table> */}
              {/* <table ref={tbl} className="mt-10 w-full h-fit border border-black border-collapse text-center text-sm">
                <tbody>
                  {Array.from({ length: 8 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="border border-black border-collapse">
                      {Array.from({ length: 14 }).map((_, colIndex) => {
                        const cellIndex = rowIndex + colIndex * 8; // Calculate index based on row and column
                        return (
                          <td
                            key={colIndex}
                            className="border border-black w-8 h-8"
                          >
                            {modResults[cellIndex] || ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table> */}
              {/* <table ref={tbl} className="mt-10 w-full h-fit border border-black border-collapse text-center text-sm">
                <tbody>
                  {console.log("MOD:", modResults)}
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[0]}</td>
                    <td className="">{modResults[14]}</td>
                    <td className="">{modResults[27]}</td>
                    <td className="">{modResults[39]}</td>
                    <td className="">{modResults[50]}</td>
                    <td className="">{modResults[60]}</td>
                    <td className="">{modResults[69]}</td>
                    <td className="">{modResults[77]}</td>
                    <td className="">{modResults[84]}</td>
                    <td className="">{modResults[92]}</td>
                    <td className="">{modResults[99]}</td>
                    <td className="">{modResults[104]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[1]}</td>
                    <td className="">{modResults[15]}</td>
                    <td className="">{modResults[28]}</td>
                    <td className="">{modResults[40]}</td>
                    <td className="">{modResults[51]}</td>
                    <td className="">{modResults[61]}</td>
                    <td className="">{modResults[70]}</td>
                    <td className="">{modResults[78]}</td>
                    <td className="">{modResults[85]}</td>
                    <td className="">{modResults[93]}</td>
                    <td className="">{modResults[100]}</td>

                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[2]}</td>
                    <td className="">{modResults[16]}</td>
                    <td className="">{modResults[29]}</td>
                    <td className="">{modResults[41]}</td>
                    <td className="">{modResults[52]}</td>
                    <td className="">{modResults[62]}</td>
                    <td className="">{modResults[71]}</td>
                    <td className="">{modResults[79]}</td>
                    <td className="">{modResults[86]}</td>
                    <td className="">{modResults[94]}</td>
                    <td className="">{modResults[101]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[3]}</td>
                    <td className="">{modResults[17]}</td>
                    <td className="">{modResults[30]}</td>
                    <td className="">{modResults[42]}</td>
                    <td className="">{modResults[53]}</td>
                    <td className="">{modResults[63]}</td>
                    <td className="">{modResults[72]}</td>
                    <td className="">{modResults[80]}</td>
                    <td className="">{modResults[89]}</td>
                    <td className="">{modResults[95]}</td>
                    <td className="">{modResults[102]}</td>

                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[4]}</td>
                    <td className="">{modResults[18]}</td>
                    <td className="">{modResults[31]}</td>
                    <td className="">{modResults[43]}</td>
                    <td className="">{modResults[54]}</td>
                    <td className="">{modResults[64]}</td>
                    <td className="">{modResults[73]}</td>
                    <td className="">{modResults[88]}</td>
                    <td className="">{modResults[90]}</td>
                    <td className="">{modResults[96]}</td>
                    <td className="">{modResults[103]}</td>

                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[5]}</td>
                    <td className="">{modResults[19]}</td>
                    <td className="">{modResults[32]}</td>
                    <td className="">{modResults[44]}</td>
                    <td className="">{modResults[55]}</td>
                    <td className="">{modResults[65]}</td>
                    <td className="">{modResults[74]}</td>
                    <td className="">{modResults[82]}</td>
                    <td className="">{modResults[91]}</td>
                    <td className="">{modResults[97]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[6]}</td>
                    <td className="">{modResults[20]}</td>
                    <td className="">{modResults[33]}</td>
                    <td className="">{modResults[45]}</td>
                    <td className="">{modResults[56]}</td>
                    <td className="">{modResults[66]}</td>
                    <td className="">{modResults[75]}</td>
                    <td className="">{modResults[83]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[7]}</td>
                    <td className="">{modResults[21]}</td>
                    <td className="">{modResults[34]}</td>
                    <td className="">{modResults[46]}</td>
                    <td className="">{modResults[57]}</td>
                    <td className="">{modResults[67]}</td>
                    <td className="">{modResults[76]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[8]}</td>
                    <td className="">{modResults[22]}</td>
                    <td className="">{modResults[35]}</td>
                    <td className="">{modResults[47]}</td>
                    <td className="">{modResults[58]}</td>
                    <td className="">{modResults[68]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[9]}</td>
                    <td className="">{modResults[23]}</td>
                    <td className="">{modResults[36]}</td>
                    <td className="">{modResults[48]}</td>
                    <td className="">{modResults[59]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[10]}</td>
                    <td className="">{modResults[24]}</td>
                    <td className="">{modResults[37]}</td>
                    <td className="">{modResults[49]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[11]}</td>
                    <td className="">{modResults[25]}</td>
                    <td className="">{modResults[38]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[12]}</td>
                    <td className="">{modResults[26]}</td>
                  </tr>
                  <tr className="border border-black border-collapse">
                    <td className="">{modResults[13]}</td>
                  </tr>
                </tbody>
              </table> */}