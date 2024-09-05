/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import User from "../interfaces/User";
import { authService } from "../services/authService";

interface NavigationProps {
    user: User | null;
    // eslint-disable-next-line @typescript-eslint/ban-types
    setUser: Function;
}

const Navigation: FunctionComponent<NavigationProps> = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <nav
                className="flex fixed w-full items-center flex-wrap bg-teal-500 py-3 px-3 z-50 transition duration-1000 ease-linear animate-dropdown"
                dir="rtl">
                <div className="block lg:hidden flex-1">
                    <button
                        onClick={handleClick}
                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center flex-shrink-0 text-white">
                    <span className="font-semibold text-2xl tracking-tight">מיכה יופה</span>
                </div>

                <div
                    className={`w-full items-center flex-grow lg:flex lg:items-center lg:w-auto transition-all duration-500 ease-in-out ${
                        isCollapsed ? "hidden" : "block animate-dropdown"
                    }`}>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex w-full lg:justify-center items-start lg:flex-row flex-col">
                            <NavLink
                                to={"/"}
                                onClick={() => setIsCollapsed(true)}
                                className="text-lg lg:mt-0 text-teal-200 hover:text-white mt-1">
                                דף הבית
                            </NavLink>
                            {user && (
                                <NavLink
                                    to={"/appointment"}
                                    onClick={() => setIsCollapsed(true)}
                                    className="text-lg lg:mt-0 text-teal-200 hover:text-white lg:mr-5 mt-1">
                                    קביעת שיעור
                                </NavLink>
                            )}
                            <NavLink
                                to={"/contact"}
                                onClick={() => setIsCollapsed(true)}
                                className="text-lg lg:mt-0 text-teal-200 hover:text-white lg:mr-5 mt-1">
                                צור קשר
                            </NavLink>
                        </div>
                        <div className="lg:mr-2">
                            {user ? (
                                <button
                                    type="button"
                                    className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                                    onClick={() => {
                                        authService.logout();
                                        setUser(null);
                                        navigate("/");
                                    }}>
                                    התנתקות
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                                    onClick={() => navigate("/auth")}>
                                    להתחברות
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
