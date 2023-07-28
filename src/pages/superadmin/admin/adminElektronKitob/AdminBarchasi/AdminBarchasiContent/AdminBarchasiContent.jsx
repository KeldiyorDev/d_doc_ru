import React from "react";
import { Link } from 'react-router-dom';
import AdminElektronKitobNavbar from '../../adminElektronKitobNavbar/AdminElektronKitobNavbar';

const AdminBarchasiContent = ({ currentUser }) => {
  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <AdminElektronKitobNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <table className="table table-bordered  table-striped table-hover Tab">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "25%" }}>Тип/название журнала</th>
                      <th style={{ width: "25%" }}>Краткая классификация</th>
                      <th style={{ width: "10%" }}>Префикс журнала</th>
                      <th style={{ width: "10%" }}>Журнал Постфикс</th>
                      <th style={{ width: "10%" }}>Начальный номер</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontSize: "15px" }} className="text-center">
                      <td>1</td>

                      <td className="text-center">
                        <span className="badge badge-primary">Обращения</span>
                        <hr />
                        <p>Гражданские апелляции</p>
                      </td>
                      <td>Гражданские апелляции</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <div className="icon d-flex justify-content-center align-items-center">
                          <Link to="/super_admin_elektron-kitob-ko'rish" className="infoBtn bg-dark" data-popup="tooltip" data-bs-placement="top" title="Ko'rish">
                            <span><i className="icon-eye2"></i></span>
                          </Link>
                          {/* <a href="./barchasiDeteil.html" className="infoBtn bg-warning"
                                                        data-bs-toggle="tooltip" data-popup="tooltip"
                                                        data-bs-placement="top" title="korish">
                                                        <span><i className="icon-eye2"></i></span>
                                                    </a> */}
                          <Link to="/jurnallar_topshiriqlar" className="infoBtn bg-dark" data-popup="tooltip" data-bs-placement="top" title="Topshiriqlar">
                            <span><i className="icon-stack2"></i></span>
                          </Link>
                          {/* <a href="./barchasiTopshiriqlar.html" className="infoBtn bg-warning" data-popup="tooltip" title="Topshiriqlar">
                                                        <span><i className="icon-stack2"></i></span>
                                                    </a> */}
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }} className="text-center">
                      <td>1</td>
                      <td className="text-center">
                        <span className="badge badge-primary">Обращения</span>
                        <hr />
                        <p>Гражданские апелляции</p>
                      </td>
                      <td>Гражданские апелляции</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <div className="icon d-flex justify-content-center align-items-center">
                          <Link to="/super_admin_elektron-kitob-ko'rish" className="infoBtn bg-dark" data-popup="tooltip" data-bs-placement="top" title="Ko'rish">
                            <span><i className="icon-eye2"></i></span>
                          </Link>
                          {/* <a href="./barchasiDeteil.html" className="infoBtn bg-warning"
                                                        data-bs-toggle="tooltip" data-popup="tooltip"
                                                        data-bs-placement="top" title="korish"><span><i
                                                            className="icon-eye2"></i></span> </a> */}
                          <Link to="/jurnallar_topshiriqlar" className="infoBtn bg-dark" data-popup="tooltip" data-bs-placement="top" title="Topshiriqlar">
                            <span><i className="icon-stack2"></i></span>
                          </Link>
                          {/* <a href="./barchasiTopshiriqlar.html"
                                                        className="infoBtn bg-warning" data-popup="tooltip"
                                                        title="O'zgartirish"><i className="icon-stack2"></i> </a> */}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminBarchasiContent);