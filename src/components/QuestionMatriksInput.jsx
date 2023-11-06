import { useState } from "react";
import Input from "./Input";
import QuestionPlusIcon from "../pages/questionPage/QuestionPlusIcon";
import DeleteIcon from "../pages/user/AllUsers/svg/delete-svg";
import { BsFillTrashFill } from "react-icons/bs";

function MatriksInput({ questionString , setQuestionString}) {
    
    // const[questions,setQuestions]=useState(questionString.split(" $$ "))
    
    const [questions, setQuestions] = useState(questionString.split(" $$ "));

    function handleChangeInput(e){
        const value= e.target.value;
        console.log(e.target.value)
        console.log(e.target.placeholder); 
        
        
        questions[e.target.placeholder]=value;
        setQuestionString(questions.join(" $$ "))
    }

    function handleClick(){
        if (questions[questions.length - 1] !== "") {
            const updatedQuestions = [...questions, ""];
            setQuestions(updatedQuestions);
            console.log(questions)
          }
    }

    function handleDeleteClick(index){
      
        const filteredQuestions= questions.filter((x,i)=>i !== index);
        setQuestions(filteredQuestions);
        setQuestionString(filteredQuestions.join(' $$ '))
    }

    return (
        <>
      <div >
        {questions.map((soru, index) => (
            <section key={index} className="flex gap-1">
          <Input
            
            // disabled={true}
            key={index}
            placeholder={index}
            onChange={handleChangeInput}
            value={soru}
            
            
            className="flex md:w-[80%] lg:w-[70%] xl:w-[60%] p-2 border rounded"
          />
          {questions.length >1 &&
          <button onClick={()=>handleDeleteClick(index)}><BsFillTrashFill className="delete-btn" /></button>}
          </section>
        ))}
        <button className="mx-1 my-1" onClick={handleClick}>
        <QuestionPlusIcon />
      </button>
      </div>
    </>
    );
  }
  
  export default MatriksInput;