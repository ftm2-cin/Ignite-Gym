import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserDTO } from '../types/UserDTO';
import { USER_STORAGE } from './storageConfig';

export async function saveUser(user: UserDTO) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function getUser() {
    const user = await AsyncStorage.getItem(USER_STORAGE);
    return user ? JSON.parse(user) as UserDTO : null;
}

export async function removeUser() {
    await AsyncStorage.removeItem(USER_STORAGE);
}