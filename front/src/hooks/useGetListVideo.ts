import { useEffect } from "react";

import { appViewStore } from "../stores/app.store";

import { useQuery } from "./query";

export const useGetListVideo = (shouldFetch?: boolean) => {
  const { data, isLoading, error } = useQuery(
    appViewStore.getListVideo(),
    shouldFetch,
  );

  useEffect(() => {
    if (data?.data) {
      appViewStore.setTotalProjectCount(data?.data?.count ?? 0);
    }
  }, [data]);

  return {
    data: data?.data?.results ?? [],
    isLoading,
    error,
  };
};
