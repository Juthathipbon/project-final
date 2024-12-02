import "./User.css";
import imgProfile from "../../Images/logo2.png";

function User({ setRole, setToken }) {
  const Logout = () => {
    setToken("");
    setRole("");
  };
  return (
    <div className="user-container">
      <div className="profile-container">
      <div className="section">
        <div className="profile-section">
          <img src={imgProfile} alt="Profile" />
          <div>
            <h2>จุฑาทิพย์ บุญใจ</h2>
            <p>Admin</p>
          </div>
        </div>
        <section>
          <div className="card">
            <h4>ข้อมูลของฉัน</h4>
            
            <p>ฝ่าย/แผนก: Admin/Admin</p>
            <p>ชื่อ-นามสกุล: นางสาวจุฑาทิพย์ บุญใจ </p>
            <p>อีเมล: juthathip.bon@spumail.net</p>
            <p>หมายเลขโทรศัพท์: 0897456123 </p>
            <p>ที่อยู่: 12ลาดพร้าว </p>
            <p>วันที่เริ่มต้นงาน: 04/25/2024</p>
          </div>
        </section>
      </div>
    </div>
      <div className="logout-container">
      <button type="button" className="btn btn-danger" onClick={() => Logout()}>
        Logout
      </button>
      </div>
    </div>
  );
}
export default User;
