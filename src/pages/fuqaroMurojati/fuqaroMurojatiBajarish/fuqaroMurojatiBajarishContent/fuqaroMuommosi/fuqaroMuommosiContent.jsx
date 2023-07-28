import React from 'react';
import Select from "react-select";

const FuqaroMuommosiContent = ({ data }) => {

  const deleteFun = (e) => {
    e.target.remove();
  }

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header bg-primary text-white header-elements-inline">
          <h6 className="card-title" style={{
            fontWeight: "bold",
            textTransform: "upperCase"
          }}>Tasnif</h6>
        </div>
        <div className={'card-body row'}>
          <div className='col-lg-12 pl-2 pr-2 pt-2 pb-0' style={{ backgroundColor: 'rgb(200,200,200,0.5)' }}>
            {/* oldin mavjud bo'lsa */}
            {[1].map((dat, index) => (
              <form key={index} onSubmit={(e) => deleteFun(e, index)}
                className={'addNewBoxForm col-12 mb-1 px-0'} id={dat.id}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Select
                          // options={tasnif1}
                          placeholder={`${data?.ac1Name}`}
                          isClearable={true}
                          className="tasnif1"
                          isDisabled={true}
                        />
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Select
                          // options={tasnif2}
                          placeholder={`${data?.ac2Name}`}
                          isClearable={true}
                          className="tasnif2"
                          isDisabled={true}
                        />
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        <Select
                          // options={tasnif3}
                          placeholder={`${data?.ac3Name}`}
                          isClearable={true}
                          className="tasnif3"
                          isDisabled={true}
                        />
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating  row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <textarea
                            className="form-control form-control-outline shortDescription"
                            style={{ height: '56px' }}
                            placeholder="Placeholder"
                            value={data?.shortDescription}
                            disabled={true}
                          />
                          <label className="label-floating">QISQACHA MAZMUNI</label>
                          <div className="invalid-feedback">Maydonni to'ldiring</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FuqaroMuommosiContent)