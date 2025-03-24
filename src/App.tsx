import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.tsx";
import Home from "./pages/home/home.tsx";
import Note from "./pages/note/index.tsx";
import Demo from "./pages/demo/index.tsx";
import Aboutme from "./pages/aboutme/index.tsx";
import Navbar from "./pages/layout/nav.tsx";
import CreateNotePage from "./pages/note/create.tsx";

function App() {
    return (
        <div className="w-dvw h-dvh flex flex-col">
            <Navbar />
            <div className="grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/note">
                        <Route index element={<Note />} />
                        <Route path=":id" element={<Note />} />
                        <Route path="create" element={<CreateNotePage />} />
                    </Route>
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/aboutme" element={<Aboutme />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
