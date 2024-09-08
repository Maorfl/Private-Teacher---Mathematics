/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useState } from "react";
import { authService } from "../services/authService";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface EntryPageProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    setUser: Function;
}

const EntryPage: FunctionComponent<EntryPageProps> = ({ setUser }) => {
    const [currentView, setCurrentView] = useState<string>("logIn");
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
        const user = await authService.login(phone);

        setUser(user);
        navigate("/");
    };

    const renderCurrentView = () => {
        switch (currentView) {
            case "signUp":
                return (
                    <form
                        dir="rtl"
                        onSubmit={async (e) => {
                            const userInfo: User = {
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
                                    error: "!מספר הטלפון לא קיים במערכת",
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
                                    <label htmlFor="phone">טלפון:</label>
                                    <input
                                        type="phone"
                                        id="phone"
                                        pattern="^(\+972-?|0)([234589]|[57]\d)-?\d{7}$"
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
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
            default:
                return null;
        }
    };

    return <section id="entry-page">{renderCurrentView()}</section>;
};

export default EntryPage;
