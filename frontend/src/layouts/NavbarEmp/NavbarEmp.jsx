import "./NavbarEmp.css";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
const initPage = "EmpDashboard";

function NavbarEmp() {
  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(initPage);
  }, []);

  const EmpDashboardRef = useRef();
  const EmpWorkingStatusRef = useRef();
  const EmpMessagesRef = useRef();
  const EmpNotificationRef = useRef();
  const EmpSalaryRef = useRef();
  const EmpUserRef = useRef();

  useEffect(() => {
    if (tab === "EmpWorking Status") {
      EmpWorkingStatusRef.current.click();
    } else if (tab === "EmpMessages") {
      EmpMessagesRef.current.click();
    } else if (tab === "EmpNotifications") {
      EmpNotificationRef.current.click();
    } else if (tab === "EmpUser") {
      EmpUserRef.current.click();
    } else if (tab === "EmpSalary") {
      EmpSalaryRef.current.click();
    } else if (tab === "EmpDashboard") {
      EmpDashboardRef.current.click();
    }
  }, [tab]);
  return (
    <div className="NavbarEmp">
      <div className="NavbarEmp-content">
        <div className="NavbarEmp-menu">
          <Link to="/EmpDashboard" ref={EmpDashboardRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpDashboard")}
            >
              <span className="bi bi-grid-1x2-fill">
                &nbsp;&nbsp;&nbsp;ภาพรวม
              </span>
            </button>
          </Link>

          <Link to="/EmpWorking-status" ref={EmpWorkingStatusRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpWorking Status")}
            >
              <span className="bi bi-clock-history">
                &nbsp;&nbsp;&nbsp;เพิ่มการทํางาน
              </span>
            </button>
          </Link>

          <Link to="/EmpSalary" ref={EmpSalaryRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpSalary")}
            >
              <span className="bi bi-wallet-fill">
                &nbsp;&nbsp;&nbsp;เงินเดือน
              </span>
            </button>
          </Link>

          <Link to="/EmpMessages" ref={EmpMessagesRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpMessages")}
            >
              <span className="bi bi-chat-right-text-fill">
                &nbsp;&nbsp;&nbsp;ใบขออนุมัติการลา
              </span>
            </button>
          </Link>

          <Link to="/EmpNotifications" ref={EmpNotificationRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpNotifications")}
            >
              <span className="bi bi-bell-fill">
                &nbsp;&nbsp;&nbsp;แจ้งเตือน
              </span>
            </button>
          </Link>
          <Link to="/EmpUser" ref={EmpUserRef}>
            <button
              className="btn btn-outline-dark"
              onClick={() => setTab("EmpUser")}
            >
              <span className="bi bi-person-circle">&nbsp;&nbsp;ผู้ใช้</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavbarEmp;
