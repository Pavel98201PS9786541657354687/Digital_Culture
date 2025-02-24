import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { observer } from "mobx-react";

import bonePng from "@/assets/bone.png";
// import liveEye from "@/assets/live-eye.gif";
import liveEye from "@/assets/live-eye.mp4";
import { FileGrid, Form } from "@/components";
import { literalContent } from "@/constants";

import { Footer, Header, Modal } from "../../components";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";
import { useGetListBlocks, useGetListVideo, useOnLoadMedia } from "../../hooks";
import { appViewStore } from "../../stores/app.store";

import { ServicesCarousel } from "./components";

import "./style.scss";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const LoadingComponent = () => (
  <div className="loader-container">
    <PuffLoader />
  </div>
);

export const MainPage = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const anchorName = searchParams.get("anchor");

  const { language, videoList, totalProjectCount } = appViewStore;

  const { data: videosByPage, isLoading: isListVideoLoading } =
    useGetListVideo();
  const { data: blocks, isLoading: isListBlocksLoading } = useGetListBlocks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineGroups, setLineGroups] = useState([]);

  /* Отслеживание состояние загрузки изображений */
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [imagesLoading] = useOnLoadMedia({
    ref: imagesContainerRef,
    selector: "img",
  });

  const loading = isListBlocksLoading || imagesLoading;

  useEffect(() => {
    if (anchorName) {
      setTimeout(() => {
        const element = document.querySelector(`#${anchorName}`);
        element?.scrollIntoView({ behavior: "smooth" });
        setSearchParams({});
      }, 1000);
    }
  }, [anchorName]);

  useEffect(() => {
    if (videosByPage.length) {
      appViewStore.addItemsToVideoList(videosByPage);
    }
  }, [videosByPage]);

  useEffect(() => {
    if (videoList.size > 0) {
      const groups = getGridChunksByFileFormats(Array.from(videoList));
      setLineGroups(groups);
    }
  }, [videoList.size]);

  useEffect(() => {
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

  useEffect(() => {
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute("href").substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {loading && (
        <div className="loader">
          <PuffLoader />
        </div>
      )}
      <div
        className="container"
        style={loading ? { display: "none" } : undefined}
        ref={imagesContainerRef}>
        <div id="eye-container">
          <div className="image-container">
            <video
              id="eye-video"
              autoPlay
              muted
              loop
              playsInline
              src={liveEye}
            />
            {/*<img id="eye-video" src={liveEye} alt="Eye video shot" />*/}
          </div>
        </div>
        <img id="bg-bone-image" src={bonePng} alt="3D Bone Mockup" />
        <Header
          language={language}
          handleSwitchLanguage={appViewStore.switchLanguage}
          onOpenModal={() => setIsModalOpen(true)}
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
          <button
            className="banner-action-button"
            onClick={() => setIsModalOpen(true)}>
            {literalContent.orderAds[language]?.toUpperCase()}
          </button>
        </div>
        <FileGrid
          lineGroups={lineGroups}
          videos={Array.from(videoList)}
          increaseOffset={() => appViewStore.increaseOffset()}
          total={totalProjectCount}
          language={language}
          containerStyles={{ paddingTop: "100px", paddingInline: "16px" }}
          loading={isListVideoLoading}
          onItemClick={(projectId) => navigate(`/projects/${projectId}`)}
        />
        {isListBlocksLoading ? (
          <LoadingComponent />
        ) : (
          <ServicesCarousel
            blocks={blocks}
            openModal={() => setIsModalOpen(true)}
            lineGroups={lineGroups}
            language={language}
          />
        )}
        <Footer
          language={language}
          handleSwitchLanguage={appViewStore.switchLanguage}
        />
      </div>
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} language={language} />
      </Modal>
    </>
  );
});
