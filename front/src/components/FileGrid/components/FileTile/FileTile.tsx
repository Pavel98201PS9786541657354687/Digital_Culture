import { useEffect, useMemo, useState } from "react";

import { axiosInstance } from "../../../../constants";
import { renderFileByType } from "../../../../utils";
import axios from "axios";

export const FileTile = ({ videoData, navigate }) => {
  const [state, setState] = useState<{
    blobUrl: string;
    loading: boolean;
  }>({
    blobUrl: "",
    loading: true,
  });

  const downloadUrl = videoData?.fileName;

  useEffect(() => {
    if (!downloadUrl) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    let isMounted = true;
    let objectUrl: string | null = null;

    const fetchFile = async () => {
      try {
        const response = await axios.get(downloadUrl, {
          responseType: "blob",
        });

        const contentType = response.headers["Content-Type"] || "";

        const blob = new Blob([response.data], { type: contentType });
        objectUrl = URL.createObjectURL(blob);

        if (isMounted) {
          setState({
            blobUrl: objectUrl,
            loading: false,
          });
        }
      } catch (err: any) {
        console.error("Ошибка при скачивании файла:", err);
        if (isMounted) {
          setState({
            blobUrl: "",
            loading: false,
          });
        }
      }
    };

    fetchFile();

    return () => {
      isMounted = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [downloadUrl]);

  const viewer = useMemo(() => {
    const { blobUrl } = state;

    return (
      <div
        key={`line-grid-${videoData.index}-${videoData.videoRowIndex}`}
        className={`tile span-${videoData?.colSpan}`}
        onClick={() => navigate(`/projects/${videoData?.id}`)}>
        {/*{state.loading ? (*/}
        {/*  <div>Загрузка видео...</div>*/}
        {/*) : (*/}
        {/*  renderFileByType(downloadUrl)*/}
        {/*)}*/}
        {renderFileByType(downloadUrl)}
      </div>
    );
  }, [state.blobUrl]);

  return viewer;
};
