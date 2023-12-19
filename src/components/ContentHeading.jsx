import BreadCrumbs from "./BreadCrumbs";

const ContentHeading = () => {
  const generalStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
    marginLeft: '30px',
  };

  const mainTextStyle = {
    fontFamily: 'Poppins',
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '23px',
    letterSpacing: '0em',
    textAlign: 'left',
    color: 'hsla(221, 31%, 19%, 1)'
  };

  const fullTextStyle = {
    fontFamily: 'Poppins',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '23px',
    letterSpacing: '0em',
    textAlign: 'center',
    color: 'hsla(221, 31%, 19%, 1)'
  };
  const header = {
    header: "Kullanıcı Düzenle", to: "/kullanici-bilgileri-guncelle", describe:
      "Kullanıcı düzenleme sayfasına hoşgeldiniz buradan kullanıcıları güncelleyebilirsiniz."
  };

  const subtitle = [
    {
      title: "Anasayfa",
      to: "/yonetici-sayfasi",
    },
    {
      title: "Kullanıcı Düzenle",
      to: "/kullanici-bilgileri-guncelle",
    },
  ]

  return (
    <div style={generalStyle}>
      <BreadCrumbs header={header} subtitle={subtitle} />
    </div>
  );
};

export default ContentHeading;
