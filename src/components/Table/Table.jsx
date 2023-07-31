import React, { useState } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import "./Table.css";
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
    navigate(`/anketler/guncelle/${rowData.surveyOid}`, { state: rowData });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const maxPages = 3; // Gösterilecek maksimum sayfa sayısı
  const pageOffset = Math.floor(maxPages / 2);

  let startPage = currentPage - pageOffset;
  if (startPage < 1) {
    startPage = 1;
  }

  let endPage = startPage + maxPages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPages + 1, 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  // Son sayfaya gitme işlemi
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <>
      <div className="flex flex-col  bg-white mr-10 ml-10 py-5">
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
                  {useLabel && <th>Anket Etiketleri</th>}
                  {useIcon && <th>işlemler</th>}
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
              <li onClick={goToFirstPage}>&laquo;&laquo;</li>{" "}
              <li onClick={goToPrevPage}>&laquo;</li>{" "}
              {pageNumbers.map((page) => (
                <li
                  key={page}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </li>
              ))}
              <li onClick={goToNextPage}>&raquo;</li>{" "}
              <li onClick={goToLastPage}>&raquo;&raquo;</li>{" "}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
