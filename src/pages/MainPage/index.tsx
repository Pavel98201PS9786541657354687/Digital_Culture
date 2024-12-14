import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";
import { Header, PortfolioGrid, ServicesCarousel } from "./components";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import bonePng from "@/assets/bone.png";
// import porsche from "@/assets/porsche.jpg";
import liveEye from "@/assets/live-eye.gif";
// import { FlutedGlass } from "@/components";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const MainPage = () => {
  useGSAP(() => {
    gsap.to("#bg-bone-image", {
      y: "-150%", // Перемещение фона вверх
      ease: "none",
      scrollTrigger: {
        trigger: "#bg-bone-image", // Элемент, который будет триггером
        start: "top top", // Начало анимации
        end: "max", // Конец анимации
        scrub: 1, // Скорость анимации относительно скролла
      },
    });

    gsap.to("#eye-container", {
      y: "-250px", // Перемещение фона вверх
      ease: "none",
      scrollTrigger: {
        trigger: "#eye-container", // Элемент, который будет триггером
        start: 200, // Начало анимации
        end: 1400, // Конец анимации
        scrub: 1, // Скорость анимации относительно скролла
      },
    });
  });

  return (
    <div className="container">
      <div id="eye-container">
        <div className="image-container">
          <img id="eye-video" src={liveEye} alt="Eye video shot" />
        </div>
      </div>
      <img id="bg-bone-image" src={bonePng} alt="3D Bone Mockup" />
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
      {/*<div style={{ position: "relative", color: "initial" }}>*/}
      {/*  <FlutedGlass*/}
      {/*    image={porsche}*/}
      {/*    numOfPanes={60}*/}
      {/*    paneSize={100}*/}
      {/*    blurAmount={2}*/}
      {/*    stretchPercentage={75}*/}
      {/*    paneJustify="start"*/}
      {/*  >*/}
      {/*    <div className="example-content">*/}
      {/*    </div>*/}
      {/*  </FlutedGlass>*/}
      {/*</div>*/}
    </div>
  );
};

export default MainPage;
