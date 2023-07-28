import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {axiosInstance, axiosInstanceFq} from "../../../../../../../config";
import AlertContent, {Alert} from "../../../../../../../component/alert/Alert";

const TopRightJournals = ({
                              setMurojaatSoni,
                              murojaatSoni,
                              objData,
                              currentUser,
                              setDataKorrespondent,
                              setAlert,
                              alert,
                              dataKorrespondent,
                              JurnalRef,
                              startDate,
                              setStartDate,
                              ReceptionTypeRef,
                              AppealTypeRef,
                              AppealFormRef,
                              PageCountRef,
                              AppealerCountRef,
                              ExtraAppealerRef,
                              startDateKorres,
                              setStartDateKorres,
                              korresRef,
                              chiquvchiRaqamRef
                          }) => {
    const [openKorres, setOpenKorres] = useState(false);
    const [journal, setJournal] = useState([]);
    const [qabulTuri, setQabulTuri] = useState([]);
    const [murojaatTuri, setMurojaatTuri] = useState([]);
    const [murojaatShakli, setMurojaatShakli] = useState([]);
    const [korrespondent, setKorrespondent] = useState([]);
    const regNumber = useRef();

    const qoshimchaMurojatchi = (e) => {
        setMurojaatSoni(e?.target.value)
        if (e.target.value < 2)
            document.querySelector('.murojaatIsmi').value = ''
        console.log(document.querySelector('.murojaatIsmi').value)
    }

    // barcha jurnallarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getJournal = async () => {
            try {
                const res = await axiosInstanceFq.get("journal/getOrgAll/" + JSON.parse(localStorage.getItem('oi')));
                console.log(res?.data)
                let arr = [];
                res?.data?.forEach((d) => {
                    arr.push({value: d.id, label: d.uzName, currentNumber: d.currentNumber});
                })
                if (isMounted)
                    setJournal(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getJournal();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // jurnalni tanlaganda reg nomerni inputga chiqarish
    const notParentsCardClickJournal = (e) => {
        let arr = journal.find((d) => d.value === e.value);
        if (e.value === objData[0]?.journalID) {
            regNumber.current.value = objData[0]?.regNumber;
        } else {
            if (arr) {
                regNumber.current.value = arr.currentNumber;
            }
        }
    }

    // oldin tanlangan jurnalga mos reg nomerni chiqarish
    useEffect(() => {
        let isMounted = true;
        if (objData?.length > 0) {
            // let arr = journal.find((d) => d.value === objData[0]?.journalID);
            // if (arr) {
            //     regNumber.current.value = arr.currentNumber;
            // }

            if (isMounted) {
                setStartDate(new Date(objData[0]?.regDate));
                if (objData[0]?.outDate)
                    setStartDateKorres(new Date(objData[0]?.outDate));
            }
        }

        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [journal, objData]);

    // qabul qilish turlarini o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getReception = async () => {
            try {
                const res = await axiosInstanceFq.get("reception-type");
                let arr = [];
                res?.data?.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })
                if (isMounted)
                    setQabulTuri(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getReception();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // murojaat turlarini o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("appeal-types");
                let arr = [];
                res?.data?.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })
                if (isMounted)
                    setMurojaatTuri(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // murojaat shaklini o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("appeal-forms");
                let arr = [];
                res?.data?.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })
                if (isMounted)
                    setMurojaatShakli(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // Korrespondentni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstance.get(`organization/orgCorrespondent/` + JSON.parse(localStorage.getItem('oi')));
                let arr = [];
                res?.data?.forEach((d) => {
                    arr.push({value: d.id, label: d.orgName});
                })
                if (isMounted)
                    setKorrespondent(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // cancel korrespondent
    const cancelKorres = () => {
        Alert(setAlert, "warning", "Ma'lumotingiz bekor qilindi");
        setDataKorrespondent([]);
        setOpenKorres(false);
    }

    // save korrespondent
    const saveKorres = () => {
        if (korresRef.current.props.value) {
            if (chiquvchiRaqamRef.current.value) {
                if (startDateKorres) {
                    let obj = [{
                        korres: korresRef.current.props.value,
                        outNumber: chiquvchiRaqamRef.current.value,
                        outDate: startDateKorres
                    }]
                    setDataKorrespondent(obj);
                    setOpenKorres(false);
                } else {
                    Alert(setAlert, "warning", "Maydonlar to'liq to'ldirilmadi");
                    setOpenKorres(false);
                    setDataKorrespondent([]);
                }
            } else {
                Alert(setAlert, "warning", "Maydonlar to'liq to'ldirilmadi");
                setOpenKorres(false);
                setDataKorrespondent([]);
            }
        } else {
            Alert(setAlert, "warning", "Maydonlar to'liq to'ldirilmadi");
            setOpenKorres(false);
            setDataKorrespondent([]);
        }
    }
    console.log(objData)
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    {objData?.length > 0 && (
                                        <Select
                                            defaultValue={[journal?.find((d) => d?.value === objData[0]?.journalID)]}
                                            options={journal}
                                            onChange={notParentsCardClickJournal}
                                            placeholder="JURNALNI TANLANG"
                                            className="cardTypeId form-select journalId "
                                            isClearable={true}
                                            required={true}
                                            ref={JurnalRef}
                                        />
                                    )}
                                    <div className="invalid-feedback">
                                        Maydonni tanlang
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group form-group-floating row">
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        {objData?.length > 0 && (
                                            <input
                                                defaultValue={objData[0]?.regNumber}
                                                type="text"
                                                disabled
                                                ref={regNumber}
                                                className="form-control form-control-outline regNumber"
                                                placeholder="Placeholder"
                                                required
                                            />)}
                                        <label className="label-floating">REG №</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="inputBox d-flex align-items-center justify-content-end input-border w-100"
                                 style={{height: '56px'}}>
                                <DatePicker
                                    className={'didline'}
                                    id={'qisqacha2'}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat={'dd.MM.yyyy'}
                                    isClearable
                                    showYearDropdown
                                    required
                                    scrollableMonthYearDropdown
                                    placeholderText="Reg Sana"
                                />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group row" id="men">
                                <div className="col-lg-6">
                                    {objData?.length > 0 && (
                                        <Select
                                            defaultValue={[qabulTuri?.find((d) => d?.value === objData[0]?.receptionID)]}
                                            options={qabulTuri}
                                            placeholder="QABUL QILISH TURI"
                                            className="cardTypeId"
                                            isClearable={true}
                                            required={true}
                                            ref={ReceptionTypeRef}
                                        />
                                    )}
                                    <div className="invalid-feedback">Maydonni tanlang</div>
                                </div>
                                <div className="col-lg-6">
                                    <button
                                        type={'button'}
                                        className={'btn bg-primary h-100 w-100 text-white btn-relative-korres'}
                                        onClick={() => setOpenKorres(true)}
                                    >
                                        Korrespondent
                                        {dataKorrespondent.length > 0 && (
                                            <span className="korresBadge">+</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p style={{borderTop: '5px solid #00BCD4', width: '98%'}} className="ml-2 mb-3"></p>
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    {objData?.length > 0 && (
                                        <Select
                                            defaultValue={[murojaatTuri?.find((d) => d?.value === objData[0]?.appealTypeID)]}
                                            options={murojaatTuri}
                                            placeholder="MUROJAAT TURI"
                                            className="cardTypeId"
                                            isClearable={true}
                                            required={true}
                                            ref={AppealTypeRef}
                                        />
                                    )}
                                    <div className="invalid-feedback">
                                        Maydonni tanlang
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <div className="col-lg-12">
                                    {objData?.length > 0 && (
                                        <Select
                                            defaultValue={[murojaatShakli?.find((d) => d?.value === objData[0]?.appealFormID)]}
                                            options={murojaatShakli}
                                            placeholder="MUROJAAT SHAKLI"
                                            className="cardTypeId"
                                            isClearable={true}
                                            required={true}
                                            ref={AppealFormRef}
                                        />
                                    )}
                                    <div className="invalid-feedback">
                                        Maydonni tanlang
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group form-group-floating  row">
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <input
                                            type="number"
                                            className="form-control form-control-outline InputPageCount"
                                            required
                                            placeholder="Placeholder"
                                            ref={PageCountRef}
                                            defaultValue={objData[0]?.pageCount}
                                        />
                                        <label className="label-floating">SAHIFALAR SONI</label>
                                        <div className="invalid-feedback">Maydonni to'ldiring</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group form-group-floating  row">
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <input type="number"
                                               defaultValue={murojaatSoni}
                                               className="form-control form-control-outline InputMurojatSoni"
                                               onChange={(e) => qoshimchaMurojatchi(e)}
                                               id="Soni"
                                               required
                                               placeholder="Placeholder"
                                               ref={AppealerCountRef}
                                        />
                                        <label className="label-floating">MUROJAATCHILAR SONI</label>
                                        <div className="invalid-feedback">Maydonni to'ldiring</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="collapse greydesk  pb-0 d-flex" id="qushish"
                                 style={{display: 'none !important'}}>
                                <div className="form-group form-group-floating w-100">
                                    <div className="position-relative">
                    <textarea
                        className="form-control form-control-outline murojaatIsmi"
                        rows="10"
                        disabled={murojaatSoni > 1 ? false : true}
                        style={{height: '56px'}}
                        placeholder="Placeholder"
                        ref={ExtraAppealerRef}
                        defaultValue={objData[0]?.extraApplicants}
                    />
                                        <label className="label-floating">QO'SHIMCHA MUROJAATCHI</label>
                                        <div className="invalid-feedback">Maydonni to'ldiring</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={'adminWindow'} style={{display: openKorres ? 'block' : 'none'}}>
                            <div className="modal-dialog modal-xl pt-5 ">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h5 className="modal-title ">Korrespondent</h5>
                                        <button className="close" onClick={() => setOpenKorres(false)}
                                                data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body " style={{padding: "10px", paddingBottom: "0px"}}>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                {objData?.length > 0 && (
                                                    <Select
                                                        defaultValue={[korrespondent?.find((d) => d?.value === objData[0]?.correspondentID)]}
                                                        options={korrespondent}
                                                        placeholder="Korrespondent"
                                                        isClearable={true}
                                                        ref={korresRef}
                                                    />
                                                )}
                                            </div>
                                            <div className="col-lg-4 form-group form-group-floating">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-outline"
                                                    placeholder="Chiquvchi raqam"
                                                    ref={chiquvchiRaqamRef}
                                                    defaultValue={objData[0]?.outNumber}
                                                />
                                                <label className="label-floating">Chiquvchi raqam</label>
                                                <div className="invalid-feedback">Maydonni to'ldiring</div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div
                                                    className="inputBox d-flex align-items-center justify-content-end input-border w-100 bg-white"
                                                    style={{height: '56px'}}>
                                                    <DatePicker
                                                        className={'didlineKorres'}
                                                        id={'qisqacha2'}
                                                        selected={startDateKorres}
                                                        onChange={(date) => setStartDateKorres(date)}
                                                        dateFormat={'dd.MM.yyyy'}
                                                        isClearable
                                                        showYearDropdown
                                                        scrollableMonthYearDropdown
                                                        placeholderText="Chiquvchi sana"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer d-flex justify-content-center">
                                        <button type="button" className="btn btn-danger" onClick={cancelKorres}>Bekor
                                            qilish
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={saveKorres}>
                                            <i className="fas fa-save mr-1"></i>
                                            Saqlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*
            {(openModal) && (
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

                {/* alert */}
                <AlertContent alert={alert}/>
            </div>
        </div>
    )
}

export default React.memo(TopRightJournals)