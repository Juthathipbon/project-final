import "./Notification.css";

function Notification() {
  return (
    <div className="Notification-container">
      <h1>Notification</h1>
      <div className="nav-container">
        <button className="btn btn-primary">Inbox</button>
        <button className="btn btn-primary">Spam</button>
      </div>
      <div className="main-noti">
        noti1
      </div>
      {/* <div class="card text-center">
        <div class="card-header">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" onClick={() => {}}>
                Inbox
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" onClick={() => {}}>
                Spam
              </a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="card w-75 mb-3">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" class="btn btn-primary">
                Button
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Notification;
