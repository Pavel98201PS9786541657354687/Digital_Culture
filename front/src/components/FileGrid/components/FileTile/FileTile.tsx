import { CSSProperties } from "react";
import { observer } from "mobx-react";

import { renderFileByType } from "../../../../utils";

type FileTileProps = {
  videoData: object;
  videoRowIndex: number;
  customStyles: CSSProperties;
  handleFileLoad: (fileIndex: number) => void;
  handleFileStartLoad: (fileIndex: number) => void;
  onItemClick?: (projectId: string) => void;
};

export const FileTile = observer((props: FileTileProps) => {
  const {
    onItemClick,
    videoData,
    videoRowIndex,
    customStyles,
    handleFileLoad,
    handleFileStartLoad,
  } = props;

  return (
    <div
      title={
        onItemClick ? `Кликни для просмотра проекта ${videoData?.title}` : ""
      }
      key={`line-grid-${videoData.index}-${videoRowIndex}`}
      className={`tile span-${videoData?.colSpan}`}
      style={{
        ...(onItemClick ? { cursor: "pointer" } : {}),
        ...customStyles,
      }}
      onClick={() => onItemClick && onItemClick(videoData?.id)}>
      <div className="tile-cover"></div>
      {renderFileByType(
        videoData?.fileName,
        () => handleFileLoad(videoRowIndex),
        () => handleFileStartLoad(videoRowIndex),
      )}
    </div>
  );
});
