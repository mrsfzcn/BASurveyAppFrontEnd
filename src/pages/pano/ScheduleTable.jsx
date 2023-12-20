import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs"
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import RefreshIcon from "../user/AllUsers/svg/refresh-svg";
import JobService from "../../services/JobService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ScheduleTable.css'

export function ScheduleTable() {
    const header = {
        header: "Zamanlama Bilgileri",
        href: "/zamanlama",
        describe:
            "Kaynak veritabanı üzerinden getirilen Eğitmen/Öğrenci/Şube/Kurs gibi bilgilerle SurveyApp veritabanını güncelleme işlemlerini manuel olarak yapabilir ve günlük güncelleme saatini değiştirebilirsiniz.",
    };
    const subtitle = [
        {
            title: "Anasayfa",
            href: "/",
        },
        {
            title: "Zamanlama Bilgileri",
            href: "/zamanlama",
        },
    ];

    return (<>
        <Layout>
            <div className="background">
                <div>
                    <BreadCrumbs header={header} subtitle={subtitle} />
                </div>
                <h1></h1>
                <div className="list ">
                    <ScheduleTableList />
                </div>
            </div>
        </Layout >
    </>
    )
}

function ScheduleTableList() {
    const [isEditable, setIsEditable] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); //
    const [currentTime,setCurrentTime] = useState("");
    const [updatedTime,setUpdatedTime] = useState("");
    
    useEffect(()=>{
        JobService.currentUpdateTime().then(resp=> {
            setCurrentTime(resp.data);
            setUpdatedTime(resp.data);
        })
    },[])

    function handleEditable(e) {
        e.preventDefault();
        if(e.target.name =="cancel"){
            setUpdatedTime(currentTime)
            toast.success("Değişiklikler iptal edildi!")
            setIsEditable(!isEditable);
        } else if(e.target.name=="submit"){
            setIsProcessing(true)
                JobService.reschedule(updatedTime).then(resp=>{
                    setCurrentTime(updatedTime);
                    setIsProcessing(false);
                    toast.success("Günlük Güncelleme saati "+updatedTime+" olarak güncellendi!")
                    setIsEditable(!isEditable);
                }).catch(err=> {
                    toast.error(err.response.data.exceptionMessage)
                    setIsProcessing(false);
                    setIsEditable(!isEditable);
                });
        } else {
            setIsEditable(!isEditable);
        }
    }

    function handleForceUpdate() {
        setIsProcessing(true)
        JobService.forceUpdateDatabase().then(resp => {
            setIsProcessing(false)
            if(resp.data)
            toast.success("Şubeler başarıyla güncellendi.")
        }).catch(err =>{
            setIsProcessing(false)
            toast.error("Güncelleme sırasında bir hata oluştu. Lütfen verilerin getirileceği Database sahibi ile iletişime geçin!")
        })
    }

    function handleChange(e){
        setUpdatedTime(e.target.value)
    }

    
    return (<>
        <div className="flex flex-col bg-[#E5E5E5] h-full">
            <div className="outerclass flex justify-center align-center">
                <div className="innerclass bg-[#F1F1F1] flex  justify-center align-center m-auto p-4 ">

                    <div className="insideclass schedule-page bg-[#FEFEFE] border-2 drop-shadow-lg m-auto h-auto flex flex-col justify-center gap-4 p-4">
                        {isEditable ? <> <Button
                            className="button-response"
                            primary={!isProcessing}
                            gray={isProcessing}
                            rounded
                            bold
                            onClick={handleEditable}
                            disabled={isProcessing}
                            name="submit"
                        >
                            Değişikliği Kaydet
                        </Button><div className="flex m-auto gap-2">{isProcessing && <div className={`absolute  ml-[-30px] ${innerWidth>384 ? "mt-[25px]":"mt-[8px]"}   flex justify-center align-center m-auto animate-spin`}><RefreshIcon /></div>}<input className={`schedule-page ${isEditable&&"bg-class"}`} type="time" value={updatedTime} onChange={handleChange}/></div>
                            <Button
                                className="button-response"
                                secondary={!isProcessing}
                                gray={isProcessing}
                                rounded
                                bold
                                onClick={handleEditable}
                                disabled={isProcessing}
                                name="cancel"
                            >
                                Vazgeç
                            </Button> </> : <> <label className="text-center font-bold mb-2">Mevcut Güncelleme Saati:</label> <div className="flex m-auto"><input className="schedule-page" type="text" value={updatedTime} disabled />  </div><Button
                                className="button-response"
                                primary
                                rounded
                                bold
                                onClick={handleEditable}
                            >
                                Saati Güncelle
                            </Button></>}
                            <hr />

                        <Button
                            className="button-response"
                            type="button"
                            primary={!isProcessing}
                            gray={isProcessing}
                            rounded
                            bold
                            onClick={handleForceUpdate}
                            disabled={isProcessing}
                        >
                            Şubeleri Güncelle
                        </Button>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    </>)
}