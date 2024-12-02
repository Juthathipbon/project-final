import "./EmpUser.css";
import imgProfile from "../../Images/logo2.png";


function EmpUser({ setRole, setToken }) {
  const Logout = () => {
    setToken("");
    setRole("");
  };
  return (
    <div className="empUser">
      <div className="profileEmp-container">
        <div className="section">
          <div className="profileEmp-section">
            <img src={imgProfile} alt="Profile" />
            <div>
              <h2>Cameron Williamson</h2>
              <p>Driver</p>
            </div>
          </div>
          <section>
            <div className="card">
              <h4>Employment details</h4>
              <p>Status: Active</p>
              <p>Department: Logistics</p>
              <p>Start date: 04/25/2022</p>
            </div>

            <div className="card">
              <h4>Compensation</h4>
              <p>Employee type: Salary/No overtime</p>
              <p>Job title: Driver</p>
              <p>Wage: $36,000 per year</p>
            </div>
          </section>
        </div>
      </div>
      <div className="logout-container">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default EmpUser;
