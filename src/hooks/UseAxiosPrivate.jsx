import { privateAxios } from '../config/axiosconfig';
import { useEffect } from 'react';
import useRefreshTokens from './useRefreshTokens';
import { useSelector } from 'react-redux';
const UseAxiosPrivate = () => {
  const token = useSelector((state) => state.aTokens.token);
  const refresh = useRefreshTokens();
  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      privateAxios.interceptors.request.eject(requestIntercept);
      privateAxios.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);
  return privateAxios;
};

export default UseAxiosPrivate;
