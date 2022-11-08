import { Navigate, Outlet } from 'react-router-dom';
import useStore from './store/store';
import { UserStore } from './interfaces/UserStore';


const store: UserStore = useStore();

const useAuth = () => {
    const loggedInStatus = store.loggedIn;
    return loggedInStatus;
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return (isAuth ? <Outlet /> : <Navigate to='/login' />);
};

export default ProtectedRoutes;
