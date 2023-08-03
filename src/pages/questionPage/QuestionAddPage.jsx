import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Layout from "../../components/Layout";

import AuthService from "../../services/AuthService";
import Alert from "../../components/Alert";
import BreadCrumbs from "../../components/BreadCrumbs";
import MultiDropdown from "../../components/MultiDropdown";
import { BsTextarea } from "react-icons/bs";
import CustomComboBox from './CustomComboBox';
import CustomComboBoxPlus from './CustomComboBoxPlus';
import QuestionPlusIcon from './QuestionPlusIcon';

const QuestionAddPage = () => {


    const handleRedirect = () => {
        window.location.href = '/questionlist'
    };

    const header = { header: "Soru Ekle", href: "/questionlist/add" };
    const soruTipleri = [
        { value: 'tip1', label: 'Tip 1' },
        { value: 'tip2', label: 'Tip 2' },
        { value: 'tip3', label: 'Tip 3' },

    ];

    const options = [
        { value: 'option1', label: 'ali' },
        { value: 'option2', label: 'ay' },
        { value: 'option3', label: 'can' },
        { value: 'option4', label: 'cankkk' },
        { value: 'option5', label: 'can' },
        { value: 'option6', label: 'can' },
        { value: 'option7', label: 'can' },
        { value: 'option8', label: 'can' },
        { value: 'option9', label: 'can' },{ value: 'option10', label: 'can' },
        // Daha fazla seçeneği buraya ekleyebilirsiniz
    ];

    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const subtitle = [
        {
            title: "Anasayfa",
            href: "/adminhome",
        },
        {
            title: "Soru İşlemleri",
            href: "/questionlist"
        },
        {
            title: "Soru Ekle",
            href: "/questionlist/add",
        },
    ];

   

    return (
        <Layout>
            <div className="flex flex-col bg-[#E5E5E5] h-full">
                <BreadCrumbs header={header} subtitle={subtitle} />
                <div className="  flex justify-center align-center" style={{
                    height: '90%',
                }} >
                    <div className="  bg-[#F1F1F1] flex  justify-center align-center m-auto "
                        style={{
                            width: '41%',
                            height: '76.8vh',
                            borderRadius: '1rem',
                            position: 'absolute',
                            flexDirection: 'column',
                            paddingRight: '5rem',
                            justifyContent: 'center'

                        }}
                    >

                        <div style={{
                            width: '11vw',
                            height: '100%',
                            top: '5rem',
                            right: '27.6vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute'

                        }}>
                            <p >
                                Soru metninizi giriniz:
                            </p>

                        </div>
                        <div className="flex justify-center align-center m-auto" style={{ right: '1%', position: 'absolute', height: '28%', width: '100%', top: "7rem", }}>
                            <textarea
                                name="text" rows="12" cols="50"
                                style={{
                                    width: '89%',
                                    borderRadius: '.1rem',
                                    padding: '.9rem', 
                                    border: '1px solid #ccc', 
                                    boxSizing: 'border-box',
                                    fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                    fontFamily: 'Poppins',
                                    textAlign: 'left',
                                    wordWrap: 'break-word',
                                    resize: 'none', 
                                    overflow: 'auto', 
                                    outline: 'none',
                                    borderColor: isFocused ? '#00a4e4' : '#ccc', 
                                    transition: 'border-color 0.2s ease-in-out', 


                                }}
                                placeholder="Metin giriniz..."
                                onFocus={handleFocus} 
                                onBlur={handleBlur} 
                            />
                        </div>
                        <div className="flex  items-center mt-4 justify-end align-center m-auto" style={{
                            top: '34vh',
                            width: '15vw',
                            paddingTop: "2rem",
                            right: '34.3vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute',


                        }}>
                            <p className="text-base font-medium mr-2">Soru tipi</p>
                            <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'absolute', height: '100%', left: '12vw' }}>
                                <span className="mr-3">:</span>
                                <div style={{
                                    top: '1vh',
                                    width: '20vw',
                                    left: '5.8vw',
                                    position: 'absolute',
                                }}>
                                    <CustomComboBox options={options} placeholder="Seçiniz" />
                                </div>
                            </div>

                        </div>
                        <div className="flex  items-center mt-4 justify-end align-center m-auto" style={{
                            top: '42vh',
                            width: '15vw',
                            paddingTop: "2rem",
                            right: '33.1vw',
                            fontFamily: 'Poppins',
                            fontSize: '1rem',
                            lineHeight: '1.5rem',
                            textAlign: 'left',
                            position: 'absolute',


                        }}>
                            <p className="text-base font-medium mr-2">Soru etiketi</p>
                            <div className="flex items-center" style={{ paddingLeft: '5vw', position: 'absolute', height: '100%', left: '10.8vw' }}>
                                <span className="mr-3">:</span>
                                <div style={{
                                    top: '1vh',
                                    width: '20vw',
                                    left: '5.8vw',
                                    position: 'absolute',
                                }}>
                                    < CustomComboBoxPlus options={options} placeholder="Giriniz" />
                                </div>
                            </div>
                           
                        </div>
                        <button
                            style={{
                                width: '6.25vw',
                                height: '55px',
                                top: '42vh',
                                left: '29vw',
                                borderRadius: '0.2604166',
                                background: '#E5E5E5', 
                                color: '#000000', 
                                border: 'none', 
                                fontFamily: 'Poppins',
                                fontSize: '1rem', 
                                fontWeight: 'bold', 
                                cursor: 'pointer', 
                                position: 'absolute',
                            }}
                        >
                            Ekle
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default QuestionAddPage;