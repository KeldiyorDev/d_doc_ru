import React, { useEffect } from "react";
import Select from 'react-select';
let xodimFilter = [];

const QushimchaBajaruvchilar = ({ yangiQushish, xodimlar, setYangiQushish, colourStyles }) => {

  // qushimcha bajaruvchidagi checkbox ni faqat bittasini tanlash
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

  // nazorat va umumlashtiruvchi buttonlar
  const checkedDivNazorat = (e, index) => {
    let div = document.querySelectorAll('.col1');
    if (!e.hasAttribute('style')) {
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[0].removeAttribute('style');
      })
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

  const checkedDivUmum = (e, index) => {
    let div = document.querySelectorAll('.col1')
    if (!e.hasAttribute('style')) {
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[1].removeAttribute('style');
      })
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

  const selectXodimFunc = (e) => {
    xodimFilter.push(e);
  }

  const newCreateBajaruvchi = () => {
    setYangiQushish(prev => [...prev, '1']);
  }

  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Дополнительные исполнители</h6>
          </div>
          {yangiQushish.map((yangi, index) => (
            <div key={index} >
              <form onSubmit={deleteFun} className="bajaruvchiForm">
                <div className="card-box">
                  <div className="card mb-3">
                    <div className="card-body" id="bajaruvchi">
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        {/*{data?.document?.responsible && (*/}
                        {/*  <input type="checkbox" className="checkboxSelect" />*/}
                        {/*)}*/}
                        <input type="checkbox" className="checkboxSelect" />
                        <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                          <div className="checkbox chb mr-1" title="Nazorat" onClick={(e) => checkedDivNazorat(e.target, index)}>
                            <strong className="checkedName">N</strong>
                            <strong className="iconCheck text-white">N</strong>
                          </div>
                          <div className="checkbox chb mr-1" title="Umumlashtirish" onClick={(e) => checkedDivUmum(e.target, index)}>
                            <strong className="checkedName">U</strong>
                            <strong className="iconCheck text-white">U</strong>
                          </div>
                          <div className="checkbox chb mr-1" title="M" onClick={(e) => checkedDivM(e.target, index)}>
                            <strong className="checkedName">M</strong>
                            <strong className="iconCheck text-white">M</strong>
                          </div>
                        </div>
                        <div className="col2 mb-1 mr-1" style={{ flex: "3" }}>
                          <div className="form-group mb-0">
                            <Select
                              // defaultValue={options[1]}
                              options={xodimlar}
                              onChange={selectXodimFunc}
                              placeholder="Xodim"
                              className="XodimBajaruvchi"
                              isClearable={true}
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
                                >
                                </textarea>
                                <label className="label-floating">Комментарий</label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col4 mb-1 mr-1" style={{ flex: "2" }}>
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
                        <div className="col6 mb-1" style={{ flex: "1" }}>
                          <div style={{ height: "56px" }}>
                            <div className="form-group mb-0">
                              <button type="submit" className="btn btn-danger" style={{ padding: "16px", width: "60px" }}>
                                <i className="icon-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-1 mr-1 visibleBoshqa" style={{ width: "50%", display: "none" }}>
                        <div className="form-group form-group-floating row mb-0">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="number"
                                className="form-control form-control-outline boshqa"
                                style={{ height: "56px" }}
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
          <div className="text-right my-2">
            <button type="button" className="btn btn-primary" onClick={newCreateBajaruvchi} id="myFormInput">
            Добавить новое
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(QushimchaBajaruvchilar);