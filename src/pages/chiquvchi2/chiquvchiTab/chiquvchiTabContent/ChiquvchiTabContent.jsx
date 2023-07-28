import React from 'react'
import { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useRef } from 'react'
import { tabs } from '../../utils/tabs'
import { axiosInstanceOut } from '../../../../config'
import ChiquvchiNavbar2 from '../../chiquvchiNavbar2/ChiquvchiNavbar2'
import TableSearch from '../../utils/TableSearch'
import Pagination from '../../utils/Pagination'
import { statusCodeOutGoing } from '../../../../component/status/Status'
import TableFile from '../../utils/TableFile'
import AlertContent, { Alert } from '../../../../component/alert/Alert'
import XomakiDelete from '../components/XomakiDelete'

const ChiquvchiTabContent = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    const { name } = useParams()
    const tab = tabs.filter((item) => item.name === name)[0]?.tab
    console.log(tab);

    const [size, setSize] = useState(20)
    const [selected, setSelected] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })
    const [data, setData] = useState([])

    const imzolovchilarRef = useRef()
    const korrespondentRef = useRef()
    const qisqachaMalumotRef = useRef()

    //malumotlarni o'qib olish
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceOut.post("missive/list", {
                    confirmativeWorkPlace: null,
                    correspondent: null,
                    shortInfo: null,
                    workPlace: JSON.parse(localStorage.getItem('ids')),
                    orgID: JSON.parse(localStorage.getItem('oi')),
                    size: size,
                    page: 0,
                    tab: tab,
                });
                console.log(res.data)

                if (isMounted) {
                    setData(res.data?.content)
                    setTotalElements(res.data?.totalElements)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData()

        return () => {
            isMounted = false;
        }
    }, [currentUser, size, tab])


    //pagination
    const handlePageClick = async (e) => {
        setSelected(e.selected);
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: imzolovchilarRef?.current?.props ? imzolovchilarRef?.current?.props?.value?.value : null,
                correspondent: korrespondentRef?.current?.props ? korrespondentRef?.current?.props?.value?.value : null,
                shortInfo: qisqachaMalumotRef?.current?.value ? qisqachaMalumotRef?.current?.value : null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                page: e.selected,
                size: size,
                tab: tab,
            })
            console.log(res.data);
            setData(res.data?.content)
            setTotalElements(res.data?.totalElements)
        } catch (error) {
            console.log(error.response);
        }
    }

    const goToEmail = (id) => {
        console.log(id);
        axiosInstanceOut.get(`missive/sendMissive/${id}`)
            .then((res) => {
                console.log(res.data);
                Alert(setAlert, 'success', "Успешно отправлено");
            })
    }

    return (
        <div className="content mb-5 content-mobile">
            <div className="card-body card-body-mobile pt-3 px-0">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", minHeight: "52px" }}>
                    <ChiquvchiNavbar2 permission={permission} ranks={ranks} currentUser={currentUser} />
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile" style={{ padding: "30px" }}>
                                <div className='row px-0'>
                                    <TableSearch
                                        setData={setData}
                                        selected={selected}
                                        imzolovchilarRef={imzolovchilarRef}
                                        korrespondentRef={korrespondentRef}
                                        qisqachaMalumotRef={qisqachaMalumotRef}
                                        tab={tab}
                                        setTotalElements={setTotalElements}
                                    />
                                    <div className="col-lg-2 col-md-6 mb-2">
                                        <button className="btn btn-primary mobile-table-none w-100"
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
                                            {
                                                tab === 7 && (
                                                    <input type="submit"
                                                        className="btn btn-white dropdown-item  w-100 myBtn"
                                                        name="reg" value="reg" />
                                                )}
                                            <input type="submit"
                                                className="btn btn-white dropdown-item  w-100 myBtn"
                                                name="harakat" value="harakat" />
                                        </div>
                                    </div>
                                </div>

                                <div className={'mb-3'}>
                                    <Pagination
                                        totalElements={totalElements}
                                        selected={selected}
                                        size={size}
                                        handlePageClick={handlePageClick}
                                    />
                                </div>

                                {/*table qismi*/}
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead className={'theadSticky'}>
                                        <tr className="bg-dark text-white NavLink text-center">
                                            <th id='tabRow' style={{ width: '5%' }}
                                                className="id file_kor_short_not">
                                                №
                                            </th>
                                            <th id='tabRow' style={{ width: '15%' }}
                                                className="qabul file_kor_short">
                                               Файл
                                            </th>
                                            <th id='tabRow' style={{ width: '15%' }}
                                                className="ariza file_kor_short_not">
                                                Раздел (Подготовлено)
                                            </th>
                                            <th id='tabRow' style={{ width: '10%' }}
                                                className="murojaat file_kor_short_not">
                                                Валидатор
                                            </th>
                                            <th id='tabRow' style={{ width: '20%' }}
                                                className="mur file_kor_short">
                                               Корреспондент
                                            </th>
                                            <th id='tabRow' style={{ width: '20%' }}
                                                className="qisqacha file_kor_short">
                                                Краткое содержание
                                            </th>
                                            {
                                                tab === 7 && (
                                                    <th id='tabRow' style={{ width: '10 %' }}
                                                        className="reg">
                                                        Рег № / дата
                                                    </th>
                                                )}
                                            <th id='tabRow' style={{ width: '5%' }}
                                                className="text-center harakat file_kor_short_not">
                                                Действия
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length > 0 && data?.map((item, index) => (
                                            <tr id="kor" key={index}
                                                onClick={() => window.innerWidth <= 768 && history.push(`/chiquvchi2/kurish/xomaki/${item.id}`)}
                                            >
                                                <td className="text-center id file_kor_short_not">{index + 1}</td>
                                                <td className="text-center text-color qabul mobile-table-none file_kor_short" id='qabul'
                                                    style={{ cursor: "pointer", wordWrap: "break-word" }}>
                                                    {item.baseFiles?.length > 0 && item.baseFiles?.map((hujjat, index1) => (
                                                        <div key={index1}>
                                                            <TableFile hujjat={hujjat} index={index} />
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="text-center ariza" style={{ textAlign: 'center' }}><span
                                                    className={'text-center text-color file_kor_short_not'}>{item.departmentName}</span>
                                                    <hr />
                                                    <span className="badge ml-1 status text-white mr-1 file_kor_short_not"
                                                        style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.code === item?.statusCode)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.code === item?.statusCode)[0]?.LatinName}</span> <br />
                                                    {item.senderFirstName + ' ' + item.senderLastName}
                                                </td>
                                                <td
                                                    className="murojaat text-center">{
                                                        item.confirmatives?.map((d, i) => (
                                                            <div className={'my-1'} key={i}>
                                                                <span className="badge ml-1 status text-white mr-1 file_kor_short_not"
                                                                    style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.LatinName}</span> <br />
                                                                {(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : ""}{d.lastName ? d.lastName : ''}<br />
                                                            </div>
                                                        ))
                                                    }</td>

                                                <td id="qs text-center" data-maxlength="5" className="mur file_kor_short">
                                                    {item.correspondent?.map((item, index) => (
                                                        <div style={{ textAlign: "center" }}>
                                                            <span className={'mb-1 text-center'}><span
                                                                style={{ fontWeight: 'bold' }}>{index + 1}.</span>{item}</span><br />
                                                        </div>
                                                    ))}
                                                </td>

                                                <td className="text-center qisqacha file_kor_short" style={{ width: '300px ' }}>
                                                    {item.shortInfo}
                                                </td>

                                                {tab === 7 && (
                                                    <td className="reg" style={{ textAlign: 'center' }}>
                                                        <div className="badge badge-primary">№ {item?.number}</div>
                                                        <hr />
                                                        <div>{item?.registeredAt?.split('-')?.reverse()?.join('.')}</div>
                                                    </td>
                                                )}

                                                <td className="harakat text-center ">
                                                    <div>
                                                        <div
                                                            className="icon d-flex justify-content-center align-items-center w-100">
                                                            <Link
                                                                to={`/chiquvchi2/kurish/${name}/${item.id}`}
                                                                className="infoBtn bg-dark file_kor_short"
                                                                data-popup="tooltip"
                                                                title="ko'rish"><i className="icon-eye2" />
                                                            </Link>

                                                            {
                                                                (tab === 1 || tab === 8) && (
                                                                    <>
                                                                        <Link
                                                                            to={`/chiquvchi2/tab/edit/${item.id}`}
                                                                            title="Yangilash"
                                                                            className={'infoBtn bg-dark file_kor_short_not'}
                                                                        >
                                                                            <i className="icon-pencil5" />
                                                                        </Link>
                                                                        <button type={'button'} title={"o'chirish"}
                                                                            className={'infoBtn bg-dark disableIfErr file_kor_short_not'}
                                                                            onClick={() => setDeleteModal({ isShow: true, id: item.id })}><i
                                                                                className="fa-solid fa-trash" />
                                                                        </button>
                                                                    </>
                                                                )
                                                            }

                                                            {
                                                                (tab === 7) && (
                                                                    <>
                                                                        <button type={'button'}
                                                                            // to={`/${data?.id}`}
                                                                            onClick={() => goToEmail(item.id)}
                                                                            title="yuborish"
                                                                            className={'infoBtn bg-dark'}
                                                                        >
                                                                            <i className="fa-sharp fa-solid fa-paper-plane"></i>
                                                                        </button>
                                                                        {/* <button type={'button'}
                                                                            className={'infoBtn bg-dark disableIfErr'}
                                                                        // onClick={() => goToRes(data)}
                                                                        >
                                                                            <i className="fa-solid fa-envelope"></i>
                                                                        </button> */}
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination
                                    totalElements={totalElements}
                                    selected={selected}
                                    size={size}
                                    handlePageClick={handlePageClick}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {deleteModal.isShow && (
                <XomakiDelete
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    data={data}
                    setData={setData}
                    Alert={Alert}
                    setAlert={setAlert}
                    size={size}
                    tab={tab}
                    setTotalElements={setTotalElements}
                />
            )}


            {/* alert */}
            < AlertContent alert={alert} />
        </div>
    )
}

export default React.memo(ChiquvchiTabContent)

