import { useState } from "react";

import { appViewStore } from "../stores/app.store";

type UsePostApplicationArgs = {
  cb?: Function;
};

export const usePostApplication = (args?: UsePostApplicationArgs) => {
  const [isFetching, setIsFetching] = useState(false);

  const onPostApplication = async (data) => {
    setIsFetching(true);
    const response = await appViewStore.postApplication(data);
    args?.cb?.();
    setIsFetching(false);
    return response;
  };

  return {
    onPostApplication,
    isFetching,
  };
};
