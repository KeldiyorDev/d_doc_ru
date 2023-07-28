import React from "react";
import AdminContentNavbar from "../../adminContentNavbar/AdminContentNavbar";

const AdminBuyruqBannerContent = ({ currentUser }) => {
  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Командный баннер</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminContentNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px 30px" }}>
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-8">
                    <div className="card mb-0">
                      <div className="card-header bg-primary text-white header-elements-inline">
                        <h6 className="card-title" style={{ fontWeight: "bold", fontSize: "18px" }}>
                        Позиция 1</h6>
                      </div>
                      <div className="d-flex justify-content-center">
                        <img src="/style/images/qaror.png" style={{ width: "70%" }}
                          alt="" />
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 d-flex justify-content-center">
                            <button className="btn btn-primary"
                              style={{ width: "60%" }}>Выбрать баннер для 
                              позиции</button>
                          </div>
                          <div className="col-lg-12 mt-2 d-flex justify-content-center">
                            <button className="btn btn-primary"
                              style={{ width: "15%" }}>Отправка</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminBuyruqBannerContent);