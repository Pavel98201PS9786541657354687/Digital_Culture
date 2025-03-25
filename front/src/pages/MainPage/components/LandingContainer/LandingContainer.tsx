import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import liveEye from "@/assets/live-eye.mp4";

import { Header } from "../../../../components";
import { literalContent } from "../../../../constants";
import { appViewStore } from "../../../../stores/app.store";

import "./style.scss";

type LandingContainerProps = {
  language: "eng" | "ru";
  openFormModal: () => void;
};

export const LandingContainer = (props: LandingContainerProps) => {
  const { language, openFormModal } = props;

  useGSAP(() => {
    gsap.to("#eye-container", {
      y: "-250px", // Перемещение фона вверх
      ease: "none",
      scrollTrigger: {
        trigger: "#eye-container",
        start: 200,
        end: 1400,
        scrub: true, // Скорость анимации относительно скролла
      },
    });
  }, []);

  return (
    <>
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
    </>
  );
};
