import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./style.scss";
import downArrow from "../../assets/down-arrow.png";
import { useNavigate } from "react-router";
import { renderFileByType } from "../../utils";
import { literalContent } from "../../constants";
import { useState } from "react";

type Props = {
  videos?: any[];
  lineGroups: any[];
  setProjectInfo?: (data) => void;
  increaseOffset?: () => void;
  total?: number;
  canShowMore?: boolean;
  language: "ru" | "eng";
};

const FileTile = ({ videoData, navigate }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);

  const handleVideoLoad = () => {
    console.log("loaded");
    setIsVideoLoaded(true);
  };

  return (
    <div
      key={`line-grid-${videoData.index}-${videoData.videoRowIndex}`}
      className={`tile span-${videoData?.colSpan}`}
      onClick={() => navigate(`/projects/${videoData?.id}`)}
    >
      {isVideoLoaded ? (
        renderFileByType(videoData?.fileName, handleVideoLoad)
      ) : (
        <div>Загрузка видео...</div> // Контент, который будет показан до загрузки видео
      )}
    </div>
  );
};

export const FileGrid = (props: Props) => {
  const { videos = [], lineGroups, increaseOffset, total, canShowMore = true, language } = props;

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
                // <div
                //   key={`line-grid-${index}-${videoRowIndex}`}
                //   className={`tile span-${videoData?.colSpan}`}
                //   onClick={() => navigate(`/projects/${videoData?.id}`)}>
                //   {renderFileByType(videoData?.fileName)}
                // </div>
                <FileTile key={`line-grid-${index}-${videoRowIndex}`} videoData={videoData} navigate={navigate} />
              ))}
            </div>
          );
        })}
      </div>
      {canShowMore && total > videos.length && (
        <div className="show-more-button" onClick={increaseOffset}>
          <div className="show-more-text">
            {literalContent.watchMore[language]?.toUpperCase()}
          </div>
          <img src={downArrow} alt="Посмотреть ещё" />
        </div>
      )}
    </>
  );
};
