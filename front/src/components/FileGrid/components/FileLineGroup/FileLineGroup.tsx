import { CSSProperties, useMemo } from "react";
import { PuffLoader } from "react-spinners";
import { observer } from "mobx-react";

import { FileTile } from "../FileTile";

type FileLineGroupProps = {
  lineGroup?: any[];
  onItemClick?: (projectId: string) => void;
  loadingState?: any[];
  setLoadingState?: (state: any[]) => void;
  customStyles?: Record<string, CSSProperties>;
};

export const FileLineGroup = observer((props: FileLineGroupProps) => {
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
            <FileTile
              onItemClick={onItemClick}
              customStyles={customStyles?.tile}
              handleFileLoad={handleFileLoad}
              handleFileStartLoad={handleFileStartLoad}
              videoData={videoData}
              videoRowIndex={videoRowIndex}
            />
          ))}
        </div>
      </>
    );
  }, [isLineLoading, lineGroup]);

  return viewer;
});
