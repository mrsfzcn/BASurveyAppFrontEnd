import PanoService from "../../services/PanoService";
import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import Layout from "../../components/Layout";
import { Chart } from "chart.js/auto";

function Pano() {
  const [sinifSayisi, setSinifSayisi] = useState(0);
  const [ogrenciSayisi, setOgrenciSayisi] = useState(0);


  useEffect(() => {
    PanoService.getClasses().then((response) => {
      setSinifSayisi(response.data.length);
    });

    PanoService.getStudents().then((response) => {
      setOgrenciSayisi(response.data.length);
    });

    // Call a function to create/update the chart

  }, []);

  const header = {
    header: "Pano",
    to: "/pano",
    describe:
      "Genel bilgilerin gösterildiği pano sayfası",
  };

  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Pano",
      to: "/pano",
    },
  ];
  useEffect(() => {
    createChart();
  }, [
    ogrenciSayisi, sinifSayisi
  ])
  const calculateRatio = () => {
    if (sinifSayisi === 0) {
      return "Sınıf Sayısı Yok";
    }

    const ratio = ogrenciSayisi / sinifSayisi;
    return `Öğrenci/Sınıf Oranı: ${ratio.toFixed(2)}`;
  };

  const createChart = () => {
    const ctx = document.getElementById("myChart");
    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "pie", // Use "doughnut" for a pie chart
      data: {
        labels: ["Öğrenci Sayısı", "Sınıf Sayısı"],
        datasets: [
          {
            label: "Veri",
            data: [ogrenciSayisi, sinifSayisi],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        width: 100,
        height: 500,
      }
    });
  };
  return (<>
    <Layout>
      <div className="background">
        <div style={{ marginLeft: "70px" }}>
          <BreadCrumbs header={header} subtitle={subtitle} />
        </div>


        <div className="list" style={{ height: "90%" }}>


          <table style={{ width: "100%", marginBottom: 50 }}>

            <thead style={{ border: "1px solid black", display: "flex", flexDirection: "column", }}>
              <tr style={{ display: "flex", justifyContent: "space-between", margin: "0 25px" }}>
                <th>
                  No
                </th>
                <th>
                  Öğrenci Sayısı
                </th>
                <th>
                  Sınıf Sayısı
                </th>
              </tr>
            </thead>
            <tbody style={{ margin: "10px 0", border: "1px solid black" }}>
              <tr style={{ display: "flex", justifyContent: "space-between", margin: "0 25px" }}>
                <td>
                  1
                </td>
                <td style={{ marginRight: 40 }}>
                  {ogrenciSayisi}
                </td>
                <td style={{ marginRight: 35 }}>
                  {sinifSayisi}
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "25%", gap: 10 }}>
            <canvas id="myChart"></canvas>
            <h1>Sınıf ve Öğrenci Sayısı</h1>
            <p>{calculateRatio()}</p>
          </div>
        </div>


      </div>
    </Layout >
  </>

  )
}

export default Pano;
