import React, { useState , useEffect} from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import TagService from "../../services/TagService";
import Alert from "../../components/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import MultiDropdown from "../../components/MultiDropdown";
import BreadCrumbs from "../../components/BreadCrumbs";

const UpdateTag = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state;
  const options = [
    { label: "QUESTION", value: "QUESTION" },
    { label: "STUDENT", value: "STUDENT" },
    { label: "SURVEY", value: "SURVEY" },
    { label: "TRAINER", value: "TRAINER" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [updateTag, setUpdateTag] = useState({
    tagString: rowData.tagName,
    newTagString: rowData.tagName,
    tagClass: rowData.tagClasses,
  });

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setUpdateTag({ ...updateTag, newTagString: e.target.value.toUpperCase() });
  };
  
  useEffect(()=>{ 

    setSelectedOptions(rowData.tagClasses.map((tagClassCurrent) => 
    ({label: tagClassCurrent, value: tagClassCurrent})));

    }
 ,[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    
    try {
      if (!updateTag.newTagString) {
        setAlert({ type: "error", message: "Yeni Etiket boş olamaz." });
        setLoading(false);
        return;
      }
      if (updateTag.tagClass.length == 0) {
        setAlert({ type: "error", message: "Etiket sınıfı boş bırakılamaz." });
        return;
      }

      const response = await TagService.updateTagAndClasses(updateTag);
      if (response.status === 200) {
        setAlert({ type: "success", message: "Etiket başarıyla güncellendi." });
        navigate("/etiket");
      } else {
        setAlert({
          type: "error",
          message: "Etiket güncelleme başarısız oldu.",
        });
      }
    } catch (error) {
      console.error("Error updating tag:", error);
      setAlert({
        type: "error",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  };

  //vazgeç butonuna basarsa kullanılan method
  const navigateMain = (e) => {
    navigate("/etiket");
  };
  const handleSelectedOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
    const a = updatedOptions.map((i) => i.value);
    setUpdateTag({ ...updateTag, tagClass: a });
  };

  //

  const header = {
    header: "Etiket Güncelle",
    href: "/etiket/guncelle",
    describe:
      "Etiket Güncelleme sayfasıdır. Bu sayfada etiket güncelleyebilirsiniz.",
  };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/",
    },
    {
      title: "Etiket İşlemleri",
      href: "/etiket",
    },
    {
      title: "Etiket Güncelle",
      href: "/etiket/guncelle",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col bg-white h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <form
          onSubmit={handleSubmit}
          className="class1 flex justify-center align-center"
        >
          <div className="class2 bg-[#F1F1F1] flex justify-center align-center m-auto ">
            <div className="class3 bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-14 ">
              <div className="flex flex-col gap-14 justify-center items-center">
                <Input half disabled value={rowData.tagName+" (Mevcut Etiket Adı)"} />
            <div className="flex flex-col gap-2 w-1/2 ">
              <Input
                placeholder="Yeni Etiket Adını Giriniz."
                full
                required
                onChange={onChange}
                value={updateTag.newTagString}
              />
              <div className="flex gap-2">
                {selectedOptions.map((option) => (
                  <p
                    className="flex justify-center items-center  px-2 py-1 rounded-md bg-[#64E9B1] text-black text-sm font-semibold"
                    key={option.value}
                  >
                    {option.label}
                  </p>
                ))}
              </div>
            </div>
            <span className ="flex flex-row items-center gap-4">
            <p className="text-base font-medium mr-2">Etiket Sınıfı :</p>
            <div className="">
              <MultiDropdown
                options={options}
                selectedOptions={selectedOptions}
                onChange={handleSelectedOptionsChange}
              />


            </div>
            </span>
                <div className="w-1/2 flex justify-center">
                  {alert.type && (
                    <Alert type={alert.type} message={alert.message} />
                  )}
                </div>
              </div>
              
              <div className="flex justify-center gap-7 flex-wrap">
                <Button className="" primary rounded bold type="submit">
                  {loading ? "Yükleniyor..." : "KAYDET"}
                </Button>
                <Button
                  onClick={navigateMain}
                  className=""
                  secondary
                  rounded
                  bold
                >
                  VAZGEÇ
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div></div>
    </Layout>
  );
};

export default UpdateTag;
