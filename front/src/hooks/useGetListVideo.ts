import { useQuery } from "./query";
import { appViewStore } from "../stores/app.store";

export const useGetListVideo = (shouldFetch?: boolean) => {
  const { data, isLoading, error } = useQuery(
    appViewStore.getListVideo(), shouldFetch
  );

  return {
    data: data?.data?.results ?? [],
    isLoading,
    error,
  };
};
