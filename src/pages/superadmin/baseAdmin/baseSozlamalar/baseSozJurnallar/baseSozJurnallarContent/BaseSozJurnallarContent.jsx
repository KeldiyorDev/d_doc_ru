import React from "react";
import BaseSozlamalarNavbar from "../../baseSozlamalarNavbar/BaseSozlamalarNavbar";

const BaseSozJurnallarContent = ({ currentUser }) => {
  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
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
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select data-placeholder="Выберите тип документа" className="form-control select-search  form-control-outlin select">
                          <option></option>
                          <optgroup label="Xujjat turini tanlang">
                            <option value="AZ">Бухарская область</option>
                            <option value="CO">Навоийская область</option>
                            <option value="CO">Самаркандская область</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Русское имяУзбекское имя</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Узбекское имя</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Краткая классификация</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Префикс журнала</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline form-control-sm" aria-label="form-control-sm example" placeholder="Placeholder" />
                            <label className="label-floating">Журнал Постфикс</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="number" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Стартовый номер</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-6 d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary"><i className="icon-floppy-disk"></i> Сохранять</button>
                      <button type="submit" className="btn btn-danger ml-2">Отмена</button>
                    </div>
                  </div>
                </form>
                {/* <!-- end form --> */}
              </div>
            </div>
            {/* <!-- end Table Components --> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(BaseSozJurnallarContent);