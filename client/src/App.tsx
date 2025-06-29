import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/auth" element={<LoginPage/>} />
            </Routes>
        </Router>
    )
}

export default App
