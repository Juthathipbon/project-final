import React, { useEffect, useState } from "react";
import "./Employees.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const Employees = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    status: "",
    idcard: "",
    email: "",
    phone: "",
    address: "",
    fristDate: "",
    description: {
      dateWork: "",
      descriptionjob: "",
      workProgress: "",
      workHour: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false); // state สำหรับเปิด/ปิดโหมดแก้ไข
  const [editEmployee, setEditEmployee] = useState(null); // state สำหรับเก็บข้อมูลที่จะแก้ไข
  const [deletedEmployees, setDeletedEmployees] = useState([]);

  // ฟังก์ชันสําหรับดึงข้อมูลพนักงาน
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:6500/employee/getList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employees.");
      }

      const data = await response.json();

      // ตรวจสอบว่า data.data เป็น array หรือไม่
      if (Array.isArray(data.data)) {
        setEmployees(data.data); // ตั้งค่า `employees` เป็น array จาก API
      } else {
        console.error("API did not return an array:", data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // ฟังก์ชันสําหรับเพิ่มพนักงาน
  const handleAddEmployee = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าจากฟอร์ม

    // กำหนด empId โดยใช้ Date.now() (มิลลิวินาที)
  const empId = Date.now().toString();

  // สร้างข้อมูลพนักงานใหม่พร้อมกับ empId
  const newEmployeeWithId = { ...newEmployee, empId };

    try {
      const response = await fetch("http://localhost:6500/employee/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployeeWithId),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee.");
      }

      const result = await response.json();
      console.log("Employee added:", result); // ตรวจสอบข้อมูลที่ได้รับจากเซิร์ฟเวอร์

      setEmployees((prevEmployees) => [...prevEmployees, result.data[0]]);

      // ปิด modal หลังเพิ่มพนักงาน
      setShowAddEmployeeModal(false);

      // ล้างข้อมูลพนักงานใหม่ในฟอร์ม
      setNewEmployee({
        name: "",
        position: "",
        department: "",
        status: "",
        idcard: "",
        email: "",
        phone: "",
        address: "",
        fristDate: "",
        description: {
          dateWork: "",
          descriptionjob: "",
          workProgress: "",
          workHour: "",
        },
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันแก้ไขพนักงาน
  const handleEditEmployee = async () => {
    try {
      const response = await fetch(
        "http://localhost:6500/employee/update/" + editEmployee.empId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editEmployee),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee.");
      }

      const updatedEmployee = await response.json();

      console.log(updatedEmployee); // ตรวจสอบข้อมูลที่ได้รับจากเซิร์ฟเวอร์
      // อัปเดตข้อมูลใน state
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.empId === updatedEmployee.data.empId ? updatedEmployee.data : emp
        )
      );

      setIsEditing(false); // ปิดโหมดแก้ไข
      setSelectedEmployee(updatedEmployee.data); // อัปเดตข้อมูลใน Modal
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleDeleteEmployee = (empId) => {
    setDeletedEmployees((prevDeleted) => [...prevDeleted, empId]);
  };

  // โหลดข้อมูลพนักงาน
  useEffect(() => {
    fetchEmployees();
  }, []); // โหลดข้อมูลเมื่อ component mount

  // โหลดข้อมูลพนักงาน
  useEffect(() => {
    console.log("Employees updated:", employees); // ตรวจสอบข้อมูลเมื่อ employees เปลี่ยนแปลง
  }, [employees]);
  // ถ้า employees เปลี่ยนแปลง จะรีเฟรชข้อมูล

  // ฟังก์ชันเพิ่มพนักงาน
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ฟังก์ชันค้นหาพนักงาน
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // ฟังก์ชันกรองข้อมูลพนักงานตามตัวอักษรตัวแรกของชื่อ
  const filteredEmployees = employees.filter((employee) => {
    const notDeleted = !deletedEmployees.includes(employee.empId);
    const firstLetter = employee?.name?.charAt(0)?.toLowerCase() || "";
    const searchFirstLetter = searchQuery?.charAt(0)?.toLowerCase() || ""; // ใช้เฉพาะตัวอักษรแรก
    const matchesSearchQuery = searchFirstLetter ? firstLetter.includes(searchFirstLetter) : true;

    return notDeleted && matchesSearchQuery;
  });

  return (
    <div className="employee-overview">
      <header className="emp-header">
        <h1>ข้อมูลการปฏิบัติงานของพนักงาน</h1>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setShowAddEmployeeModal(true)}
        >
          เพิ่มพนักงาน
        </button>
        <input
          type="text"
          placeholder="ค้นหาชื่อพนักงาน..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>
      <table className="emp-table">
        <thead>
          <tr>
            <th>ฝ่าย/แผนก</th>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
            <th>สถานะ</th>
            <th>เพิ่มเติม</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.empId}>
                <td>{employee.position}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    ดูเพิ่มเติม
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEmployee(employee.empId)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">ยังไม่มีข้อมูลพนักงาน</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal สำหรับเพิ่มพนักงาน */}
      <Modal
        show={showAddEmployeeModal}
        onHide={() => setShowAddEmployeeModal(false)}
        className="modal-add"
      >
        <Modal.Header closeButton>
          <Modal.Title >เพิ่มพนักงานใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddEmployee}>
            <div>
              <label>ชื่อ:</label>
              <input
                type="text"
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>ตำแหน่ง:</label>
              <input
                type="text"
                name="position"
                value={newEmployee.position}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>ฝ่าย:</label>
              <input
                type="text"
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>เลขที่บัตรประชาชน:</label>
              <input
                type="text"
                name="idcard"
                value={newEmployee.idcard}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>อีเมล:</label>
              <input
                type="email"
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>หมายเลขโทรศัพท์:</label>
              <input
                type="text"
                name="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>ที่อยู่:</label>
              <input
                type="text"
                name="address"
                value={newEmployee.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>วันที่เริ่มงาน:</label>
              <input
                type="date"
                name="fristDate"
                value={newEmployee.fristDate}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              เพิ่มพนักงาน
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal สำหรับดูเพิ่มเติมของพนักงาน */}
      {selectedEmployee && (
        <Modal
          show={!!selectedEmployee}
          onHide={() => setSelectedEmployee(null)}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              ข้อมูลการปฏิบัติงานของ {selectedEmployee?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditEmployee(selectedEmployee); // เตรียมข้อมูลที่จะแก้ไข
                setSelectedEmployee(null); // ปิดหน้าดูเพิ่มเติม
                setIsEditing(true); // เปิดหน้าแก้ไข
              }}
            >
              แก้ไข
            </button>
            <p>
              <strong>ฝ่าย/แผนก:</strong> {selectedEmployee?.department} /{" "}
              {selectedEmployee?.position}
            </p>
            <p>
              <strong>ชื่อ:</strong> {selectedEmployee?.name}
            </p>
            <p>
              <strong>เลขที่บัตรประชาชน:</strong> {selectedEmployee?.idcard}
            </p>
            <p>
              <strong>อีเมล:</strong> {selectedEmployee?.email}
            </p>
            <p>
              <strong>หมายเลขโทรศัพท์:</strong> {selectedEmployee?.phone}
            </p>
            <p>
              <strong>ที่อยู่:</strong> {selectedEmployee?.address}
            </p>
            <p>
              <strong>วันที่เริ่มต้นงาน:</strong> {selectedEmployee?.fristDate}
            </p>
            <p>
              <strong>รายละเอียดการปฏิบัติงาน:</strong>
            </p>
            <table className="emp-table-modal">
              <thead>
                <tr>
                  <th>วันที่ปฏิบัติงาน</th>
                  <th>รายละเอียดงาน</th>
                  <th>ความคืบหน้างาน</th>
                  <th>จํานวนชั่วโมงงาน</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedEmployee?.description?.dateWork}</td>
                  <td>{selectedEmployee?.description?.descriptionjob}</td>
                  <td>{selectedEmployee?.description?.workProgress}</td>
                  <td>{selectedEmployee?.description?.workHour}</td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setSelectedEmployee(null)}>
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal สำหรับแก้ไขข้อมูลพนักงาน */}
      {isEditing && editEmployee && (
        <Modal show={isEditing} onHide={() => setIsEditing(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขข้อมูลพนักงาน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>ชื่อ:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editEmployee.name || ""}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ตำแหน่ง:</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={editEmployee.position || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>ฝ่าย:</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={editEmployee.department || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>สถานะ:</label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  value={editEmployee.status || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>อีเมล:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={editEmployee.email || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>หมายเลขโทรศัพท์:</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={editEmployee.phone || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>ที่อยู่:</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={editEmployee.address || ""}
                  onChange={handleEditInputChange}
                />
              </div>
              <div className="form-group">
                <label>วันที่เริ่มงาน:</label>
                <input
                  type="date"
                  className="form-control"
                  name="fristDate"
                  value={editEmployee.fristDate || ""}
                  onChange={handleEditInputChange}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleEditEmployee} // ฟังก์ชันสำหรับบันทึกข้อมูลที่แก้ไข
            >
              บันทึกการเปลี่ยนแปลง
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Employees;
