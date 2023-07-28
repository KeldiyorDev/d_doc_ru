import React from 'react';
import Select from "react-select";
import IchkiBajaruvchilarF from "../../../../fuqaroMurojatiContent/hujjatQismi/ichkiBajaruvchilarF/IchkiBajaruvchilarF";
import { colourStyles } from "../../../../../../App";
import TashqiBajaruvchilarF
  from "../../../../fuqaroMurojatiContent/hujjatQismi/tashqiBajaruvchilarF/TashqiBajaruvchilarF";
import { axiosInstanceFq } from "../../../../../../config";
import { DESCRIPTION2, DESCRIPTION3 } from "../../../../../../context/AuthReducer";
import { useDispatch } from "react-redux";

function FuqaroBajaruvchilarKorish({
  data,
  currentUser,
  objData,
  tasnif1,
  tasnif2,
  tasnif3,
  Bajaruvchilar,
  allexecutorsData,
  openBajaruvchi,
  setOpenBajaruvchi,
  BajaruvchilarSaqlash,
  setTasnif1,
  setTasnif2,
  setTasnif3,
  results,
  setResults,
  xodimlar,
  setXodimlar,
  addNewBox,
  yangiQushish,
  setYangiQushish,
  setAlert,
  setAddNewBox,
  tasdiqlovchi,
  setYunalishlar,
  yunalishlar,
}) {
  const dispatch = useDispatch();

  const deleteFun = (e) => {
    e.target.remove();
  }

  // const newCreateBajaruvchiSelects = () => {
  //   setAddNewBox(prev => [...prev, `1`]);
  // }

  const notParentsCardClickTanif1 = async (e) => {
    // tasnif2 ni o'qib olish
    try {
      const res = await axiosInstanceFq.get("ac_2/list/" + e.value)
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })
      dispatch(DESCRIPTION2(arr));
      setTasnif2(arr);
    } catch (error) {
      console.log(error);
    }
  }

  const notParentsCardClickTasnif2 = async (e) => {
    // tasnif3 ni o'qib olish
    try {
      const res = await axiosInstanceFq.get("ac_3/list/" + e.value)
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })
      dispatch(DESCRIPTION3(arr));
      setTasnif3(arr);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="card-box">
      <div className="col-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{
              fontWeight: "bold",
              textTransform: "uppercase"
            }}>Bajaruchilar</h6>
          </div>
          <div className="card-body">
            <div className="row ">
              <div className='col-lg-12 pl-2 pr-2 pt-2 pb-0'
                style={{ backgroundColor: 'rgb(200,200,200,0.5)' }}>
                {/* oldin mavjud bo'lsa */}
                {objData[0]?.problems?.length > 0 && objData[0]?.problems.map((dat, index) => (
                  <form key={index} onSubmit={deleteFun}
                    className={'addNewBoxForm col-12 mb-1 px-0'}>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            {tasnif1?.length > 0 && (
                              <Select
                                defaultValue={tasnif1.find((d) => d.value === objData[0]?.problems[index]?.ac_1ID)}
                                options={tasnif1}
                                placeholder="TASNIF1"
                                onChange={notParentsCardClickTanif1}
                                isClearable={true}
                                className="tasnif1"
                                isDisabled={true}
                              />
                            )}
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            {tasnif2?.length > 0 && (
                              <Select
                                defaultValue={tasnif2.filter((d) => d.value === objData[0]?.problems[index]?.ac_2ID)}
                                options={tasnif2}
                                onChange={notParentsCardClickTasnif2}
                                placeholder="TASNIF2"
                                isClearable={true}
                                className="tasnif2"
                                isDisabled={true}
                              />
                            )}
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            {tasnif3?.length > 0 && (
                              <Select
                                defaultValue={tasnif3.find((d) => d.value === objData[0]?.problems[index]?.ac_3ID)}
                                options={tasnif3}
                                placeholder="TASNIF3"
                                isClearable={true}
                                className="tasnif3"
                                isDisabled={true}
                              />
                            )}
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <button
                          type={'button'}
                          className={'btn bg-primary text-white w-100 btn-bajaruvchi'}
                          onClick={() => Bajaruvchilar(index)}
                          style={{ height: '56px' }}
                        >
                          Bajaruvchi
                          {(dat?.inExecutors?.length > 0 || dat?.outExecutors?.length > 0) && (
                            <span
                              className="bajaruvchiBadge">+</span>
                          )}
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <div
                          className="form-group form-group-floating  row">
                          <div className="col-lg-12">
                            <div
                              className="position-relative">
                              <textarea
                                className="form-control form-control-outline shortDescription"
                                style={{ height: '56px' }}
                                placeholder="Placeholder"
                                defaultValue={dat?.shortDescription}
                                disabled
                              />
                              <label
                                className="label-floating">QISQACHA
                                MAZMUNI</label>
                              <div
                                className="invalid-feedback">Maydonni
                                to'ldiring
                              </div>
                            </div>
                          </div>
                          {/*<div className="col-lg-1 "*/}
                          {/*     style={{flex: "1"}}>*/}
                          {/*    <div*/}
                          {/*        style={{height: "56px"}}>*/}
                          {/*        <div*/}
                          {/*            className="form-group mb-0 d-flex align-items-center justify-content-center">*/}
                          {/*            <button*/}
                          {/*                type="submit"*/}
                          {/*                className="btn btn-danger "*/}
                          {/*                style={{*/}
                          {/*                    width: '100%',*/}
                          {/*                    height: '56px'*/}
                          {/*                }}>*/}
                          {/*                <i className="icon-trash"></i>*/}
                          {/*            </button>*/}
                          {/*        </div>*/}
                          {/*    </div>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    </div>
                  </form>
                ))}

                {/* yangi uchun */}
                {addNewBox.map((dat, index) => (
                  <form key={index + objData[0]?.problems?.length}
                    onSubmit={deleteFun}
                    className={'addNewBoxForm col-12 mb-1 px-0'}>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif1}
                              placeholder="TASNIF1"
                              onChange={notParentsCardClickTanif1}
                              isClearable={true}
                              className="tasnif1"
                            />
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif2}
                              onChange={notParentsCardClickTasnif2}
                              placeholder="TASNIF2"
                              isClearable={true}
                              className="tasnif2"
                            />
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif3}
                              placeholder="TASNIF3"
                              isClearable={true}
                              className="tasnif3"
                            />
                            <div
                              className="invalid-feedback">Maydonni
                              tanlang
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <button
                          type={'button'}
                          className={'btn bg-primary text-white w-100 btn-bajaruvchi'}
                          onClick={() => Bajaruvchilar(index + objData[0]?.problems?.length)}
                          style={{ height: '56px' }}
                        >
                          Bajaruvchi
                          {allexecutorsData.some((d) => d.index === index + objData[0]?.problems?.length) && (
                            <span
                              className="bajaruvchiBadge">+</span>
                          )}
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <div
                          className="form-group form-group-floating  row">
                          <div className="col-lg-11">
                            <div
                              className="position-relative">
                              <textarea
                                className="form-control form-control-outline shortDescription"
                                style={{ height: '56px' }}
                                placeholder="Placeholder"
                              />
                              <label
                                className="label-floating">QISQACHA
                                MAZMUNI</label>
                              <div
                                className="invalid-feedback">Maydonni
                                to'ldiring
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-1 "
                            style={{ flex: "1" }}>
                            <div
                              style={{ height: "56px" }}>
                              <div
                                className="form-group mb-0 d-flex align-items-center justify-content-center">
                                <button
                                  type="submit"
                                  className="btn btn-danger "
                                  style={{
                                    width: '100%',
                                    height: '56px'
                                  }}>
                                  <i className="icon-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ))}
              </div>

              {/*open modal*/}
              <div className={'adminWindow'} style={{
                display: openBajaruvchi.open ? "block" : "none",
                overflowY: 'auto'
              }}>
                <div className="modal-dialog modal-xl pt-5 ">
                  <div className="modal-content">
                    <div
                      className="modal-header bg-primary text-white">
                      <h5 className="modal-title ">Bajaruvchilar</h5>
                      <button className="close"
                        onClick={() => setOpenBajaruvchi({
                          open: false,
                          obj: {},
                          index: null
                        })}
                        data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body shadowKiruvchi text-center"
                      style={{
                        padding: "10px",
                        border: "1px solid lightgray",
                        margin: "10px",
                        backgroundColor: "lightgray"
                      }}>
                      {/* ichki bajaruvchilar */}
                      <IchkiBajaruvchilarF
                        currentUser={currentUser}
                        colourStyles={colourStyles}
                        xodimlar={xodimlar}
                        setXodimlar={setXodimlar}
                        yangiQushish={yangiQushish}
                        setYangiQushish={setYangiQushish}
                        allexecutorsData={allexecutorsData}
                        openBajaruvchi={openBajaruvchi}
                        objData={objData}
                        tasdiqlovchi={tasdiqlovchi}
                        data={data}
                      />

                      {/* tashqi bajaruvchilar */}
                      <TashqiBajaruvchilarF
                        currentUser={currentUser}
                        setResults={setResults}
                        results={results}
                        setAlert={setAlert}
                        allexecutorsData={allexecutorsData}
                        openBajaruvchi={openBajaruvchi}
                        objData={objData}
                        setYunalishlar={setYunalishlar}
                        yunalishlar={yunalishlar}
                      />
                    </div>
                    <div
                      className="modal-footer d-flex justify-content-center">
                      <button
                        onClick={() => BajaruvchilarSaqlash(openBajaruvchi.index)}
                        className="btn btn-success"
                        style={{ width: "150px" }}>Saqlash
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/*<div className={`col-lg-12`}>*/}
              {/*    <div className="row">*/}
              {/*        <div className="col-lg-9"></div>*/}
              {/*        <div className="col-lg-3 mt-1 text-right"*/}
              {/*             style={{paddingRight: '0px'}}>*/}
              {/*            <button type={'button'}*/}
              {/*                    onClick={() => newCreateBajaruvchiSelects()}*/}
              {/*                    className={'btn bg-primary text-white w-75'}>Yangi*/}
              {/*            </button>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
              {/* {(openModal) && (
              <div className={'adminWindow'}>
                <div className="modal-dialog modal-sm pt-5 ">
                  <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                      <h5 className="modal-title ">Xomaki</h5>
                      <button className="close"
                        onClick={() => setOpenModal(false)}
                        data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body shadowKiruvchi text-center"
                      style={{
                        padding: "10px",
                        border: "1px solid lightgray",
                        margin: "10px",
                        backgroundColor: "lightgray"
                      }}>
                      <h3 className="font-weight-semibold py-1 px-1 " style={{
                        borderRadius: '5px',
                        fontSize: "20px",
                        color: "#000"
                      }}>Yangi hujjat kiritildi</h3>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                      <button onClick={() => setOpenModal(false)}
                        className="btn btn-success"
                        style={{ width: "150px" }}>Yangi
                      </button>
                      <button onClick={() => goToXomakiKorish()}
                        className="btn btn-success"
                        style={{ width: "150px" }}>Xomaki kurish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuqaroBajaruvchilarKorish;