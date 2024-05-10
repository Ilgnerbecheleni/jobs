import { useContext } from 'react'
import { AuthGoogleContext } from '../../contexts/google/authGoogle';
import {Outlet,Navigate} from 'react-router-dom';
function PrivateRoutes() {
    const {signed}= useContext(AuthGoogleContext);

  return signed?<Outlet />:<Navigate to={'/login'}/>
}

export default PrivateRoutes
