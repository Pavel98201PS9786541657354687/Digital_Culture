import { useEffect, useRef, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { observer } from "mobx-react";

import bonePng from "@/assets/bone.png";
import liveEye from "@/assets/live-eye.gif";
import { literalContent } from "@/constants";

import { Footer, Header, Modal } from "../../components";
import { getGridChunksByFileFormats } from "../../components/FileGrid/utils";
import {
  useGetListBlocks,
  useGetListVideo,
  useOnLoadImages,
} from "../../hooks";
import { appViewStore } from "../../stores/app.store";

import { FileGrid, Form, ServicesCarousel } from "./components";

import "./style.scss";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

const LoadingComponent = () => (
  <div className="loader-container">
    <PuffLoader />
  </div>
);

export const MainPage = observer(() => {
  const loading = false;

  const { data: videosByPage, isLoading: isListVideoLoading } =
    useGetListVideo();
  const { data: blocks, isLoading: isListBlocksLoading } = useGetListBlocks();
  const { language, totalProjectCount } = appViewStore;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [lineGroups, setLineGroups] = useState([]);
  const [videosLoadingState, setVideosLoadingState] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);

  const liveEyeRef = useRef<HTMLDivElement>(null);
  const liveEyeLoaded = useOnLoadImages(liveEyeRef);

  useEffect(() => {
    if (videosByPage.length) {
      setVideos((prev) => [...prev, ...videosByPage]);
    }
  }, [videosByPage]);

  useEffect(() => {
    if (videos?.length) {
      setVideosLoadingState(new Array(videos?.length).fill(true));
      preloadVideos(videos);
      const groups = getGridChunksByFileFormats(videos);
      setLineGroups(groups);
    }
  }, [videos]);

  useGSAP(() => {
    gsap.to("#bg-bone-image", {
      y: "-120%", // Перемещение фона вверх
      ease: "none",
      scrollTrigger: {
        trigger: "#bg-bone-image",
        start: "top top",
        end: "max",
        scrub: 1, // Скорость анимации относительно скролла
      },
    });

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
  }, [loading]);

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

  const handleVideoLoad = (index) => {
    setVideosLoadingState((prev) => {
      const newStates = [...prev];
      newStates[index] = false; // Устанавливаем состояние загрузки в false для загруженного видео
      return newStates;
    });
  };

  const preloadVideos = async (videos) => {
    const videoPromises = videos.map((videoData, index) => {
      return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = videoData?.fileName;
        video.onloadeddata = () => {
          handleVideoLoad(index);
          resolve();
        };
        video.load();
      });
    });

    await Promise.all(videoPromises);
  };

  if (loading)
    return (
      <div className="loader">
        <PuffLoader />
      </div>
    );

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container">
        <div id="eye-container">
          <div className="image-container" ref={liveEyeRef}>
            <img id="eye-video" src={liveEye} alt="Eye video shot" />
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
        {isListVideoLoading ? (
          <LoadingComponent />
        ) : (
          <FileGrid
            lineGroups={lineGroups}
            videos={videos}
            increaseOffset={() => appViewStore.increaseOffset()}
            total={totalProjectCount}
            language={language}
            containerStyles={{ paddingTop: "100px", paddingInline: "16px" }}
          />
        )}
        {/*<ServicesCarouselGsap*/}
        {/*  blocks={blocks}*/}
        {/*  openModal={() => setIsModalOpen(true)}*/}
        {/*  lineGroups={lineGroups}*/}
        {/*  language={language}*/}
        {/*/>*/}
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
      </div>
      <Footer
        language={language}
        handleSwitchLanguage={appViewStore.switchLanguage}
      />
      <Modal
        title={literalContent.weWillContactYou[language]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}>
        <Form onSubmit={handleSubmit} language={language} />
      </Modal>
    </>
  );
});
