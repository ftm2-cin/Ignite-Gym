import { createContext, useEffect, useState } from 'react';
import { UserDTO } from '../types/UserDTO';
import { api } from '@services';
import { saveUser, getUser, removeUser } from '../storage/storageUser';
import { saveAuthToken, getAuthToken, removeAuthToken } from '../storage/storageAuthToken';

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email : string, password : string ) => Promise<void>;
    signOut: () => Promise<void>;
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
                if (data.user && data.token) {
                    await saveUser(data.user);
                    await saveAuthToken(data.token);
                    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                    setUser(data.user);

                }
        }catch(err){
            throw err ;
        }
    }

    async function signOut() {
        setUser({} as UserDTO);
        await removeUser();
        await removeAuthToken();
    }

    async function loadUserStorageData() {
        const storagedUser = await getUser();
        const storagedToken = await getAuthToken();
        if (storagedToken && storagedUser) {
            setUser(storagedUser);
            api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }
    }
    
    useEffect(() => {
        loadUserStorageData();
    }
    , []);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}
