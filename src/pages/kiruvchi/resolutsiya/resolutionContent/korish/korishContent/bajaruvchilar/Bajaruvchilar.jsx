import React, { useEffect, useState } from "react";
import Select from "react-select";
import { colourStyles } from "../../../../../../../App";

const Bajaruvchilar = ({ data, xodimlar, qaytaIjro, confirmerWorkPlaceId }) => {
  console.log(data);
  console.log(xodimlar);

  const [yangiQushish, setYangiQushish] = useState([]);
  const [rowLeinExecutorInformationListLength, setRowLeinExecutorInformationListLength] = useState(0);

  // ichki topshiriqlardagi checkbox ni faqat bittasini tanlash
  useEffect(() => {
    let isMounted = true;
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');

    if (isMounted) {
      checkboxSelect.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
          if (checkbox.checked) {
            checkboxSelect.forEach((d) => {
              d.checked = false;
            })
            checkbox.checked = true;
          }
        })
      })
    }

    return () => {
      checkboxSelect.forEach((checkbox) => {
        checkbox.removeEventListener('click', () => {
          if (checkbox.checked) {
            checkboxSelect.forEach((d) => {
              d.checked = false;
            })
            checkbox.checked = true;
          }
        })
      })
      isMounted = false;
    }
  }, [yangiQushish])

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      setRowLeinExecutorInformationListLength(data[0]?.inExecutorInformationList?.length);

    return () => {
      isMounted = false;
    }
  }, [data]);

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

  const selectQaytaIjroFunc = (e) => {
    if (e.label === "Boshqa") {
      document.querySelector('.visibleBoshqa').style.display = "block";
    } else {
      document.querySelector('.visibleBoshqa').style.display = "none";
    }
  }

  const deleteFun = (e) => {
    e.target.remove();
  }

  const deleteFun1 = (e) => {
    e.target.remove();
    setRowLeinExecutorInformationListLength(prev => prev - 1);
  }

  const newCreateBajaruvchi = () => {
    setYangiQushish(prev => [...prev, '1']);
  }

  const colourStyles2 = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', height: '56px' }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        textTransform: 'upperCase',
        fontWeight: isDisabled ? "bold" : " ",
        fontSize: isDisabled ? "16px" : '14px',
        color: isDisabled ? "blue" : "black",
        cursor: isDisabled ? "not-allowed" : "default",
  
      };
    }
  };
  

  return (
    <>
      <div className="card-box">
        <div className="col-lg-12">
          <div>
            <div className="card-header bg-primary text-white header-elements-inline">
              <h6 className="card-title" style={{
                fontWeight: "bold",
                textTransform: "upperCase"
              }}>Исполнитель </h6>
            </div>

            {(data[0]?.inExecutorInformationList?.length > 0 && xodimlar?.length > 0) && data[0]?.inExecutorInformationList?.map((dat, index) => (
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
                          <input type="checkbox" className="checkboxSelect" defaultChecked={dat?.isResponsible} />
                          <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                            <div className="checkbox chb mr-1"
                              title="Nazorat"
                              onClick={(e) => checkedDivNazorat(e.target, index)}>
                              <strong className="checkedName">N</strong>
                              <strong className="iconCheck text-white"
                                style={{
                                  display: dat?.executorStatusName === "NAZORAT UCHUN" && "flex",
                                  backgroundColor: dat?.executorStatusName === "NAZORAT UCHUN" && "rgb(0, 86, 184)"
                                }}>N</strong>
                            </div>
                            <div className="checkbox chb mr-1"
                              title="Umumlashtirish"
                              onClick={(e) => checkedDivUmum(e.target, index)}>
                              <strong className="checkedName">U</strong>
                              <strong className="iconCheck text-white"
                                style={{
                                  display: dat?.executorStatusName === "UMUMLASHTIRUVCHI" && "flex",
                                  backgroundColor: dat?.executorStatusName === "UMUMLASHTIRUVCHI" && "rgb(0, 86, 184)"
                                }}>U</strong>
                            </div>
                            <div className="checkbox chb mr-1" title="Ma'lumot uchun" onClick={(e) => checkedDivM(e.target, index)}>
                              <strong className="checkedName">M</strong>
                              <strong className="iconCheck text-white"
                                style={{
                                  display: dat?.executorStatusName === "MA'LUMOT UCHUN" && "flex",
                                  backgroundColor: dat?.executorStatusName === "MA'LUMOT UCHUN" && "rgb(0, 86, 184)"
                                }}>M</strong>
                            </div>
                          </div>
                          <div className="col2 mb-1 mr-1" style={{ flex: "3" }}>
                            <div className="form-group mb-0">
                              {console.log(xodimlar.filter((item) => item?.pl === dat?.workPlaceId))}
                              {
                                xodimlar?.filter((item) => item?.pl === dat?.workPlaceId)?.length > 0 ? (
                                  <Select
                                    defaultValue={(dat?.workPlaceId !== confirmerWorkPlaceId) && {
                                      value: `${(dat?.firstName.trim() && dat?.firstName?.trim().length > 1) ? ((((dat?.firstName[0].trim().toUpperCase() === "S" || dat?.firstName[0].trim().toUpperCase() === "C") && dat?.firstName[1].trim().toUpperCase() === "H")) ? dat?.firstName?.trim().substring(0, 2) + ". " : dat?.firstName?.trim().substring(0, 1) + ". ") : ""}${dat?.lastName.trim()}`,
                                      label: `${(dat?.firstName.trim() && dat?.firstName?.trim().length > 1) ? ((((dat?.firstName[0].trim().toUpperCase() === "S" || dat?.firstName[0].trim().toUpperCase() === "C") && dat?.firstName[1].trim().toUpperCase() === "H")) ? dat?.firstName?.trim().substring(0, 2) + ". " : dat?.firstName?.trim().substring(0, 1) + ". ") : ""}${dat?.lastName.trim()}`
                                    }}
                                    options={xodimlar}
                                    placeholder="Сотрудник"
                                    className="XodimBajaruvchi"
                                    styles={colourStyles}
                                  />
                                ) : (
                                  <Select
                                    options={xodimlar}
                                    placeholder="Сотрудник"
                                    className="XodimBajaruvchi"
                                    styles={colourStyles2}
                                  />
                                )
                              }
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
                                  <label className="label-floating">Комментарий</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col4 mb-1 mr-1" style={{ flex: "2" }}>
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
                                  <label className="label-floating">Дата</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col5 mb-1 mr-1"
                            style={{ flex: "2" }}>
                            <div className="form-group mb-0">
                              {(dat?.repeatExecutePeriodDto?.name || dat?.repeatExecutePeriodDto?.period) ? (
                                <Select
                                  defaultValue={{
                                    value: (dat?.repeatExecutePeriodDto?.period),
                                    label: (dat?.repeatExecutePeriodDto?.name ? dat?.repeatExecutePeriodDto?.name : dat?.repeatExecutePeriodDto?.period ? dat?.repeatExecutePeriodDto?.period : null)
                                  }}
                                  options={qaytaIjro}
                                  onChange={(e) => selectQaytaIjroFunc(e, index)}
                                  placeholder="Повтор"
                                  className="qaytaIjro col1QaytaIjro"
                                  styles={colourStyles}
                                />
                              ) : (
                                <Select
                                  options={qaytaIjro}
                                  onChange={(e) => selectQaytaIjroFunc(e, index)}
                                  placeholder="Повтор"
                                  className="qaytaIjro col1QaytaIjro"
                                  styles={colourStyles}
                                />
                              )}
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
                        <div className="mb-1 mr-1 visibleBoshqa" style={{ width: "100%", display: "none" }}>
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
                                  className="label-floating">Другой</label>
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

            {yangiQushish.map((yangi, index) => (
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
                                // defaultValue={options[1]}
                                options={xodimlar}
                                // onChange={selectXodimFunc}
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
                                    className="label-floating">Комментарий</label>
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
                                  <label className="label-floating">Дата</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col5 mb-1 mr-1"
                            style={{ flex: "2" }}>
                            <div className="form-group mb-0">
                              <Select
                                // defaultValue={options[1]}
                                options={qaytaIjro}
                                onChange={(e) => selectQaytaIjroFunc(e, index + data[0]?.inExecutorInformationList?.length)}
                                placeholder="Qayta Ijro"
                                className="qaytaIjro col1QaytaIjro"
                                styles={colourStyles}
                              />
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
                        <div className="mb-1 mr-1 visibleBoshqa" style={{ width: "100%", display: "none" }}>
                          <div className="form-group form-group-floating row mb-0">
                            <div className="col-12">
                              <div className="position-relative">
                                <input
                                  type="number"
                                  className="form-control form-control-outline boshqa"
                                  style={{ height: "56px", }}
                                  placeholder="Placeholder"
                                />
                                <label className="label-floating">Другой</label>
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
      <div className="text-right mr-2 my-2">
        <button type="button" className="btn btn-primary" onClick={newCreateBajaruvchi} id="myFormInput">
        Добавить новое
        </button>
      </div>
    </>
  )
}

export default React.memo(Bajaruvchilar);