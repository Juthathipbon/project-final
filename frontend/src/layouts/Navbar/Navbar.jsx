import "./Navbar.css";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const initPage = "Employees";
function Navbar({ role }) {
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(initPage);
  }, []);

  // const dashboardRef = useRef();
  const employeesRef = useRef();
  const workingStatusRef = useRef();
  const messagesRef = useRef();
  const notificationRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    if (tab === "Employees") {
      employeesRef.current.click();
    } else if (tab === "Working Status") {
      workingStatusRef.current.click();
    } else if (tab === "Messages") {
      messagesRef.current.click();
    } else if (tab === "Notifications") {
      notificationRef.current.click();
    } else if (tab === "User") {
      userRef.current.click();}

  }, [tab]);
  return (
    <div className="Navbar">
      <div className="Navbar-content">
        <div className="Navbar-menu">
          <Link to="/employees" ref={employeesRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("Employees")}
            >
              <span className="bi bi-people-fill">
                &nbsp;&nbsp;&nbsp;พนักงาน
              </span>
            </button>
          </Link>

          <Link to="/working-status" ref={workingStatusRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("Working Status")}
            >
              <span className="bi bi-clock-history">
                &nbsp;&nbsp;&nbsp;ข้อมูลการปฏิบัติงานของพนักงาน
              </span>
            </button>
          </Link>

          <Link to="/messages" ref={messagesRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("Messages")}
            >
              <span className="bi bi-chat-right-text-fill">
                &nbsp;&nbsp;&nbsp;รายละเอียดงานให้พนักงาน
              </span>
            </button>
          </Link>

          <Link to="/notifications" ref={notificationRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("Notifications")}
            >
              <span className="bi bi-bell-fill">
                &nbsp;&nbsp;&nbsp;แจ้งเตือน
              </span>
            </button>
          </Link>
          <Link to="/user" ref={userRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("User")}
            >
              <span className="bi bi-person-circle">&nbsp;&nbsp;&nbsp;ผู้ใช้</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
