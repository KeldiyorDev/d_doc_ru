import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChiquvchiContentNavbar from "../../chiquvchiContentNavbar/chiquvchiContentNavbar";
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { axiosInstance, axiosInstanceOut, urlOut } from "../../../../config";
import Select from "react-select";
import File from "../../file";
import '../chiquvchiXomaki.css'
import { status, statusCodeOutGoing } from "../../../../component/status/Status";
import { Alert } from "../../../../component/alert/Alert";

const ChiquvchiXomakiContent = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    // tablega malumot
    const [tableData, setTableData] = useState([])
    const [getTableData, setGetTableData] = useState([])
    const [selected, setSelected] = useState(0);
    const [openModal, setOpenModal] = useState({ open: false, obj: {} });
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [rahbariyat, setRahbariyat] = useState([]);
    const [korrespondent, setKorrespondent] = useState([]);

    //qidirishda
    const tasdiqlovchiRef = useRef()
    const qisqachaMalumotRef = useRef()
    const korrespondentRef = useRef()


    // select input style berish
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', height: '44px' }),
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

    // // barcha rahbariyatdagilarni o'qib olish
    // useEffect(() => {
    //     let isMounted = true;

    //     if (currentUser) {
    //         const getData = async () => {
    //             try {
    //                 const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
    //                 let arr = [];
    //                 res.data.forEach((d) => {
    //                     let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
    //                     arr.push({ value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}` })
    //                 });

    //                 console.log(res.data);

    //                 if (isMounted)
    //                     setRahbariyat(arr);
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }
    //         getData();
    //     }

    //     return () => {
    //         isMounted = false;
    //     }
    // }, [currentUser]);

    //tastiqlovchilar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get(`workplace/all/` + JSON.parse(localStorage.getItem('ids')));
                    console.log(res.data)
                    let arr = [];
                    res.data.forEach((dat) => {
                        if (dat.users?.length > 0) {
                            dat.users.forEach((d) => {
                                let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
                                if (JSON.parse(localStorage.getItem('ids')) !== d.workPlaceId) {
                                    arr.push({
                                        value: d?.workPlaceId,
                                        label: firstname + d.lastName,
                                        deparmentName: dat?.deparmentName
                                    });
                                }
                            })
                        }
                    })

                    if (isMounted)
                        setRahbariyat(arr)
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // barcha korrespondentlar o'qib olish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("organization/allCorrespondent/" + JSON.parse(localStorage.getItem('oi')));
                    console.log(res.data)
                    let arr = [];
                    res.data.forEach((d) => {
                        arr.push({ value: d.id, label: d.name })
                    })

                    if (isMounted)
                        setKorrespondent(arr);
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    //list malumotlarni uqib olish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.post("missive/list", {
                        confirmativeWorkPlace: null,
                        correspondent: null,
                        shortInfo: null,
                        workPlace: JSON.parse(localStorage.getItem('ids')),
                        size: 20,
                        page: 0,
                        tab: 1,
                    });
                    console.log(res.data)

                    if (isMounted) {
                        setTableData(res.data)
                        setGetTableData(res.data.content)
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData()
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser])

    //umumiy malumotlarni qidirish
    const All = async () => {
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: null,
                correspondent: null,
                shortInfo: null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                size: 20,
                page: 0,
                tab: 1,
            })
            console.log(res.data);
            setTableData(res.data)
            setGetTableData(res.data.content)
        } catch (error) {
            console.log(error.response);
        }
    }

    //malumot orqali qidirish
    const SearchData = async () => {
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: tasdiqlovchiRef?.current?.props ? tasdiqlovchiRef?.current?.props?.value?.value : null,
                correspondent: korrespondentRef?.current?.props ? korrespondentRef?.current?.props?.value?.value : null,
                shortInfo: qisqachaMalumotRef?.current?.value ? qisqachaMalumotRef?.current?.value : null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                size: 20,
                page: selected,
                tab: 1,
            })
            console.log(res.data)
            setTableData(res.data)
            setGetTableData(res.data.content)
        } catch (error) {
            console.log(error);
        }
    }

    //close all options
    const closeOptions = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
        input_checkbox_items.forEach((d, i) => {
            d.style.display = "none";
        })
    }

    // useEffect(() => {
    //     let isMounted = true;
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstanceOut.get(`/template/showNew?orgId=${JSON.parse(localStorage.getItem('oi'))}`)
    //             console.log(res.data)
    //             // if (isMounted) {
    //             // setTableData(res.data)
    //             // setGetTableData(res.data.content)
    //             // }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     getData();
    //
    //     return () => {
    //         isMounted = false;
    //     }
    // }, [currentUser])

    //qidirishda yoki malumotlarni paginationni
    const handlePageClick = async (e) => {
        setSelected(e.selected);
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: tasdiqlovchiRef?.current?.props ? tasdiqlovchiRef?.current?.props?.value?.value : null,
                correspondent: korrespondentRef?.current?.props ? korrespondentRef?.current?.props?.value?.value : null,
                shortInfo: qisqachaMalumotRef?.current ? qisqachaMalumotRef?.current?.value : null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                page: e.selected,
                size: 20,
                tab: 1,
            })
            console.log(res.data);
            setTableData(res.data)
            setGetTableData(res.data.content)
        } catch (error) {
            console.log(error.response);
        }
    }

    // documentni uchirish
    const deleteData = useCallback(async () => {
        try {
            const res = await axiosInstanceOut.patch(`/missive/delete?id=${openModal?.obj?.id}`)
            let arr = [];
            getTableData.forEach((d) => {
                if (d.id !== openModal?.obj?.id)
                    arr.push(d)
            })
            setGetTableData(arr)
            setOpenModal({ open: false, obj: {} });
            Alert(setAlert, 'success', 'Muvoffaqiyatli o`chirdingiz')
        } catch (error) {
            console.log(error);
        }
    }, [currentUser, openModal.obj])

    console.log(getTableData);

    return (
        <div className="content mb-5 content-mobile">
            <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Xomaki</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", minHeight: "52px" }}>
                    <ChiquvchiContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile" style={{ padding: "30px" }}>
                                {/*qidirish qismi*/}
                                <table className={'table-sm-full'}>
                                    <thead>
                                        <tr className={'direction-mobile'}>
                                            <th style={{ width: '350px' }}>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                    <Select
                                                        options={rahbariyat}
                                                        placeholder="Imzolovchi"
                                                        ref={tasdiqlovchiRef}
                                                        onMenuOpen={closeOptions}
                                                        className="Tasdiqlovchilar"
                                                        styles={colourStyles}
                                                        isClearable={true}
                                                    />
                                                </div>
                                            </th>
                                            <th style={{ width: '350px' }}>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                    <Select
                                                        options={korrespondent}
                                                        placeholder="Korrespondent"
                                                        isClearable={true}
                                                        ref={korrespondentRef}
                                                        className="Korrespondent"
                                                        styles={colourStyles}
                                                    />
                                                </div>
                                            </th>
                                            <th style={{ width: '350px' }}>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                    <input type="text" className="form-control form-control-lg p-2"
                                                        style={{ height: '44px' }}
                                                        id="korrespondent2"
                                                        ref={qisqachaMalumotRef}
                                                        // onChange={(e) => setKorres(e.target.value)}
                                                        placeholder="Qisqacha ma'lumot" />
                                                </div>
                                            </th>

                                            <th style={{ width: '350px' }}>
                                                <div
                                                    className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
                                                    <button className="btn btn-primary mr-2 table-sm-full"
                                                        style={{ height: '44px' }}
                                                        onClick={SearchData}>Qidiruv
                                                    </button>
                                                    <button className="btn btn-primary mr-2 mobile-table-none"
                                                        style={{ height: '44px' }}
                                                        onClick={All}>Barchasi
                                                    </button>
                                                    <button className="btn btn-primary mobile-table-none"
                                                        style={{ height: '44px' }}
                                                        data-toggle="dropdown"><i className="icon-menu9"
                                                            style={{ fontSize: "18px" }} />
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="id" value="Id" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="qabul" value="fayl" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="ariza" value="bo'lim" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="murojaat" value="Imzolovchi" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="mur" value="Korrespondent" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="qisqacha" value="qisqacha" />
                                                        <input type="submit"
                                                            className="btn btn-white dropdown-item  w-100 myBtn"
                                                            name="harakat" value="harakat" />
                                                    </div>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                </table>

                                {/*pagination qismi*/}
                                <div className={'mb-3'}>
                                    <ReactPaginate
                                        previousLabel="<<"
                                        nextLabel=">>"
                                        pageCount={tableData?.totalElements / 20}
                                        breakLabel="..."
                                        className="paginate"
                                        activeClassName="active"
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        forcePage={selected}
                                    /></div>

                                {/*table qismi*/}
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead className={'theadSticky'}>
                                        <tr className="bg-dark text-white NavLink text-center">
                                            <th id='tabRow' style={{ width: '5%' }} className="id file_kor_short_not">№</th>
                                            <th id='tabRow' style={{ width: '15%' }} className="qabul file_kor_short">Fayl
                                            </th>
                                            <th id='tabRow' style={{ width: '15%' }}
                                                className="ariza file_kor_short_not">Bo'lim (Tayyorladi)
                                            </th>
                                            <th id='tabRow' style={{ width: '15%' }}
                                                className="murojaat file_kor_short_not">Tasdiqlovchi
                                            </th>
                                            <th id='tabRow' style={{ width: '20%' }}
                                                className="mur file_kor_short">Korrespondent
                                            </th>
                                            <th id='tabRow' style={{ width: '25%' }}
                                                className="qisqacha file_kor_short">Qisqacha mazmuni
                                            </th>
                                            {/*<th style={{width: '10 %'}} className="reg">Reg № / Sana</th>*/}
                                            <th id='tabRow' style={{ width: '5%' }}
                                                className="text-center harakat file_kor_short_not">Harakatlar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getTableData?.map((data, index) => (
                                            <tr id="kor" key={index}
                                                // style={{backgroundColor: !data.forColor && '#ffffa6'}}
                                                onClick={() => window.innerWidth <= 768 && history.push(`/chiquvchi/ko'rish/xomaki/${data?.id}`)}
                                            >
                                                <td className="text-center id file_kor_short_not">{index + 1}</td>
                                                <td className="text-center text-color qabul mobile-table-none file_kor_short" id='qabul'
                                                    style={{ cursor: "pointer", wordWrap: "break-word" }}>
                                                    {data?.baseFiles?.length > 0 && data?.baseFiles?.map((hujjat, index1) => (
                                                        <div key={index1}>
                                                            <File hujjat={hujjat} />
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="text-center ariza" style={{ textAlign: 'center' }}><span
                                                    className={'text-center text-color file_kor_short_not'}>{data?.departmentName}</span>
                                                    <hr />
                                                    {data?.senderFirstName + ' ' + data?.senderLastName}
                                                </td>
                                                <td
                                                    className="murojaat text-center">{
                                                        data?.confirmatives?.map((d, i) => (
                                                            <div className={'my-1'} key={i}>
                                                                <span
                                                                    className="badge ml-1 status text-white mr-1 file_kor_short_not"
                                                                    style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.LatinName}</span> <br />
                                                                {(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : ""}{d.lastName ? d.lastName : ''}<br />
                                                            </div>
                                                        ))
                                                    }</td>

                                                <td id="qs text-center" data-maxlength="5" className="mur file_kor_short">
                                                    {data?.correspondent?.map((item, index) => (
                                                        <div style={{ textAlign: "center" }}>
                                                            <span className={'mb-1 text-center'}><span
                                                                style={{ fontWeight: 'bold' }}>{index + 1}.</span>{item}</span><br />
                                                        </div>
                                                    ))}
                                                </td>

                                                <td className="text-center qisqacha file_kor_short" style={{ width: '300px ' }}>
                                                    {data?.shortInfo}
                                                </td>
                                                {/*<td className="text-center reg">*/}
                                                {/*    <div className="badge badge-primary">№ {data?.outNumber}</div>*/}
                                                {/*    <hr/>*/}
                                                {/*    {dateFormatGet(data?.registrationDate)}*/}
                                                {/*</td>*/}
                                                <td className="harakat text-center ">
                                                    <div>
                                                        {/*// <!-- <a href="./korish.html" class="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Ko'rish"><span><i class="icon-eye2 "/</span> </a> -->*/}
                                                        <div
                                                            className="icon d-flex justify-content-center align-items-center w-100">
                                                            <Link
                                                                to={`/chiquvchi/ko'rish/xomaki/${data?.id}`}
                                                                className="infoBtn bg-dark file_kor_short"
                                                                data-popup="tooltip"
                                                                title="ko'rish"><i className="icon-eye2" />
                                                            </Link>

                                                            <Link
                                                                to={`/chiquvchi/homaki/edit/${data?.id}`}
                                                                // onClick={() => setOpenModal({ open: true, obj: { data } })}
                                                                title="Yangilash"
                                                                className={'infoBtn bg-dark file_kor_short_not'}
                                                            >
                                                                <i className="icon-pencil5" />
                                                            </Link>
                                                            <button type={'button'} title={"o'chirish"}
                                                                className={'infoBtn bg-dark disableIfErr file_kor_short_not'}
                                                                onClick={() => setOpenModal({ open: true, obj: data })}><i
                                                                    className="fa-solid fa-trash" />
                                                            </button>
                                                        </div>
                                                        {/*// <!-- <a href="" class="infoBtn bg-dark" data-popup="tooltip" title="O'chirish"><i class="icon-trash "/ </a> -->*/}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    previousLabel="<<"
                                    nextLabel=">>"
                                    pageCount={tableData?.totalElements / 20}
                                    breakLabel="..."
                                    className="paginate"
                                    activeClassName="active"
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    forcePage={selected}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openModal.open && (
                <div className={'adminWindow'}>
                    <div className="modal-dialog modal-sm pt-5 ">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title "></h5>
                                <button className="close"
                                    onClick={() => setOpenModal({ open: false, obj: {} })}
                                    data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body shadowKiruvchi text-center" style={{
                                padding: "10px",
                                border: "1px solid lightgray",
                                margin: "10px",
                                backgroundColor: "lightgray"
                            }}>
                                <h3 className="font-weight-semibold py-1 px-1 "
                                    style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Xujjatni o'chirishni
                                    tasdiqlaysizmi?</h3>
                            </div>

                            <div className="modal-footer d-flex justify-content-center">
                                <button type={'button'}
                                    className="btn btn-danger" onClick={() => setOpenModal({ open: false, obj: {} })}
                                    style={{ width: "150px" }}>bekor qilish
                                </button>
                                <button type={'button'}
                                    className="btn btn-success" onClick={() => deleteData()}
                                    style={{ width: "150px" }}>Tasdiqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(ChiquvchiXomakiContent);