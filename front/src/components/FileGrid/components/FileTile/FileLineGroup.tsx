import { useEffect, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";

import { renderFileByType } from "../../../../utils";

export const FileLineGroup = (props) => {
  const { lineGroup = [], navigate } = props;

  const [loadingState, setLoadingState] = useState([]);

  useEffect(() => {
    setLoadingState(Array(lineGroup.length).fill(false));
  }, [lineGroup]);

  const isLineLoading = useMemo(
    () => loadingState?.some((item) => Boolean(item)),
    [loadingState],
  );

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
              title={`Кликни для просмотра проекта ${videoData?.title}`}
              key={`line-grid-${videoData.index}-${videoRowIndex}`}
              className={`tile span-${videoData?.colSpan}`}
              onClick={() => navigate(`/projects/${videoData?.id}`)}>
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
