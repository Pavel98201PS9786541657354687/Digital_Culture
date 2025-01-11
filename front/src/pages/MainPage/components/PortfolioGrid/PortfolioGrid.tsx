import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./style.scss";
import { getGridChunksByFileFormats } from "@/pages/MainPage/components/PortfolioGrid/utils";
import downArrow from "@/assets/down-arrow.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  videos: any[];
  setProjectInfo?: (data) => void;
  setLoading: (boolean) => void;
  increaseOffset: () => void;
  offset: number;
};

export const PortfolioGrid = (props: Props) => {
  const { videos, setProjectInfo, increaseOffset, setLoading } = props;

  const [lineGroups, setLineGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const groups = getGridChunksByFileFormats(videos);
    setLineGroups(groups);
  }, [videos]);

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
              console.log("Enter");
            }
          },
        },
      );
    });
  }, [lineGroups]);

  if (!lineGroups?.length) {
    return null;
  }

  return (
    <>
      <div id="projects">
        {lineGroups?.map((lineGroup, index) => {
          return (
            <div className="portfolio-line" key={`portfolio-line-${index}`}>
              {lineGroup.map((videoData, videoRowIndex) => (
                <div
                  key={`line-grid-${index}-${videoRowIndex}`}
                  className={`tile span-${videoData?.colSpan}`}
                onClick={() => {
                  setProjectInfo(videoData);
                  navigate(`/projects/${videoData?.id + 1}`);
                }}>
                  <video autoPlay muted loop>
                    <source
                      src={videoData?.fileName}
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
      {!!lineGroups?.length && (
        <div className="show-more-button" onClick={increaseOffset}>
          <img src={downArrow} alt="" />
        </div>
      )}
    </>
  );
};
