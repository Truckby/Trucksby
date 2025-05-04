import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
    const { user } = useSelector(state => state.user);
    console.log('User: ', user);

    if (user.role === 'seller') {
        return <Navigate to="/seller/listing" />;
    } else if (user.role === 'user') {
        return <Navigate to="/user/filter" />;
    }
};

export default Redirect;