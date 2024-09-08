/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "../interfaces/User";
import axiosService from "./axiosService";

const ENDPOINT = "/auths";

const STORAGE_KEY: string = "userInfo";

export const authService = {
    login,
    getLoggedInUser,
    logout,
    signup,
};

function saveToLocalStorage(key: string, val: any): void {
    localStorage[key] = JSON.stringify(val);
}

function getLoggedInUser(): User | null {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
}

function logout(): void {
    localStorage.removeItem(STORAGE_KEY);
}

async function login(phone: string): Promise<User> {
    try {
        const loggedInUser: User = await axiosService.post(`${ENDPOINT}/login`, { phone });
        if (loggedInUser) saveToLocalStorage(STORAGE_KEY, loggedInUser);

        return loggedInUser;
    } catch (error) {
        throw error;
    }
}

async function signup(userDetails: User): Promise<User> {
    try {
        const signedUpUser: User = await axiosService.post(`${ENDPOINT}/signup`, userDetails);
        if (signedUpUser) saveToLocalStorage(STORAGE_KEY, signedUpUser);

        return signedUpUser;
    } catch (error) {
        throw new Error("Could not signup");
    }
}
