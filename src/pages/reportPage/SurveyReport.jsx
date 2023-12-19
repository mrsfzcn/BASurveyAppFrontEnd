import React, { createElement, useEffect, useState } from 'react';
import "../reportPage/surveyReport.css";
import Layout from '../../components/Layout';
import BreadCrumbs from '../../components/BreadCrumbs';
import ResponseService from '../../services/ResponseService';
import SortIcon from '../user/AllUsers/svg/sort-solid';
import Table from '../../components/Table/Table';
import ExcelExportIcon from '../user/AllUsers/svg/export-excel-svg';
import { data } from 'autoprefixer';

function SurveyReport() {
  const [studentCourseGroupOid, setStudentCourseGroupOid] = useState([]);
  useEffect(() => {
    const fetchAllResponses = async () => {
      try {
        const response = await ResponseService.findAllResponses()
        setStudentCourseGroupOid(response.data)        
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllResponses();
  }, []);
  const handleExportExcelClick = async (studentCourseGroupOid) => {
    // ResponseService.exportToExcel(studentCourseGroupOid).then(data => {
    //   // console.log(data.data);
    //   console.log(URL.canParse(data.config.env.Blob));
    //   console.log(data);
    //   return data;
    // });
    const getFile = async () => {
      const file = await fetch(`http://127.0.0.1:8090/api/v1/responses/excel/${studentCourseGroupOid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": 'blob',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
      await file.blob().then(excel => {
        const excelBlob = URL.createObjectURL(excel);
        let a = document.createElement('a');
        a.href = excelBlob
        a.download= `${studentCourseGroupOid}.xlsx`
        a.click()
      })      
    }
    getFile();
  }
  const header2 = { header: "Anket Raporlama", to: "/anket-raporlama", describe: "Sınıflara ait anket raporlarına buradan ulaşabilirsiniz" };
  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Anket Raporları",
      to: "/anket-raporlama",
    },
  ];
  return (
    <Layout>
      <div className='flex flex-col  gap-10 bg-slate-100 h-full'>
        <BreadCrumbs header={header2} subtitle={subtitle} />
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3rem",
            height: "58vh",
            marginLeft: "5%",
          }}
        >
          <div className="flex justify-center content-center">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "13rem", paddingBottom: "2rem" }}>
                    <span>Şube Adı</span>
                    <button
                      className="bottomSort"                   
                    >                      
                    </button>
                  </th>
                  <th style={{ width: "15rem", paddingBottom: "2rem" }}>
                    <span>Anket Raporu</span>
                  </th>
                </tr>
              </thead>
              <tbody className="lineTableBody ">
                {studentCourseGroupOid.map((student, index) => {
                  return <TableRow
                    key={index}
                    index={student.studentTagOid}
                    studentIndex={student.studentTagOid}
                    handleExportExcelClick={handleExportExcelClick}
                  />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function TableRow({ studentIndex, handleExportExcelClick }) {
  return (
    <tr
      className={`tableRow rowBackground`}
      key={studentIndex}>
      <td style={{ width: "13rem" }}>{studentIndex}</td>
      <td style={{ width: "15rem" }}>
        <button
          onClick={() => handleExportExcelClick(studentIndex)}>
          <ExcelExportIcon />
        </button>
      </td>
    </tr>
  );
}
export default SurveyReport