import { AxiosRequestConfig } from "axios";

export const withAuth = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  return {
    ...config,
    withCredentials: true,
  };
};
