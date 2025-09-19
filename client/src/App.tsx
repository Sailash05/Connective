import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

import ThemeProvider from './context/ThemeContext';
import CreatePostProvider from './context/CreatePostContext';
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import PasswordResetPage from './pages/loginPage/PasswordResetPage';

import MainLayout from './layout/MainLayout';
import FeedPage from './pages/feedPage/FeedPage';
import PostSection from './pages/feedPage/PostSection';
import FriendsPage from './pages/friendsPage/FriendsPage';

import ProfilePage from './pages/profilePage/ProfilePage';
import ProfileEditPage from './pages/profilePage/ProfileEditPage';

import OAuthSuccess from './pages/loginPage/OAuthSuccess';

function App() {

    return (
        <ThemeProvider>
            <CreatePostProvider>
                <Router>
                    <Routes>

                        <Route element={<ProtectedRoute />}>
                            <Route element={<CreatePostProvider><MainLayout showRightSidebar={true} /></CreatePostProvider>}>
                                <Route path="/home" element={<FeedPage />} />
                                <Route path="/post/:postId" element={<PostSection />} />
                                <Route path='/friends' element={<FriendsPage />} />
                            </Route>
                            <Route element={<MainLayout showRightSidebar={false} />}>
                                <Route path='/user' element={<ProfilePage />} />
                                <Route path='/user/edit' element={<ProfileEditPage />} />
                            </Route>
                        </Route>

                        <Route path="/" element={<PublicRoute element={<HomePage />} />} />
                        <Route path="/auth" element={<PublicRoute element={<LoginPage />} />} />
                        <Route path="/auth/reset-password" element={<PublicRoute element={<PasswordResetPage />} />} />

                        <Route path="/oauth-success" element={<OAuthSuccess />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </CreatePostProvider>
        </ThemeProvider>
    )
}

export default App;



