import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthService } from '../service/auth.service';

const ProtectedRoute = () => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const verifyToken = async () => {
        const token = localStorage.getItem('Token');
        if (!token) return setIsValid(false);

        try {
            const response = await AuthService.verifyToken();
            setIsValid(response.status === 200);
        } catch (err) {
            setIsValid(false);
        }
        };

        verifyToken();
    }, []);

    if (isValid === null) {
        return <div className="p-4 text-center">Verifying session...</div>;
    }

    return isValid ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;
