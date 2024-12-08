import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";
import { Header, PortfolioGrid, ServicesCarousel } from "./components";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const MainPage = () => {
  return (
    <div className="container">
      <Header />
      <div className="banner">
        <div className="slogan-container">
          <div className="slogan-big">СОЗДАЕМ</div>
          <div className="slogan-big">3D РЕКЛАМУ</div>
          <div className="slogan-small">
            <div>КОТОРУЮ</div>
            <div>ЗАПОМНЯТ</div>
          </div>
        </div>
        <button className="banner-action-button">ЗАКАЗАТЬ РЕКЛАМУ</button>
      </div>
      <PortfolioGrid />
      <ServicesCarousel />
    </div>
  );
};

export default MainPage;
