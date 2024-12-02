import React from "react";
import "./EmpNoti.css";

const EmployeeTable = () => {
  // ข้อมูลพนักงาน
  const employees = [
    {
      id: 1,
      name: "Mon",
      startDate: "2024-02-11",
      managerEmail: "manager@company.com",
    },
  ];

  // ฟังก์ชันคำนวณวันที่หมดสัญญา
  const calculateEndDate = (startDate) => {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + 6); // เพิ่ม 6 เดือน
    return start.toISOString().split("T")[0]; // แปลงเป็นวันที่ในรูปแบบ YYYY-MM-DD
  };

  // ฟังก์ชันคำนวณวันที่เหลือจนถึงวันหมดสัญญา
  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // แปลงมิลลิวินาทีเป็นวัน
  };

  return (
    <div className="employee-container">
      <h1>แจ้งเตือน</h1>
      <table>
        <thead>
          <tr>
            <th>ชื่อพนักงาน</th>
            <th>วันเริ่มงาน</th>
            <th>วันหมดสัญญา</th>
            <th>จำนวนวันที่เหลือ</th>
            <th>อีเมลหัวหน้าแผนก</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const endDate = calculateEndDate(employee.startDate);
            const daysLeft = calculateDaysLeft(endDate);
          //   const alertMessage =
          //     daysLeft <= 30
          //       ? `พนักงาน ${employee.name} เหลือสัญญา ${daysLeft} วัน`
          //       : null;

            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.startDate}</td>
                <td>{endDate}</td>
                <td>{daysLeft > 0 ? `${daysLeft} วัน` : "หมดสัญญาแล้ว"}</td>
                <td>
                  <a href={`mailto:${employee.managerEmail}`}>
                    {employee.managerEmail}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* กล่องข้อความสีแดงถ้ามีการแจ้งเตือน */}
      {employees.map((employee) => {
        const endDate = calculateEndDate(employee.startDate);
        const daysLeft = calculateDaysLeft(endDate);
        if (daysLeft <= 30) {
          return (
            <div key={employee.id} className="alert-box">
              พนักงาน {employee.name} เหลือสัญญา {daysLeft} วัน
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default EmployeeTable;
