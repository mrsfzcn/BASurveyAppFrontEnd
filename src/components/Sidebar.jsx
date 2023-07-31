import Logo from "../assets/images/bilgelogo.jpg";
import Accordion from "./Accordion";

function Sidebar() {
  // items sidebar'da gözükmesini istediğimiz liste
  // content kısmı ise label'a tıkladıktan sonra açılan listedeki content elemanları
  // href oluşturduğunuz sayfanın linki

  const items = [
    {
      label: "Kullanıcı İşlemleri",
      content: [
        { name: "Tüm Kullanıcılar", href: "/kullanici" },
        {
          name: "Kullanıcı Ekle",
          href: "/kullanici/ekle",
        },
        {
          name: "Kullanıcı Düzenle",
          href: "",
        },
      ],
    },
    {
      label: "Anket İşlemleri",
      content: [
        { name: "Tüm Anketler", href: "/anketler" },
        { name: "Anket Ekle", href: "/createsurvey" },
        { name: "Anket Düzenle", href: "/" },
        { name: "Anket Gönder", href: "/sendsurvey" },
      ],
    },
    {
      label: "Soru İşlemleri",
      content: [
        { name: "Soruları Listele", href: "questionlist" },
        { name: "Soru Ekle", href: "" },
        { name: "Soru Etiketi İşlemleri", href: "" },
        { name: "Soru Tipi İşlemleri", href: "/questiontypelist" },
      ],
    },
    {
      label: "Sınıf İşlemleri",
      content: [
        { name: "Öğrenci Listleme", href: "/" },
        { name: "Eğitmen Listeleme", href: "/" },
        { name: "Sınıf Etiketi Oluşturma", href: "/" },
        { name: "Sınıfa Eğitmen Atama", href: "/" },
        { name: "Sınıfa Öğrenci Atama", href: "/" },
      ],
    },
    {
      label: "Raporlama",
      content: [
        { name: "Sonuçlanmış Anketler", href: "/" },
        { name: "Sınıfa Göre Anket Sonuçları", href: "/" },
        { name: "Kişiye Göre Anket Sonuçları", href: "/" },
      ],
    },
    {
      label: "Etiket İşlemleri",
      content: [
        { name: "Etiket Ekle", href: "/etiket" },
        { name: "Etiket Listesi", href: "/etiket" },
        { name: "Etiket Silme", href: "/" },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-8 flex-[1_1_0%] bg-firstColor pl-4 pr-4   ">
      <div style={{ marginTop: "37px" }}>
        <a href="/adminhome">
          <img src={Logo} alt="logo" />
        </a>
      </div>
      <Accordion items={items} />
    </div>
  );
}

export default Sidebar;
