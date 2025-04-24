import { CSSProperties, useMemo } from "react";
import { PuffLoader } from "react-spinners";

import { renderFileByType } from "../../../../utils";

type FileLineGroupProps = {
  lineGroup?: any[];
  onItemClick?: (projectId: string) => void;
  loadingState?: any[];
  setLoadingState?: (state: any[]) => void;
  customStyles?: Record<string, CSSProperties>;
};

export const FileLineGroup = (props: FileLineGroupProps) => {
  const {
    lineGroup = [],
    onItemClick,
    loadingState = [],
    setLoadingState,
    customStyles = {},
  } = props;

  const isLineLoading = useMemo(
    () => loadingState?.some((item) => Boolean(item)),
    [loadingState],
  );

  const handleFileStartLoad = (fileIndex) => {
    const newState = [...loadingState];
    newState[fileIndex] = true;
    setLoadingState(newState);
  };

  const handleFileLoad = (fileIndex) => {
    const newState = [...loadingState];
    newState[fileIndex] = false;
    setLoadingState(newState);
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
              title={
                onItemClick
                  ? `Кликни для просмотра проекта ${videoData?.title}`
                  : ""
              }
              key={`line-grid-${videoData.index}-${videoRowIndex}`}
              className={`tile span-${videoData?.colSpan}`}
              style={{
                ...(onItemClick ? { cursor: "pointer" } : {}),
                ...customStyles?.tile,
              }}
              onClick={() => onItemClick && onItemClick(videoData?.id)}>
              <div className="tile-cover"></div>
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
