import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";
import TokenService from "../../services/TokenService";
import { useNavigate } from "react-router-dom";
import vektor5 from "../../assets/images/Login/Vector5.png";
import vektor6 from "../../assets/images/Login/Vector6.png";
import vektor7 from "../../assets/images/Login/Vector7.png";
import { decrypt } from "../../utils/encrypt";
import backgroundImage from "../../assets/images/Login/loginbacground.png";
import LocalStorageServiceAuth from "../../store/auth-store.js";
const RegenerateQrCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const qrCode = location.state?.qrCode;
  const [code, setCode] = useState({
    twoFactoryKey: "",
    token: LocalStorageServiceAuth.getToken() || "",
  });

  const data = location.state;

  const handleTwoFactoryChange = (e) => {
    setCode({ ...code, twoFactoryKey: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!code.twoFactoryKey) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (code.twoFactoryKey.length !== 6) {
      setError("2FA Kodunuz 6 haneli olmalıdır.");
      return;
    }

    AuthService.verifyCode(code)
      .then((response) => {
        if (response.data === true) {
          const decodedToken = TokenService.decodeToken(code.token);
          LocalStorageServiceAuth.setIsAuthenticated();
          if (decodedToken && decodedToken.role === "ADMIN") {
            navigate("/yonetici-sayfasi");
          }
        } else {
          alert("hata var");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.");
      });
  };

  useEffect(() => {
    const authItem = LocalStorageServiceAuth.getIsAuthenticated();
    if (authItem && decrypt(authItem) === "true") {
      navigate("/yonetici-sayfasi");
    }
  }, []);

  return (
    <div
      className="h-screen  flex items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="flex flex-col 
  gap-8 items-center 
  justify-center 
  flex-shrink-0 bg-opacity-90
   bg-white 
   rounded-3xl 
   w-5/6 h-1/2 
   laptop:w-6/12 laptop:h-4/6
   xldesktop:w-4/12 xldesktop:h-3/6
   "
      >
        <img
          className="hidden xldesktop:block xldesktop:absolute top-0 left-0 z-0"
          src={vektor5}
          alt="vektor5"
        />
        <img
          className="hidden xldesktop:block xldesktop:absolute top-52 right-0 z-0"
          src={vektor6}
          alt="vektor6"
        />
        <img
          className="hidden xldesktop:block xldesktop:absolute left-28 bottom-0 z-0"
          style={{ right: "712.5px" }}
          src={vektor7}
          alt="vektor7"
        />

        <form
          className="flex flex-col z-10 items-center gap-2 w-8/10 xldesktop:w-4/6 "
          onSubmit={handleSubmit}
        >
          <img className="w-4/6 mb-2 " src={data} alt="" />
          <input
            type="text"
            className="mb-3 pb-2 border-b-2 border-black bg-transparent outline-none shadow-none text-lg w-4/6"
            onChange={handleTwoFactoryChange}
          />
          {error && <p>{error}</p>}
          <div className="flex items-center gap-2 tablet:gap-10 z-10  w-full xldesktop:w-4/6 pl-6 pr-6 tablet:pl-0 tablet:pr-0">
            <button
              className=" w-full h-12 
               border-none 
               rounded-lg 
               bg-gradient-to-br from-gray-800 via-gray-800 to-gray-500 text-white  font-poppins font-bold text-base z-10 "
            >
              <a href="/giris"> Geri dön</a>
            </button>
            <button
              className=" w-full h-12 
           border-none 
           rounded-lg 
           bg-secondColor text-black font-poppins text-base z-10"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegenerateQrCode;
