import { RefObject, useEffect, useState } from "react";

type UseOnLoadImagesProps = {
  ref: RefObject<HTMLElement>;
  selector?: "img" | "video";
  deps?: any[];
};

export const useOnLoadMedia = <T extends HTMLElement>(
  props: UseOnLoadImagesProps,
) => {
  const { ref, selector = "img", deps = [] } = props;

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const waitForLoad = (img: HTMLImageElement) => {
    return new Promise<void>((resolve, reject) => {
      if (img.complete) {
        return resolve();
      }

      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  };

  const allDeps = [ref.current];
  if (deps?.length) allDeps.push(...deps);

  useEffect(() => {
    if (!ref?.current) return;
    setError(false);
    setLoading(true);

    handleLoadMedia();
  }, allDeps);

  const handleLoadMedia = () => {
    const promises = [...ref.current.querySelectorAll(selector)].map((it) =>
      waitForLoad(it),
    );

    if (!promises.length) {
      setLoading(false);
      return;
    }

    Promise.all(promises)
      .then(() => {
        console.log("Медиафайлы успешно загружены");
      })
      .catch((err: Error) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [isLoading, isError];
};
