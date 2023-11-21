import React, { useState, useEffect } from 'react';
import axios from "axios";
import ContentHeading from '../../components/ContentHeading';
import Sidebar from '../../components/sidebar/Sidebar'
import "./UserEditPage.css";
import { useNavigate } from "react-router-dom";
import Layout from '../../components/Layout';
import Dropdown from '../../components/Dropdown';
import LocalStorageServiceAuth from "../../store/auth-store.js";
import LocalStorageServiceUser from "../../store/user-store.js";

const UserEditPage = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [mail, setMail] = useState("");
    const [role, setRole] = useState("");
    //const [userId] = useState(2); // Geçici olarak konulmuştur localstorege'a eklendiğinde kendiliğinden veriyi çekecektir.
    const userId = LocalStorageServiceUser.getUserIdToken();
    const [userEmail, setUserEmail] = useState("");
    const token = LocalStorageServiceAuth.getToken();
    const selectedRole = LocalStorageServiceUser.getUserSelectedRoleToken();
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
                 response = await axios.get(`${BASE_URL}/api/v1/student/find-user-by-student-oid/${userId}`, {
           headers: {
               Authorization: `Bearer ${token}`,
           },
       });
                break;
            case "Trainer":
                 response = await axios.get(`${BASE_URL}/api/v1/trainer/find-user-by-trainer-oid/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
         
                break;
         
             default: response = await axios.get(`${BASE_URL}/api/v1/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                LocalStorageServiceUser.removeSelectedRoleToken();
                navigate("/ogrenci-listesi");
                break;
            case "Trainer":                
                LocalStorageServiceUser.removeSelectedRoleToken();
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
        axios.put(
            `${BASE_URL}/api/v1/user/update/${userEmail}`,
            {
                firstName: name,
                lastName: surname,
                email: email,
                authorizedRole: authorizedRole,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
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