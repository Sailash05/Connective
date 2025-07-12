import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import ThemeProvider from './context/ThemeContext';
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import MainPage from './pages/mainPage/MainPage';
import FileUploader from './pages/FileUploader';

function App() {

    return (
        <ThemeProvider>
            <Router>
                <Routes>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<MainPage/>} />
                        <Route path="/file" element={<FileUploader/>} />
                    </Route>

                    <Route path="/" element={<PublicRoute element={<HomePage />} />} />
                    <Route path="/auth" element={<PublicRoute element={<LoginPage />} />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App;
