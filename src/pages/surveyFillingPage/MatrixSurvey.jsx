import { useState } from "react";

const MatrixSurveyPreview = (props)=>{

    const columns=props.options; //cevaplarimiz aslinda bizim kolonlarimiz
    const rows = props.question.split(" $$ "); //sorularimiz ise String ve soru1 $$ soru2 gibi bir yapida oldugundan split ile bir diziye topladik
    const [answers, setAnswers] = useState([])


    const handleRadioClick = (value) => {
        const [row, column] = value.split(",");
        const newAnswers = [...answers]
        console.log(`Tıklanan Butonun Konumu: Satır ${row}, Sütun ${column}`);

        newAnswers[rows.findIndex(name => name==row)] = column
        setAnswers(newAnswers)


        props.onSelected(newAnswers.join(", "));


      };


     return (
        <div className="flex justify-center items-center  ">
          <div className=" text-center ">
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
      );

};

export default MatrixSurveyPreview;