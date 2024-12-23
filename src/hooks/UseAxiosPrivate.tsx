import { privateAxios } from '../config/axiosconfig';
import { useEffect } from 'react';
import useRefreshTokens from './useRefreshTokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { updateToken } from '@/store/slice/refreshTokenSlice';
import { useNavigate } from 'react-router-dom';
const UseAxiosPrivate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.aTokens.token);
  const refresh = useRefreshTokens();
  useEffect(() => {

    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {

        if (!config.headers['Authorization'] && token) {
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
        console.log(error);
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (!newAccessToken) navigate('/authentication');
                sessionStorage.setItem('at',newAccessToken);
          dispatch(updateToken(newAccessToken));
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
