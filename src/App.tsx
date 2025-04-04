import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.tsx";
import Home from "./pages/home/home.tsx";
import Note from "./pages/note/index.tsx";
import Demo from "./pages/demo/index.tsx";
import Aboutme from "./pages/aboutme/index.tsx";
import Navbar from "./pages/layout/nav.tsx";
import CreateNotePage from "./pages/note/create.tsx";
import SettingPage from "./pages/settting/index.tsx";
import ExperimentPage from "./pages/experiment/index.tsx";
import Exercises from "./pages/exercises/index.tsx";

function App() {
    return (
        <div className="w-dvw h-dvh flex">
            <Navbar />
            <div className="grow h-full">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/experiment" element={<ExperimentPage />} />
                    <Route path="/note">
                        <Route index element={<Note />} />
                        <Route path=":id" element={<Note />} />
                        <Route path="create" element={<CreateNotePage />} />
                        <Route path="edit/:id" element={<CreateNotePage />} />
                    </Route>
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/aboutme" element={<Aboutme />} />
                    <Route path="/setting" element={<SettingPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
