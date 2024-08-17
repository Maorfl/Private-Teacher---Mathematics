import User from "../interfaces/User";
import axiosService from "./axiosService";

const ENDPOINT = "/auths"

const STORAGE_KEY: string = "userInfo";

export const authService = {
    login,
    getLoggedInUser,
    logout,
    signup
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveToSessionStorage(key: string, val: any): void {
    sessionStorage[key] = JSON.stringify(val)
}

function getLoggedInUser(): User | null {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) as string);
}

function logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
}

async function login(email: string): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
        const loggedInUser: User = await axiosService.post(`${ENDPOINT}/login`, {email});
        saveToSessionStorage(STORAGE_KEY, loggedInUser);

        return loggedInUser;
    } catch (error) {
        throw error;
    }
}

async function signup(userDetails: User): Promise<void> {
    try {
        const loggedInUser: User = await axiosService.post(`${ENDPOINT}/signup`, userDetails);
        saveToSessionStorage(STORAGE_KEY, loggedInUser);
    } catch (error) {
        throw new Error("Could not signup");
    }
}