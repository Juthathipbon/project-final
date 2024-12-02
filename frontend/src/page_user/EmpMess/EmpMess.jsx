import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button } from "react-bootstrap"; // ใช้จาก react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./EmpMess.css";

const LeaveRequestForm = () => {
  const [leaveType, setLeaveType] = useState(""); // ประเภทการลา
  const [startDate, setStartDate] = useState(""); // วันเริ่มต้นที่ลา
  const [endDate, setEndDate] = useState(""); // วันสิ้นสุดที่ลา
  const [leaveDuration, setLeaveDuration] = useState(0); // จำนวนวันที่ลา
  const [leaveReason, setLeaveReason] = useState(""); // เหตุผลในการลา
  const [availableLeaveDays, setAvailableLeaveDays] = useState(0); // จำนวนวันที่เหลือ
  const [leaveRequests, setLeaveRequests] = useState([]); // เก็บคำขอทั้งหมด
  const [showModal, setShowModal] = useState(false); // การแสดงผล Modal

  // จำนวนวันที่เหลือสำหรับแต่ละประเภทการลา
  // ใช้memo มีการคำนวณที่ใช้ทรัพยากรมาก หรือซับซ้อน
  const leaveTypes = useMemo(()=>({
    sick: 30, // ลาป่วย
    vacation: 7, // ลากิจ
    maternity: 90, // ลาคลอด
    paternity: 5, // ลาพักร้อน

  }),[]); 

  // จำนวนวันที่เหลือเมื่อเลือกประเภทการลา
  useEffect(() => {
    if (leaveType) {
      setAvailableLeaveDays(leaveTypes[leaveType]);
    }
  }, [leaveType,leaveTypes]);

  // ฟังก์ชันคำนวณจำนวนวันที่ลา
  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const duration = (end - start) / (1000 * 3600 * 24) + 1; // คำนวณจำนวนวันที่ลา
      setLeaveDuration(duration);
    }
  };

  // อัพเดตค่าหลังจากกรอกวันที่เริ่มต้นและวันที่สิ้นสุด
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateDuration();
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateDuration();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leaveDuration > availableLeaveDays) {
      alert(`คุณสามารถลาได้สูงสุด ${availableLeaveDays} วัน`);
    } else {
      // เพิ่มคำขอลงในตาราง
      const newRequest = {
        leaveType,
        startDate,
        endDate,
        leaveDuration,
        leaveReason,
        availableLeaveDays: availableLeaveDays - leaveDuration, // หักลบจำนวนวันที่ลา
        status: "รอดำเนินการ", // สถานะเริ่มต้น
        requestDate: new Date().toLocaleDateString(), // วันที่ขอลา
      };

      setLeaveRequests([...leaveRequests, newRequest]);

      // หักจำนวนวันจาก leaveTypes[leaveType] หลังจากส่งคำขอ
      setAvailableLeaveDays(leaveTypes[leaveType] - leaveDuration);
    }
    setShowModal(false); // ปิด Modal หลังจากส่งคำขอ
  };

  return (
    <div className="leave-request-form">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        ส่งคำขออนุญาตลา
      </Button>
      {/* ตารางแสดงผลข้อมูลการลา และสถานะ */}
      <div className="leave-summary">
        <h3>ประวัติคำขออนุญาตลา</h3>
        <table >
          <thead>
            <tr>
              <th>วันที่ขอลา</th>
              <th>ประเภทการลา</th>
              <th>วันที่เริ่มต้นลา</th>
              <th>วันที่สิ้นสุดลา</th>
              <th>จำนวนวันที่ลา</th>
              <th>เหตุผลในการลา</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.requestDate}</td>
                <td>
                  {request.leaveType === "sick"
                    ? "ลาป่วย"
                    : request.leaveType === "vacation"
                    ? "ลากิจ"
                    : request.leaveType === "maternity"
                    ? "ลาคลอด"
                    : "ลาพักร้อน"}
                </td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.leaveDuration} วัน</td>
                <td>{request.leaveReason}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับฟอร์มการขอลา */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>คำขออนุญาตในการลา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {/* ประเภทการลา */}
            <div className="form-group">
              <label>ประเภทการลา:</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">เลือกประเภทการลา</option>
                <option value="sick">ลาป่วย (คงเหลือ 30 วัน)</option>
                <option value="vacation">ลากิจ (คงเหลือ 7 วัน)</option>
                <option value="maternity">ลาคลอด (คงเหลือ 90 วัน)</option>
                <option value="paternity">ลาพักร้อน (คงเหลือ 5 วัน)</option>
              </select>
            </div>

            {/* วันเริ่มต้นที่ลา */}
            <div className="form-group">
              <label>วันเริ่มต้นที่ลา:</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                required
              />
            </div>

            {/* วันสิ้นสุดที่ลา */}
            <div className="form-group">
              <label>วันสิ้นสุดที่ลา:</label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                required
              />
            </div>

            {/* จำนวนวันที่ลา */}
            <div className="form-group">
              <label>จำนวนวันที่ลา:</label>
              <input type="number" min="1" value={leaveDuration} readOnly />
            </div>

            {/* จำนวนวันที่เหลือ */}
            <div className="form-group">
              <label>จำนวนวันที่เหลือ:</label>
              <input type="number" value={availableLeaveDays} readOnly />
            </div>

            {/* เหตุผลในการลา */}
            <div className="form-group">
              <label>เหตุผลในการลา:</label>
              <textarea
                value={leaveReason}
                onChange={(e) => setLeaveReason(e.target.value)}
                rows="4"
                required
              ></textarea>
            </div>

            {/* ปุ่มยืนยันการขอลา */}
            <Button type="submit" variant="success">ส่งคำขออนุญาตลา</Button>
          </form>
        </Modal.Body>
      </Modal>

      
    </div>
  );
};

export default LeaveRequestForm;
