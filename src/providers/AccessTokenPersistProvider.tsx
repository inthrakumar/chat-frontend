import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshTokens from '../hooks/useRefreshTokens';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AccessTokenProvider = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshTokens();
    const { token, persist } = useSelector((state: RootState) => state.aTokens);

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error("Error refreshing token:", err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (!token && !persist) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, [refresh, token, persist]);

    useEffect(() => {

    }, [isLoading, token]);

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default AccessTokenProvider;
