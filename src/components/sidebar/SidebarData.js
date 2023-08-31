export const items = [
  {
    label: "Kullanıcı İşlemleri",
    content: [
      { name: "Tüm Kullanıcılar", href: "/kullanici" },
      { name: "Kullanıcı Ekle", href: "/kullanici/ekle" },
    ],
  },
  {
    label: "Etiket İşlemleri",
    content: [{ name: "Tüm Etiketler", href: "/etiket" }],
  },
  {
    label: "Soru İşlemleri",
    content: [
      { name: "Tüm Sorular", href: "/questionlist" },
      { name: "Soru Tipi İşlemleri", href: "/questiontypelist" },
      { name: "Soru Ekle", href: "/questionlist/add" },
    ],
  },
  {
    label: "Sınıf İşlemleri",
    content: [
      { name: "Öğrenci Listeleme", href: "/ogrencilistesi" },
      { name: "Eğitmen Listeleme", href: "/egitmenlistesi" },
      { name: "Sınıfa Eğitmen Atama", href: "/assigning-trainer-to-class" },
      { name: "Sınıfa Öğrenci Atama", href: "/assignstudentclass" },
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
      { name: "Sonuçlanmış Anketler", href: "" },
      { name: "Sınıfa Göre Anket Sonuçları", href: "" },
      { name: "Kişiye Göre Anket Sonuçları", href: "" },
    ],
  },
];
