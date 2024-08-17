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
            <div className="w-full bg-blue-100">
                <div className="flex flex-col items-center about" style={{ backgroundImage: `url(${background})` }}>
                    <div className="h-48 w-48 mt-32">
                        <img src={michus} alt={"Michus"} className="-translate-y-28" />
                    </div>

                    <TypingAnimation
                        className="mt-11 text-3xl font-bold text-black dark:text-white my-font"
                        duration={100}
                        text="שלום אני מיכה יופה, מורה פרטי במתמטיקה"
                    />

                    {/* <div className="mt-10 text-center md:w-1/2 rounded p-1 text-balance my-font text-3xl">
                        שלום אני מיכה יופה, מורה פרטי במתמטיקס סקיבידי
                    </div> */}

                    <div className="mt-10 flex flex-col items-center bg-opacity-50 bg-yellow-200 rounded p-2">
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

                    <div className="flex items-center mt-6 justify-center fixed bottom-0 pb-1 w-full bg-blue-100">
                        <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">
                            &copy; {new Date().getFullYear()} designed by{" "}
                            <Link to="https://github.com/Maorfl">Maor Fleiman</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
