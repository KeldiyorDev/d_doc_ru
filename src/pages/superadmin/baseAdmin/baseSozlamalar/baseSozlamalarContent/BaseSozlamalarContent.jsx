import React from "react";
import BaseSozlamalarNavbar from "../baseSozlamalarNavbar/BaseSozlamalarNavbar";

const BaseSozlamalarContent = ({ currentUser }) => {
  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Карта</h3>

      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <BaseSozlamalarNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <h3 style={{ fontWeight: "bold", textTransform: "upperCase" }}>Добавить новое</h3>
                <form className="mt-3">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Именование</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Именование</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating">
                        <select data-placeholder="Контрольная карта" className="form-control select-search  form-control-outlin select">
                          <option></option>
                          <optgroup label="Nazorat Kartochkasi">
                            <option value="AZ">1a Контрольная карта</option>
                            <option value="CO">1б Контрольная карта</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="search" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Поиск</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <button type="submit" style={{ width: "150px", height: "55px" }} className="btn btn-primary">Добавлять</button>
                    </div>
                  </div>
                </form>

                {/* <!-- end form -->

                        <!-- table --> */}
                <table className="table table-bordered mt-3 table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%", borderRadius: "10px 0 0 0" }}>№</th>
                      <th style={{ width: "20%" }}>Именование</th>
                      <th style={{ width: "25%" }}>Период работы</th>
                      <th style={{ width: "30%" }}>Карточка</th>
                      <th style={{ width: "15%" }}>Показывать</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontSize: "14px" }}>
                      <td>1</td>
                      <td>Закон Республики Узбекистан</td>
                      <td className="text-center">3</td>
                      <td>1a Контрольная карта</td>
                      <td className="text-center">
                        <div
                          className="custom-control custom-control-right custom-checkbox custom-control-inline">
                          <input type="checkbox"
                            className="custom-control-input" id="hk1"
                            defaultChecked />
                          <label className="custom-control-label"
                            htmlFor="hk1"></label>
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="icon-pen btn btn-dark d-flex align-items-center justify-content-center cursor-pointer" />
                        {/* <a href="" className="btn btn-dark"><i className="icon-pen"></i> </a> */}
                      </td>
                    </tr>
                    <tr style={{ fontSize: "14px" }}>
                      <td>1</td>
                      <td>Закон Республики Узбекистан</td>
                      <td className="text-center">3</td>
                      <td>1a Контрольная карта</td>
                      <td className="text-center">
                        <div
                          className="custom-control custom-control-right custom-checkbox custom-control-inline">
                          <input type="checkbox"
                            className="custom-control-input" id="hk2"
                            defaultChecked />
                          <label className="custom-control-label"
                            htmlFor="hk2"></label>
                        </div>
                      </td>
                      <td className="text-center">
                        <i className="icon-pen btn btn-dark d-flex align-items-center justify-content-center cursor-pointer" />
                        {/* <a href="#" className="btn btn-dark"><i className="icon-pen"></i> </a> */}
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
      </div>
    </div>
  )
}

export default React.memo(BaseSozlamalarContent);