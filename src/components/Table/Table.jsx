import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Dropdown from "../../components/Dropdown";
import "./Table.css";
import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";

const Table = ({
  data,
  header,
  useIcon,
  useLabel,
  deleteTableRows,
  editTableRows,
}) => {
  const [selectedCount, setSelectedCount] = useState(null);

  const renderedRow = header.map((item, index) => {
    return (
      <th className="px-6 py-3" key={index}>
        {item}
      </th>
    );
  });

  const handleRowClick = (value) => {
    setSelectedCount(value);
  };

  const renderTableCells = (rowData) => {
    return Object.keys(rowData).map((key, colIndex) => {
      const value = rowData[key];

      if (Array.isArray(value)) {
        return <td key={colIndex}>{value.join(", ")}</td>;
      } else {
        return <td key={colIndex}>{value}</td>;
      }
    });
  };

  const handleEditClick = (rowData) => {
    navigate(`/anketler/guncelle/${rowData.surveyOid}`, { state: rowData });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="first-column">
          <div className="filter-wrapper ">
            <label>Göster: </label>
            <select
              value={selectedCount || ""}
              onChange={(e) => setSelectedCount(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label>Satır</label>
          </div>
          <div>
            <label>Ara :</label>
            <Input />
          </div>
        </div>

        <div className="table-wrapper mt-5">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {renderedRow}
                  {useLabel && <th>Anket Etiketleri</th>}
                  {useIcon && <th>işlemler</th>}
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    0,
                    selectedCount ? parseInt(selectedCount) : data.length
                  )
                  .map((rowData, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(rowData.value)}
                    >
                      {renderTableCells(rowData)}
                      {useIcon && (
                        <td>
                          <span className="actions">
                            <button onClick={() => editTableRows(rowData)}>
                              <BsFillPencilFill className="edit-btn" />
                            </button>
                            <button onClick={() => deleteTableRows(index,rowData)}>
                              <BsFillTrashFill className="delete-btn" />
                            </button>
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
