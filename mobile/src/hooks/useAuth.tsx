import { useContext } from "react";
import { AuthContext } from "@contexts";

export default function useAuth() {
    const contextData = useContext(AuthContext);

    return contextData;
}