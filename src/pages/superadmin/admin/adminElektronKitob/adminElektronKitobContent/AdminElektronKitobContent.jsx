import React from "react";
import AdminElektronKitobNavbar from "../adminElektronKitobNavbar/AdminElektronKitobNavbar";
import FormElements from "./FormElements/FormElements";

const AdminElektronKitobContent = ({ currentUser }) => {

  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
      {/* card-body */}
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminElektronKitobNavbar />
        </ul>
        <div className="tab-content px-0">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card px-0">
              <div className="card-body px-1" style={{ padding: "5px 15px" }}>
                {/* form elements */}
                <FormElements
                  currentUser={currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminElektronKitobContent);