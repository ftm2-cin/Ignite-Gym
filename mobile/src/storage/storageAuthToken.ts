import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

export async function saveAuthToken(token: string) {
    await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}

export async function getAuthToken() {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
    return token;
}

export async function removeAuthToken() {
    await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}