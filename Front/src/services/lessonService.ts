/* eslint-disable no-useless-catch */
import Lesson from "../interfaces/Lesson";
import axiosService from "./axiosService";


const ENDPOINT = "/lessons";


async function getLessons(): Promise<Lesson[]> {
    try {
        return await axiosService.get(`${ENDPOINT}`);
    } catch (error) {
        throw error;
    }
}

async function getDayLessons(datetime: string): Promise<Lesson[]> {
    try {
        return await axiosService.get(ENDPOINT, {datetime});
    } catch (error) {
        throw error;
    }
}

async function addLesson(lesson: Lesson): Promise<Lesson> {
    try {
        return await axiosService.post(`${ENDPOINT}`, lesson);
    } catch (error) {
        throw error;
    }
}

async function updateLesson(lesson: Lesson, phone: string, isToUpdate: boolean): Promise<Lesson> {
    try {
        return await axiosService.put(`${ENDPOINT}/${lesson.id}`, {lesson, phone, isToUpdate});
    } catch (error) {
        throw error;
    }
}

async function deleteLesson(id: string): Promise<Lesson> {
    try {
        return await axiosService.delete(`${ENDPOINT}/${id}`);
    } catch (error) {
        throw error;
    }
}


export const lessonService = {
    getLessons,
    getDayLessons,
    addLesson,
    updateLesson,
    deleteLesson
}