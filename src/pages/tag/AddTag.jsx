import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs";
import Table from "../../components/Table/Table";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TagService from "../../services/TagService";
import MultiDropdown from "../../components/MultiDropdown";
import Alert from "../../components/Alert";
function AddTag() {
  const navigate = useNavigate();
  //Breadcrumb
  const header = {
    header: "Etiketler",
    href: "/etiket",
    describe:
      "Etiketler sayfasına hoşgeldiniz buradan etiket ekleyebilir, silebilir ve güncelleyebilirsiniz.",
  };
  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi",
    },
    {
      title: "Etiket İşlemleri",
      href: "/etiket",
    },
  ];
  const [tag, setTag] = useState({
    tagClass: [],
    tagName: "",
  });
  const [tags, setTags] = useState([]);
  const [updateTag, setUpdateTag] = useState(false);
  const options = [
    { label: "QUESTION", value: "QUESTION" },
    { label: "STUDENT", value: "STUDENT" },
    { label: "SURVEY", value: "SURVEY" },
    { label: "TRAINER", value: "TRAINER" },
  ];
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [deleteMessage,setDeleteMessage] = useState("");
  const [deleteTag, setDeleteTag] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const header2 = ["Etiket Adı", "Etiket Sınıfı"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleEditClick = (rowData) => {
    console.log(rowData);
    navigate(`/etiket/guncelle/` + rowData.tagName, { state: rowData });
  };


  const deleteTableRows = async (index, rowData) => {
    const shouldDelete = window.confirm("Bu etiketi silmek istediğinize emin misiniz?");
    if (shouldDelete) {
      try {
        const tagString = rowData.tagName
        const response = await TagService.deleteTag(tagString);
        console.log(response);
        if (response.status === 200) {
          setDeleteMessage(rowData.tagName + " başarıyla silindi.")
          setIsPopupOpen(true); 
          const rows = [...tags];
          rows.splice(index, 1);
          setTags(rows);
          setDeleteTag(true);
        } else {
          alert("Bir hata meydana geldi");
        }
      } catch (error) {
        console.log(error);
        setDeleteMessage("Cevaplanmış anketler silinemez")
        setIsPopupOpen(true); 
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tag.tagName.length < 1) {
      setAlert({ type: "error", message: "Etiket adı boş bırakılamaz." });
      return;
    }
    if (tag.tagClass.length < 1) {
      setAlert({ type: "error", message: "Etiket sınıfı boş bırakılamaz." });
      setTimeout(()=>{
        setAlert({type: "", message: ""});
      },3000);
      return;
    }
  
  const upperCaseTagName = tag.tagName.toUpperCase();
  
  const existingTag = tags.find(
    (existingTag) =>
      existingTag.tagName === upperCaseTagName &&
      existingTag.tagClasses.includes(...tag.tagClass)
  );

  if (existingTag) {
    setAlert({
      type: "error",
      message: `Bu etiket ve sınıf kombinasyonu zaten mevcut: Etiket Adı -
       ${existingTag.tagName}\nMevcut etiket sınıfı - ${existingTag.tagClasses}`,
    });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 5000);
    return;
}

    TagService.createTag({...tag, tagName : upperCaseTagName})
      .then((response) => {
        setAlert({ type: "success", message: "Etiket başarıyla eklendi." });
        setTimeout(()=>{
          setAlert({type: "", message: ""});
        },3000);
        setTag({ ...tag, tagClass: [] });
        setUpdateTag(true);
        e.target.reset();
        setSelectedOptions([]);
      })
      .catch((error) => {
        setAlert({ type: "error", message: "Bir hata meydana geldi." });
      });
  };

  useEffect(() => {
    setDeleteTag(false)
    setUpdateTag(false);
    const fetchTags = async () => {
      try {
        const response = await TagService.getAllTag();
        if (response.status === 200) {
          const groupedTags = response.data.reduce((acc, tag) => {
            if (!acc[tag.tagName]) {
              acc[tag.tagName] = [];
            }
            acc[tag.tagName].push(tag.tagClass);
            return acc;
          }, {});

          const formattedTags = Object.entries(groupedTags).map(
            ([tagName, tagClasses]) => ({
              tagName,
              tagClasses,
            })
          );

          setTags(formattedTags);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
    return () => {
      console.log("useEffect clean up");
    };
  }, [updateTag, deleteTag]);

  const handleSelectedOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
    const a = updatedOptions.map((i) => i.value);
    setTag({ ...tag, tagClass: a });
  };

  return (
    <Layout>
      <div className="flex flex-col   bg-slate-100 h-full">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-8 w-3/4 mobile:flex-col"
          >
            <div className="flex flex-col gap-4 w-1/2 ">
              <Input
                placeholder="Etiket Adı"
                full
                required
                onChange={(e) => setTag({ ...tag, tagName: e.target.value })}
              />
              <div className="flex gap-2 mobile:flex-col">
                {selectedOptions.map((option) => (
                  <p
                    className="flex justify-center items-center  px-2 py-1 rounded-md bg-[#64E9B1] text-black text-sm font-semibold mobile:flex-col"
                    key={option.value}
                  >
                    {option.label}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <MultiDropdown
                options={options}
                selectedOptions={selectedOptions}
                onChange={handleSelectedOptionsChange}
              />

              <Button type="submit" primary rounded bold>
                Etiket Ekle
              </Button>
            </div>
          </form>
          <div className="w-1/2 flex justify-center">
            {alert.type && <Alert type={alert.type} message={alert.message} />}
          </div>
          <Table
            data={tags}
            header={header2}
            useIcon={true}
            editTableRows={handleEditClick}
            deleteTableRows={deleteTableRows}
          />
        </div>
      </div>
    </Layout>
  );
}

export default AddTag;
