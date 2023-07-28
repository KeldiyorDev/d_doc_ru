import React, {useEffect, useState} from "react";
import {NavLink, useParams, useHistory} from "react-router-dom";
import FuqaroElektronKitobNavbar from "../../../adminFuqaroElektronKitobNavbar/AdminFuqaroElektronKitobNavbar";
import {axiosInstanceFq} from "../../../../../../config";
import {Alert} from "../../../../../../component/alert/Alert";


const FuqaroArxivKurishContent = ({currentUser}) => {
    const params = useParams();
    const [alert, setAlert] = useState({open: false, text: "", color: ""});
    const history = useHistory();

    // id orqali jurnalni o'qib olish
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("journal/" + params.id)
                if (isMounted) {
                    document.querySelector('.uzbekchaNomi').textContent = res.data?.uzName;
                    // document.querySelector('.ruschaNomi').textContent = res.data?.ruName;
                    document.querySelector('.tasnif').textContent = res.data?.shortDescription;
                }
            } catch (error) {
                console.log(error?.response);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser, params.id]);

    const openArchive = async () => {
        try {
            await axiosInstanceFq.patch("journal/unArchive/" + params.id, {})
            Alert(setAlert, "success", "Jurnal arxivdan chiqarildi");
            history.push("/fuqaro/murojati/elektron-kitob-faollar");
        } catch (error) {
            Alert(setAlert, "warning", error?.response?.data);
        }
    }

    return (
        <div className="content mb-5">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase"}}>Все</h3>
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}>
                    <FuqaroElektronKitobNavbar/>

                    <li className="nav-item">
                        <NavLink to={`/fuqaro/murojat/elektron-kitob-arxiv-ko'rish/${params.id}`}
                                 className="nav-link align-items-center" activeClassName="NavLinkLi">
                            <i className="icon-eye2 mr-1"></i> Вид
                        </NavLink>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{padding: "20px 20px"}}>
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card">
                                                <div className="card-title bg-dark text-light text-center">
                                                    <h1>Информация</h1>
                                                </div>
                                                <div className="card-body">
                                                    <table
                                                        className="table mt-2 table-bordered table-striped table-hover Tab">
                                                        <tbody>
                                                        <tr style={{height: "66px"}}>
                                                            <td>Ўзбекское имя:</td>
                                                            <td className="uzbekchaNomi"></td>
                                                        </tr>
                                                        {/*<tr style={{ height: "66px" }}>*/}
                                                        {/*    <td>Ruscha nomi:</td>*/}
                                                        {/*    <td className="ruschaNomi">Заявление гражданина</td>*/}
                                                        {/*</tr>*/}
                                                        <tr style={{height: "66px"}}>
                                                            <td>Краткая классификация:</td>
                                                            <td className="tasnif"></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card">
                                                <div className="card-title bg-dark text-light text-center">
                                                    <h1>Управление журналом</h1>
                                                </div>
                                                <div className="card-body">
                                                    <table
                                                        className="table mt-2 table-bordered table-striped table-hover Tab">
                                                        <tbody>
                                                        {/*<tr className="text-center">*/}
                                                        {/*    <td style={{ height: "67px" }}>*/}
                                                        {/*        &nbsp;*/}
                                                        {/*    </td>*/}
                                                        {/*</tr>*/}
                                                        <tr className="text-center">
                                                            <td>
                                                                <button className="btn btn-primary"
                                                                        onClick={openArchive}> Разархивировать
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        <tr className="text-center">
                                                            <td>
                                                                <div className="btn-group">
                                                                    <button type="button"
                                                                            className="btn btn-primary dropdown-toggle"
                                                                            data-toggle="dropdown">Export
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <span className="dropdown-item"><i
                                                                            className="icon-menu7"></i> EXCEL</span>
                                                                        <span className="dropdown-item"><i
                                                                            className="icon-screen-full"></i> PDF</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<table className="table table-bordered table-striped table-hover Tab" data-paging="true" id="myTable">*/}
                                {/*    <thead>*/}
                                {/*        <tr className="bg-dark text-white NavLink text-center">*/}
                                {/*            <th style={{ width: "5%" }}>№</th>*/}
                                {/*            <th style={{ width: "10%" }}>Fayl</th>*/}
                                {/*            <th style={{ width: "20%" }}>Korrespondent</th>*/}
                                {/*            <th style={{ width: "25%" }}>Qisqacha Ma'lumot</th>*/}
                                {/*            <th style={{ width: "15%" }}>Reg № / Muddati</th>*/}
                                {/*            <th style={{ width: "20%" }}>Ijrochi</th>*/}
                                {/*            <th style={{ width: "5%" }} className="text-center">Harakatlar</th>*/}
                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody id="data">*/}
                                {/*        <>*/}
                                {/*            {data?.map((dat, index) => (*/}
                                {/*                <tr key={index}>*/}
                                {/*                    <td className="text-center id">{dat.id}</td>*/}
                                {/*                    <td className="text-color Fayl">{dat.hujjatTuri}</td>*/}
                                {/*                    <td className="korres">O'zbekiston Respublikasi Prezidenti</td>*/}
                                {/*                    /!* <!-- so'zlar 200ta chiqadi --> *!/*/}
                                {/*                    <td style={{ textAlign: "justify" }} className="qisqacha">*/}
                                {/*                        {dat.malumot}*/}
                                {/*                    </td>*/}
                                {/*                    <td className="text-center chiquvchi reg">*/}
                                {/*                        <div className="badge badge-primary">№ 25</div>*/}
                                {/*                        <hr />*/}
                                {/*                        {dat.date}*/}
                                {/*                    </td>*/}
                                {/*                    <td className="text-center ijrochi">*/}
                                {/*                        <p style={{ margin: "0", borderBottomStyle: "dashed", borderColor: "#ddd", paddingBottom: "20px" }}>D.Sodiqov*/}
                                {/*                            <span className="badge badge-danger ml-1">Bajarilmagan</span>*/}
                                {/*                        </p>*/}
                                {/*                        <p style={{ margin: "0", paddingTop: "20px" }}>D.Sodiqov*/}
                                {/*                            <span className="badge badge-primary ml-1">Bajarilgan</span>*/}
                                {/*                        </p>*/}
                                {/*                    </td>*/}
                                {/*                    <td className="harakat">*/}
                                {/*                        /!* <div className="icon d-flex justify-content-center align-items-center ">*/}
                                {/*                            <Link to="/kiruvchi_bajarish_ijro" className="infoBtn bg-dark" title="korish" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top">*/}
                                {/*                                <span><i className="icon-eye2"></i></span>*/}
                                {/*                            </Link>*/}
                                {/*                        </div> *!/*/}
                                {/*                    </td>*/}
                                {/*                </tr>*/}
                                {/*            ))}*/}
                                {/*        </>*/}
                                {/*    </tbody>*/}
                                {/*</table>*/}
                                {/*<ul id="pagin">*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                        {/* alert */}
                        {alert.open && (
                            <div className={`alert alert-${alert.color} alert-styled-left alert-dismissible`}>
                                <span className="font-weight-semibold">{alert.text}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FuqaroArxivKurishContent)