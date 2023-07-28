import React, { useCallback, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { RiFileExcel2Line } from 'react-icons/ri';
import { GrDocumentPdf } from 'react-icons/gr';
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";
import { axiosInstance } from "../../../../config";
import TableContentData from "./tableContentData/TableContentData";
import AlertContent from "../../../../component/alert/Alert";
let chooseControlCardNamesObj = [];

const NazoratKarMalContent = ({ currentUser }) => {
  const [korrespondent, setKorrespondent] = useState([]);
  const [hujjatTuri, setHujjatTuri] = useState([]);
  const [yunalishlar, setYunalishlar] = useState([]);
  const [alert] = useState({ open: false, color: "", text: "" });
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [forExcelData, setForExcelData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selected, setSelected] = useState(0);
  const [data, setData] = useState([]);
  const [allCard, setAllCard] = useState([]);
  const CardType = useRef();
  const Direct = useRef();
  const DocumentType = useRef();
  const Correspondent = useRef();

  let fields1 = {
    text: 'label',
    value: 'value'
  };

  // nazorat kartochkalarini o'qib olish
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
        console.log(error);
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
          setKorrespondent(arr);
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
    try {
      const res = await axiosInstance.post("cardType/child", {
        cardTypeIDs: e.value
      })
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.cardName })
      });

      let chooseControlCardNames = [];
      e.value.forEach((d) => {
        chooseControlCardNames.push(e.target.props.dataSource.find((f) => f.value === d));
      })
      chooseControlCardNamesObj = chooseControlCardNames;

      setYunalishlar(arr1);
    } catch (error) {
      console.log(error.response);
    }
  }, [setYunalishlar]);

  const changeHandler3 = useCallback(async (e) => {
    try {
      const res = await axiosInstance.post("card/childCards/" + JSON.parse(localStorage.getItem('oi')), {
        cardTypeIDs: e.value
      })
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.cardName })
      });
      setHujjatTuri(arr1);
    } catch (error) {
      console.log(error.response);
    }
  }, [setHujjatTuri]);

  // search
  const searchDocuments = useCallback(async (e) => {
    e.preventDefault();
    setData([]);

    if (chooseControlCardNamesObj?.length > 0) {
      setAllCard(chooseControlCardNamesObj);
    }
  }, [setData, setAllCard]);

  // get all data button
  const allDocumemts = async () => {
    chooseControlCardNamesObj = [];
    if (DocumentType.current?.value) DocumentType.current.value = [];
    if (Correspondent.current?.value) Correspondent.current.value = [];
    if (CardType.current?.value) CardType.current.value = [];
    if (Direct.current?.value) Direct.current.value = [];
    setAllCard([]);
    setKorrespondent([]);
    setYunalishlar([]);
    setHujjatTuri([]);
    setEndDate();
    setStartDate();
    setSelected(0);
  }

  const exportF = (elem) => {
    // var table = document.getElementById("myTable");
    // var html = table.outerHTML;
    // var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    // elem.setAttribute("href", url);
    // elem.setAttribute("download", "export.xls"); // Choose the file name
    // return false;
  }

  const downloadExcel = () => {
    setTimeout(() => {
      document.querySelector('#test-table-xls-button').click();
    }, 2000);
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Информация о контрольной карте</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px" }}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          onChange={changeHandler}
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={notParentsCard}
                          placeholder="Контрольная карта"
                          mode="CheckBox"
                          ref={CardType}
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          showSelectAll="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          filterBarPlaceholder="Поиск">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          onChange={changeHandler3}
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={yunalishlar}
                          placeholder="Направления"
                          mode="CheckBox"
                          ref={Direct}
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          showSelectAll="true"
                          filterBarPlaceholder="Поиск">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={hujjatTuri}
                          ref={DocumentType}
                          placeholder="Тип документа"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          showSelectAll="true"
                          filterBarPlaceholder="Поиск">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group">
                      <div className="selectCheckBox">
                        <MultiSelectComponent
                          id="mtselement"
                          className="korrespondent1"
                          ref={Correspondent}
                          popupHeight='500px'
                          fields={fields1}
                          dataSource={korrespondent}
                          placeholder="Корреспондент"
                          mode="CheckBox"
                          enableGroupCheckBox="true"
                          allowFiltering="true"
                          unSelectAllText="unSelect All"
                          selectAllText="Select All"
                          showSelectAll="true"
                          filterBarPlaceholder="Поиск">
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
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
                  <div className="col-lg-3">
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

                  <div className="col-lg-3 d-flex justify-content-end">
                    <button
                      className="btn btn-primary mr-1"
                      style={{ width: "33.333%", height: "56px" }}
                      onClick={searchDocuments}
                    >
                      Izlash
                    </button>
                    <button className="btn btn-primary mr-1" style={{ width: "33.333%", height: "56px" }} onClick={allDocumemts}>Barchasi</button>
                    <div className="btn-group" style={{ width: "33.333%", height: "56px" }}>
                      <button type="button" className="btn btn-primary  btn-lg d-flex align-items-center justify-content-center" data-toggle="dropdown">
                        Export {!(forExcelData?.length > 0) && <div className="loader1 ml-2"></div>}
                      </button>
                      <div className="dropdown-menu dropdown-menu-right" >
                        <span className="dropdown-item dropdown-item1" onClick={downloadExcel}><RiFileExcel2Line /> EXCEL</span>
                        <ReactHtmlTableToExcel
                          id="test-table-xls-button"
                          className="icon-menu7 download-table-xls-button dropdown-item excelButtun"
                          table="table-to-xls"
                          filename="tablexls"
                          sheet="tablexls"
                          buttonText="EXCEL"
                          style={{ display: "none" }}
                          onClick={(e) => e.target.value = null}
                        />
                        {/* <span className="dropdown-item" onClick={exportReportToExcel}><i className="icon-menu7"></i> EXCEL</span> */}
                        <span className="dropdown-item dropdown-item1"><GrDocumentPdf /> PDF</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* table data */}
                <TableContentData
                  allCard={allCard}
                  data={data}
                  setData={setData}
                  selected={selected}
                  setSelected={setSelected}
                  startDate={startDate}
                  endDate={endDate}
                  currentUser={currentUser}
                  itemsPerPage={20}
                  Direct={Direct}
                  DocumentType={DocumentType}
                  Correspondent={Correspondent}
                />
              </div>
            </div>
          </div>
        </div>

        {/* alert */}
        <AlertContent alert={alert} />
      </div>
    </div>
  )
}

export default React.memo(NazoratKarMalContent);