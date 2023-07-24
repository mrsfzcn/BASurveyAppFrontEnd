import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Input from "../../components/Input";

const AnketDuzenle = () => {
  const location = useLocation();

  const rowData = location.state;
  const [surveyOid, setsurveyOid] = useState(rowData.surveyOid);
  const [surveyTitle, setSurveyTitle] = useState(rowData.surveyTitle);
  const [survayTag, setSurveyTag] = useState(rowData.surveyTags);
  const [courseTopic, setCourseTopic] = useState(rowData.courseTopic);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(surveyOid,surveyTitle,survayTag,courseTopic);
  }


  return (
    <>

    <form onSubmit={handleSubmit}>


      <div className="flex flex-col border-cyan-950">
        <label htmlFor="">id</label>
        <Input disabled value={surveyOid} />
        <label htmlFor="">anket adı</label>
        <Input
          onChange={(e) => setSurveyTitle(e.target.value)}
          value={surveyTitle}
        />
        <label htmlFor="">anket baslıgı</label>
        <Input
          onChange={(e) => setCourseTopic(e.target.value)}
          value={courseTopic}
        />
        <label htmlFor="">anket etiketi</label>
        <Input
          onChange={(e) => setSurveyTag(e.target.value)}
          value={survayTag}
        />
        <button>Gonder</button>
      </div>
    </form>
    </>
  );
};

export default AnketDuzenle;
