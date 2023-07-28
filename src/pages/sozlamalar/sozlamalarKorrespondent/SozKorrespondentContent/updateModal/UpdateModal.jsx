import React from "react";

const UpdateModal = ({ updateModal, setUpdateModal, Uzgartirish }) => {
  return (
    <div className="adminWindow">
      <div>
        <div className="modal-dialog modal-lg ">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h3 className="modal-title">Yangilash</h3>
              <button type="button" className="close closeYopish" onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</button>
            </div>

            <div className="modal-body">
              <form className="">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline tashkilotNomiUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.orgName}
                          />
                          <label className="label-floating">Tashkilot nomi</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline manzilUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.address}
                          />
                          <label className="label-floating">Mazili</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            // data-mask="+998(99) 999-99-99"
                            className="form-control form-control-outline telefonUzgartirish"
                            placeholder="Placeholder"
                            maxLength="9"
                            defaultValue={updateModal.obj?.mobileNumber}
                          />
                          <label
                            className="label-floating">Telefon</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control form-control-outline emailUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.orgEmail}
                          />
                          <label
                            className="label-floating">E-pochta</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control form-control-outline exatUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.orgExat}
                          />
                          <label
                            className="label-floating">E-xat</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div
                      className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <button
                            type="button"
                            className="btn btn-primary form-control form-control-outline"
                            onClick={() => Uzgartirish(updateModal.obj)}
                          >
                            Qo'shish
                          </button>
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
    </div>
  )
}

export default React.memo(UpdateModal);