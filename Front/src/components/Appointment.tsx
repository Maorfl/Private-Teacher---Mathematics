/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { viewWeek, viewDay, viewMonthAgenda } from "@schedule-x/calendar";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@schedule-x/theme-default/dist/index.css";
import { Modal, Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { appointmentService } from "../services/appointmentService";
import User from "../interfaces/User";
import Lesson from "../interfaces/Lesson";
import { lessonService } from "../services/lessonService";
import PricesCatalog from "./PricesCatalog";

interface AppointmentProps {
    user: User | null;
}

const Appointment: FunctionComponent<AppointmentProps> = ({ user }) => {
    const [currentDateTime] = useState(new Date());
    const [selectModalShow, setSelectModalShow] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState("חטיבה (ז׳-ט׳)");
    const [selectedHour, setSelectedHour] = useState("");
    const [otherLesson, setOtherLesson] = useState("");
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [calendarEvent, setCalendarEvent] = useState<any>();
    const [selectedPlace, setSelectedPlace] = useState("בית המורה");
    const [isChanged, setIsChanged] = useState(false);
    const [isStudentHome, setIsStudentHome] = useState(false);
    const selectedSubjectRef = useRef<HTMLSelectElement>(null);
    const selectedPlaceRef = useRef<HTMLSelectElement>(null);

    const closedColors = {
        main: "#969696",
        container: "#C3C3C3",
        onContainer: "#000000",
    };

    const teacherColors = {
        main: "#90B700",
        container: "#fff5aa",
        onContainer: "#000000",
    };

    const studentColors = {
        main: "#DF00CC",
        container: "#FF4BEF",
        onContainer: "#000000",
    };

    const zoomColors = {
        main: "#0035E5",
        container: "#4C75FF",
        onContainer: "#000000",
    };

    const handleLessonClose = async () => setShowLessonModal(false);
    const handleLessonShow = async (datetime: string) => {
        const date: Date = new Date(appointmentService.getDateFromString(datetime));

        currentDateTime.setHours(date.getHours());
        currentDateTime.setMinutes(date.getMinutes());
        setShowLessonModal(true);
    };

    const handleSelectClose = () => {
        setIsStudentHome(false);
        setSelectModalShow(false);
    };

    const handleSelectShow = async (calendarEvent: any) => {
        setCalendarEvent(calendarEvent);
        setSelectModalShow(true);
        await handleTodayLessons(calendarEvent);
    };

    const handleDeleteShow = (calendarEvent: any) => {
        setCalendarEvent(calendarEvent);
        const date: Date = new Date(appointmentService.getDateFromString(calendarEvent.start));

        currentDateTime.setHours(date.getHours());
        currentDateTime.setMinutes(date.getMinutes());
        setShowDeleteModal(true);
    };

    const handleDeleteClose = () => setShowDeleteModal(false);

    const handleSelectChange = () => {
        const selectedOption = selectedSubjectRef.current?.options[selectedSubjectRef.current.selectedIndex].text;

        setSelectedLesson(selectedOption as string);
    };

    const handleSelectHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedHour(event.target.value);
    };

    const handleSelectedPlace = () => {
        const selectedOption = selectedPlaceRef.current?.options[selectedPlaceRef.current.selectedIndex].text;

        setSelectedPlace(selectedOption as string);
    };

    const createSortedLessons = async (calendarEvent: any) => {
        let todayLessons = await lessonService.getDayLessons(calendarEvent.start.substring(0, 10));
        const lesson = todayLessons.find((lesson: Lesson) => {
            return lesson.end === calendarEvent.start && lesson.calendarId !== "open";
        });
        if (lesson) return [];

        todayLessons = todayLessons.sort((a: Lesson, b: Lesson) => {
            return new Date(a.end).getTime() - new Date(b.end).getTime();
        });
        todayLessons = todayLessons.filter((lesson: Lesson) => {
            return appointmentService.isFirstDateGreater(lesson.end, calendarEvent.start);
        });
        for (let i = 0; i < todayLessons.length - 1; i++) {
            if (todayLessons[i].end !== todayLessons[i + 1].start) {
                todayLessons = todayLessons.slice(0, i + 1);
                break;
            }
            if (i === todayLessons.length - 2) {
                todayLessons = todayLessons.slice(0, i + 2);
            }
        }
        return todayLessons;
    };

    const handleTodayLessons = async (calendarEvent: any) => {
        const todayLessons = await createSortedLessons(calendarEvent);
        const is = appointmentService.isStudentHome(todayLessons);

        setIsStudentHome(is);
    };

    const handleNextLessons = async () => {
        if (selectedPlace === "בית התלמיד") {
            const todayLessons = await createSortedLessons(calendarEvent);
            todayLessons.splice(0, 1);
            todayLessons.forEach(async (lesson: Lesson) => {
                lesson.start = appointmentService.addFifteenMinutesToDateTimeString(lesson.start);
                lesson.end = appointmentService.addFifteenMinutesToDateTimeString(lesson.end);

                await lessonService.updateLesson(lesson, user?.phone as string, false);
            });
        }
    };

    const handleLessonSubmit = async () => {
        await handleNextLessons();

        const updatedLesson: Lesson = {
            id: (calendarEvent as any).id,
            title: `${user?.fullname} - ${selectedLesson}`,
            start: (calendarEvent as any).start,
            end: (calendarEvent as any).end,
            student: [user?.fullname as string],
            calendarId: (() => {
                if (user?.isAdmin === true) return "open";
                else {
                    if (selectedPlace === "זום") return "zoom";
                    else if (selectedPlace === "בית המורה") return "teacher";
                    else return "student";
                }
            })(),
            location: selectedPlace,
        };

        await lessonService.updateLesson(updatedLesson, user?.phone as string, true);

        calendar.events.update({ ...updatedLesson });
        setTimeout(() => {
            setIsChanged(!isChanged);
        }, 100);
    };

    const handleDeleteLesson = async (calendarEvent: any) => {
        await toast.promise(
            lessonService.deleteLesson(calendarEvent.id),
            {
                pending: "מוחק שיעור...",
                success: "השיעור נמחק בהצלחה",
                error: "שגיאה במחיקת השיעור",
            },
            {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );
        calendar.events.remove(calendarEvent.id);
    };

    const calendar = useCalendarApp({
        defaultView: viewWeek.name,
        views: [viewDay, viewWeek, viewMonthAgenda],
        calendars: {
            open: {
                colorName: "open",
                lightColors: {
                    main: "#1B8738",
                    container: "#33FF74",
                    onContainer: "#000000",
                },
            },
            teacher: {
                colorName: "teacher",
                lightColors: user?.isAdmin ? teacherColors : closedColors,
            },
            student: {
                colorName: "student",
                lightColors: user?.isAdmin ? studentColors : closedColors,
            },
            zoom: {
                colorName: "zoom",
                lightColors: user?.isAdmin ? zoomColors : closedColors,
            },
        },
        events: [],
        firstDayOfWeek: 0,
        dayBoundaries: {
            start: "00:00",
            end: "23:00",
        },
        callbacks: {
            onEventClick(calendarEvent) {
                if (user?.isAdmin === true) handleDeleteShow(calendarEvent);
                if (!user?.isAdmin && calendarEvent.calendarId === "open") handleSelectShow(calendarEvent);
                currentDateTime.setDate(appointmentService.getDateFromString(calendarEvent.start).getDate());
                currentDateTime.setMonth(appointmentService.getDateFromString(calendarEvent.start).getMonth());
            },
            onClickDateTime(datetime: string) {
                if (user?.isAdmin === true) {
                    currentDateTime.setDate(appointmentService.getDateFromString(datetime).getDate());
                    currentDateTime.setMonth(appointmentService.getDateFromString(datetime).getMonth());
                    handleLessonShow(datetime);
                }
            },
        },
    });

    useEffect(() => {
        (async () => {
            const events = await lessonService.getUpcomingLessons();
            calendar.events.set(events);
        })();
    }, [isChanged]);

    return (
        <>
            {user ? (
                <div className="pt-16">
                    <ScheduleXCalendar calendarApp={calendar} />
                    <Modal show={selectModalShow} onHide={handleSelectClose}>
                        <div dir="rtl">
                            <Modal.Header>
                                <Modal.Title className="text-nowrap">קביעת שיעור</Modal.Title>
                                <PricesCatalog />
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <div className="flex justify-center mb-1">סוגי שיעורים</div>
                                        <Form.Select
                                            ref={selectedSubjectRef}
                                            aria-label="Default select example"
                                            onChange={handleSelectChange}>
                                            <option disabled value={"0"}>
                                                אפשרויות בחירה
                                            </option>
                                            <option value="1">חטיבה (ז׳-ט׳)</option>
                                            <option value="2">תיכון (י׳-יב׳)</option>
                                            <option value="3">מכינה וסטודנטים</option>
                                            <option value="4">חדו״א להנדסה</option>
                                            <option value="5">טורים התמרות ומשוואות דיפרנציאליות</option>
                                            <option value="other">אחר</option>
                                        </Form.Select>
                                        {selectedLesson === "אחר" && (
                                            <InputGroup className="mt-2">
                                                <InputGroup.Text id="inputGroup-sizing-default">
                                                    סוג השיעור
                                                </InputGroup.Text>
                                                <Form.Control
                                                    aria-label="Default"
                                                    aria-describedby="inputGroup-sizing-default"
                                                    onChange={(e) => setOtherLesson(e.target.value)}
                                                />
                                            </InputGroup>
                                        )}
                                        <div className="flex justify-center mb-1">מיקום השיעור</div>
                                        <Form.Select
                                            ref={selectedPlaceRef}
                                            aria-label="Default select example"
                                            defaultValue={"teacher"}
                                            onChange={handleSelectedPlace}>
                                            <option value={"0"} disabled>
                                                אפשרויות בחירה
                                            </option>
                                            <option value="student" disabled={isStudentHome}>
                                                בית התלמיד
                                            </option>
                                            <option value="teacher">בית המורה</option>
                                            <option value="zoom">זום</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                                <p className={`${!isStudentHome && "hidden"} text-sm`}>
                                    <b>
                                        *לקביעת השיעור בשעה הנבחרת <u>בבית התלמיד</u> נא צרו קשר
                                    </b>
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleSelectClose}>
                                    ביטול
                                </Button>
                                <Button
                                    className={`${
                                        (selectedLesson === "other" && !otherLesson) ||
                                        selectedPlace === "אפשרויות בחירה" ||
                                        selectedLesson === "אפשרויות בחירה"
                                            ? "disabled"
                                            : ""
                                    }`}
                                    variant="primary"
                                    onClick={async () => {
                                        await toast.promise(
                                            handleLessonSubmit(),
                                            {
                                                pending: "קובע שיעור...",
                                                success: "השיעור נקבע בהצלחה",
                                                error: "שגיאה בקביעת השיעור",
                                            },
                                            {
                                                position: "top-center",
                                                autoClose: 2500,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: false,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                                transition: Bounce,
                                            }
                                        );
                                        handleSelectClose();
                                    }}>
                                    שמירה
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>

                    <Modal show={showLessonModal} onHide={handleLessonClose}>
                        <div dir="rtl">
                            <Modal.Header>
                                <Modal.Title>פתיחת שיעור</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {`האם לפתוח שיעור ב-${currentDateTime.toLocaleDateString()}`}
                                <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlInput1">
                                    <div className="flex justify-center mb-1">בחירת שעת שיעור מדויקת</div>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={selectedHour}
                                        onChange={handleSelectHour}>
                                        <option value="0">אפשרויות בחירה</option>
                                        <option value="1">
                                            {`${appointmentService.convertHoursToString(
                                                currentDateTime.getHours()
                                            )}:00`}
                                        </option>
                                        <option value="2">
                                            {appointmentService.convertHoursToString(currentDateTime.getHours())}:15
                                        </option>
                                        <option value="3">
                                            {appointmentService.convertHoursToString(currentDateTime.getHours())}:30
                                        </option>
                                        <option value="4">
                                            {appointmentService.convertHoursToString(currentDateTime.getHours())}:45
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleLessonClose}>
                                    ביטול
                                </Button>
                                <Button
                                    variant="primary"
                                    className={`${selectedHour === "0" || !selectedHour ? "disabled" : ""}`}
                                    onClick={async () => {
                                        selectedHour === "1"
                                            ? currentDateTime.setMinutes(0)
                                            : selectedHour === "2"
                                            ? currentDateTime.setMinutes(15)
                                            : selectedHour === "3"
                                            ? currentDateTime.setMinutes(30)
                                            : currentDateTime.setMinutes(45);

                                        await toast.promise(
                                            appointmentService.dateAppointment(currentDateTime, calendar.events),
                                            {
                                                pending: "...טוען",
                                                success: "שיעור נפתח בהצלחה",
                                                error: "שגיאה בפתיחת השיעור",
                                            },
                                            {
                                                position: "top-center",
                                                autoClose: 2500,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: false,
                                                draggable: true,
                                                progress: undefined,
                                                theme: "light",
                                                transition: Bounce,
                                            }
                                        );
                                        handleLessonClose();
                                    }}>
                                    אישור
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>

                    <Modal show={showDeleteModal} onHide={handleDeleteClose}>
                        <div dir="rtl">
                            <Modal.Header>
                                <Modal.Title>מחיקת שיעור</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{`האם למחוק את השיעור ב-${currentDateTime
                                .toLocaleString()
                                .substring(0, currentDateTime.toLocaleString().length - 6)}`}</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteClose}>
                                    ביטול
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        handleDeleteLesson(calendarEvent);
                                        handleDeleteClose();
                                    }}>
                                    אישור
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal>
                </div>
            ) : (
                <>
                    <h1 className="text-center">לא מחובר</h1>
                </>
            )}
        </>
    );
};

export default Appointment;
