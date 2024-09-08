export default interface User {
    _id?: string;
    fullname: string;
    phone: string;
    isAdmin: boolean;
    chatId?: number;
}
