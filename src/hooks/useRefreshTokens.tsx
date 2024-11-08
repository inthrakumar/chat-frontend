import { defAxios } from "@/config/axiosconfig"
import { useDispatch } from 'react-redux'
import { updateToken } from "@/store/slice/refreshTokenSlice";

const useRefreshTokens = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        const response = await defAxios.get('/auth/refresh', {
            withCredentials: true
        });
        dispatch(updateToken(response.data.accessToken));
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshTokens
