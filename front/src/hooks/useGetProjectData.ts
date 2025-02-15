import { useQuery } from "./query";
import { appViewStore } from "../stores/app.store";
import { useParams } from "react-router";

export const useGetProjectData = (shouldFetch?: boolean) => {
  const { projectId } = useParams();

  const { data, isLoading, error } = useQuery(
    appViewStore.getProjectData(projectId), shouldFetch
  );

  return {
    data: data?.data?.results?.[0] ?? {},
    isLoading,
    error,
  };
};
