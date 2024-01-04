// Menü öğelerini tanımlayın
import TokenService from "../../services/TokenService";
import LocalStorageServiceAuth from "../../store/auth-store.js";

const decodedToken = TokenService.decodeToken(LocalStorageServiceAuth.getToken());

const items = [
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
  }
];

// Roller bazında ek menü öğeleri ekle
if (decodedToken && (decodedToken.role === "MANAGER" || decodedToken.role === "ADMIN")) {
  items.push(
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
        { name: "Öğrenci Listeleme", to: "/ogrenci-listesi" },
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
    }
  );
}

// MASTER_TRAINER ve ASSISTANT_TRAINER için özel menü öğeleri
if (decodedToken && (decodedToken.role === "MASTER_TRAINER" || decodedToken.role === "ASSISTANT_TRAINER")) {
  items.push({
    label: "Sınıf İşlemleri",
    content: [{ name: "Sınıf Listeleme", to: "/sinif-listesi" }],
  });
}

// Raporlama menüsü
if (decodedToken && ["MANAGER", "ADMIN", "MASTER_TRAINER", "ASSISTANT_TRAINER"].includes(decodedToken.role)) {
  items.push({
    label: "Raporlama",
    content: [
      { name: "Sonuçlanmış Anketler", to: "/anket-raporlama" },
      { name: "Sınıfa Göre Anket Sonuçları", to: "" },
      { name: "Kişiye Göre Anket Sonuçları", to: "/kisiye-ozel-raporlama" },
    ],
  });
}

// Diğer menü öğelerini ekleyebilirsiniz

// Son olarak, items dizisini export edin
export { items };
