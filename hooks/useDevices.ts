import { getDeviceById, getDevicesByPage } from "@/services/devices";
import { Device } from "@/types";
import { useFocusEffect } from "@react-navigation/native";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

const DEVICES_QUERY_KEY = "devices";
const DEVICE_QUERY_KEY = "device";

interface DevicesResponse {
  data: {
    results: Device[];
    count?: number;
    next?: string;
    previous?: string;
  } | null;
}

interface DevicesQueryParams {
  search?: string;
  limit?: number;
}

export const useDevices = (params: DevicesQueryParams = {}) => {
  const { search = "", limit = 20 } = params;
  const queryClient = useQueryClient();

  const query = useInfiniteQuery<DevicesResponse>({
    queryKey: [DEVICES_QUERY_KEY, search],
    queryFn: ({ pageParam = 0 }) =>
      getDevicesByPage(pageParam as number, limit, search),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.results && lastPage.data.results.length === limit) {
        return allPages.length * limit;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  const reset = () => {
    queryClient.resetQueries({ queryKey: [DEVICES_QUERY_KEY, search] });
  };

  return {
    devices:
      query.data?.pages.flatMap((page) => page.data?.results || []) || [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
    error: query.error,
    isError: query.isError,
    reset,
  };
};

export const useDeviceMutations = () => {
  const queryClient = useQueryClient();

  const invalidateDevices = () => {
    queryClient.invalidateQueries({ queryKey: [DEVICES_QUERY_KEY] });
  };

  return {
    invalidateDevices,
  };
};

export const useDevice = (deviceId: number) => {
  const query = useQuery({
    queryKey: [DEVICE_QUERY_KEY, deviceId],
    queryFn: () => getDeviceById(deviceId),
    enabled: !!deviceId,
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });

  return {
    device: query.data?.data?.result || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isFetching: query.isFetching,
  };
};
