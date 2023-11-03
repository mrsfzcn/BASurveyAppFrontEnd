import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "../../services/AuthService";
import TokenService from "../../services/TokenService";
import { useNavigate } from "react-router-dom";
import vektor5 from "../../assets/images/Login/Vector5.png";
import vektor6 from "../../assets/images/Login/Vector6.png";
import vektor7 from "../../assets/images/Login/Vector7.png";
import { decrypt } from "../../utils/encrypt";
import { encrypt } from "../../utils/encrypt";
import backgroundImage from "../../assets/images/Login/loginbacground.png";
const QrCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const qrCode = location.state?.qrCode;
  const [code, setCode] = useState({
    twoFactoryKey: "",
    token: localStorage.getItem("token") || "",
  });

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
          localStorage.setItem("auth", encrypt("true"));
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
    const authItem = localStorage.getItem("auth");
    if (authItem && decrypt(authItem) === "true") {
      navigate("/yonetici-sayfasi");
    }
  }, []);

  const qrCodePage = location.state?.qrCodePage;

  useEffect(() => {
    if (!qrCodePage) {
      navigate("/giris");
    }
  }, [navigate, qrCodePage]);

  if (!qrCodePage) {
    return null;
  }

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

        <div className="flex flex-col z-10 items-center gap-2 w-8/10 xldesktop:w-4/6 ">
          <img className="w-4/6 mb-2 " src={qrCode} alt="" />
          <input
            type="text"
            className="mb-3 pb-2 border-b-2 border-black bg-transparent outline-none shadow-none text-lg w-4/6"
            onChange={handleTwoFactoryChange}
          />
          {error && <p>{error}</p>}
          <div className="flex justify-center space-x-4 mt-5 w-4/6">
            <button
              className=" w-full h-12 flex-shrink-0
             border-none
             rounded-lg 
             bg-gradient-to-br from-gray-800 via-gray-800 to-gray-500 text-white font-poppins text-base z-10 "
              onClick={handleSubmit}
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
