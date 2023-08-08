export const items = [
  {
    label: "Etiket İşlemleri",
    content: [
      { name: "Etiket Ekle", href: "/etiket" },
      { name: "Etiket Listesi", href: "/etiket" },
      { name: "Etiket Silme", href: "/" },
    ],
  },
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
    label: "Soru İşlemleri",
    content: [
      { name: "Soruları Listele", href: "questionlist" },
      { name: "Soru Ekle", href: "/questionlist/add" },
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
    label: "Anket İşlemleri",
    content: [
      { name: "Tüm Anketler", href: "/anketler" },
      { name: "Anket Ekle", href: "/createsurvey" },
      { name: "Anket Gönder", href: "/sendsurvey" },
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
];
