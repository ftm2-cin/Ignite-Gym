import { createContext, useEffect, useState } from 'react';
import { UserDTO } from '../types/UserDTO';
import { api } from '@services';
import { saveUser, getUser, removeUser } from '../storage/storageUser';

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
                if (data) {
                    setUser(data.user);
                    saveUser(data.user);
                }
        }catch(err){
            throw err ;
        }
    }

    async function signOut() {
        setUser({} as UserDTO);
        await removeUser();
    }

    async function loadUserStorageData() {
        const storagedUser = await getUser();
        if (storagedUser) {
            setUser(storagedUser);
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
