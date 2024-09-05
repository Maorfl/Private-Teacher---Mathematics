import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { telegramService } from "../services/telegramService";

interface ContactProps {}

const Contact: FunctionComponent<ContactProps> = () => {
    const [email, setEmail] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [render, setRender] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await toast.promise(
            telegramService.sendMessage(email, fullname, phone, message),
            {
                pending: "טוען...",
                success: "הודעה נשלחה בהצלחה",
                error: "שגיאה בשליחת ההודעה",
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

        setEmail("");
        setFullname("");
        setPhone("");
        setMessage("");
        setRender(!render);
    };

    useEffect(() => {}, [render]);

    return (
        <>
            <div className="lg:w-1/4 md:w-1/2 w-4/5 m-auto pt-24">
                <div className="py-5 bg-slate-500 border-2 border-violet-900 rounded-3xl shadow">
                    <h2 className="text-4xl text-center font-semibold underline text-white mb-4 p-0">צור קשר</h2>
                    <form onSubmit={(e) => handleSubmit(e)} dir="rtl" className="lg:w-8/12 md:w-7/12 w-9/12 m-auto">
                        <div className="flex border rounded items-center mb-4">
                            <span className="border-l border-zinc-300 bg-gray-200 text-center p-2">אימייל</span>
                            <input
                                type="email"
                                className="w-full p-2 focus:outline-teal-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex border rounded items-center mb-4">
                            <span className="border-l border-zinc-300 bg-gray-200 text-center p-2">טלפון</span>
                            <input
                                type="phone"
                                className="w-full p-2 focus:outline-teal-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex border rounded items-center mb-4">
                            <span className="text-nowrap border-l border-zinc-300 bg-gray-200 text-center p-2">
                                שם מלא
                            </span>
                            <input
                                type="text"
                                className="w-full p-2 focus:outline-teal-500"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                        <textarea
                            className="resize-none focus:outline-teal-500 focus:outline-1 w-full rounded ps-2 pt-1"
                            placeholder="הודעה"
                            value={message}
                            rows={6}
                            onChange={(e) => setMessage(e.target.value)}></textarea>
                        <button
                            type="submit"
                            className="bg-teal-500 text-white border-1 border-teal-800 p-2 rounded w-full mt-4 hover:bg-teal-600 font-semibold">
                            שלח
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-full text-center mt-2">
                <h2 className="p-0 text-xl font-semibold mb-1">WhatsApp</h2>
                <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="text-5xl text-green-500 cursor-pointer"
                    onClickCapture={() => window.open(`https://wa.me/972587091995?text=${message}`)}
                />
            </div>
        </>
    );
};

export default Contact;
