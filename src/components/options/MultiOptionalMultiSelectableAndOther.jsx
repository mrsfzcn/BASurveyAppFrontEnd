import { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import InputMulti from "../InputMulti";
import QuestionPlusIcon from "../../pages/questionPage/QuestionPlusIcon";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import CrossIconLarge from "../icons/CrossIconLarge";

const MultiOptionalMultiSelectableAndOther = (props) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOption = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue !== "") {
      if (options.includes(trimmedValue)) {
        alert("Bu değer zaten eklenmiş!");
      } else {
        if (editIndex !== null) {
          const updatedOptions = [...options];
          updatedOptions[editIndex] = trimmedValue;
          setOptions(updatedOptions);
          setEditIndex(null);
        } else {
          setOptions([...options, trimmedValue]);
        }
        setInputValue("");
        //console.log("Yeni Değer Eklendi:", trimmedValue);
      }
    }
  };

  const handleDeleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleEditOption = (index) => {
    setInputValue(options[index]);
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setInputValue("");
    setEditIndex(null);
  };

  useEffect(() => {
    props.veriTasi(options);
  }, [options]);
  //console.log(options);

  return (
    <div className="App">
      <Button
        primary
        rounded
        className="relative bottom-[26px] ml-[250px]"
        onClick={() => setShowConfirmPopup(true)}
      >
        ÖNİZLEME
      </Button>
      <div className="overflow-x-auto overflow-y-auto max-w-[46vh] max-h-[22vh] border border-gray-300 p-1 min-w-[46vh] min-h-[22vh] mt-0.5">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            {editIndex === index ? (
              <div>
                <button
                  className="bg-[#64E9B1] text-black py-0.4 px-1 rounded my-1"
                  onClick={handleAddOption}
                >
                  Kaydet
                </button>
                <button
                  className="bg-gray-300 text-black py-0.4 px-1 rounded my-1 mx-1"
                  onClick={handleCancelEdit}
                >
                  İptal
                </button>
              </div>
            ) : (
              <>
                <button
                  className="py-0.4 px-1 rounded my-1 mx-1"
                  onClick={() => handleEditOption(index)}
                >
                  <BsFillPencilFill className="edit-btn" />
                </button>
                <button
                  className="py-0.4 px-1 rounded my-1 mx-1"
                  onClick={() => handleDeleteOption(index)}
                >
                  <BsFillTrashFill className="delete-btn" />
                </button>
              </>
            )}
            <div className="flex-grow">
              {editIndex === index ? (
                <input
                  className="w-52 h-8 py-2 px-2 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddOption();
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
          className={`w-52 h-11 py-2 px-2 mx-4 mt-4 rounded border border-gray-300 font-poppins text-base leading-6 text-left outline-none mobile:w-40 mobile:ml-2 ${
            editIndex !== null ? "hidden" : ""
          }`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddOption();
            }
          }}
          placeholder="Bir seçenek girin"
        />
        <button
          onClick={handleAddOption}
          className={` text-white py-1 px-1 rounded mt-4 ${
            editIndex !== null ? "hidden" : ""
          } `}
        >
          <QuestionPlusIcon />
        </button>
      </div>
      {showConfirmPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#F1F1F1] p-7 rounded-lg text-center shadow-md relative">
            <div className="flex justify-end ">
              <button
                className="absolute top-3 right-3 text-gray-500 "
                onClick={() => setShowConfirmPopup(false)}
              >
                {" "}
                <CrossIconLarge />{" "}
              </button>
            </div>
            <h2 className="text-center mb-2 mt-1 font-bold">
              {props.questionString}
            </h2>
            <div className="overflow-x-auto overflow-y-auto max-w-[calc(36vh - 20px)] max-h-[calc(14vh - 20px)] min-w-[calc(36vh - 20px)] min-h-[calc(14vh - 20px)] mt-0.5">
              {options.map((option, index) => (
                <div key={index} className="my-2 flex items-center">
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    className="mr-2 flex-start w-4 h-4"
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-start ml-4 text-md"
                  >
                    {option}
                  </label>
                </div>
              ))}
              <div className="my-2 flex items-center">
                <input
                  type="checkbox"
                  id="addOptionCheckboxStart"
                  className="mr-2 flex-start w-4 h-4"
                />
                <InputMulti
                  type="text"
                  className="ml-4"
                  placeholder="Yeni opsiyon girebilirsiniz"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MultiOptionalMultiSelectableAndOther;
