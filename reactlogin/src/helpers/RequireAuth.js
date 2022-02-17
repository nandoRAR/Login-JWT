import { isLogged, isAdmin } from './authHeader';
import { Navigate } from 'react-router-dom';

export const RequireAuth =  ({ children }) => {

    const isAuth =  isLogged();

    if (!isAuth) {
        return <Navigate to="/signin" />;
    }

    return children;
}

export const RequireAdmin = ({ children }) => {

    const isAuth = isAdmin();

    if (!isAuth) {
        return <Navigate to="/notadmin" />;
    }

    return children;
}