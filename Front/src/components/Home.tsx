import { FunctionComponent } from "react";
import michus from "../assets/images/micha1.png";
import background from "../assets/images/background1.png";
import { Link, useNavigate } from "react-router-dom";
import TypingAnimation from "../../@/components/magicui/typing-animation";
import User from "../interfaces/User";

interface HomeProps {
    user: User | null;
}

const Home: FunctionComponent<HomeProps> = ({ user }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-full bg-blue-100 pt-10">
                <div className="flex flex-col items-center about" style={{ backgroundImage: `url(${background})` }}>
                    <div className="h-48 w-48 mt-32">
                        <img src={michus} alt={"Michus"} className="-translate-y-32" />
                    </div>

                    <TypingAnimation
                        className="mt-2 text-3xl font-bold text-black dark:text-white my-font"
                        duration={100}
                        text="שלום, אני מיכה יופה, מורה פרטי במתמטיקה"
                    />

                    <div className="mt-6 flex flex-col items-center bg-opacity-60 bg-yellow-200 rounded p-2">
                        {!user ? (
                            <>
                                <p className="m-0 p-0 font-semibold">!לקביעת שיעור יש צורך בהתחברות</p>
                                <button
                                    type="button"
                                    className="btn btn-primary mt-2"
                                    onClick={() => navigate("/auth")}>
                                    להתחברות
                                </button>
                            </>
                        ) : (
                            <>
                                <p>
                                    ברוך שובך <span className="font-semibold">{user.fullname}</span>
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-success mt-2"
                                    onClick={() => navigate("/appointment")}>
                                    לקביעת שיעור
                                </button>
                            </>
                        )}
                    </div>

                    <div
                        dir="rtl"
                        className="mt-4 lg:w-1/12 w-1/2 bg-sky-300 bg-opacity-70 p-1 rounded-lg text-sm text-balance">
                        לקבלת תזכורות של שיעורים, ניתן להרשם לבוט הטלגרם שלי על ידי{" "}
                        <b>
                            <Link to={"https://t.me/MichaIoffe_Bot"}>לחיצה כאן</Link>
                        </b>
                    </div>

                    <div className="flex items-center mt-6 justify-center fixed bottom-0 pb-1 w-full bg-blue-100">
                        <p className="mt-2 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
                            &copy; {new Date().getFullYear()} designed by{" "}
                            <b>
                                <Link to="https://github.com/Maorfl">Maor Fleiman</Link>
                            </b>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
