import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import BreadCrumbs from "../../components/BreadCrumbs"

function Pano() {
  const [sinifSayisi, setSinifSayisi] = useState(0);
  const [ogrenciSayisi, setOgrenciSayisi] = useState(0);
  // const header = ["No", "Sınıf Sayısı", "Öğrenci Sayısı"];
  useEffect(() => {
    axios.get("http://localhost:8081/student/find-all").then((response) => {
      setOgrenciSayisi(response.data.length);
    });
  }, []); // Boş dependency array, sadece bir kere çalışmasını sağlar.
  console.log(ogrenciSayisi);
  const header = {
    header: "Pano",
    href: "/pano",
    describe:
      "Gene bilgilerin gösterildiği pano sayfası",
  };

  const subtitle = [
    {
      title: "Anasayfa",
      href: "/",
    },
    {
      title: "Pano",
      href: "/pano",
    },

  ];
  return (<>
    <Layout>
      <div className="background">
      <div style={{marginLeft: "70px"}}>
                <BreadCrumbs header={header} subtitle={subtitle} />
        </div>   
        <h1>Table</h1>
        <div className="list ">
    <table style={{ maxWidth: "50vw" }}>
      
      <thead style={{ border: "1px solid black", display: "flex", flexDirection: "column" }}>
        <tr style={{ display: "flex", gap: 25 }}>
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
        <tr style={{ display: "flex", gap: 85 }}>
      <td>
        0
      </td>
      <td>
        {ogrenciSayisi}
      </td>
      <td>
        {sinifSayisi}
      </td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
  </Layout >
  </>
  
  )
}

export default Pano;
