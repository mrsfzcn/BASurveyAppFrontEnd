import React, { useState } from "react";
import "./code.css";
import AuthService from "../../services/AuthService";
import TokenService from "../../services/TokenService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import vektor5 from "../../assets/images/Login/Vector5.png";
import vektor6 from "../../assets/images/Login/Vector6.png";
import vektor7 from "../../assets/images/Login/Vector7.png";
import Input from "../../components/Input";
const Code = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
          if (decodedToken && decodedToken.role === "ADMIN") {
            navigate("/adminhome");
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

  return (
    <>
      <div className="main">
        <div className="content">
          <img className="vektor5" src={vektor5} alt="vektor5" />
          <img className="vektor6" src={vektor6} alt="vektor6" />
          <img className="vektor7" src={vektor7} alt="vektor7" />
          <div className="user-menu flex flex-col justify-center items-center ">
            <div className="flex flex-col w-full">
              <label htmlFor="code" className="username">
                2FA Code
              </label>

              <input
                className="placeholder-input "
                type="text"
                id="code"
                placeholder="2FA Code"
                value={code.twoFactoryKey}
                onChange={handleTwoFactoryChange}
              />
              {error && <p>{error}</p>}
            </div>
            <div className="flex gap-2 flex-col ">
              <button className="button" onClick={handleSubmit}>
                Gönder
              </button>
              <Link to="/login">
                <button className="button">Giriş sayfasına geri dön</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Code;
