export default interface User {
    _id?: string;
    email: string;
    password: string;
    fullname: string;
    phone: string;
    isAdmin: boolean;
    chatId?:number;
}