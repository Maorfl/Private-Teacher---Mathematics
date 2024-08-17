import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./style/App.scss";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Contact from "./components/Contact";
import Appointment from "./components/Appointment";
import EntryPage from "./components/EntryPage";
import User from "./interfaces/User";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
    const [user, setUser] = useState<User | null>(JSON.parse(sessionStorage.getItem("userInfo") as string));

    useEffect(() => {}, [user]);

    return (
        <Router>
            <ToastContainer />
            <Navigation user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route path="/auth" element={<EntryPage setUser={setUser} />} />
                <Route path="/appointment" element={<Appointment user={user} />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;
