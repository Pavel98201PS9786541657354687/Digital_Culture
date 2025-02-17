import { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { renderFileByType } from "../../../../utils";

export const FileLineGroup = (props) => {
  const {
    lineGroup = [],
    navigate,
    index: lineIndex,
    animatedMaxIndex,
    setAnimatedMaxIndex,
  } = props;

  const [loadingState, setLoadingState] = useState([]);

  useEffect(() => {
    setLoadingState(Array(lineGroup.length).fill(false));
  }, [lineGroup]);

  const isLineLoading = useMemo(
    () => loadingState?.some((item) => Boolean(item)),
    [loadingState],
  );

  const isAllFilesLoaded = useMemo(
    () => loadingState?.every((item) => !item),
    [loadingState],
  );

  useGSAP(() => {
    if (lineIndex <= animatedMaxIndex || isLineLoading) return;

    console.log("lineIndex", lineIndex);

    const line = document.querySelector(".portfolio-line");
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
        stagger: 0.2,
        scrollTrigger: {
          trigger: line,
          start: lineIndex < 2 ? "top+=100 bottom" : "bottom center+=500",
          once: true,
          onEnter: () => setAnimatedMaxIndex(lineIndex),
        },
      },
    );
  }, [lineGroup, isLineLoading]);

  useEffect(() => {
    setLoadingState(new Array(lineGroup.length).fill(false));
  }, [lineGroup]);

  const handleFileStartLoad = (fileIndex) => {
    setLoadingState((prevState) =>
      prevState.map((item, index) => (index === fileIndex ? true : item)),
    );
  };

  const handleFileLoad = (fileIndex) => {
    setLoadingState((prevState) =>
      prevState.map((item, index) => (index === fileIndex ? false : item)),
    );
  };

  const viewer = useMemo(() => {
    return (
      <>
        {isLineLoading && (
          <div
            style={{
              width: "100%",
              height: 230,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <PuffLoader />
          </div>
        )}
        <div
          className="portfolio-line"
          style={isLineLoading ? { display: "none" } : {}}>
          {lineGroup.map((videoData, videoRowIndex) => (
            <div
              key={`line-grid-${videoData.index}-${videoRowIndex}`}
              className={`tile span-${videoData?.colSpan}`}
              onClick={() => navigate(`/projects/${videoData?.id}`)}>
              {/*{!!loadingState[videoRowIndex] && (*/}
              {/*  <div>*/}
              {/*    <PuffLoader />*/}
              {/*  </div>*/}
              {/*)}*/}
              {renderFileByType(
                videoData?.fileName,
                () => handleFileLoad(videoRowIndex),
                () => handleFileStartLoad(videoRowIndex),
              )}
            </div>
          ))}
        </div>
      </>
    );
  }, [isLineLoading, lineGroup]);

  return viewer;
};
