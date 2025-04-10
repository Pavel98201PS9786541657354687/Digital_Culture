import { useState } from "react";
import { PuffLoader } from "react-spinners";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import downArrow from "../../assets/down-arrow.png";
import { literalContent } from "../../constants";

import { FileLineGroup } from "./components";

import "./style.scss";

type Props = {
  videos?: any[];
  lineGroups: any[];
  setProjectInfo?: (data) => void;
  increaseOffset?: () => void;
  total?: number;
  canShowMore?: boolean;
  language: "ru" | "eng";
  containerStyles?: Record<string, string>;
  loading?: boolean;
  onItemClick?: (projectId: string) => void;
};

export const FileGrid = (props: Props) => {
  const {
    videos = [],
    lineGroups,
    increaseOffset,
    total,
    canShowMore = true,
    language,
    containerStyles = {},
    loading,
    onItemClick,
  } = props;

  const [loadingState, setLoadingState] = useState([]);
  const [animationState, setAnimationState] = useState([]);

  useGSAP(() => {
    if (!lineGroups?.length) return;

    const lines = document.querySelectorAll(".portfolio-line");

    lines.forEach((line, index) => {
      if (
        loadingState?.[index]?.some((item) => Boolean(item)) ||
        !loadingState?.[index]?.length ||
        Boolean(animationState?.[index])
      ) {
        return null;
      }
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
            start: "top center+=100", // Начинается, когда верхняя часть линии достигает середины+100px видимой области
            once: true,
            onEnter: () => {
              console.log("Media line entered and animated", index);
              setAnimationState((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;
              });
            },
          },
        },
      );
    });
  }, [lineGroups, loadingState]);

  const onSetLineGroupLoadingState = (index, state) => {
    setLoadingState((prevState) => {
      const newState = [...prevState];
      newState[index] = state;
      return newState;
    });
  };

  if (!lineGroups?.length) {
    return null;
  }

  return (
    <>
      <div id="projects" style={containerStyles}>
        {lineGroups?.map((lineGroup, index) => (
          <FileLineGroup
            key={`portfolio-line-${index}`}
            index={index}
            lineGroup={lineGroup}
            onItemClick={onItemClick}
            loadingState={loadingState?.[index]}
            setLoadingState={(state) =>
              onSetLineGroupLoadingState(index, state)
            }
          />
        ))}
      </div>
      {loading ? (
        <div className="loader-container">
          <PuffLoader />
        </div>
      ) : (
        canShowMore &&
        total > videos.length && (
          <div className="show-more-button" onClick={increaseOffset}>
            <div className="show-more-text">
              {literalContent.watchMore[language]?.toUpperCase()}
            </div>
            <img src={downArrow} alt="Посмотреть ещё" />
          </div>
        )
      )}
    </>
  );
};
