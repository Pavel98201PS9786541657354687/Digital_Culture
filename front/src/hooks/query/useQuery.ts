import { useEffect } from "react";
import { Query } from "@astral/mobx-query";
import { AxiosResponse } from "axios";

export const useQuery = <T, D = {}>(
  query: Query<AxiosResponse<T, D>, void, false>,
  shouldFetch = true,
) => {
  useEffect(() => {
    if (shouldFetch) {
      query?.sync();
    }
  }, [shouldFetch]);

  return {
    isLoading: query?.isLoading ?? false,
    isError: query?.isError ?? false,
    error: query?.error,
    data: shouldFetch ? query?.data : null,
  };
};

// TODO: Сделать для бесконечного списка
