import { ReactNode, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { updateToken } from "@/store/slice/refreshTokenSlice";
import { useEffect } from "react";
import useRefreshTokens from "@/hooks/useRefreshTokens";

export default function AccessTokenProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const dispatch = useDispatch();
  const refresh = useRefreshTokens();

  useEffect(() => {
    const checkAndUpdateToken = async () => {
      const existingToken = sessionStorage.getItem("at");

      if (existingToken) {
        dispatch(updateToken(existingToken));
      } else {
        const atToken = await refresh();
        sessionStorage.setItem("at", atToken);
        dispatch(updateToken(atToken));
      }
    };

    checkAndUpdateToken();
  }, [dispatch, refresh]);

  return <>{children}</>;
}

