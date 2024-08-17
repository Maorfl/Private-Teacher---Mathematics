export default interface Lesson{
    id: number;
    title: string;
    student?: [string];
    start: string;
    end: string;
    calendarId?: string;
    location?:string;
}