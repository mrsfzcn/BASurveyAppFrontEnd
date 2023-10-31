import { useState } from "react";
import QuestionPlusIcon from "../../pages/questionPage/QuestionPlusIcon";
import Button from "../Button";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import CrossIconLarge from "../icons/CrossIconLarge";

// !!!! MATRIX SİSTEMİNİN BACKEND TARAFI KODLANMAMIŞTIR. Satır ve Sütunların hangi veride taşınıp veritabanına işleneceğine karar verilmemişti.
// Likert örneğinde ki gibi veritaşi metoduyla alt component'ten üst sayfaya veri taşıdım. Orayı inceleyebilirsiniz!!!!!!!

const Matrix = (props) => {
    const [inputValueColumns, setInputValueColumns] = useState("");
  const [inputValueRows, setInputValueRows] = useState("");
  const [editIndexRows, setEditIndexRows] = useState(null);
  const [editIndexColumns, setEditIndexColumns] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleInputChangeRows = (e) => {
    setInputValueRows(e.target.value);
  };

  const handleAddOptionRows = () => {
    const trimmedValue = inputValueRows.trim();

    if (trimmedValue !== "") {
      if (rows.includes(trimmedValue)) {
        alert("Bu değer zaten eklenmiş!");
      } else {
       if(trimmedValue.includes(" $$ "))
       props.matrixSpecialKeywordError()
        else{
          if (editIndexRows !== null) {
            const updatedOptions = [...rows];
            updatedOptions[editIndexRows] = trimmedValue;
            setRows(updatedOptions);
            props.setMatrixQuestions(updatedOptions);
            setEditIndexRows(null);
          } else {
            setRows([...rows, trimmedValue]);
            props.setMatrixQuestions([...rows, trimmedValue]);
          }
          setInputValueRows("");
          //console.log("Satıra Yeni Değer Eklendi:", trimmedValue);
        }
        
      }
    }
  };
  const handleDeleteOptionRows = (index) => {
    const updatedOptions = rows.filter((_, i) => i !== index);
    setRows(updatedOptions);
    props.setMatrixQuestions(updatedOptions);
  };

  const handleEditOptionRows = (index) => {
    setInputValueRows(rows[index]);
    setEditIndexRows(index);
  };
  const handleCancelEditRows = () => {
    setInputValueRows("");
    setEditIndexRows(null);
  };
  ///////////////////////////////////////////////////////////////////////////
  const handleInputChangeColumns = (e) => {
    setInputValueColumns(e.target.value);
  };

  const handleAddOptionColumns = () => {
    const trimmedValue = inputValueColumns.trim();

    if (trimmedValue !== "") {
      if (columns.includes(trimmedValue)) {
        alert("Bu değer zaten eklenmiş!");
      } else {
        if (editIndexColumns !== null) {
          const updatedOptions = [...columns];
          updatedOptions[editIndexColumns] = trimmedValue;
          setColumns(updatedOptions);
          props.veriTasi(updatedOptions)
          setEditIndexColumns(null);
                 } else {
          setColumns([...columns, trimmedValue]);
          props.veriTasi([...columns, trimmedValue])
        }
        setInputValueColumns("");
        //console.log("Sütuna Yeni Değer Eklendi:", trimmedValue);
      }
    }
  };
  const handleDeleteOptionColumns = (index) => {
    const updatedOptions = columns.filter((_, i) => i !== index);
    setColumns(updatedOptions);
    props.veriTasi(updatedOptions)
  };

  const handleEditOptionColumns = (index) => {
    setInputValueColumns(columns[index]);
    setEditIndexColumns(index);
  };
  const handleCancelEditColumns = () => {
    setInputValueColumns("");
    setEditIndexColumns(null);
  };
  //console.log("Rows: " + rows);
  //console.log("Columns: " + columns);

  const handleRadioClick = (value) => {
    const [row, column] = value.split(",");
    console.log(`Tıklanan Butonun Konumu: Satır ${row}, Sütun ${column}`);
  };

  return (
    <div className="">
      <Button
        primary
        rounded
        className="relative bottom-[26px] ml-[250px]"
        onClick={() => setShowConfirmPopup(true)}
      >
        ÖNİZLEME
      </Button>
            <div className="flex">
        <div className="flex-1">
          <h2 className="text-center mb-2">Satırlar(Sorular)</h2>
          <div className="overflow-x-auto overflow-y-auto max-w-[265px] max-h-[15vh] border border-gray-300 p-1 min-w-[265px] min-h-[15vh] mt-0.5">
            {rows.map((option, index) => (
              <div key={index} className="flex items-center">
                {editIndexRows === index ? (
                  <div>
                    <button
                      className="bg-[#64E9B1] text-black  py-0.4 px-1 rounded my-1"
                      onClick={handleAddOptionRows}
                    >
                      Kaydet
                    </button>
                    <button
                      className="bg-gray-300 text-black py-0.4 px-1 rounded my-1 mx-1"
                      onClick={handleCancelEditRows}
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="py-0.4 px-1 rounded my-1 mx-1"
                      onClick={() => handleEditOptionRows(index)}
                    >
                      <BsFillPencilFill className="edit-btn" />
                    </button>
                    <button
                      className="py-0.4 px-1 rounded my-1 mx-1"
                      onClick={() => handleDeleteOptionRows(index)}
                    >
                      <BsFillTrashFill className="delete-btn" />
                    </button>
                  </>
                )}
                <div className="flex-grow">
                  {editIndexRows === index ? (
                    <input
                      className="w-32 h-8 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2"
                      type="text"
                      value={inputValueRows}
                      onChange={handleInputChangeRows}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddOptionRows();
                        }
                      }}
                    />
                  ) : (
                    <span className="mr-2 font-poppins text-base ml-1">
                      {option}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              className={`w-52 h-11 py-2 px-2 mx-2 mt-4 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2`}
              type="text"
              value={inputValueRows}
              onChange={handleInputChangeRows}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddOptionRows();
                }
              }}
              placeholder="Lütfen sorunuzu girin"
            />
            <button
              onClick={handleAddOptionRows}
              className={` text-white py-1 px-1 rounded mt-4 ${
                editIndexRows !== null ? "hidden" : ""
              } `}
            >
              <QuestionPlusIcon />
            </button>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-center mb-2">Sütunlar (Seçenekler)</h2>
          <div className="overflow-x-auto overflow-y-auto max-w-[265px] max-h-[15vh] border border-gray-300 p-1 min-w-[265px] min-h-[15vh] mt-0.5">
            {columns.map((option, index) => (
              <div key={index} className="flex items-center">
                {editIndexColumns === index ? (
                  <div>
                    <button
                      className="bg-[#64E9B1] text-black  py-0.4 px-1 rounded my-1"
                      onClick={handleAddOptionColumns}
                    >
                      Kaydet
                    </button>
                    <button
                      className="bg-gray-300 text-black py-0.4 px-1 rounded my-1 mx-1"
                      onClick={handleCancelEditColumns}
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="py-0.4 px-1 rounded my-1 mx-1"
                      onClick={() => handleEditOptionColumns(index)}
                    >
                      <BsFillPencilFill className="edit-btn" />
                    </button>
                    <button
                      className="py-0.4 px-1 rounded my-1 mx-1"
                      onClick={() => handleDeleteOptionColumns(index)}
                    >
                      <BsFillTrashFill className="delete-btn" />
                    </button>
                  </>
                )}
                <div className="flex-grow">
                  {editIndexColumns === index ? (
                    <input
                      className="w-32 h-8 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2"
                      type="text"
                      value={inputValueColumns}
                      onChange={handleInputChangeColumns}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddOptionColumns();
                        }
                      }}
                    />
                  ) : (
                    <span className="mr-2 font-poppins text-base ml-1">
                      {option}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              className={`w-52 h-11 py-2 px-2 mx-2 mt-4 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2`}
              type="text"
              value={inputValueColumns}
              onChange={handleInputChangeColumns}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddOptionColumns();
                }
              }}
              placeholder="Lütfen seçenekleri girin"
            />
            <button
              onClick={handleAddOptionColumns}
              className={` text-white py-1 px-1 rounded mt-4 ${
                editIndexColumns !== null ? "hidden" : ""
              } `}
            >
              <QuestionPlusIcon />
            </button>
          </div>
        </div>
      </div>
      {showConfirmPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#F1F1F1] p-7 rounded-lg text-center shadow-md relative">
            <div className="flex justify-end ">
              <button
                className="absolute top-3 right-3 text-gray-500 "
                onClick={() => setShowConfirmPopup(false)}
              >
                <CrossIconLarge/>
              </button>
            </div>
            <h2 className="text-center mb-4 mt-1 font-bold">
              {props.questionString}
            </h2>
            <div className="overflow-x-auto overflow-y-auto max-w-[calc(36vh - 20px)] max-h-[calc(14vh - 20px)] min-w-[calc(36vh - 20px)] min-h-[calc(14vh - 20px)] mt-0.5">
              <table className="table-fixed mx-auto">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1"></th>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-2 py-1"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <th className="border border-gray-300 px-2 py-1">
                        {row}
                      </th>
                      {columns.map((column, columnIndex) => (
                        <td
                          key={columnIndex}
                          className="border border-gray-300 px-2 py-1"
                        >
                          <input
                            type="radio"
                            name={`radio-${rowIndex}`}
                            value={`${row},${column}`}
                            onClick={(e) => handleRadioClick(e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Matrix;
