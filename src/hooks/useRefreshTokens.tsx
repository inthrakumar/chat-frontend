import { defAxios } from "@/config/axiosconfig"
import { useDispatch } from 'react-redux'
import { updateToken } from "@/store/slice/refreshTokenSlice";

const useRefreshTokens = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const response = await defAxios.get('/auth/refresh', {
                withCredentials: true
            });
            dispatch(updateToken(response.data.accessToken));
            return response.data.accessToken;
        } catch (error) {
            return null;

        }
    }
    return refresh;
}

export default useRefreshTokens
