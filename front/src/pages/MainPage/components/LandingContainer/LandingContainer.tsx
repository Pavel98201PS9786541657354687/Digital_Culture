import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import bonePng from "@/assets/bone.png";
import liveEye from "@/assets/live-eye.mp4";

import { Header } from "../../../../components";
import { literalContent } from "../../../../constants";
import { useOnLoadMedia } from "../../../../hooks";
import { appViewStore } from "../../../../stores/app.store";

type LandingContainerProps = {
  language: "eng" | "ru";
  openFormModal: () => void;
};

export const LandingContainer = (props: LandingContainerProps) => {
  const { language, openFormModal } = props;

  /* Отслеживание состояние загрузки изображений */
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [imagesLoading] = useOnLoadMedia({
    ref: imagesContainerRef,
    selector: "img",
  });

  useGSAP(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const speed = 0.5;
      gsap.to("#bg-bone-image", {
        y: -scrollY * speed,
        ease: "none",
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(() => {
    if (imagesLoading) return null;

    gsap.to("#eye-container", {
      y: "-250px", // Перемещение фона вверх
      ease: "none",
      scrollTrigger: {
        trigger: "#eye-container",
        start: 200,
        end: 1400,
        scrub: 1, // Скорость анимации относительно скролла
      },
    });
  }, [imagesLoading]);

  return (
    <div ref={imagesContainerRef}>
      <div id="eye-container">
        <div className="image-container">
          <video
            id="eye-video"
            autoPlay
            muted
            loop
            playsInline
            src={liveEye}
            onLoadStart={() => appViewStore.setEyeVideoLoading(true)}
            onCanPlayThrough={() => appViewStore.setEyeVideoLoading(false)}
          />
        </div>
        <div className="blur"></div>
      </div>
      <img id="bg-bone-image" src={bonePng} alt="3D Bone Mockup" />
      <Header
        language={language}
        handleSwitchLanguage={appViewStore.switchLanguage}
        onOpenModal={openFormModal}
      />
      <div className="banner">
        <div className="slogan-container">
          <div className="slogan-big">
            {literalContent.weCreate[language]?.toUpperCase()}
          </div>
          <div className="slogan-big">
            {literalContent["3dAds"][language]?.toUpperCase()}
          </div>
          <div className="slogan-small">
            {language === "ru" ? (
              <>
                <div>КОТОРУЮ</div>
                <div>ЗАПОМНЯТ</div>
              </>
            ) : (
              <div>THAT CATCHES THE EYE</div>
            )}
          </div>
        </div>
        <button className="banner-action-button" onClick={openFormModal}>
          {literalContent.orderAds[language]?.toUpperCase()}
        </button>
      </div>
    </div>
  );
};
