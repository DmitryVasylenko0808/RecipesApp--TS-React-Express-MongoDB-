import { useAppSelect } from "../redux/hooks"

export const useAuth = () => {
    const user = useAppSelect(state => state.auth.user);

    const isAuthenticate = user ? true : false;

    const token = localStorage.getItem("token");
    const setToken = (token: string) => localStorage.setItem("token", token);
    const removeToken = () => localStorage.removeItem("token");

    return { 
        isAuthenticate, 
        user,
        token,
        setToken,
        removeToken 
    };
}