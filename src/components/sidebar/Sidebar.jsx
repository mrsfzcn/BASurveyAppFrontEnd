import Accordion from "../Accordion";
import { items } from "./SidebarData";
import Btlogo from "../../assets/images/bilgeteknolojilogo";
function Sidebar() {
  // items sidebar'da gözükmesini istediğimiz liste
  // content kısmı ise label'a tıkladıktan sonra açılan listedeki content elemanları
  // href oluşturduğunuz sayfanın linki

  return (
    <div
      className="hidden tablet:flex 
    tablet:flex-col 
    tablet:gap 
    tablet:flex-[3_3_0%]
    tablet:bg-firstColor 
    tablet:pl-4 
    tablet:pr-4 
    tablet:pt-1
    xldesktop:pt-3
     "
    >
      <a href="/yonetici-sayfasi">
        <Btlogo />
      </a>

      <Accordion items={items} />
    </div>
  );
}

export default Sidebar;
