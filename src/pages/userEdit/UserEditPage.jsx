import { useState, useEffect } from 'react';
import ContentHeading from '../../components/ContentHeading';
import "./UserEditPage.css";
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout';
import LocalStorageServiceUser from "../../store/user-store.js";
import UserEditService from '../../services/UserEditService.js';

const UserEditPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [role, setRole] = useState("");
  //const [userId] = useState(2); // Geçici olarak konulmuştur localstorege'a eklendiğinde kendiliğinden veriyi çekecektir.
  const userId = LocalStorageServiceUser.getUserId();
  const [userEmail, setUserEmail] = useState("");
  const selectedRole = LocalStorageServiceUser.getUserSelectedRole();
  const navigate = useNavigate();

  const [initialUserData, setInitialUserData] = useState({
    name: "",
    surname: "",
    mail: "",
    role: "",
  });


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response;
      switch (selectedRole) {
        case "Student":
          response = await UserEditService.getStudent(userId);
          break;
        case "Trainer":
          response = await UserEditService.getTrainer(userId);
          break;
        default: response = await UserEditService.get(userId);
          break;
      }

      const data = response.data;

      setName(data.firstName);
      setSurname(data.lastName);
      setMail(data.email);
      setUserEmail(data.email);
      setRole(data.authorizedRole);

      setInitialUserData({
        name: data.firstName,
        surname: data.lastName,
        mail: data.email,
        role: data.authorizedRole,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "userEmail") {
      setUserEmail(value);
    }
  };

  const handleCancel = () => {
    setName(initialUserData.name);
    setSurname(initialUserData.surname);
    setMail(initialUserData.mail);
    setRole(initialUserData.role);

    switch (selectedRole) {
      case "Student":
        LocalStorageServiceUser.removeSelectedRole();
        navigate("/ogrenci-listesi");
        break;
      case "Trainer":
        LocalStorageServiceUser.removeSelectedRole();
        navigate("/egitmen-listesi");
        break;
      default:
        navigate("/kullanici")
        break;
    }

  };

  const namehandleChange = (event) => {
    event.preventDefault()
    setName(event.target.value);
  };
  const surnamehandleChange = (event) => {
    event.preventDefault()
    setSurname(event.target.value);
  };
  const mailhandleChange = (event) => {
    event.preventDefault()
    setMail(event.target.value);
  };
  const rolehandleChange = (event) => {
    event.preventDefault()
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    const firstName = name;
    const lastName = surname;
    const email = mail;
    const authorizedRole = role;
    console.log(role);
    await UserEditService.update(userEmail,
      {
        firstName: name,
        lastName: surname,
        email: email,
        authorizedRole: authorizedRole,
      }
    ).then((response) => {
      console.log("Update successful:", response.data)
    })
      .catch((error) => {
        console.error("Error updating data:", error)
      })
    console.log(name);
    console.log(firstName);
    console.log(lastName);
    console.log(role.label);
    navigate("/kullanici");
  };


  return (
    <Layout>
      <div className='user-edit-page'>
        <div className='outer-react'>
          <ContentHeading />
          <div className='inner-react'>
            <div className="inner2-react">
              <div className="inputs">
                <div className="input-field">
                  <label htmlFor="name">İsim</label>
                  <input type="text" id='name' value={name} onChange={namehandleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="surname">Soyisim</label>
                  <input type="text" id='surname' value={surname} onChange={surnamehandleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="mail">Email</label>
                  <input type="text" id='mail' value={mail} onChange={mailhandleChange} />
                </div>
                <div className="input-field">
                  <label htmlFor="role">Role</label>
                  <select id='role' value={role} onChange={rolehandleChange}>
                    <option value={role}>{role}</option>
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Yönetici</option>
                    <option value="MASTER_TRAINER">Master Trainer</option>
                    <option value="ASSISTANT_TRAINER">Assistant Trainer</option>
                    <option value="STUDENT">Student</option>
                  </select>
                </div>
              </div>
              <div className='buttons'>
                <button className='kaydet' onClick={handleSubmit}>KAYDET</button>
                <button className='vazgec' onClick={handleCancel}>VAZGEÇ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserEditPage;