import React, {useEffect, useRef, useState} from "react";
import {axiosInstance, axiosInstanceFq} from "../../../../config";
import DatePicker from "react-datepicker";
import ReactPaginate from "react-paginate";
import "react-datepicker/dist/react-datepicker.css";
import NavbarFuqaroMurojat from "../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import {statusName} from "../../../../component/status/Status";
import Select from "react-select";
import {Link, useHistory} from "react-router-dom";

const FuqaroNazoratContent = ({currentUser, permission, ranks}) => {
    const [data, setData] = useState([]);
    const history = useHistory();
    const [selected, setSelected] = useState(0);
    const [startDate, setStartDate] = useState();
    const [murojaatTuri, setMurojaatTuri] = useState([]);
    const ApplicantNameRef = useRef();
    const AppealTypeRef = useRef();
    const RegNumberRef = useRef();

    // sanani formatlash
    const dateFormatGet = (date) => {
        return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4);
    }

    // barcha malumotlarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.post("/inExecutor/list-with-search", {
                    appealTypeID: '%%',
                    deadline: '%%',
                    receptionTypeID: '%%',
                    regNumber: '%%',
                    name: '%%',
                    page: 0,
                    workPlaceID: JSON.parse(localStorage.getItem('ids')),
                    tabCode: 4
                })
                if (isMounted)
                    setData(res.data.data)
            } catch (error) {
                console.log(error.response);
            }
        }
        getData();

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
                res.data.data.forEach((d) => {
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


    const SearchData = async () => {
        try {
            const res = await axiosInstanceFq.post(`/inExecutor/list-with-search`, {
                appealTypeID: AppealTypeRef.current?.props.value?.value ? AppealTypeRef.current.props.value?.value : '%%',
                name: ApplicantNameRef.current?.value ? ApplicantNameRef.current?.value : '%%',
                deadline: startDate ? new Date(startDate).toLocaleDateString().split('.').reverse().join('-') : '%%',
                regNumber: RegNumberRef.current?.value ? RegNumberRef.current?.value : '%%',
                page: 0,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                tabCode: 4
            })
            setData(res?.data?.data);
        } catch (error) {
            setData([])
            console.log(error.response);
        }
    }

    const All = async () => {
        try {
            const res = await axiosInstanceFq.post("/inExecutor/list-with-search", {
                appealTypeID: '%%',
                deadline: '%%',
                regNumber: '%%',
                name: '%%',
                page: 0,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                tabCode: 4
            })
            setData(res.data.data)
        } catch (error) {
            console.log(error.response);
            setData([])
        }
    }

    // pagination
    const handlePageClick = async (e) => {
        try {
            const res = await axiosInstanceFq.post(`/inExecutor/list-with-search`, {
                appealTypeID: AppealTypeRef?.current?.props.value?.value ? AppealTypeRef?.current?.props.value?.value : '%%',
                name: ApplicantNameRef.current?.value ? ApplicantNameRef.current?.value : '%%',
                deadline: startDate ? new Date(startDate).toLocaleDateString().split('.').reverse().join('-') : '%%',
                regNumber: RegNumberRef.current?.value ? RegNumberRef.current?.value : '%%',
                page: e.selected,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                tabCode: 4
            })
            setData(res?.data?.data);
        } catch (error) {
            setData([])
            console.log(error.response);
        }
        setSelected(e.selected);
    };

    return (
        <div className="content mb-5 content-mobile">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase"}}>Nazoratda</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{paddingTop: "2px", minHeight: "52px"}}>
                    <NavbarFuqaroMurojat permission={permission} ranks={ranks} currentUser={currentUser}/>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile">
                                <table className={'table-sm-full'}>
                                    <thead>
                                    <tr className={'direction-mobile fMurojaati'}>
                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <Select
                                                    options={murojaatTuri}
                                                    placeholder="Murojaat turi"
                                                    isClearable={true}
                                                    ref={AppealTypeRef}
                                                />
                                                <div className="invalid-feedback">
                                                    Maydonni tanlang
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '300px'}} className={'mobile-table-none'}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Ariza beruvchi"
                                                    ref={ApplicantNameRef}
                                                />
                                                <div className="form-control-feedback form-control-feedback-lg">
                                                    <i className="icon-search4"/>
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp hmmm inp-sm-none">
                                                <div
                                                    className="inputBox d-flex align-items-center justify-content-end input-border"
                                                    style={{padding: '8px'}}>
                                                    <input
                                                        type="text"
                                                        className="first qisqacha1"
                                                        placeholder="REG №"
                                                        ref={RegNumberRef}
                                                    />
                                                    <span style={{
                                                        marginLeft: '-70px',
                                                        fontSize: '20px',
                                                        color: 'grey',
                                                        backgroundColor: 'white'
                                                    }}>/</span>
                                                    <div className='changeBox ml-3' style={{width: '100px'}}>
                                                        <DatePicker
                                                            width="100"
                                                            className={'qisqacha2'}
                                                            id={'qisqacha2'}
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            dateFormat={'dd.MM.yyyy'}
                                                            isClearable
                                                            showYearDropdown
                                                            scrollableMonthYearDropdown
                                                            placeholderText="Sana"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-control-feedback form-control-feedback-lg pr-3">
                                                    <i className="icon-search4 "></i>
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
                                                <button className="btn btn-primary mr-2 table-sm-full"
                                                        onClick={SearchData}>Search
                                                </button>
                                                <button className="btn btn-primary mr-2 mobile-table-none"
                                                        onClick={All}>Barchasi
                                                </button>
                                                <button className="btn btn-primary mobile-table-none"
                                                        data-toggle="dropdown"><i className="icon-menu9"
                                                                                  style={{fontSize: "18px"}}></i>
                                                </button>

                                                <div className="dropdown-menu">
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="id" value="Id"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="qabul" value="Qabul qilish turi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="ariza" value="Ariza beruvchi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="mur" value="Murojaat yo'nalishi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="qisqacha" value="Qisqacha mazmuni"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="reg" value="Reg № / Sana"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="ijrochi" value="Ijrochi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="harakat" value="Harakatlar"/>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                {data?.content?.length > 0 && (
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel=">>"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={Math.ceil(data?.totalElements / 20)}
                                        previousLabel="<<"
                                        renderOnZeroPageCount={null}
                                        className="paginationUL"
                                        activeClassName="active"
                                        forcePage={selected}
                                    />
                                )}
                                <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
                                    <thead>
                                    <tr className="bg-dark text-white NavLink text-center">
                                        <th id='tabRow' style={{width: "3%"}} className="id">№</th>
                                        <th style={{width: "10%"}} className="qabul">QABUL QILISH TURI</th>
                                        <th style={{width: "10%"}} className="ariza">ARIZA BERUVCHI</th>
                                        <th style={{width: "10%"}} className="mur">MUROJAAT YO'NALISHI</th>
                                        <th style={{width: "30%"}} className="qisqacha">QISQACHA MAZMUNI</th>
                                        <th style={{width: "7%"}} className="reg">REG № / MUDDATI</th>
                                        <th style={{width: "15%"}} className="ijrochi">IJROCHI</th>
                                        <th className="text-center harakat">HARAKATLAR</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data?.content?.length > 0 && data?.content?.map((dat, index) => (
                                        <tr key={index}
                                            onClick={() => window.innerWidth <= 768 && history.push(`/fuqaro/murojati/bajarish_ijro/${dat?.id}/nazorat`)}>
                                            <td className="text-center id">{index + 1}</td>
                                            <td className="text-center id">{dat?.receptionTypeName}</td>
                                            <td className={'text-center qabul'}>{dat?.applicantFirstName} {dat?.applicantLastName} {dat?.applicantMiddleName}</td>
                                            <td className="mur text-center"
                                                style={{wordWrap: "break-word"}}>{dat?.appealTypeName}</td>
                                            <td style={{textAlign: "justify", wordWrap: "break-word"}}
                                                className="qisqacha mobile-table-none text-center">
                                                {dat?.problemShortDescription}
                                            </td>
                                            <td className="text-center chiquvchi reg">
                                                <div className="badge badge-primary">№ {dat?.regNumber}</div>
                                                <hr/>
                                                {dateFormatGet(dat?.deadline)}
                                            </td>
                                            <td className="text-center ijrochi mobile-table-none">
                                                {dat?.inExecutors?.length > 0 && dat?.inExecutors?.map((d, i) => (
                                                    !d?.isDirect && (
                                                        <p key={i} style={{
                                                            margin: "0",
                                                            borderColor: "#ddd",
                                                            height: "100%",
                                                            marginBottom: "5px",
                                                            textAlign: "left"
                                                        }}
                                                           className="d-flex align-items-center">
                                  <span
                                      style={{fontSize: "14px"}}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                                                            <span className="badge ml-1 status text-white"
                                                                  style={{backgroundColor: statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.LatinName}</span>
                                                        </p>
                                                    )
                                                ))}
                                                {dat?.inExecutorShortInfoDtos?.find((d) => d?.directedBy) && (
                                                    <hr style={{borderTop: "1px dashed #000"}}/>
                                                )}
                                                {dat?.inExecutorShortInfoDtos?.length > 0 && dat?.inExecutorShortInfoDtos?.map((d, i) => (
                                                    d?.directedBy && (
                                                        <p key={i} style={{
                                                            margin: "0",
                                                            borderColor: "#ddd",
                                                            height: "100%",
                                                            textAlign: "left",
                                                            marginBottom: "5px"
                                                        }}
                                                           className="d-flex align-items-center">
                                                            <span
                                                                style={{fontSize: "14px"}}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                                                            <span className="badge ml-1 status text-white"
                                                                  style={{backgroundColor: statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.LatinName}</span>
                                                        </p>
                                                    )
                                                ))}
                                            </td>
                                            <td className="harakat mobile-table-none">
                                                <div className="icon d-flex justify-content-center align-items-center ">
                                                    <Link
                                                        to={`/fuqaro/murojati/bajarish_ijro/${dat?.problemID}/nazoratda`}
                                                        className="infoBtn bg-dark" title="Ko'rish"
                                                        data-bs-toggle="tooltip" data-popup="tooltip"
                                                        data-bs-placement="top">
                                                        <span><i className="icon-eye2"></i></span>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {data?.length > 0 && (
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel=">>"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        pageCount={Math.ceil(data?.totalElements / 20)}
                                        previousLabel="<<"
                                        renderOnZeroPageCount={null}
                                        className="paginationUL"
                                        activeClassName="active"
                                        forcePage={selected}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FuqaroNazoratContent)