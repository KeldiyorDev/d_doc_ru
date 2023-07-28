import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { RiFileExcel2Line } from 'react-icons/ri';
import { GrDocumentPdf } from 'react-icons/gr';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";
import { axiosInstance } from "../../../../config";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import Loader from "../../../../component/loader/Loader";
import MonitoringKiruvchiTable from "./MonitoringKiruvchiTable/MonitoringKiruvchiTable";
import ForExcelTable from "../ForExcelTable";
import './monitoringKiruvchi.css';
let departmentsIds = [];

const MonitoringKiruvchiContent = ({ currentUser }) => {
  const params = useParams();
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [departmentId, setDepartmentId] = useState(null);
  const [cardsName1, setCardsName1] = useState([]);
  const [cardsTypes1, setCardsTypes1] = useState([]);
  const [cardKor, setCardKor] = useState([]);
  const [forExcelData, setForExcelData] = useState([]);
  const [korrespondent1, setKorrespondent1] = useState([]);
  const [hujjatTuri, setHujjatTuri] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  let loader = useRef();
  const CardType = useRef();
  const DocumentType = useRef();
  const Correspondent = useRef();
  const loadingref = useRef();

  // barcha malumotlarni kiruvchiga kirgan payt o'qib olish
  useEffect(() => {
    let isMounted = true;
    loader.current.style.display = "flex";

    const getData = async () => {
      try {
        const res = await axiosInstance.post("monitoring/income", {
          cards: [],
          correspondents: [],
          endDate: null,
          startDate: null,
          page: 0,
          orgId: JSON.parse(localStorage.getItem('oi')),
          workPlaceId: localStorage.getItem('ids')
        })
        if (isMounted) {
          loader.current.style.display = "none";
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          loader.current.style.display = "none";
          Alert(setAlert, "warning", "Произошла ошибка при получении данных");
        }, 4000);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  let fields1 = {
    text: 'label',
    value: 'value'
  };

  // nazorat kartochkalarini olib kelish
  useEffect(() => {
    let cancel = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/showCardTypeByOrg/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((c) => {
          arr.push({ value: c.id, label: c.cardName });
        })

        if (cancel)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      cancel = false;
    }
  }, [currentUser]);

  // korrespondentlarni o'qib olish
  useEffect(() => {
    let cancel = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/orgCorrespondent/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.orgName })
        });

        if (cancel)
          setKorrespondent1(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      cancel = false
    }
  }, [currentUser]);

  // nazorat kartochkalarini tanlaganda
  const changeHandler = useCallback(async (e) => {
    setCardsTypes1(e.value)
    try {
      const res = await axiosInstance.post("card/cardType/byIds/" + JSON.parse(localStorage.getItem('oi')), {
        ids: e.value,
      })
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.cardName })
      });
      setHujjatTuri(arr1);
    } catch (error) {
      console.log(error.response);
    }
  }, [setCardsTypes1, setHujjatTuri]);

  // hujjat turini tanlaganda
  const changeHandler1 = useCallback(async (e) => {
    setCardsName1(e.value);
  }, [setCardsName1]);

  // korrespondent ni tanlaganda
  const changeHandler2 = useCallback(async (e) => {
    setCardKor(e.value);
  }, [setCardKor]);

  const allDocumemts = async () => {
    try {
      const res = await axiosInstance.post("monitoring/income/department", {
        departmentID: departmentId,
        cards: [],
        correspondents: [],
        endDate: null,
        startDate: null,
        page: 0,
        orgId: JSON.parse(localStorage.getItem('oi')),
        workPlaceId: localStorage.getItem('ids')
      })

      if (DocumentType.current?.value) {
        DocumentType.current.value = [];
        setHujjatTuri([]);
      }
      if (Correspondent.current?.value) {
        Correspondent.current.value = [];
        setKorrespondent1([]);
      }
      if (CardType.current?.value) CardType.current.value = [];
      setEmployeeData(res.data);
      setSelected(0);
      setEndDate();
      setStartDate();
    } catch (error) {
      console.log(error.response);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  const searchDocuments = async (e) => {
    e.preventDefault();
    if (departmentId) {
      try {
        // hamma malumotni o'qib olish
        const res1 = await axiosInstance.post("monitoring/income", {
          departmentID: departmentId,
          cards: cardsName1 ? cardsName1 : [],
          cardTypes: cardsTypes1 ? cardsTypes1 : [],
          correspondents: cardKor ? cardKor : [],
          endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
          startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
          page: 0,
          orgId: JSON.parse(localStorage.getItem('oi')),
          workPlaceId: localStorage.getItem('ids')
        })
        setData(res1.data);
        const res = await axiosInstance.post("monitoring/income/department", {
          departmentID: departmentId,
          cards: cardsName1 ? cardsName1 : [],
          cardTypes: cardsTypes1 ? cardsTypes1 : [],
          correspondents: cardKor ? cardKor : [],
          endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
          startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
          page: 0,
          orgId: JSON.parse(localStorage.getItem('oi')),
          workPlaceId: localStorage.getItem('ids')
        })
        setEmployeeData(res.data);
        setSelected(0);
      } catch (error) {
        console.log(error);
        Alert(setAlert, "warning", error?.response?.data);
      }
    } else {
      Alert(setAlert, "warning", "Отсек не открывается. Раздел должен быть открыт для поиска");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  // downlaod for excel
  const downloadExcel = async () => {
    loadingref.current.style.display = "block";
    try {
      const res = await axiosInstance.post("monitoring/income/forExel", {
        cards: [],
        correspondents: [],
        endDate: null,
        startDate: null,
        page: selected,
        orgId: JSON.parse(localStorage.getItem('oi')),
        // workPlaceId: localStorage.getItem('ids')
      })
      console.log(res.data);
      setForExcelData(res.data);
      setTimeout(() => {
        loadingref.current.style.display = "none";
        document.querySelector('#test-table-xls-button').click();
        setForExcelData([]);
      }, 2000);
    } catch (error) {
      console.log(error);
      loadingref.current.style.display = "none";
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Входящий</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring params={params.id} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body m-0" style={{ padding: "10px 20px" }}>
                <form onSubmit={searchDocuments} className="newFormFunc mb-3">
                  <div className="row">
                    <div className="col-lg-4 mb-3">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          onChange={changeHandler}
                          popupHeight='500px'
                          fields={fields1}
                          ref={CardType}
                          dataSource={notParentsCard}
                          placeholder="Nazorat Kartochkasi"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          showSelectAll="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          filterBarPlaceholder="Qidirish">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          onChange={changeHandler1}
                          popupHeight='500px'
                          fields={fields1}
                          ref={DocumentType}
                          dataSource={hujjatTuri}
                          placeholder="Xujjat turi"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          showSelectAll="true"
                          filterBarPlaceholder="Qidirish">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          onChange={changeHandler2}
                          popupHeight='500px'
                          fields={fields1}
                          ref={Correspondent}
                          dataSource={korrespondent1}
                          placeholder="Корреспондент"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          showSelectAll="true"
                          filterBarPlaceholder="Qidirish">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="form-group form-group-floating mb-0">
                        <div className="position-relative">
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
                            <DatePicker
                              width="100"
                              height="100"
                              id={'chiquvchiSana'}
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              dateFormat={'dd.MM.yyyy'}
                              isClearable
                              placeholderText="Дата начала"
                              showYearDropdown scrollableMonthYearDropdown
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating mb-0">
                        <div className="position-relative">
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
                            <DatePicker
                              width="100"
                              height="100"
                              id={'chiquvchiSana'}
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              dateFormat={'dd.MM.yyyy'}
                              isClearable
                              placeholderText="Дата окончания"
                              showYearDropdown
                              scrollableMonthYearDropdown
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4 d-flex align-items-center">
                      <button
                        type={'submit'}
                        id="hujQush"
                        style={{ width: "33%" }}
                        className="btn btn-primary mr-1 hujQush h-100"
                      >
                        Izlash
                      </button>
                      <button type={'button'} className="btn btn-primary mr-1 h-100"
                        style={{ width: "33%" }} onClick={() => allDocumemts()}>Barchasi
                      </button>
                      <div className="btn-group h-100" style={{ width: "33%" }}>
                        <button type="button" className="btn btn-primary  btn-lg d-flex align-items-center justify-content-center" data-toggle="dropdown">
                          Export <div className="loader1 ml-2" ref={loadingref} style={{ display: "none" }}></div>
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <span className="dropdown-item dropdown-item1" onClick={downloadExcel}><RiFileExcel2Line /> EXCEL</span>
                          <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="icon-menu7 download-table-xls-button dropdown-item excelButtun"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="EXCEL"
                            style={{ display: "none" }}
                            onClick={(e) => e.target.value = null}
                          />
                          <span className="dropdown-item dropdown-item1"><GrDocumentPdf /> PDF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* table data */}
                <MonitoringKiruvchiTable
                  data={data}
                  setData={setData}
                  selected={selected}
                  setSelected={setSelected}
                  cardsName1={cardsName1}
                  cardKor={cardKor}
                  startDate={startDate}
                  endDate={endDate}
                  setDepartmentId={setDepartmentId}
                  setEmployeeData={setEmployeeData}
                  employeeData={employeeData}
                  departmentsIds={departmentsIds}
                />

                {/* for excel data download */}
                <ForExcelTable forExcelData={forExcelData} />
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />

            {/* loader */}
            <Loader loader={loader} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MonitoringKiruvchiContent);