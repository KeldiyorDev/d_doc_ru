import React, { useEffect, useState } from "react";
import '../../svodka/svodkaContent/SvodkaContent.css'
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";
import { axiosInstance } from "../../../../config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import 'jspdf-autotable';
import '../../svodka/svodkaContent/SvodkaContent.css'
import Select from "react-select";
import AlertContent, { Alert } from '../../../../component/alert/Alert';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import ReactPaginate from "react-paginate";

const SvodkaContentQVC = ({ currentUser }) => {
  const [allData, setAllData] = useState({})
  const [openTable, setOpenTable] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [korrespondent, setKorrespondent] = useState([]);
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [cardsName1, setCardsName1] = useState([]);
  const [cardId, setCardId] = useState([]);
  const [korresId, setKorresId] = useState([]);
  // const [dataOut, setDataOut] = useState([])
  const [selected, setSelected] = useState(0);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  // const [dataIn, setDataIn] = useState([])

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/visibleCardTypes")
        let arr = [];
        res.data.forEach((c) => {
          arr.push({ value: c.id, label: c.cardName });
        })

        if (isMounted)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/orgCorrespondent")
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.orgName })
        });

        if (isMounted)
          setKorrespondent(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const notParentsCardClick = async (e) => {
    try {
      const res = await axiosInstance.get("organization/cardType/byCardType/" + e.value)
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      setCardsName(arr);
    } catch (error) {
      console.log(error.response);
    }
  }

  const notParentsCardClick1 = async (e) => {
    try {
      const res = await axiosInstance.get("organization/showCardType/" + e.value)
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      setCardsName1(arr);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const changeHandler = (e) => {
    let arr = [];
    e.value.forEach((c) => {
      cardsName1.forEach((d) => {
        if (d.label === c) {
          arr.push(d.value);
        }
      })
    })
    setCardId(arr);
  }
  const changeHandler1 = async (e) => {
    let arr = [];
    e.value.forEach((c, i) => {
      korrespondent.forEach((d, i) => {
        if (d.label === c) {
          arr.push(d.value);
        }
      })
    })
    setKorresId(arr);
  }

  let fields1 = {
    label: 'value',
    value: 'label'
  };
  const handlePageClick = async (e) => {
    let card1 = document.querySelector('.card1')?.querySelector('.css-qc6sy-singleValue')?.textContent;
    setSelected(e.selected);
    let kart = cardsName.filter((c) => {
      return c.label === card1;
    })

    try {
      const res = await axiosInstance.post(`monitoring/cardType`, {
        cardId: cardId ? cardId : [],
        cardTypeId: kart[0].value,
        correspondents: korresId ? korresId : [],
        endDay: endDay !== '' ? endDay : '',
        startDay: startDay !== '' ? startDay : '',
        page: e.selected,
        workPlace: JSON.parse(localStorage.getItem('ids'))
      })
      setAllData(res.data)
      // setDataOut(res.data.content)
      // setDataIn(dataOut.monitorings)
    } catch (error) {
      console.log(error.response);
    }
  }

  const hujjatQushish = async (e) => {
    e.preventDefault();
    let card1 = document.querySelector('.card1')?.querySelector('.css-qc6sy-singleValue')?.textContent;

    // kartochkani olish
    let kart = cardsName.filter((c) => {
      return c.label === card1;
    })

    try {
      const res = await axiosInstance.post("monitoring/cardType", {
        cardId: cardId,
        cardTypeId: kart[0].value,
        correspondents: korresId,
        endDay: endDay !== '' ? endDay : '',
        startDay: startDay !== '' ? startDay : '',
        workPlace: JSON.parse(localStorage.getItem("ids")),
        page: 0
      })
      Alert(setAlert, "success", "Ссылка успешно отправлена ​​на разрешение");
      setOpenTable(true)
      setAllData(res.data)
      document.querySelector('.newFormFunc').reset();
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", error?.response?.data);
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
    let card1 = document.querySelector('.card1')?.querySelector('.css-qc6sy-singleValue')?.textContent;

    // kartochkani olish
    let kart = cardsName.filter((c) => {
      return c.label === card1;
    })

    try {
      const res = await axiosInstance.post("monitoring/cardType", {
        cardId: cardId,
        cardTypeId: kart[0].value ? kart[0].value : null,
        correspondents: korresId,
        endDay: endDay !== '' ? endDay : '',
        startDay: startDay !== '' ? startDay : '',
        workPlace: JSON.parse(localStorage.getItem("ids")),
        page: -1
      })
      setAllData(res.data);
      setOpenTable(true)
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Общий отчет</h3>
      <div className="card-body pt-1">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px 30px" }}>
                <form onSubmit={hujjatQushish} className="newFormFunc">
                  <div className="row row-date flex-wrap">
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              required={true}
                              options={notParentsCard}
                              onChange={notParentsCardClick}
                              placeholder="Контрольная карта"
                              className="cardTypeId"
                              isClearable={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              required={true}
                              options={cardsName}
                              placeholder="тип документа"
                              onChange={notParentsCardClick1}
                              className="card1"
                              isClearable={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="selectCheckBox">
                        <MultiSelectComponent id="mtselement"
                          className="korrespondent1 "
                          style={{ marginBottom: '0 !important' }}
                          onChange={changeHandler}
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={cardsName1}
                          placeholder="Выберите направление"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          showSelectAll="true"
                          filterBarPlaceholder="Поиск">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="selectCheckBox">
                        <MultiSelectComponent id="mtselement"
                          className="korrespondent1 "
                          style={{ marginBottom: '0 !important' }}
                          onChange={changeHandler1}
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={korrespondent}
                          placeholder="Выберите направление"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          showSelectAll="true"
                          filterBarPlaceholder="Qidirish">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
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
                            '&>input': {
                              border: 'none !important',
                              outline: 'none !important'
                            },
                            '&:hover': {
                              border: 'none !important',
                              outline: 'none !important'
                            }
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
                            '&>input': {
                              border: 'none !important',
                              outline: 'none !important'
                            },
                            '&:hover': {
                              border: 'none !important',
                              outline: 'none !important'
                            }
                          }}>
                            <DatePicker width="100" height="100"
                              className={'ruyxatSana'} id={'chiquvchiSana'}
                              selected={endDate}
                              onChange={(date) => {
                                setEndDate(date);
                                endFunc(date)
                              }}
                              dateFormat={'dd.MM.yyyy'}
                              isClearable
                              // placeholder="Chiquvchi № /sana"
                              showYearDropdown scrollableMonthYearDropdown />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4"></div>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 d-flex align-items-center justify-content-end mt-3" style={{ gap: "5px" }}>
                      <button className="btn btn-primary h-100" style={{ width: "33.333%" }} type={'submit'}>Поиск </button>
                      <button type={'button'} className="btn btn-primary h-100" style={{ width: "33.333%" }} onClick={all}>Все</button>
                      <div className="btn-group h-100" style={{ width: "33.333%" }}>
                        <button type="button" className="btn btn-primary dropdown-toggle btn-lg" data-toggle="dropdown">Export</button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="icon-menu7 download-table-xls-button dropdown-item"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="EXCEL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {openTable === true && (
                  <div style={{ overflow: "auto" }} className="table-responsive">
                    <table id="table-to-xls"
                      className="table table-bordered table-striped table-hover Tab my-3">
                      <thead>
                        <tr className="tr text-black text-center tr"
                          style={{ background: "#DCE6F0" }}>
                          <th className="foiz tr" rowSpan="5">№</th>
                          <th rowSpan="5" className="Name tr">Секретариаты</th>
                          <th rowSpan="3" className={'tr'}>Всего входящих документов</th>
                          {/*<th colSpan={allData?.umumiyMonitoring?.parentCard.length * 6}>SH U N D A N</th>*/}
                        </tr>
                        <tr className="text-black text-center tr" style={{ background: "#DCE6F0" }}>
                          <th rowSpan="2"
                            className={'tr'}>{allData?.umumiyMonitoring?.parentCard.name}</th>
                          <th className="jami-foiz tr" rowSpan="2">В % от общего</th>
                          <th className={'tr'} style={{ background: '#DCE6F0' }}
                            colSpan={allData?.umumiyMonitoring?.parentCard.childCard.length * 2}>В том числе
                          </th>
                        </tr>

                        <tr className="text-black text-center tr" style={{ background: "#DCE6F0" }}>
                          {allData?.umumiyMonitoring?.parentCard?.childCard.map((element2, index) => {
                            return (
                              <th key={Math.random()} className="text-deg-270 tr" colSpan="2"
                                style={{ background: "#F1DCDB" }}>{element2.name}</th>
                            )
                          })}
                        </tr>
                        <tr className="tr text-black text-center" style={{ background: "#DCE6F0" }}>
                          <th className="jami-foiz tr"
                            rowSpan="2">{allData?.umumiyMonitoring?.jamiKelgan}</th>
                          {
                            <>
                              <th className="degre tr" style={{ background: "#DCE6F0" }}
                                rowSpan="2">{allData?.umumiyMonitoring?.parentCard.soni}</th>
                              <th className="jami-foiz tr" style={{ background: '#DCE6F0' }}
                                rowSpan="2">{allData?.umumiyMonitoring?.parentCard.foizi}</th>

                              {allData?.umumiyMonitoring?.parentCard?.childCard.map((element2, index) => {
                                return (
                                  <th colSpan="2" className={'tr'}>{index + 1}</th>
                                )
                              })}
                            </>
                          }
                        </tr>
                        <tr className="text-black text-center tr" style={{ background: "#7cdaf1b5" }}>
                          {allData?.umumiyMonitoring?.parentCard?.childCard.map((element2) => {
                            return (
                              <>
                                <th className="Soni tr"
                                  style={{ background: "#DCE6F0" }}>{element2.soni}</th>
                                <th className="foiz tr"
                                  style={{ background: "#DCE6F0" }}>{element2.percentage}%
                                </th>
                              </>
                            )
                          })}
                        </tr>
                      </thead>

                      {allData?.departmentMonitoring?.map((element, index) => {
                        return (
                          <>
                            <tr>
                              <td style={{ textAlign: "center", background: '#C5D9F1' }}
                                className={'tr'}>{index + 1}</td>
                              <td width="504" height="35" className={'tr'}
                                style={{
                                  textAlign: "left",
                                  fontSize: '16px',
                                  background: '#C5D9F1'
                                }}>
                                <strong data-toggle="collapse"
                                  href={`#ib${index}`}>{element.departmentName}</strong>
                              </td>
                              <td className={'tr'}
                                style={{
                                  textAlign: "center",
                                  background: '#C5D9F1'
                                }}>{element?.umumiyMonitoringDepartmentUchun?.jamiKelgan}</td>


                              <td className={'tr'}
                                style={{
                                  textAlign: "center",
                                  background: '#C5D9F1'
                                }}>{element?.umumiyMonitoringDepartmentUchun?.parentCard.soni}</td>
                              <td className={'tr'}
                                style={{
                                  textAlign: "center",
                                  background: '#C5D9F1'
                                }}>{element?.umumiyMonitoringDepartmentUchun?.parentCard.foizi}</td>

                              {element?.umumiyMonitoringDepartmentUchun?.parentCard.childCard.map((element3) => {
                                return (
                                  <>
                                    <td className={'tr'}
                                      style={{
                                        textAlign: "center",
                                        background: '#C5D9F1'
                                      }}>{element3.soni}</td>
                                    <td className={'tr'}
                                      style={{
                                        textAlign: "center",
                                        background: '#C5D9F1'
                                      }}>{element3.percentage}</td>
                                  </>
                                )
                              })}
                            </tr>
                            <tbody id={`ib${index}`} className="collapse">

                              {element?.umumiyMonitoringForWorlkers.map((person, index1) => {
                                return (
                                  <tr className="table-secondarya tr">
                                    <td className={'tr'}
                                      style={{ textAlign: "center" }}>{index1 + 1}</td>
                                    <td className={'tr'}>{person.fullname}</td>
                                    <td className="text-center tr"> {person.umumiyMonitoringDepartmentUchun.jamiKelgan} </td>


                                    <td className="text-center tr">{person?.umumiyMonitoringDepartmentUchun?.parentCard.soni}</td>
                                    <td className="text-center tr">{person?.umumiyMonitoringDepartmentUchun?.parentCard.foizi}</td>

                                    {person?.umumiyMonitoringDepartmentUchun?.parentCard.childCard.map((element2) => {
                                      return (
                                        <>
                                          <td className="text-center tr">{element2.soni}</td>
                                          <td className="text-center tr">{element2.percentage}</td>
                                        </>
                                      )
                                    })}
                                  </tr>
                                )
                              })}
                            </tbody>
                          </>
                        )
                      })}
                    </table>
                    {allData?.departmentMonitoring?.length < 11 && allData?.departmentMonitoring?.length > 0 && (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={allData?.totalElements / 10}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className="paginationUL"
                        activeClassName="active"
                        forcePage={selected}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SvodkaContentQVC);