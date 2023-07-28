import React, { useEffect, useRef, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { RiFileExcel2Line } from 'react-icons/ri';
import { GrDocumentPdf } from 'react-icons/gr';
import { CheckBoxSelection, Inject, MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { axiosInstance } from "../../../../config";
import { Alert } from "../../../../component/alert/Alert";

const Elements = ({ currentUser, loader, setData, setAlert }) => {
    const [hujjatTuri, setHujjatTuri] = useState([]);
    const [notParentsCard, setNotParentsCard] = useState([]);
    const [yunalishlar, setYunalishlar] = useState([]);
    const [forExcelData, setForExcelData] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const CardType = useRef();
    const Direct = useRef();
    const DocumentType = useRef();
    const loadingref = useRef();

    let fields1 = {
        text: 'label',
        value: 'value'
    };

    // nazorat kartochkalarini o'qib olish
    useEffect(() => {
        let cancel = true;
        const getData = async () => {
            try {
                const res = await axiosInstance.get("monitoring/monitoring-cardType/" + JSON.parse(localStorage.getItem('oi')))
                let arr = [];
                res.data.forEach((c) => {
                    arr.push({ value: c.id, label: c.name });
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
            if (Direct.current.value?.length > 0)
                Direct.current.value = [];
            if (DocumentType.current?.value) {
                DocumentType.current.value = [];
                setHujjatTuri([]);
            }

            setYunalishlar(arr1);
        } catch (error) {
            console.log(error);
        }
    }, [setHujjatTuri, setYunalishlar]);

    const changeHandler3 = useCallback(async (e) => {
        try {
            const res = await axiosInstance.post("card/childCards/" + JSON.parse(localStorage.getItem('oi')), {
                cardTypeIDs: e.value
            })
            let arr1 = [];
            res.data.forEach((d) => {
                arr1.push({ value: d.id, label: d.cardName })
            });
            if (DocumentType.current.value)
                DocumentType.current.value = [];

            setHujjatTuri(arr1);
        } catch (error) {
            console.log(error);
        }
    }, [setHujjatTuri]);

    // search
    const searchDocuments = useCallback(async (e) => {
        e.preventDefault();
        if (CardType.current.value?.length > 0) {
            if (Direct.current.value?.length > 0) {
                loader.current.style.display = "flex";
                try {
                    const res = await axiosInstance.post("monitoring/report", {
                        parentCardTypes: CardType.current.value,
                        cardTypes: Direct.current.value ? Direct.current.value : [],
                        cards: DocumentType.current.value ? DocumentType.current.value : [],
                        correspondents: [],
                        endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
                        startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
                        page: 0,
                        orgId: JSON.parse(localStorage.getItem('oi')),
                        workPlaceId: localStorage.getItem('ids')
                    })
                    if (res.data) {
                        loader.current.style.display = "none";
                        setData(res.data);
                    }
                } catch (error) {
                    console.log(error);
                    Alert(setAlert, "warning", error?.response?.data);
                }
            } else {
                Alert(setAlert, "warning", "Направление не выбрано");
            }
        } else {
            Alert(setAlert, "warning", "Тип карты не выбран");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setData]);

    // get all data button
    const allDocumemts = () => {
        if (DocumentType.current?.value) DocumentType.current.value = [];
        setEndDate();
        setStartDate();
        setHujjatTuri([]);
        setData({});
    }

    // const exportF = (elem) => {
    //     // var table = document.getElementById("myTable");
    //     // var html = table.outerHTML;
    //     // var url = 'data:application/vnd.ms-excel,' + escape(html); // Set your html table into url 
    //     // elem.setAttribute("href", url);
    //     // elem.setAttribute("download", "export.xls"); // Choose the file name
    //     // return false;
    // }

    // downlaod for excel

    //    download excel
    const downloadExcel = async () => {
        loadingref.current.style.display = "block";
        // try {
        //   const res = await axiosInstance.post("monitoring/income/forExel", {
        //     cards: [],
        //     correspondents: [],
        //     endDate: null,
        //     startDate: null,
        //     page: selected,
        //     orgId: JSON.parse(localStorage.getItem('oi')),
        //     // workPlaceId: localStorage.getItem('ids')
        //   })
        //   // console.log(res.data);
        // } catch (error) {
        //   console.log(error);
        // }
        setTimeout(() => {
            document.querySelector('#test-table-xls-button').click();
            loadingref.current.style.display = "none";
        }, 2000);
    }

    return (
        <div className="row">
            <div className="col-lg-2">
                <div className="form-group">
                    <div className="selectCheckBox">
                        <MultiSelectComponent
                            id="mtselement"
                            className="korrespondent1"
                            popupHeight='500px'
                            fields={fields1}
                            ref={CardType}
                            onChange={changeHandler}
                            dataSource={notParentsCard}
                            placeholder="Контрольная карта"
                            mode="CheckBox"
                            enableGroupCheckBox="true"
                            allowFiltering="true"
                            unSelectAllText="unSelect All"
                            selectAllText="Select All"
                            showSelectAll="true"
                            isClearable={true}
                            filterBarPlaceholder="Поиск">
                            <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <div className="form-group">
                    <div className="selectCheckBox">
                        <MultiSelectComponent
                            id="mtselement"
                            className="korrespondent1"
                            popupHeight='500px'
                            fields={fields1}
                            ref={Direct}
                            onChange={changeHandler3}
                            dataSource={yunalishlar}
                            placeholder="Направления"
                            mode="CheckBox"
                            enableGroupCheckBox="true"
                            allowFiltering="true"
                            unSelectAllText="unSelect All"
                            selectAllText="Select All"
                            showSelectAll="true"
                            isClearable={true}
                            filterBarPlaceholder="Поиск">
                            <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <div className="form-group">
                    <div className="selectCheckBox">
                        <MultiSelectComponent
                            id="mtselement"
                            className="korrespondent1"
                            popupHeight='500px'
                            fields={fields1}
                            ref={DocumentType}
                            dataSource={hujjatTuri}
                            placeholder="Тип документ"
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
            <div className="col-lg-4">
                <div className="form-group form-group-floating mb-2">
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

            <div className="col-lg-4 d-flex justify-content-end">
                <button
                    className="btn btn-primary mr-1"
                    style={{ width: "33.333%", height: "56px" }}
                    onClick={searchDocuments}
                >
                    Izlash
                </button>
                <button type="button" className="btn btn-primary mr-1" style={{ width: "33.333%", height: "56px" }} onClick={allDocumemts}>Все</button>
                <div className="btn-group" style={{ width: "33.333%", height: "56px" }}>
                    <button type="button" className="btn btn-primary  btn-lg d-flex align-items-center justify-content-center" data-toggle="dropdown">
                        Export {!(forExcelData?.length > 0) && <div className="loader1 ml-2" ref={loadingref}></div>}
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
                        {/* <span className="dropdown-item" onClick={exportReportToExcel}><i className="icon-menu7"></i> EXCEL</span> */}
                        <span className="dropdown-item dropdown-item1"><GrDocumentPdf /> PDF</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Elements);