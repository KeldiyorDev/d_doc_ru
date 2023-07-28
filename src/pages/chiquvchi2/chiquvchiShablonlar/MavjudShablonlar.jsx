import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContent, { Alert } from '../../../component/alert/Alert';
import { axiosInstanceOut, urlOut } from '../../../config'
import ChiquvchiShablonNavbar from './ChiquvchiShablonNavbar';
import DeleteShablon from './DeleteShablon'
import parse from "html-react-parser"

const MavjudShablonlar = ({ permission, ranks, currentUser }) => {
    const history = useHistory()
    const [getTableData, setGetTableData] = useState([])
    const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceOut.get(`template/all/` + JSON.parse(localStorage.getItem('ids')) + "/" + JSON.parse(localStorage.getItem('oi')));
                console.log(res.data)
                setGetTableData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <div className="content content-mobile my-3 py-3">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
                <ChiquvchiShablonNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
            </ul>
            <div className="card-body card-body-mobile p-0">
                <div className="tab-content shablon"></div>
                <div className="tab-pane fade show active p-3 bg-white card row" styleid="colored-tab1">

                    <div className="col-lg-12 px-0">
                        {
                            getTableData.length > 0 && (
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead className={'theadSticky'}>
                                        <tr className="bg-dark text-white NavLink text-center">
                                            <th id='tabRow' style={{ width: '5%' }} className="id file_kor_short_not">№</th>
                                            <th id='tabRow' style={{ width: '25 %' }} className="qabul file_kor_short">Картина
                                            </th>
                                            <th id='tabRow' style={{ width: '10 %' }}
                                                className="ariza file_kor_short_not">Именование
                                            </th>
                                            <th id='tabRow' style={{ width: '30 %' }}
                                                className="ariza file_kor_short_not">Краткая
                                            </th>
                                            <th id='tabRow' style={{ width: '30 %' }}
                                                className="ariza file_kor_short_not">Внешний вид для других
                                            </th>
                                            <th id='tabRow' style={{ width: '20%' }}
                                                className="text-center harakat file_kor_short_not">Действия
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getTableData?.map((data, index) => (
                                            <tr id="kor" key={index}>
                                                <td className="text-center id file_kor_short_not">{index + 1}</td>
                                                <td className="text-color qabul mobile-table-none file_kor_short" id='qabul'
                                                    style={{ cursor: "pointer", wordWrap: "break-word", width: '10%' }}>
                                                    <img src={urlOut + `file/${data?.image?.id}`} width={200}
                                                        height={120} alt="" />
                                                </td>
                                                <td className=" ariza" style={{ textAlign: 'center' }}><span
                                                    className={'text-color file_kor_short_not'}>{data?.name}</span>
                                                </td>
                                                <td className=" ariza" style={{ textAlign: 'center' }}><span
                                                    className={'text-color file_kor_short_not'}>{data?.shortInfo}</span>
                                                </td>
                                                <td className=" ariza" style={{ textAlign: 'center' }}><span
                                                    className={'text-color file_kor_short_not'}>{data?.isGlobal ? "ha" : "yo'q"}</span>
                                                </td>

                                                <td className="harakat">
                                                    <div className="icon d-flex justify-content-center align-items-center w-100">

                                                        <button type={'button'}
                                                            onClick={() => history.push({ pathname: "/chiquvchi2/shablon/edit", state: data })}
                                                            title="Yangilash"
                                                            className={'infoBtn bg-dark file_kor_short_not'}
                                                        >
                                                            <i className="icon-pencil5" />
                                                        </button>
                                                        <button type={'button'} title={"o'chirish"}
                                                            className={'infoBtn bg-dark disableIfErr file_kor_short_not'}
                                                            onClick={() => setDeleteModal({ isShow: true, id: data.id })}>
                                                            <i
                                                                className="fa-solid fa-trash" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                        {deleteModal.isShow && (
                            <DeleteShablon
                                deleteModal={deleteModal}
                                setDeleteModal={setDeleteModal}
                                getTableData={getTableData}
                                setGetTableData={setGetTableData}
                                Alert={Alert}
                                setAlert={setAlert}
                            />
                        )}

                        {/* alert */}
                        < AlertContent alert={alert} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(MavjudShablonlar)