import { createContext, useState } from 'react';
import { UserDTO } from '../types/UserDTO';
import { api } from '@services'

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email : string, password : string ) => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);

    async function signIn( email : string, password : string) {
        try{
            const { data } = await api.post('/sessions', {
                    email,
                    password
                });
                if (data) {
                    setUser(data.user);
                }
        }catch(err){
            throw err ;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
