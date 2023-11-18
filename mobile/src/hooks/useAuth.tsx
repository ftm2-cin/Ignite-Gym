import { useContext } from "react";
import { AuthContext } from "@contexts";

export function useAuth() {
    const contextData = useContext(AuthContext);

    return contextData;
}