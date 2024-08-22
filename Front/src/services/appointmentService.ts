/* eslint-disable @typescript-eslint/no-unused-vars */
import Lesson from "@/interfaces/Lesson";
import { lessonService } from "./lessonService";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const appointmentService = {
    addOneHour,
    generateRandomId,
    dateAppointment,
    deleteEvent,
    dateToString,
    getDateFromString,
    convertHoursToString,
    convertCurrentHourToTime,
    dateToString2,
    isFirstDateGreater,
    compareTimes,
    addFifteenMinutesToDateTimeString,
    isStudentHome,
    isHalfHourMoreThanNow,
};

function addOneHour(dateTimeString: string) {
    const date = new Date(dateTimeString.replace(" ", "T") + ":00Z");

    date.setHours(date.getHours() + 1);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dateToString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function dateToString2(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

async function dateAppointment(dateTimeObj: Date, calendarEvents: any) {
    const id = appointmentService.generateRandomId();
    const datetime: string = appointmentService.dateToString(dateTimeObj);

    calendarEvents.add({
        id: id,
        start: datetime,
        end: appointmentService.addOneHour(datetime),
        title: "פנוי",
        calendarId: "open",
    });

    const lesson = calendarEvents.get(id);

    await lessonService.addLesson(lesson);
}

async function deleteEvent(id: string, calendarEvents: any) {
    await lessonService.deleteLesson(id);

    calendarEvents.remove(id);
}

function getDateFromString(dateString: string): Date {
    const [date, time] = dateString.split(" ");
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");

    const newDateString = `${year}-${month}-${day}T${hours}:${minutes}`;

    return new Date(newDateString);
}

function convertHoursToString(minutes: number): string {
    return minutes.toString().padStart(2, "0");
}

function convertCurrentHourToTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
}

function isFirstDateGreater(date1: string, date2: string): boolean {
    const [date1Str, time1Str] = date1.split(" ");
    const [date2Str, time2Str] = date2.split(" ");

    const [year1, month1, day1] = date1Str.split("-");
    const [year2, month2, day2] = date2Str.split("-");
    const [hours1, minutes1] = time1Str.split(":");
    const [hours2, minutes2] = time2Str.split(":");

    const date1Obj = new Date(Number(year1), Number(month1) - 1, Number(day1), Number(hours1), Number(minutes1));
    const date2Obj = new Date(Number(year2), Number(month2) - 1, Number(day2), Number(hours2), Number(minutes2));

    return date1Obj.getTime() > date2Obj.getTime();
}

function compareTimes(time1: string, time2: string): boolean {
    const [hours1, minutes1] = time1.split(":");
    const [hours2, minutes2] = time2.split(":");

    return hours1 === hours2 && minutes1 === minutes2;
}

function addFifteenMinutesToDateTimeString(dateTimeString: string): string {
    const date = new Date(dateTimeString.replace(" ", "T") + ":00Z");

    date.setMinutes(date.getMinutes() + 15);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function isStudentHome(lessonsArray: Lesson[]): boolean {
    if (lessonsArray.length === 0) return true;
    for (let i = 0; i < lessonsArray.length; i++) {
        if (lessonsArray[i].calendarId !== "open") return true;
    }

    return false;
}

function isHalfHourMoreThanNow(dateTimeString: string): boolean {
    const date = new Date(dateTimeString.replace(" ", "T") + ":00Z");
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);

    return date.getTime() === now.getTime();
}
