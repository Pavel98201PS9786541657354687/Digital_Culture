import { useQuery } from "./query";
import { appViewStore } from "../stores/app.store";

export const useGetListBlocks = (shouldFetch?: boolean) => {
  const { data, isLoading, error } = useQuery(
    appViewStore.getListBlocks(), shouldFetch
  );

  return {
    data: data?.data?.results ?? [],
    isLoading,
    error,
  };
};
