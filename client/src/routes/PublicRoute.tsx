import { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthService } from '../service/auth.service';
import CheckingAccessLoading from '../components/loadingComponent/authLoading/CheckingAccessLoading';

const PublicRoute = ({ element }: { element: JSX.Element }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);

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

    if (isValid === null) return <CheckingAccessLoading />;

    return isValid ? <Navigate to="/home" replace /> : element;
};

export default PublicRoute;
