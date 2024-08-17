import axiosService from "./axiosService";

const ENDPOINT = "/send-message";

async function sendMessage(email:string, fullname:string, phone:string, message:string): Promise<string> {
    const messageFromServer: string = await axiosService.post(ENDPOINT, {email, fullname, phone, message});

    return messageFromServer;
}

export const telegramService = {
    sendMessage
}