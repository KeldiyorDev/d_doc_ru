import React from "react";
import Select from "react-select";
import { colourStyles } from "../../../../../App";

export default function FuqaroBajaruvchilar({
  data,
  setRowLeinExecutorInformationListLength,
  openBajaruvchi,
  rowLeinExecutorInformationListLength,
  yangiQushish,
  xodimlar,
  yangiQushishKorish,
  yangiQushishBajaruchcilar,
  indexDat
}) {


  // N U M tugmalar
  const checkedDivNazorat = (e, index) => {
    let div = document.querySelectorAll('.col1');
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[0].removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  const checkedDivUmum = (e, index) => {
    let div = document.querySelectorAll('.col1')
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[1].removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  const checkedDivM = (e, index) => {
    let div = document.querySelectorAll('.col1')
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  const deleteFun = (e) => {
    e.target.remove();
  }

  const deleteFun1 = (e) => {
    e.target.remove();
    setRowLeinExecutorInformationListLength(prev => prev - 1);
  }

  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div>
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{
              fontWeight: "bold",
              textTransform: "upperCase"
            }}>Bajaruvchi</h6>
          </div>

          {/*{data?.length > 0 && data?.map((dat, index) => (*/}

          {yangiQushishBajaruchcilar.map((d, i) => (
            // console.log((d.index === openBajaruvchi.index))
            (d.index === openBajaruvchi.index) && (
              d.data?.length > 0 && d.data?.map((dat, index) => (
                <div key={index}>
                  <form onSubmit={deleteFun1} className="bajaruvchiForm">
                    <div className="card-box">
                      <div className="card mb-3">
                        <div className="card-body" id="bajaruvchi">
                          <div className="" style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center"
                          }}>
                            <input type="checkbox" className="checkboxSelect"
                              defaultChecked={dat?.isResponsible} />
                            <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                              <div className="checkbox chb mr-1"
                                title="Nazorat"
                                onClick={(e) => checkedDivNazorat(e.target, index)}>
                                <strong className="checkedName">N</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === "Nazorat uchun" && "flex",
                                    backgroundColor: dat?.executorStatusName === "Nazorat uchun" && "rgb(0, 86, 184)"
                                  }}>N</strong>
                              </div>
                              <div className="checkbox chb mr-1"
                                title="Umumlashtirish"
                                onClick={(e) => checkedDivUmum(e.target, index)}>
                                <strong className="checkedName">U</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === "Umumlashtiruvchi" && "flex",
                                    backgroundColor: dat?.executorStatusName === "Umumlashtiruvchi" && "rgb(0, 86, 184)"
                                  }}>U</strong>
                              </div>
                              <div className="checkbox chb mr-1" title="Ma'lumot uchun"
                                onClick={(e) => checkedDivM(e.target, index)}>
                                <strong className="checkedName">M</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === "Ma'lumot uchun" && "flex",
                                    backgroundColor: dat?.executorStatusName === "Ma'lumot uchun" && "rgb(0, 86, 184)"
                                  }}>M</strong>
                              </div>
                            </div>
                            <div className="col2 mb-1 mr-1"
                              style={{ flex: "3" }}>
                              <div className="form-group mb-0">
                                <Select
                                  defaultValue={{
                                    value: `${(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}${dat?.lastName}`,
                                    label: `${(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}${dat?.lastName}`
                                  }}
                                  options={xodimlar}
                                  placeholder="Xodim"
                                  className="XodimBajaruvchi"
                                  styles={colourStyles}
                                />
                              </div>
                            </div>
                            <div className="col3 mb-1 mr-1" style={{ flex: "2" }}>
                              <div className="form-group form-group-floating row mb-0">
                                <div className="col-lg-12">
                                  <div className="position-relative">
                                    <textarea
                                      className="form-control form-control-outline izohCol1"
                                      style={{ height: "56px" }}
                                      placeholder="Placeholder"
                                      defaultValue={dat?.description}
                                    >
                                    </textarea>
                                    <label
                                      className="label-floating">Izoh</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col4 mb-1 mr-1"
                              style={{ flex: "2" }}>
                              <div
                                className="form-group form-group-floating row mb-0">
                                <div className="col-lg-12">
                                  <div className="position-relative">
                                    <input
                                      type="date"
                                      className="form-control daterange-single form-control-outline bajaruvchiSana"
                                      id="chiquvchiSana"
                                      placeholder="Placeholder"
                                      defaultValue={dat?.deadline}
                                      style={{ border: "1px solid lightgray" }}
                                    />
                                    <label className="label-floating">Sana</label>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col6 mb-1" style={{ flex: "1" }}>
                              <div style={{ height: "56px" }}>
                                <div className="form-group mb-0">
                                  <button type="submit"
                                    className="btn btn-danger"
                                    style={{
                                      padding: "16px",
                                      width: "60px"
                                    }}><i
                                      className="icon-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-1 mr-1 visibleBoshqa"
                            style={{ width: "100%", display: "none" }}>
                            <div className="form-group form-group-floating row mb-0">
                              <div className="col-12">
                                <div className="position-relative">
                                  <input
                                    type="number"
                                    className="form-control form-control-outline boshqa"
                                    style={{ height: "56px", }}
                                    placeholder="Placeholder"
                                  />
                                  <label
                                    className="label-floating">Boshqa</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ))
            )


          ))}

          {yangiQushish?.map((yangi, index) => (
            <div key={index}>
              <form onSubmit={deleteFun} className="bajaruvchiForm">
                <div className="card-box">
                  <div className="card mb-3">
                    <div className="card-body" id="bajaruvchi">
                      <div className="" style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center"
                      }}>
                        <input type="checkbox" className="checkboxSelect" />
                        <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                          <div className="checkbox chb mr-1" title="Nazorat"
                            onClick={(e) => checkedDivNazorat(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">N</strong>
                            <strong className="iconCheck text-white">N</strong>
                          </div>
                          <div className="checkbox chb mr-1"
                            title="Umumlashtirish"
                            onClick={(e) => checkedDivUmum(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">U</strong>
                            <strong className="iconCheck text-white">U</strong>
                          </div>
                          <div className="checkbox chb mr-1" title="M"
                            onClick={(e) => checkedDivM(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">M</strong>
                            <strong className="iconCheck text-white">M</strong>
                          </div>
                        </div>
                        <div className="col2 mb-1 mr-1"
                          style={{ flex: "3" }}>
                          <div className="form-group mb-0">
                            <Select
                              options={xodimlar}
                              placeholder="Xodim"
                              className="XodimBajaruvchi"
                              styles={colourStyles}
                            />
                          </div>
                        </div>
                        <div className="col3 mb-1 mr-1"
                          style={{ flex: "2" }}>
                          <div
                            className="form-group form-group-floating row mb-0">
                            <div className="col-lg-12">
                              <div className="position-relative">
                                <textarea
                                  className="form-control form-control-outline izohCol1"
                                  style={{ height: "56px" }}
                                  placeholder="Placeholder"
                                >
                                </textarea>
                                <label
                                  className="label-floating">Izoh</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col4 mb-1 mr-1"
                          style={{ flex: "2" }}>
                          <div className="form-group form-group-floating row mb-0">
                            <div className="col-lg-12">
                              <div className="position-relative">
                                <input
                                  type="date"
                                  className="form-control daterange-single form-control-outline bajaruvchiSana"
                                  id="chiquvchiSana"
                                  placeholder="Placeholder"
                                  style={{ border: "1px solid lightgray" }}
                                />
                                <label className="label-floating">Sana</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col6 mb-1" style={{ flex: "1" }}>
                          <div style={{ height: "56px" }}>
                            <div className="form-group mb-0">
                              <button
                                type="submit"
                                className="btn btn-danger"
                                style={{
                                  padding: "16px",
                                  width: "60px"
                                }}>
                                <i className="icon-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-1 mr-1 visibleBoshqa"
                        style={{ width: "100%", display: "none" }}>
                        <div className="form-group form-group-floating row mb-0">
                          <div className="col-12">
                            <div className="position-relative">
                              <input
                                type="number"
                                className="form-control form-control-outline boshqa"
                                style={{ height: "56px", }}
                                placeholder="Placeholder"
                              />
                              <label className="label-floating">Boshqa</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}