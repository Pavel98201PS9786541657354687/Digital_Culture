import { appViewStore } from "../stores/app.store";

import { useQuery } from "./query";

export const useGetFile = (path: string, shouldFetch?: boolean) => {
  const { data, isLoading, error } = useQuery(
    appViewStore.getFile(path),
    shouldFetch,
  );

  return {
    data: data?.data ?? [],
    isLoading,
    error,
  };
};
