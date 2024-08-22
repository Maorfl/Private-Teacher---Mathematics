import User from "@/interfaces/User";
import axiosService from "./axiosService";

const ENDPOINT = "/send-message";

async function sendMessage(email: string, fullname: string, phone: string, message: string): Promise<string> {
    const messageFromServer: string = await axiosService.post(ENDPOINT, { email, fullname, phone, message });

    return messageFromServer;
}

async function sendReminder(student: User, title: string, time: string) {
    return await axiosService.post("/send-reminder", { student, title, time });
}

export const telegramService = {
    sendMessage,
    sendReminder,
};
