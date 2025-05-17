import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
    const { user } = useSelector(state => state.user);
    console.log('User: ', user);

    if (user.role === 'seller') {
        return <Navigate to="/home" />;
    } else if (user.role === 'user') {
        return <Navigate to="/home" />;
    }
};

export default Redirect;