import React, { useState } from "react";
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";
import { axiosInstance } from "../../../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SvodkaContent.css"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import 'jspdf-autotable';
import ReactPaginate from "react-paginate";

const SvodkaContent = ({ currentUser }) => {
  const [allData, setAllData] = useState({})
  const [openTable, setOpenTable] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");

  // search
  const search = async () => {
    const ids = localStorage.getItem("ids")
    try {
      const res = await axiosInstance.post("monitoring/umumiy/" + ids, {
        startDay: startDay,
        endDay: endDay,
        page: 0
      })
      setAllData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setOpenTable(true)
  }

  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post(`monitoring/umumiy/` + JSON.parse(localStorage.getItem('ids')), {
        endDay: endDay !== '' ? endDay : '',
        startDay: startDay !== '' ? startDay : '',
        page: e.selected,
      })
      setAllData(res.data)
      // setDataOut(res.data.content)
      // setDataIn(dataOut.monitorings)
    } catch (error) {
      console.log(error.response);
    }
  }

  const startFunc = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let start = yyyy + '-' + mm + '-' + dd;
    setStartDay(start);
  }

  const endFunc = (date) => {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();
    let end = yyyy + '-' + mm + '-' + dd;
    setEndDay(end);
  }

  const all = async () => {
    try {
      const res = await axiosInstance.post("monitoring/umumiy/" + JSON.parse(localStorage.getItem("ids")), {
        endDay: endDay !== '' ? endDay : '',
        startDay: startDay !== '' ? startDay : '',
        page: -1
      })
      setAllData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setOpenTable(true)
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase" }}>Общий отчет</h3>
      <div className="card-body pt-1">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px 30px" }}>
                <div className="row row-date">
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className={'changeBox'} style={{
                          height: '100%',
                          width: '100%',
                          border: '1px solid lightgray',
                          borderRadius: '5px',
                          '&>input': { border: 'none !important', outline: 'none !important' },
                          '&:hover': { border: 'none !important', outline: 'none !important' }
                        }}>
                          <DatePicker width="100" height="100"
                            className={'chiquvchiSana'} id={'chiquvchiSana'}
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              startFunc(date)
                            }}
                            dateFormat={'dd.MM.yyyy'}
                            isClearable
                            // placeholder="Chiquvchi № /sana"
                            showYearDropdown scrollableMonthYearDropdown />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className={'changeBox'} style={{
                          height: '100%',
                          width: '100%',
                          border: '1px solid lightgray',
                          borderRadius: '5px',
                          '&>input': { border: 'none !important', outline: 'none !important' },
                          '&:hover': { border: 'none !important', outline: 'none !important' }
                        }}>
                          <DatePicker width="100" height="100"
                            className={'chiquvchiSana'} id={'chiquvchiSana'}
                            selected={endDate}
                            onChange={(date) => {
                              setEndDate(date);
                              endFunc(date)
                            }}
                            dateFormat={'dd.MM.yyyy'}
                            isClearable
                            showYearDropdown scrollableMonthYearDropdown />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 d-flex align-items-center justify-content-end" style={{ gap: "5px" }}>
                    <button className="btn btn-primary h-100" style={{ width: "33.333%" }} onClick={search}>Поиск</button>
                    <button className="btn btn-primary h-100" style={{ width: "33.333%" }} onClick={all}>Dct</button>
                    <div className="btn-group h-100" style={{ width: "33.333%" }}>
                      <button type="button" className="btn btn-primary dropdown-toggle btn-lg" styl={{ width: "100%" }} data-toggle="dropdown">Export</button>
                      <div className="dropdown-menu dropdown-menu-right">
                        <ReactHTMLTableToExcel
                          id="test-table-xls-button"
                          className="icon-menu7 download-table-xls-button dropdown-item"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="EXCEL" />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ overflow: "auto" }} className="table-responsive">
                  {openTable && <table id="table-to-xls"
                    className="table table-bordered table-striped table-hover Tab my-3">
                    <thead>
                      <tr className="tr text-black text-center tr">
                        <th className="foiz tr" rowSpan="5" style={{ background: "#DCE6F0" }}>№</th>
                        <th rowSpan="5" className="Name tr"
                          style={{ width: "400px", background: "#DCE6F0" }}>Секретариаты
                        </th>
                        <th rowSpan="3" className="tr" style={{ background: "#DCE6F0" }}>Всего прибыло
                          hujjatlar
                        </th>
                        <th className="tr" colSpan={allData?.umumiyMonitoring?.count}
                          style={{ background: "#DCE6F0" }}>ПОЭТОМУ
                        </th>
                      </tr>
                      <tr className="text-black text-center tr">
                        {allData && allData.umumiyMonitoring ? allData.umumiyMonitoring.parentCard.map((element, index) => {
                          return (
                            <>
                              <th rowSpan="2" className="tr" style={{
                                maxHeight: "50px",
                                width: "100px",
                                textAlign: "center",
                                background: "#DA9695"
                              }}>{element.name}</th>
                              <th className="jami-foiz tr" rowSpan="2"
                                style={{ width: "150px", background: "#DCE6F0" }}>В % от общего
                              </th>
                              <th className="tr" colSpan={element.childCard.length * 2}
                                style={{
                                  width: `${element.childCard.length * 250}px`,
                                  background: "#DCE6F0"
                                }}>Включая
                              </th>
                            </>
                          )
                        }) : undefined}
                      </tr>

                      <tr className="tr text-black text-center">
                        {allData?.umumiyMonitoring?.parentCard.map((element) => {
                          return (
                            element?.childCard.map((element2) => {
                              return (
                                <th key={Math.random()} className="tr" colSpan="2"
                                  style={{ background: "#F1DCDB" }}>{element2.name}</th>
                              )
                            })
                          )

                        })}
                      </tr>
                      <tr className="tr text-black text-center">
                        <th className="tr jami-foiz" rowSpan="2"
                          style={{ background: "#DCE6F0" }}>{allData?.umumiyMonitoring?.jamiKelgan}</th>
                        {allData?.umumiyMonitoring?.parentCard.map((element, index) => {
                          return (
                            <>
                              <th className="tr degre" rowSpan="2"
                                style={{ background: "#DCE6F0" }}>{element.soni}</th>
                              <th className="tr jami-foiz" rowSpan="2"
                                style={{ background: "#DCE6F0" }}>{element.foizi}</th>

                              {element?.childCard.map((element2, index) => {
                                return (
                                  <th colSpan="2" className="tr"
                                    style={{ background: "#DCE6F0" }}>{index + 1}</th>
                                )
                              })}
                            </>
                          )
                        })}
                      </tr>
                      <tr className="tr text-black text-center">
                        {allData?.umumiyMonitoring?.parentCard.map((element) => {
                          return (
                            element?.childCard.map((element2) => {
                              return (
                                <>
                                  <th className="Soni tr"
                                    style={{ background: "#DCE6F0" }}>{element2.soni}</th>
                                  <th className="foiz tr" style={{
                                    minWidth: "50px",
                                    background: "#DCE6F0"
                                  }}>{element2.percentage}%
                                  </th>
                                </>
                              )
                            })
                          )
                        })}
                      </tr>
                    </thead>

                    {allData?.departmentMonitoring?.map((element, index) => {
                      return (
                        <>
                          <tr className="text-center">
                            <td className="tr" style={{
                              textAlign: "center",
                              background: "#C5D9F1"
                            }}>{index + 1}</td>
                            <td className="tr text-center" width="504" height="35" style={{
                              height: "75px",
                              fontSize: "16px",
                              background: "#C5D9F1"
                            }}>
                              <strong className="text-center" data-toggle="collapse"
                                href={`#ib${index}`}>{element.departmentName}</strong>
                            </td>
                            <td className="tr" style={{
                              textAlign: "center",
                              background: "#C5D9F1"
                            }}>{element?.umumiyMonitoringDepartmentUchun?.jamiKelgan}</td>

                            {element?.umumiyMonitoringDepartmentUchun?.parentCard.map((element2) => {
                              return (
                                <>
                                  <td className="tr" style={{
                                    textAlign: "center",
                                    background: "#C5D9F1"
                                  }}>{element2.soni}</td>
                                  <td className="tr" style={{
                                    textAlign: "center",
                                    background: "#C5D9F1"
                                  }}>{element2.foizi}%
                                  </td>

                                  {element2.childCard.map((element3) => {
                                    return (
                                      <>
                                        <td className="tr" style={{
                                          textAlign: "center",
                                          background: "#C5D9F1"
                                        }}>{element3.soni}</td>
                                        <td className="tr" style={{
                                          textAlign: "center",
                                          background: "#C5D9F1"
                                        }}>{element3.percentage}%
                                        </td>
                                      </>
                                    )
                                  })}
                                </>
                              )
                            })}
                          </tr>


                          <tbody id={`ib${index}`} className="collapse">
                            {element?.umumiyMonitoringForWorlkers.map((person, index) => {
                              return (
                                <tr className="tr table-secondarya text-center">

                                  <td className="tr" colSpan="2"
                                    style={{ paddingLeft: "40px" }}>{index + 1}.{person.fullname}</td>
                                  <td className="text-center tr"
                                    style={{ textAlign: "center" }}> {person.umumiyMonitoringDepartmentUchun.jamiKelgan} </td>


                                  {person?.umumiyMonitoringDepartmentUchun?.parentCard.map((element) => {
                                    return (
                                      <>
                                        <td className="text-center tr"
                                          style={{ textAlign: "center" }}>{element.soni}</td>
                                        <td className="text-center tr"
                                          style={{ textAlign: "center" }}>{element.foizi}</td>

                                        {element?.childCard.map((element2) => {
                                          return (
                                            <>
                                              <td className="text-center tr"
                                                style={{ textAlign: "center" }}>{element2.soni}</td>
                                              <td className="text-center tr"
                                                style={{ textAlign: "center" }}>{element2.percentage}%
                                              </td>
                                            </>
                                          )
                                        })}
                                      </>


                                    )
                                  })
                                  }
                                </tr>
                              )
                            })}
                          </tbody>
                        </>
                      )
                    })}
                  </table>
                  }
                  {allData?.departmentMonitoring?.length < 11 && allData?.departmentMonitoring?.length > 0 && (
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">>"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      pageCount={allData?.totalElement / 10}
                      previousLabel="<<"
                      renderOnZeroPageCount={null}
                      className="paginationUL"
                      activeClassName="active"
                    // forcePage={selected}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SvodkaContent);