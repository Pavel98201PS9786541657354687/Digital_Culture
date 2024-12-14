import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./style.scss";
import { videoPaths } from "@/pages/MainPage/components/PortfolioGrid/constants";
import { chunkArrayRandomSize } from "@/pages/MainPage/components/PortfolioGrid/utils";
import downArrow from "@/assets/arrow-down.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const PortfolioGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 10;
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  useGSAP(() => {
    const lines = document.querySelectorAll(".portfolio-line");

    lines.forEach((line) => {
      const tiles = line.querySelectorAll(".tile");

      gsap.fromTo(
        tiles,
        {
          y: 500,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
          stagger: 0.2, // Задержка между анимациями
          scrollTrigger: {
            trigger: line,
            start: "top+=100 bottom", // Начинается, когда верхняя часть линии достигает нижней части видимой области
            once: true,
            onEnter: () => {
              console.log("onEnter");
            },
          },
        },
      );
    });
  });

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
      setVideos([...videos, ...videoList]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchVideos();
  // }, [offset]);

  console.log("offset", offset);

  console.log("videos", videos);

  const lineGroups = chunkArrayRandomSize(videoPaths);

  if (loading) {
    return
  }

  return (
    <>
      <div id="portfolio-section">
        {lineGroups?.map((lineGroup, index) => {
          const indexOfDoubleElement =
            lineGroup?.length === 2 ? Math.floor(Math.random() * 2) : -1;

          return (
            <div className="portfolio-line" key={`portfolio-line-${index}`}>
              {lineGroup.map((videoData, videoRowIndex) => (
                <div
                  key={`line-grid-${index}-${videoRowIndex}`}
                  className={`tile ${indexOfDoubleElement === videoRowIndex ? "double" : ""} ${lineGroup?.length === 1 ? "full" : ""}`}
                onClick={() => navigate(`/projects/${videoData}`)}>
                  <video autoPlay muted loop>
                    <source
                      // src={videoData?.fileName}
                      src={`src/assets/video/${videoData}`}
                      type="video/mp4"
                    />
                    Не удалось воспроизвести видео
                  </video>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="show-more-button" onClick={() => setOffset(offset + 1)}>
        <div>ПОСМОТРЕТЬ ЕЩЕ</div>
        <img src={downArrow} alt="" />
      </div>
    </>
  );
};
