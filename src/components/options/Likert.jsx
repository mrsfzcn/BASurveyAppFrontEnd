import { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import CrossIconLarge from "../icons/CrossIconLarge";

const Likert = (props) => {
  const [options, setOptions] = useState([]);
  const [bottomLeftValue, setBottomLeftValue] = useState("");
  const [bottomRightValue, setBottomRightValue] = useState("");
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleValueSelect = (value) => {
    setOptions(value);
    //console.log("Seçilen Değer:", value);
  };

  const handleBottomLeftInputChange = (e) => {
    setBottomLeftValue(e.target.value);
  };

  const handleBottomRightInputChange = (e) => {
    setBottomRightValue(e.target.value);
  };

  const handleStartValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue >= 0 && newValue <= 1 && newValue < endValue) {
      setStartValue(newValue);
    }
  };

  const handleEndValueChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue > startValue && newValue <= 10) {
      setEndValue(newValue);
    }
  };

  useEffect(() => {
    setOptions((prevOptions) => {
      const newOptions = [
        startValue,
        endValue,
        bottomLeftValue,
        bottomRightValue,
      ];
      props.veriTasi(newOptions);
      //console.log(newOptions);
      return newOptions;
    });
  }, [bottomLeftValue, bottomRightValue, startValue, endValue]);

  const renderScale = () => {
    const scaleValues = Array.from(
      { length: endValue - startValue + 1 },
      (_, index) => startValue + index
    );

    return (
      <div className="flex items-center ml-5">
        {scaleValues.map((value) => (
          <div
            key={value}
            className={`likert-option ${
              options === value
                ? "bg-gray-500 text-white"
                : "bg-white border border-gray-300"
            } px-3.5 py-2 cursor-pointer transition duration-300`}
            onClick={() => handleValueSelect(value)}
          >
            {value}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Button
        primary
        rounded
        className="relative bottom-[26px] ml-[250px]"
        onClick={() => setShowConfirmPopup(true)}
      >
        ÖNİZLEME
      </Button>
      <div className="mt-1 border border-gray-300 pl-5 pr-5 pt-5 w-[31.5rem] h-[11rem] overflow-hidden">
        <div className="flex justify-between mb-2">
          <Input
            id="startValueInput"
            className="px-2 py-1 w-12 text-sm"
            type="number"
            value={startValue}
            onChange={handleStartValueChange}
          />
          <Input
            id="endValueInput"
            className="px-2 py-1 w-12 text-sm"
            type="number"
            value={endValue}
            onChange={handleEndValueChange}
          />
        </div>
        {renderScale()}
        <div className="flex justify-left w-full">
          <div className="text-left">
            <label htmlFor="bottomLeftInput" className="text-xs">
              Sol Etiket:
            </label>
            <Input
              id="bottomLeftInput"
              className="px-2 py-1 w-full text-sm  "
              type="text"
              value={bottomLeftValue}
              onChange={handleBottomLeftInputChange}
            />
          </div>
          <div className="flex justify-end w-full">
            <div className="text-right">
              <label
                htmlFor="bottomRightInput"
                className="text-xs block mr-[120px] mt-[8px]"
              >
                Sağ Etiket:
              </label>
              <Input
                id="bottomRightInput"
                className="px-2 py-1 w-full text-sm  "
                type="text"
                value={bottomRightValue}
                onChange={handleBottomRightInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      {showConfirmPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#F1F1F1] p-7 rounded-lg text-center shadow-md relative pb-10">
            <div className="flex justify-end">
              <button
                className="absolute top-3 right-3 text-gray-500"
                onClick={() => setShowConfirmPopup(false)}
              >
                <CrossIconLarge />
              </button>
            </div>
            <h2 className="text-center mb-4 mt-1 font-bold">
              {props.questionString}
            </h2>
            <div className="flex justify-center overflow-x-auto overflow-y-auto max-w-[calc(36vh - 20px)] max-h-[calc(14vh - 20px)] min-w-[calc(36vh - 20px)] min-h-[calc(14vh - 20px)] mt-0.5">
              <div className="flex justify-center items-center w-[600px] min-w-[750px] max-w-750px ">
                <div className="text-left w-1/4 ">
                  <label className="text-md">{bottomLeftValue}</label>
                </div>
                <div className="w-1/2">
                  <div className="flex justify-center">
                    {Array.from(
                      { length: endValue - startValue + 1 },
                      (_, index) => (
                        <div
                          key={index}
                          className={`likert-option ${
                            options === startValue + index
                              ? "bg-gray-500 text-white"
                              : "bg-white border border-gray-300"
                          } px-3.5 py-2 cursor-pointer transition duration-300`}
                          onClick={() => {
                            handleValueSelect(startValue + index);
                            //console.log("Tıklanan Değer:", startValue + index);
                          }}
                        >
                          {startValue + index}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="text-right w-1/4 ml-4">
                  <label className="text-md">{bottomRightValue}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Likert;
