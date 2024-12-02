import React, { useState, useEffect } from "react";
import "./EmpDash.css";

function EmpDash() {
  const [summary, setSummary] = useState({
    totalDaysWorked: 0,
    totalHours: 0,
    totalEarnings: 0,
  });
  const [recentTasks, setRecentTasks] = useState([]);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:6500/tasks/getTask");
      const data = await response.json();

      if (data.status === "Success") {
        const tasks = data.data;

        // คำนวณสรุปผล
        const completedTasks = tasks.filter(
          (task) => task.status === "Completed"
        );
        const totalDays = completedTasks.length;
        const totalHours = completedTasks.reduce(
          (sum, task) => sum + (task.hours || 0),
          0
        );
        const totalEarnings = totalHours * 12; // สมมติค่าแรง $12/ชม

        setSummary({
          totalDaysWorked: totalDays,
          totalHours,
          totalEarnings,
        });

        // แสดงเฉพาะงานล่าสุด 5 งาน
        setRecentTasks(tasks.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="emp-dashboard">
      <h1>Dashboard พนักงาน</h1>

      {/* สรุปผล */}
      <div className="summary">
        <div className="summary-item">
          <h3>วันทำงาน</h3>
          <p>{summary.totalDaysWorked} วัน</p>
        </div>
        <div className="summary-item">
          <h3>ชั่วโมงทำงาน</h3>
          <p>{summary.totalHours} ชั่วโมง</p>
        </div>
        <div className="summary-item">
          <h3>รายได้รวม</h3>
          <p>${summary.totalEarnings}</p>
        </div>
      </div>

      {/* งานล่าสุด */}
      <div className="recent-tasks">
        <h2>งานล่าสุด</h2>
        {recentTasks.length > 0 ? (
          <table className="recent-tasks-table">
            <thead>
              <tr>
                <th>ชื่องาน</th>
                <th>วันที่เริ่ม</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.startDate || "-"}</td>
                  <td>{task.status || "ไม่ระบุ"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>ไม่มีงานที่จะแสดง</p>
        )}
      </div>
    </div>
  );
}

export default EmpDash;
