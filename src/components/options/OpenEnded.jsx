import { useState } from "react";
import Button from "../Button";
import CrossIconLarge from "../icons/CrossIconLarge";

const OpenEnded = (props) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
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
            {showConfirmPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-[#F1F1F1] p-7 rounded-lg text-center shadow-md relative">
            <div className="flex justify-end ">
              <button
                className="absolute top-3 right-3 text-gray-500 "
                onClick={() => setShowConfirmPopup(false)}> <CrossIconLarge/> </button>
            </div>
            <h2 className="text-center mb-2 mt-1 font-bold">{props.questionString}</h2>
            <div className="overflow-x-auto overflow-y-auto max-w-[calc(36vh - 20px)] max-h-[calc(14vh - 20px)] min-w-[calc(36vh - 20px)] min-h-[calc(14vh - 20px)] mt-0.5">
             <textarea className="p-2 text-md" name="textarea" id="textarea" cols="60" rows="5"></textarea>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
export default OpenEnded