import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";
import { Header, PortfolioGrid, ServicesCarousel } from "./components";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import bonePng from "@/assets/bone.png";
import liveEye from "@/assets/animated-eye.webp";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../App";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { Modal } from "../../components";

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollToPlugin, ScrollTrigger);

type Props = {
  setProjectInfo?: (data) => void;
  setLoading: (boolean) => void;
};

export const MainPage = (props: Props) => {
  const { setProjectInfo, setLoading } = props;
  const loading = useContext(LoadingContext);
  console.log("loading", loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosLoadingState, setVideosLoadingState] = useState([]);
  const limit = 10;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (videos?.length) {
      setVideosLoadingState(new Array(videos?.length).fill(true));
      preloadVideos(videos);
    }
  }, [videos]);

  useEffect(() => {
    if (videosLoadingState.length) {
      setLoading(videosLoadingState?.some(state => state === true));
    }
  }, [videosLoadingState]);

  console.log("videosLoadingState", videosLoadingState);

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

  const handleVideoLoad = (index) => {
    console.log("handleVideoLoad", index);
    setVideosLoadingState((prev) => {
      const newStates = [...prev];
      newStates[index] = false; // Устанавливаем состояние загрузки в false для загруженного видео
      return newStates;
    });
  };

  const preloadVideos = async (videos) => {
    const videoPromises = videos.map((videoData, index) => {
      return new Promise((resolve) => {
        const video = document.createElement('video');
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

  const fetchVideos = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get('/api/getListVideo?', {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit,
          offset,
        }
      });
      const videoList = response.data?.results;
      setVideos((prevVideos) => [...prevVideos, ...videoList]); // Используем функцию обновления состояния
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [offset]);

  if (loading) return <div className="loader">
    <PuffLoader />
  </div>;

  return (
    <>
      <div className="container">
        <div id="eye-container">
          <div className="image-container">
            <img id="eye-video" src={liveEye} alt="Eye video shot" />
          </div>
        </div>
        <img id="bg-bone-image" src={bonePng} alt="3D Bone Mockup" />
        <Header onOpenModal={() => setIsModalOpen(true)} />
        <div className="banner">
          <div className="slogan-container">
            <div className="slogan-big">СОЗДАЕМ</div>
            <div className="slogan-big">3D РЕКЛАМУ</div>
            <div className="slogan-small">
              <div>КОТОРУЮ</div>
              <div>ЗАПОМНЯТ</div>
            </div>
          </div>
          <button className="banner-action-button" onClick={() => setIsModalOpen(true)}>ЗАКАЗАТЬ РЕКЛАМУ</button>
        </div>
        <PortfolioGrid videos={videos} offset={offset} increaseOffset={() => setOffset(offset + 1)}
                       setProjectInfo={setProjectInfo} setLoading={setLoading} />
        <ServicesCarousel setLoading={setLoading} />
      </div>
      <Modal title="Обсудить мой проект" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello</h2>
      </Modal>
    </>
  );
};
