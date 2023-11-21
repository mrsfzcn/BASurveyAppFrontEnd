import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../LoginPage/login.css";
import AuthService from "../../services/AuthService.js";
import vektor5 from "../../assets/images/Login/Vector5.png";
import vektor6 from "../../assets/images/Login/Vector6.png";
import vektor7 from "../../assets/images/Login/Vector7.png";
import { decrypt } from "../../utils/encrypt.js";
import backgroundImage from "../../assets/images/Login/loginbacground.png";
import LocalStorageServiceAuth from "../../store/auth-store.js";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    const re =
      /^[a-z0-9]((\.|\+)?[a-z0-9]){1,}@bilgeadam(boost)?(akademi)?\.com$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const authItem = LocalStorageServiceAuth.getAuthToken();
    if (authItem && decrypt(authItem) === "true") {
      navigate("/yonetici-sayfasi");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Lütfen tüm alanları doldurunuz.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Lütfen geçerli bir e-mail adresi giriniz.");
      return;
    }
    if (password.length < 8) {
      setError("Şifreniz en az 8 karakter uzunluğunda olmalıdır.");
      return;
    }
    const loginData = {
      email,
      password,
    };
    AuthService.login(loginData)
      .then((response) => {        
        LocalStorageServiceAuth.setToken(response.data.token)
        if (response.data.qrCode === null) {
          navigate("/kod", { state: { codePage: true } });
        } else
          navigate("/kare-kod", {
            state: { qrCode: response.data.qrCode, qrCodePage: true },
          });
      })
      .catch((error) => {
        console.error(error);
        setError("Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz.");
      });
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form
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

        <div className="flex flex-col z-10 space-y-6 w-8/10 xldesktop:w-4/6 ">
          <label id="email" className="username">
            Kullanıcı Adı:
          </label>
          <input
            className="mb-2 pb-2 border-b-2 border-black bg-transparent outline-none shadow-none text-lg"
            type="email"
            id="email"
            placeholder="Kullanıcı adınızı giriniz."
            value={email}
            onChange={handleEmailChange}
          />
          <label className="password mt-5 ">Şifre:</label>
          <input
            className="mb-2 pb-2 border-b-2 border-black bg-transparent outline-none shadow-none text-lg"
            type="password"
            id="password"
            placeholder="Şifrenizi giriniz."
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <p className="text-red-400 font-bold text-sm ">{error}</p>}
          <div className="flex justify-center space-x-4 mt-5">
            <button
              className=" w-full h-12 flex-shrink-0
              border-none 
        
              rounded-lg 
              bg-gradient-to-br from-gray-800 via-gray-800 to-gray-500 text-white font-poppins text-base z-10 "
              onClick={handleSubmit}
            >
              GİRİŞ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
