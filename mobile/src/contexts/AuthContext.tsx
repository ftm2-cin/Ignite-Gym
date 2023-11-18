import { createContext } from 'react';
import { UserDTO } from '../types/UserDTO';

export type AuthContextDataProps = {
    user: UserDTO;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const user = {
        id: "1",
        name: "John Doe",
        email: "oi",
        avatar: "oi",
    };

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}