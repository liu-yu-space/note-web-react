import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.tsx";
import Home from "./pages/home/home.tsx";
import Note from "./pages/note/note.tsx";
import Demo from "./pages/demo/index.tsx";
import Aboutme from "./pages/aboutme/index.tsx";
// import Navbar from "./pages/layout/nav.tsx";

function App() {
    return (
        <main className="w-dvw h-dvh">
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/note" element={<Note />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/aboutme" element={<Aboutme />} />
            </Routes>
        </main>
    );
}

export default App;
