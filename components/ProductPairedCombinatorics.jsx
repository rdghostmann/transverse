"use client";
import targetPairs from "@/lib/targetPair";
import React, { useRef, useState } from "react";

const ProductPairedCombinatorics = () => {
  const tbl = useRef(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [modResults, setModResults] = useState([]);
  const [userNumbers, setUserNumbers] = useState(Array(15).fill('')); // State for user input numbers
  const [chooseN, setChooseN] = useState(2); // State for "choose n"

  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [tableData, setTableData] = useState([]);

  const createTable = () => {
    const newTableData = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => "")
    );
    setTableData(newTableData);
  };

    // Function to shuffle the userNumbers array
    const handleRandomize = () => {
      const shuffledNumbers = [...userNumbers]
        .filter(num => num !== '') // Exclude empty inputs
        .sort(() => Math.random() - 0.5); // Shuffle the array
  
      // Fill empty inputs with blank strings after shuffling
      while (shuffledNumbers.length < userNumbers.length) {
        shuffledNumbers.push('');
      }
  
      setUserNumbers(shuffledNumbers); // Update state with shuffled numbers
    };
  
  
  // Function to calculate the "choose n" sums and return modulus 90
  const calculateChooseN = (n) => {
    const numbers = userNumbers.map(num => parseInt(num)).filter(num => !isNaN(num));

    let results = [];

    const combinations = (arr, n, start = 0, currentCombo = []) => {
      if (currentCombo.length === n) {
        const product = currentCombo.reduce((acc, val) => acc * val, 1);
        results.push(product % 90);
        return;
      }

      for (let i = start; i < arr.length; i++) {
        combinations(arr, n, i + 1, [...currentCombo, arr[i]]);
      }
    };

    combinations(numbers, n);
    return results;
  };

  // Handle calculation and store the mod results
  const handleCalculate = () => {
    if (chooseN < 2 || chooseN > 44) {
      alert("Choose n must be between 2 and 44");
      return;
    }
    const results = calculateChooseN(chooseN);
    setModResults(results);
    setTimeout(() => {
      handleResultCheck();
    }, 2000);
    confirm(`Choose ${chooseN} generated`);
  };

  const handleResultCheck = () => {
    const tableCells = tbl?.current.querySelectorAll('td');
    const analytics = {};

    // Clear previous highlights
    tableCells.forEach(cell => cell.classList.remove('bg-purple-500', 'text-white'));

    // Traverse each row to find specific adjacent pairs and count occurrences
    for (let i = 0; i < tableCells.length - 1; i++) {
      const currentCell = tableCells[i];
      const nextCell = tableCells[i + 1];
      const currentNum = currentCell.innerText.trim();
      const nextNum = nextCell.innerText.trim();

      // Check if the current pair matches any of the target patterns
      targetPairs.forEach(([first, second]) => {
        if (currentNum === first && nextNum === second) {
          const pairKey = `${first} ${second}`;

          // Track pairs and their occurrences
          if (analytics[pairKey]) {
            analytics[pairKey].push([currentCell, nextCell]);
          } else {
            analytics[pairKey] = [[currentCell, nextCell]];
          }
        }
      });
    }

    // Highlight only pairs that appear more than once and update analyticsData
    const highlightedData = [];
    Object.entries(analytics).forEach(([pairKey, cellPairs]) => {
      if (cellPairs.length > 1) { // Only highlight if the pair appears more than once
        cellPairs.forEach(([currentCell, nextCell]) => {
          currentCell.classList.add('bg-purple-500', 'text-white');
          nextCell.classList.add('bg-purple-500', 'text-white');
        });
        highlightedData.push([pairKey, cellPairs.length]); // Add pair and occurrence count
      }
    });

    // Update analyticsData with pairs and counts
    setAnalyticsData(highlightedData.length > 1 ? highlightedData : [["No pairs found"]]);
  };

  return (
    <>
      <section className="hidden md:block text-xs">
        <div className="overflow-x-scroll m-6">
          <div className="flex flex-row space-x-1 sm:flex">
            <div className="border w-1/4 mx-auto p-2 flex flex-col result-checker">
              {/* Analytics Data Display */}
              <section className="analytics mt-4 text-center">
                <h3 className="text-lg font-semibold">Analytics Data🎱</h3>
                <ul className="list-disc list-inside">
                  {analyticsData.map(([pair, count], index) => (
                    <li key={index} className="text-sm">
                      <p> Pair: <span className='font-bold'>{pair}</span> <br /> <span className='text-red-600 font-bold'>Occurrences:</span> {count}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div className="w-9/12 h-fit">
              <div className="max-w-fit my-5 flex flex-col items-center">
                <label htmlFor="choose-n" className="text-sm font-light">
                  Choose N:
                </label>
                <input
                  id="choose-n"
                  type="number"
                  min="2"
                  max="7"
                  value={chooseN}
                  onChange={(e) => setChooseN(parseInt(e.target.value))}
                  className="p-1 mb-2 border rounded"
                />
                <button onClick={handleCalculate} className="mx-auto bg-slate-700 text-white rounded px-2 py-1">
                  Calculate Choose {chooseN}
                </button>
                <div className="flex justify-center my-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleRandomize()}
                  >
                    Randomize N-Input
                  </button>
                </div>
              </div>
              <table className="w-full h-fit border border-black border-collapse text-center text-sm">
                <thead>
                  {Array.from({ length: 1 }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="bg-gray-200">
                      {Array.from({ length: 15 }).map((_, colIndex) => {
                        const index = rowIndex * 15 + colIndex;
                        return (
                          <td key={index} className="border pb-3 border-black text-xs border-collapse">
                            <div className="text-xs text-center mb-1">col{index + 1}</div>
                            <input
                              className="w-full mx-auto text-xs p-2 m-1 border rounded"
                              type="number"
                              min={1}
                              max={90}
                              value={userNumbers[index] || ''}
                              onChange={(e) => {
                                const newNumbers = [...userNumbers];
                                newNumbers[index] = e.target.value;
                                setUserNumbers(newNumbers);
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody ref={tbl}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <tr key={colIndex} className="border border-black border-collapse">
                      {Array.from({ length: modResults.length - colIndex }).map((_, rowIndex) => {
                        const resultIndex = rowIndex + colIndex;
                        return (
                          <td key={rowIndex} className="border border-black text-xs border-collapse">
                            {modResults[resultIndex] !== undefined ? modResults[resultIndex] : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
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

                {tableData.length > 0 && (
                  <table ref={tbl} className="border border-gray-500 w-full text-center">
                    <tbody>
                      {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.from({ length: columns }).map((_, colIndex) => {
                            const modResultIndex = colIndex * rows + rowIndex;
                            return (
                              <td
                                key={colIndex}
                                className ="border border-gray-500 p-2"
                              >
                                {modResults[modResultIndex] !== undefined
                                  ? modResults[modResultIndex]
                                  : ""}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block sm:block md:hidden w-full h-screen">
        <div className="animate-bounce mx-auto mt-20 w-3/4">
          <p className="text-center text-xs">This is a Desktop Application</p>
          <p className="text-center text-xs">Please view with a Wider Screen</p>
        </div>
      </section>
    </>
  );
};

export default ProductPairedCombinatorics;