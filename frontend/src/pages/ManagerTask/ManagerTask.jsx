// import React, { useState, useEffect } from "react";
import "./ManagerTask.css";

function ManagerTask() {
  // const [tasks, setTasks] = useState([]); // เก็บรายการงาน
  // const [newTask, setNewTask] = useState({
  //   title: "",
  //   description: "",
  //   hours: "",
  //   date: "",
  // });

  // const formatDate = (isoDate) => {
  //   const date = new Date(isoDate);
  //   return date.toLocaleDateString("th-TH", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  // // ฟังก์ชันดึงงานจาก Back-End
  // const fetchTasks = async () => {
  //   try {
  //     const response = await fetch("http://localhost:6500/tasks/getTask");
  //     const result = await response.json();
  //     console.log("Tasks fetched from server:", result);

  //     if (Array.isArray(result.data)) {
  //       setTasks(result.data);
  //     } else {
  //       console.error("Unexpected data format:", result);
  //       setTasks([]);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch tasks:", error);
  //   }
  // };

  // // ฟังก์ชันเพิ่มงาน
  // const handleAddTask = async () => {
  //   if (!newTask.title || !newTask.hours || !newTask.date) {
  //     alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  //     return;
  //   }
  //   try {
  //     const response = await fetch("http://localhost:6500/tasks/addTask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newTask),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.status === "Success") {
  //       // หลังจากเพิ่มงานแล้วดึงข้อมูลทั้งหมดจาก Back-End ใหม่
  //       fetchTasks();
  //       setNewTask({ title: "", description: "", hours: "", date: "" }); // เคลียร์ข้อมูลฟอร์ม
  //       alert("เพิ่มงานสำเร็จ");
  //     }
  //   } catch (error) {
  //     console.error("Failed to add task:", error);
  //     alert("ไม่สามารถเพิ่มงานได้");
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks(); // ดึงข้อมูลงานเมื่อโหลดหน้าครั้งแรก
  // }, []);

  return (
    <div className="manager-task-container">
      {/* <div className="formManager-container">
        <h2>เพิ่มงานใหม่</h2>
        <input
          type="text"
          placeholder="ชื่องาน"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="รายละเอียดงาน"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        ></textarea>
        <input
          type="number"
          placeholder="จำนวนชั่วโมง"
          value={newTask.hours}
          onChange={(e) =>
            setNewTask({ ...newTask, hours: Number(e.target.value) })
          }
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
        />
        <button onClick={handleAddTask}>เพิ่มงาน</button>
      </div>
      <div className="task-list-container">
        <h3>รายการงาน</h3>
        <ul className="task-list">
          {Array.isArray(tasks) && tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task._id} className="task-item">
                <h4>{task.title || "ไม่มีชื่อ"}</h4>
                <p>{task.description || "ไม่มีรายละเอียด"}</p>
                <p>จำนวนชั่วโมง: {task.hours || 0}</p>
                <p>
                  วันที่: {task.date ? formatDate(task.date) : "ไม่ระบุวันที่"}
                </p>
              </li>
            ))
          ) : (
            <p>ไม่พบงานในระบบ</p>
          )}
        </ul>
      </div> */}
    </div>
  );
}

export default ManagerTask;
