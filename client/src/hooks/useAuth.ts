import { useAppSelect } from "../redux/hooks"

export const useAuth = () => {
    const user = useAppSelect(state => state.auth.user);

    const isAuthenticate = user ? true : false;

    return { isAuthenticate, user }
}