import React from "react";
import BaseSozlamalarNavbar from "../../baseSozlamalarNavbar/BaseSozlamalarNavbar";

const BaseSozTaqdimFormaContent = ({ currentUser }) => {
  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Настройки</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <BaseSozlamalarNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <form className="mt-3">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Именование</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-5">
                          <div className="position-relative">
                            <button className="btn btn-primary form-control form-control-outline">Добавлять</button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </form>

                {/* <!-- table --> */}
                <table className="table table-bordered mt-3 table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "90%" }}> Именование </th>
                      <th style={{ width: "5%" }}> Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontSize: "14px" }}>
                      <td className="text-center">1</td>
                      <td>Закон Республики Узбекистан</td>
                      <td className="text-center">
                        <div className="icon d-flex justify-content-center align-items-center ">
                          <button className="infoBtn bg-dark" data-toggle="modal" data-target="#yangilash" data-popup="tooltip" title="O'zgartirish"><i className="icon-pencil5" ></i> </button>
                          {/* <!-- modal --> */}
                          <div id="yangilash" className="modal fade" tabIndex="-1">
                            <div className="modal-dialog modal-lg ">
                              <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                  <h1 className="modal-title">Обновлять</h1>
                                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                  {/* <!-- card1 --> */}
                                  <form className="mt-3">
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <div className="form-group form-group-floating row">
                                          <div className="col-lg-12">
                                            <div className="position-relative">
                                              <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                              <label className="label-floating">Именование</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-12">
                                        <div className="form-group form-group-floating row">
                                          <div className="col-lg-12">
                                            <div className="position-relative">
                                              <button className="btn btn-primary form-control form-control-outline">Добавлять</button>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <i className="icon-trash infoBtn bg-dark d-flex align-items-center justify-content-center cursor-pointer" title="O'chirish" />
                          {/* <a href="#" className="infoBtn bg-dark" data-popup="tooltip" title="O'chirish"><i className="icon-trash"></i> </a> */}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- end table --> */}
              </div>
            </div>
            {/* <!-- end Table Components --> */}
          </div>
        </div>
      </div >
    </div >
  )
}

export default React.memo(BaseSozTaqdimFormaContent);