import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login.tsx";
import Home from "./pages/home/home.tsx";

function App() {
    return (
        <main className="w-dvw h-dvh">
            {/* <nav>
                <Link to="/">Home</Link> | <Link to="/login">Login</Link>
            </nav> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </main>
    );
}

export default App;
