import { Outlet } from 'react-router';
import './Layout.css'
import Navbar from '../Navbar/Navbar';
// import EmpUser from '../../page_user/Emp/EmpUser';

function Layout() {
          return (
                    <div className="layout">
                            <Navbar />
                            <Outlet />
                    </div>
          );
}
export default Layout