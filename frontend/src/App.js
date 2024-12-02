import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Layout from "./layouts/Layout/Layout";
import LayoutEmp from "./layouts/LayoutEmp/LayoutEmp";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Setting from "./pages/Settings/Setting";
import Messages from "./pages/ManagerTask/ManagerTask";
import Employees from "./pages/Employees/Employees";
import WorkingS from "./pages/WorkingStatus/WorkingS";
import Notification from "./pages/Notifications/Notification";
import User from "./pages/User/User";
import Login from "./pages/Login/Login";
import "./App.css";

import EmpDash from "./page_user/EmpDash/EmpDash";
import EmpMess from "./page_user/EmpMess/EmpMess";
import EmpWork from "./page_user/EmpWork/EmpWork";
import EmpNoti from "./page_user/EmpNoti/EmpNoti";
import EmpSalary from "./page_user/EmpSalary/EmpSalary";
import EmpUser from "./page_user/EmpUser/EmpUser";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("user");

  const [tasks, setTasks] = useState([]);

  // ฟังก์ชันสำหรับเพิ่มงานใหม่
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: prevTasks.length + 1 }]);
  };

    if(token === '' && role === ''){
      return <Login setToken={setToken} setRole={setRole} />
    }else{
    return (
      <div className="App">
        <HashRouter>
          {role === "admin" ? (
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Login setToken={setToken} setRole={setRole} />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/working-status" element={<WorkingS />} />
                <Route path="/notifications" element={<Notification />} />
                <Route
                  path="/user"
                  element={<User setToken={setToken} setRole={setRole} />}
                />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route element={<LayoutEmp />}>
                <Route path="/" element={<EmpDash />} />
                <Route path="/EmpDashboard" element={<EmpDash />} />
                <Route path="/EmpSalary" element={<EmpSalary tasks={tasks}/>} />
                <Route path="/EmpMessages" element={<EmpMess />} />
                <Route path="/EmpWorking-status" element={<EmpWork tasks={tasks} addTask={addTask} />} />
                <Route path="/EmpNotifications" element={<EmpNoti />} />
                <Route
                  path="/EmpUser"
                  element={<EmpUser setToken={setToken} setRole={setRole} />}
                />
              </Route>
            </Routes>
          )}
        </HashRouter>
      </div>
    );
  }
}

export default App;
