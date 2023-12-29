export const items = [
  {
    label: "Pano",

    content: [
      { name: "Pano", to: "/pano" },
      { name: "Zamanlama Bilgileri", to: "/zamanlama" },
    ],
  },
  {
    label: "Kullanıcı İşlemleri",
    content: [
      { name: "Tüm Kullanıcılar", to: "/kullanici" },
      { name: "Tüm Eğitmenler", to: "/egitmenler" },
      { name: "Tüm Şubeler", to: "/subeler" },
      { name: "Tüm Kurslar", to: "/kurslar" },
      { name: "Kullanıcı Ekle", to: "/kullanici/ekle" },
    ],
  },
  {
    label: "Etiket İşlemleri",
    content: [{ name: "Tüm Etiketler", to: "/etiket" }],
  },
  {
    label: "Soru İşlemleri",
    content: [
      { name: "Tüm Sorular", to: "/soru-listesi" },
      { name: "Soru Ekle", to: "/soru-listesi/ekle" },
    ],
  },
  {
    label: "Sınıf İşlemleri",
    content: [
      { name: "Eğitmen Listeleme", to: "/egitmen-listesi" },
      { name: "Sınıf Listeleme", to: "/sinif-listesi" },
      { name: "Sınıfa Eğitmen Atama", to: "/sinifa-egitmen-atama" },
      { name: "Sınıfa Öğrenci Atama", to: "/sinifa-ogrenci-atama" },
    ],
  },
  {
    label: "Anket İşlemleri",
    content: [
      { name: "Tüm Anketler", to: "/anketler" },
      { name: "Anket Ekle", to: "/anket-olustur" },
      { name: "Anket Gönder", to: "/anket-gonder" },
    ],
  },

  {
    label: "Raporlama",
    content: [
      { name: "Sonuçlanmış Anketler", to: "/anket-raporlama" },
      { name: "Sınıfa Göre Anket Sonuçları", to: "" },
      { name: "Kişiye Göre Anket Sonuçları", to: "" },
    ],
  },
];
