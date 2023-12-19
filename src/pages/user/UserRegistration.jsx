import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import "./userRegistration.css";
import AuthService from "../../services/AuthService";
import Alert from "../../components/Alert";
import BreadCrumbs from "../../components/BreadCrumbs";
import MultiDropdown from "../../components/MultiDropdown";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {
  const [user, setUser] = useState({
    password: passwordGenerator(),
    firstName: "",
    lastName: "",
    roles: [],
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    { label: "ADMIN", value: "ADMIN" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "STUDENT", value: "STUDENT" },
    { label: "MASTER_TRAINER", value: "MASTER_TRAINER" },
    { label: "ASSISTANT_TRAINER", value: "ASSISTANT_TRAINER" },
  ];
  const handleSelectedOptionsChange = (updatedOptions) => {
    setSelectedOptions(updatedOptions);
    const a = updatedOptions.map((i) =>
      i.value
    );
    setUser({ ...user, roles: a })

  };

  const successNotify = (string) => toast.success(string);
  const errorNotify = (string)=> toast.error(string);

  const handleCreate = (event) => {
    event.preventDefault();
    if (user.firstName.length < 2) {
      //setAlert({ type: "error", message: "Ad 2 karakterden uzun olmalıdır." });
      errorNotify("Ad 2 karakterden uzun olmalıdır.")
      return;
    }
    if (user.lastName.length < 2) {
      // setAlert({
      //   type: "error",
      //   message: "Soyad 2 karakterden uzun olmalıdır.",
      // });
      errorNotify("Soyad 2 karakterden uzun olmalıdır.")
      return;
    }    
    if (user.roles.length < 1) {
      // setAlert({ type: "error", message: "Rol seçiniz." });
      errorNotify("Rol seçiniz.")
      return;
    }
    console.log(user);
    AuthService.register(user)
      .then((response) => {
        const selectedRoles = selectedOptions.map((option) => option.label).join(', ');
        // setAlert({
        //   type: "success",
        //   message: `${selectedRoles} rolüne sahip kullanıcı eklendi. Mail adresi: ${response.data.email}`,
        // });
        successNotify(`${selectedRoles} rolüne sahip kullanıcı eklendi. Mail adresi: ${response.data.email}`)
      })
      .catch((error) => {
        // setAlert({
        //   type: "error",
        //   message:
        //     "Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.",
        // });
        errorNotify("Beklenmeyen bir hata meydana geldi. Lütfen daha sonra tekrar deneyiniz.")
      });
  };
  const handleRedirect = () => {
    window.location.href = '/kullanici'
  };

  const header = { header: "Kullanıcı Ekle", href: "/kullanici/ekle", describe: "Kullanıcı ekleme sayfasına hoşgeldiniz buradan kullanıcı ekleyebilir, silebilir ve güncelleyebilirsiniz." };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/yonetici-sayfasi",
    },
    {
      title: "Kullanıcı İşlemleri",
      href: "/kullanici",
    },
    {
      title: "Kullanıcı Ekle",
      href: "/kullanici/ekle",
    },
  ];
//  TAM 8 HANELİ RASTGELE ŞİFRE ÜRETEN BİR METHOD YAZILDI. BACKEND'DEKI VALIDASYONU GEÇEBİLMEK İÇİN 8in ÜSTÜ BİR ŞİFRE OLUŞUYOR EXCEPTION GEÇİLMİŞ OLUYOR
  function passwordGenerator() {
    var length = 8,
      characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      returnedValue = "";
    for (var i = 0, n = characters.length; i < length; ++i) {
      returnedValue += characters.charAt(Math.floor(Math.random() * n));
    }
    return returnedValue;
  }

  return (
    <Layout>
      <div className="flex flex-col bg-[#E5E5E5] h-full ">
        <BreadCrumbs header={header} subtitle={subtitle} />
        <div className="class1 flex justify-center align-center">
          <div className="class2  bg-[#F1F1F1] flex  justify-center align-center m-auto ">
            <div className="class3  bg-[#FEFEFE] m-auto  flex flex-col justify-center gap-12 ">
              <form
                onSubmit={handleCreate}
                className=" flex flex-col justify-center gap-12"
              >
                <div className="flex flex-col gap-12 justify-center items-center">
                  <Input
                    placeholder="Ad"
                    half
                    required
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Soyad"
                    half
                    required
                    onChange={(e) =>
                      setUser({ ...user, lastName: e.target.value })
                    }
                  />
                  <div className="w-1/2 flex justify-start items-center gap-5 mobile:flex mobile:flex-col">
                    {/* <Dropdown options={options} onChange={onChange} value={selection}/> */}
                    <MultiDropdown
                      options={options}
                      selectedOptions={selectedOptions}
                      onChange={handleSelectedOptionsChange}
                    />
                    <div className="flex flex-wrap gap-4 items-center justify-center ">

                      {selectedOptions.map((option) => (
                        <span
                          className="flex justify-center items-center  px-2 py-1 rounded-md bg-[#64E9B1] text-black text-sm font-semibold"
                          key={option.value}
                        >
                          {option.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {alert.type && (
                    <Alert type={alert.type} message={alert.message} closable={true} />
                  )}
                </div>

                <div className="flex justify-center gap-7 flex-wrap">
                  <Button type="submit" primary rounded bold>
                    KAYDET
                  </Button>
                  <Button type="button" onClick={handleRedirect} secondary rounded bold>
                    VAZGEÇ
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default UserRegistration;
