/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useState } from "react";
import { authService } from "../services/authService";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface EntryPageProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setUser: Function;
}

const EntryPage: FunctionComponent<EntryPageProps> = ({ setUser }) => {
    const [currentView, setCurrentView] = useState<string>("logIn");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const navigate = useNavigate();

    const changeView = (view: string) => {
        setCurrentView(view);
    };

    const handleSignUp = async (e: React.FormEvent, userInfo: User) => {
        e.preventDefault();
        const user = await authService.signup(userInfo);
        setUser(user);
        navigate("/");
    };
    const handleLogIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = await authService.login(email);
        const userPassword: any = jwtDecode(user.password);

        if (password === userPassword.password) {
            setUser(user);
            navigate("/");
        } else {
            toast.error("סיסמא לא נכונה", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            throw new Error("סיסמא לא נכונה");
        }
    };

    const handlePWReset = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = await authService.login(email);
        const userPassword: any = jwtDecode(user.password);

        setPassword(userPassword.password);
        changeView("ShowPW");
    };

    const handleCopyPW = (e: React.FormEvent) => {
        e.preventDefault();
        navigator.clipboard
            .writeText(password)
            .then(() => {
                toast.success("הסיסמא הועתקה בהצלחה!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch(() => {
                toast.error("שגיאה בהעתקת הסיסמא!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            });
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case "signUp":
                return (
                    <form
                        dir="rtl"
                        onSubmit={async (e) => {
                            const userInfo: User = {
                                email: email,
                                password: password,
                                fullname: fullname,
                                phone: phone,
                                isAdmin: false,
                            };
                            await toast.promise(
                                handleSignUp(e, userInfo),
                                {
                                    pending: "טוען...",
                                    success: "הרשמתך בוצעה בהצלחה",
                                    error: "שגיאה בהרשמתך",
                                },
                                {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Bounce,
                                }
                            );
                        }}>
                        <h2>הרשמה</h2>
                        <fieldset>
                            <legend>יצירת משתמש</legend>
                            <ul>
                                <li>
                                    <label htmlFor="email">אימייל:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label htmlFor="password">סיסמא:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                                        title="הסיסמא חייבת להכיל לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד, תו מיוחד אחד, ולהיות באורך של לפחות 8 תווים."
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label htmlFor="fullname">שם מלא:</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label htmlFor="phone">טלפון:</label>
                                    <input
                                        type="phone"
                                        pattern="^(\+972-?|0)([234589]|[57]\d)-?\d{7}$"
                                        id="phone"
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit">הרשמה</button>
                        <button type="button" onClick={() => changeView("logIn")}>
                            יש כבר משתמש?
                        </button>
                    </form>
                );
            case "logIn":
                return (
                    <form
                        dir="rtl"
                        onSubmit={async (e) =>
                            await toast.promise(
                                handleLogIn(e),
                                {
                                    pending: "טוען...",
                                    success: "התחברת בהצלחה",
                                    error: "התחברות נכשלה",
                                },
                                {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: false,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Bounce,
                                }
                            )
                        }>
                        <h2>ברוך שובך!</h2>
                        <fieldset>
                            <legend>התחברות</legend>
                            <ul>
                                <li>
                                    <label htmlFor="email">אימייל:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label htmlFor="password">סיסמא:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                                        title="הסיסמא חייבת להכיל לפחות אות גדולה אחת, אות קטנה אחת, מספר אחד, תו מיוחד אחד, ולהיות באורך של לפחות 8 תווים."
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <i />
                                    <div className="clickable text-blue-700" onClick={() => changeView("PWReset")}>
                                        שכחתי סיסמא ?
                                    </div>
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit" className="log-in">
                            התחבר
                        </button>
                        <button type="button" onClick={() => changeView("signUp")}>
                            יצירת משתמש
                        </button>
                    </form>
                );
            case "PWReset":
                return (
                    <form dir="rtl" onSubmit={handlePWReset}>
                        <h2>שכחתי סיסמא</h2>
                        <fieldset>
                            <legend>שחזור סיסמא</legend>
                            <ul>
                                <li>
                                    <label htmlFor="email">אימייל:</label>
                                    <input type="email" id="email" required />
                                </li>
                            </ul>
                        </fieldset>
                        <button type="submit">לשחזור הסיסמא</button>
                        <button type="button" onClick={() => changeView("logIn")}>
                            לחזור אחורה
                        </button>
                    </form>
                );
            case "ShowPW":
                return (
                    <form dir="rtl">
                        <h2>שכחתי סיסמא</h2>
                        <fieldset>
                            <legend>שחזור סיסמא</legend>
                            <ul>
                                <li>
                                    <p>סיסמתך: {password}</p>
                                </li>
                            </ul>
                        </fieldset>
                        <button type="button" onClick={(e) => handleCopyPW(e)}>
                            להעתיק את הסיסמא
                        </button>
                        <button type="button" onClick={() => changeView("logIn")}>
                            לחזור אחורה
                        </button>
                    </form>
                );
            default:
                return null;
        }
    };

    return <section id="entry-page">{renderCurrentView()}</section>;
};

export default EntryPage;
