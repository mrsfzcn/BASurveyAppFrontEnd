import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./table.css";
import Input from "../Input";

const Table = ({
  data,
  header,
  useIcon,
  useLabel,
  deleteTableRows,
  editTableRows,
}) => {
  const [selectedCount, setSelectedCount] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageOptions = [10, 20, 50, 100];
  const itemsPerPage = selectedCount || itemsPerPageOptions[0];

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1);
  };

  const handleRowCountChange = (e) => {
    setSelectedCount(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((rowData) => {
    const rowValues = Object.values(rowData).join("").toLowerCase();
    return rowValues.includes(filterValue.toLowerCase());
  });

  const handleRowClick = (value) => {};

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
    navigate(`/soru-listesi/guncelle/${rowData.questionOid}`, { state: rowData });
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="flex flex-col">
        <div className="first-column">
          <div className="filter-wrapper">
            <label>Göster: </label>
            <select value={itemsPerPage} onChange={handleRowCountChange}>
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label>Satır</label>
          </div>
          <div>
            <label>Ara :</label>
            <Input value={filterValue} onChange={handleFilterChange} />
          </div>
        </div>

        <div className="table-wrapper mt-5">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {header.map((item, index) => (
                    <th className="px-6 py-3" key={index}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((rowData, index) => (
                  <tr key={index} onClick={() => handleRowClick(rowData.value)}>
                    {renderTableCells(rowData)}
                    {useIcon && (
                      <td>
                        <span className="actions">
                          <button onClick={() => editTableRows(rowData)}>
                            <BsFillPencilFill className="edit-btn" />
                          </button>
                          <button
                            onClick={() => deleteTableRows(index, rowData)}
                          >
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
          <div className="footer">
            <div className="extra-content">
              Toplam {data.length}, Gösterilen veri sayısı:{" "}
              {currentItems.length}
            </div>

            <ul className="pagination">
              {pageNumbers.map((page) => (
                <li
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;

//// tabloya tıkladıgımda sayfanın açıldığı ilk duruma dönüyor....
