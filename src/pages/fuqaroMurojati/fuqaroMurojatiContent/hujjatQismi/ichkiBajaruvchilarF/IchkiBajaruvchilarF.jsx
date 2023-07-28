import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { axiosInstance } from "../../../../../config";
let xodimFilter = [], l = 0;

export default function IchkiBajaruvchilarF({ colourStyles,objData, yangiQushish, setYangiQushish, xodimlar, setXodimlar, currentUser, allexecutorsData, openBajaruvchi,setBajaruvchi,bajaruvchi, }) {
  const [rowLeinExecutorInformationListLength, setRowLeinExecutorInformationListLength] = useState(0);

  console.log(allexecutorsData);

  // xodimlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`executor/inExecutors/${JSON.parse(localStorage.getItem('ids'))}`)
        console.log(res.data)
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.departmentShortName, label: d.departmentShortName, isDisabled: "true" });
          if (d?.users?.length > 0) {
            d?.users.forEach((d, index) => {
              let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName.substring(0, 2) + ". " : d?.firstName.substring(0, 1) + ". ") : "";
              arr.push({
                value: d.id, label: `${index + 1}. ${firstname}${d?.lastName}`, pl: d?.workPlaceId
              });
            })
          }
        })
        if (isMounted)
          setXodimlar(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // qushimcha bajaruvchidagi checkbox ni faqat bittasini tanlash
  useEffect(() => {
    let isMounted = true;
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');

    if (isMounted) {
      checkboxSelect.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
          console.log(checkbox.checked)
          if (checkbox.checked) {
            checkboxSelect.forEach((d) => {
              d.checked = false;
              console.log(d);
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

  useEffect(() => {
    let isMounted = true, l = 0;

    allexecutorsData?.forEach((d) => {
      l += d?.ichkiBajaruvchilar?.length;
    })

    if (isMounted) {
      setRowLeinExecutorInformationListLength(l);
    }

    return () => {
      isMounted = false;
    }
  }, [allexecutorsData, objData]);

  const deleteFun1 = (e) => {
    e.target.remove();
    setRowLeinExecutorInformationListLength(prev => prev - 1);
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
    <div className="card-box ">
      <div className="col-lg-12">
        <div className="">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Ichki Bajaruvchilar</h6>
          </div>
          {allexecutorsData?.length > 0 && allexecutorsData?.map((all, index) => (
            (all.index === openBajaruvchi.index) && (
              (all.ichkiBajaruvchilar.length > 0) && all.ichkiBajaruvchilar.map((dat, index1) => (
                <div>
                  <form onSubmit={deleteFun1} className="bajaruvchiForm">
                    <div className="card-box">
                      <div className="card mb-3">
                        <div className="card-body" id="bajaruvchi">
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                            <input type="checkbox" className="checkboxSelect" defaultChecked={dat?.isResponsible} />
                            <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                              <div className="checkbox chb mr-1" title="Nazorat" onClick={(e) => checkedDivNazorat(e.target, index)}>
                                <strong className="checkedName">N</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === 4 && "flex",
                                    backgroundColor: dat?.executorStatusName === 4 && "rgb(0, 86, 184)"
                                  }}>N</strong>
                              </div>
                              <div className="checkbox chb mr-1" title="Umumlashtirish" onClick={(e) => checkedDivUmum(e.target, index)}>
                                <strong className="checkedName">U</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === 3 && "flex",
                                    backgroundColor: dat?.executorStatusName === 3 && "rgb(0, 86, 184)"
                                  }}>U</strong>
                              </div>
                              <div className="checkbox chb mr-1" title="Ma'lumot uchun" onClick={(e) => checkedDivM(e.target, index)}>
                                <strong className="checkedName">M</strong>
                                <strong className="iconCheck text-white"
                                  style={{
                                    display: dat?.executorStatusName === 2 && "flex",
                                    backgroundColor: dat?.executorStatusName === 2 && "rgb(0, 86, 184)"
                                  }}>M</strong>
                              </div>
                            </div>
                            <div className="col2 mb-1 mr-1 text-left" style={{ flex: "3" }}>
                              <div className="form-group mb-0">
                                {xodimlar?.length > 0 && (
                                  <Select
                                    defaultValue={xodimlar.filter((d) => d.pl === dat?.workPlaceId)}
                                    options={xodimlar}
                                    placeholder="Xodim"
                                    className="XodimBajaruvchi"
                                    styles={colourStyles}
                                  />
                                )}
                                {/* <Select
                                  defaultValue={dat?.FIO}
                                  options={xodimlar}
                                  placeholder="Xodim"
                                  className="XodimBajaruvchi"
                                /> */}
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
                                    <label className="label-floating">Izoh</label>
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
                                  <button type="submit" className="btn btn-danger" style={{ padding: "16px", width: "60px" }}>
                                    <i className="icon-trash"></i>
                                  </button>
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


          {yangiQushish.map((yangi, index) => (
            <div key={index} >
              <form onSubmit={deleteFun} className="bajaruvchiForm">
                <div className="card-box">
                  <div className="card mb-3">
                    <div className="card-body" id="bajaruvchi">
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
                        <input type="checkbox" className="checkboxSelect" />
                        {/* {data?.document?.isResponsible && (
                        )} */}
                        <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                          <div className="checkbox chb mr-1" title="Nazorat" onClick={(e) => checkedDivNazorat(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">N</strong>
                            <strong className="iconCheck text-white" >N</strong>
                          </div>
                          <div className="checkbox chb mr-1" title="Umumlashtirish" onClick={(e) => checkedDivUmum(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">U</strong>
                            <strong className="iconCheck text-white">U</strong>
                          </div>
                          <div className="checkbox chb mr-1" title="M" onClick={(e) => checkedDivM(e.target, index + rowLeinExecutorInformationListLength)}>
                            <strong className="checkedName">M</strong>
                            <strong className="iconCheck text-white">M</strong>
                          </div>
                        </div>
                        <div className="col2 mb-1 mr-1" style={{ flex: "3" }}>
                          <div className="form-group mb-0 text-left">
                            <Select
                              // defaultValue={options[1]}
                              options={xodimlar}
                              onChange={selectXodimFunc}
                              placeholder="Xodim"
                              className="XodimBajaruvchi"
                              isClearable={true}
                            // styles={colourStyles}
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
                                <label className="label-floating">Izoh</label>
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
                                <label className="label-floating">Sana</label>
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
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ))}

          <div className="text-right my-2">
            <button type="button" className="btn btn-primary" onClick={newCreateBajaruvchi} id="myFormInput">
              Yangi qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}