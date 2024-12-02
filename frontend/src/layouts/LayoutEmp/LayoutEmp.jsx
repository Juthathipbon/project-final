import { Outlet } from 'react-router';
import './LayoutEmp.css'
import NavbarEmp from '../NavbarEmp/NavbarEmp';

function LayoutEmp() {
          return(
                    <div className='layout'>
                              <NavbarEmp />
                              <Outlet />

                    </div>
          )
}

export default LayoutEmp;