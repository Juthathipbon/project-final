import React, { useState, useEffect } from "react";
import "./EmpSalary.css";

function EmpSalary() {
  const [tasks, setTasks] = useState([]); // ข้อมูลงาน
  const [hourlyRate, setHourlyRate] = useState(100); // อัตราค่าจ้างต่อชั่วโมง
  const [totalHours, setTotalHours] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:6500/tasks/getTask");
      const result = await response.json();

      if (Array.isArray(result.data)) {
        setTasks(result.data);

        // คำนวณจำนวนชั่วโมงรวมและเงินเดือนรวม
        const hours = result.data.reduce((sum, task) => sum + (task.hours || 0), 0);
        setTotalHours(hours);
        setTotalSalary(hours * hourlyRate);
      } else {
        console.error("Unexpected data format:", result);
        setTasks([]);
        setTotalHours(0);
        setTotalSalary(0);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // ดึงข้อมูลงานเมื่อหน้าโหลด
  }, [hourlyRate]);

  return (
    <div className="salary-page-container">
      <h2>หน้าคำนวณเงินเดือน</h2>
      <div className="rate-input">
        <label>อัตราค่าจ้างต่อชั่วโมง (บาท):</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
        />
      </div>
      <div className="salary-summary">
        <h3>สรุปข้อมูล</h3>
        <p>จำนวนชั่วโมงรวม: {totalHours} ชั่วโมง</p>
        <p>อัตราค่าจ้าง: {hourlyRate.toLocaleString()} บาท/ชั่วโมง</p>
        <p>
          เงินเดือนรวม:{" "}
          <strong>{totalSalary.toLocaleString()} บาท</strong>
        </p>
      </div>
      <div className="task-details">
        <h3>รายละเอียดงาน</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <h4>{task.title || "ไม่มีชื่อ"}</h4>
              <p>ชั่วโมง: {task.hours || 0}</p>
              <p>วันที่: {task.date ? formatDate(task.date) : "ไม่ระบุวันที่"}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmpSalary;
