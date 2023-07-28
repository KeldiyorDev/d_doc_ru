import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import ChiquvchiContentNavbar from "../../chiquvchiContentNavbar/chiquvchiContentNavbar";
import ChiquvchiHujjatAylanishYuli from "./hujjatAylanishYuli/hujjatAylanishYuli";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { axiosInstanceOut, urlFq, urlOut } from "../../../../config";
import ChiquvchiFileBiriktiribYuklash from "./hujjatAylanishYuli/fileBiriktiribYuklash/faylBiriktiribYuklash";
import { Alert } from "../../../../component/alert/Alert";
import { CKEditor } from "ckeditor4-react";
import "./ko'rishContent.css"
import ChiquvchiFileYuklash from "./hujjatAylanishYuli/TayyorFile/faylBiriktiribYuklash";
import { ShortUser } from "../../../../component/ShortUser";


const ChiquvchiXomakiKurishContent = ({ currentUser, permission, ranks }) => {
    const params = useParams();
    const history = useHistory()
    const [startDate, setStartDate] = useState('');
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [data, setData] = useState({});
    const [content, setContent] = useState('');
    const [obj, setObj] = useState({});
    const [openText, setOpenText] = useState(false);
    const [openTextComment, setOpenTextComment] = useState(false);
    const [edit, setEdit] = useState(true);
    const [editRad, setEditRad] = useState(true);
    const [journals, setJournals] = useState([]);
    const [journalsCurrentNumber, setJournalsCurrentNumber] = useState(null);
    const radCommentRef = useRef()
    const journalRef = useRef()

    const dateFormat = (date) => {
        return date?.split('/')[2] + '-' + date?.split('/')[0] + '-' + (parseInt(date?.split('/')[1]) < 10 ? (`0${date?.split('/')[1]}`) : date?.split('/')[1])
    }

    //idga mos malumotlarni olish
    useEffect(() => {
        let isMounted = true;
        let templateCkeditor = document.querySelector('.templateCkeditor');

        if (currentUser) {
            if (params.name === 'xomaki') {
                const getData = async () => {
                    try {
                        const res = await axiosInstanceOut.get(`missive/sketchy/${JSON.parse(localStorage.getItem('ids'))}/${params.id}`);
                        // console.log(res.data)
                        if (isMounted) {
                            setData(res?.data?.missiveFile);
                            setObj(res?.data);
                            // setContent(obj?.missiveFile?.content)
                            templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = res?.data?.missiveFile?.content;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                getData()
            } else {
                const getData = async () => {
                    try {
                        const res = await axiosInstanceOut.get(`missive/${JSON.parse(localStorage.getItem('ids'))}/${params.id}`);
                        // console.log(res.data)
                        if (isMounted) {
                            setData(res?.data?.missiveFile);
                            setObj(res?.data);
                            // setContent(obj?.missiveFile?.content)
                            templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = res?.data?.missiveFile?.content;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                getData()
            }
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser, params.id])

    //journalllarni o'qish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.get(`journal/getOrgAll/${JSON.parse(localStorage.getItem('oi'))}`);
                    // console.log(res.data)
                    let arr = [];
                    res.data.forEach((d) => {
                        arr.push({ value: d.id, label: d.uzName, currentNumber: d.currentNumber })
                    })
                    if (isMounted) {
                        setJournals(arr)
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
    }, [currentUser, params.id])

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', height: '40px' }),
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

    useEffect(() => {
        let isMounted = true;
        document.querySelector('.tooltip')?.remove()

        if (isMounted)
            setStartDate(new Date())

        return () => {
            isMounted = false;
        }
    }, [])

    //yangi versiya yaratadigan pagega o'tadi
    const createNewVersiya = (d) => {
        history.push(`/chiquvchi/yangi/versiya/${d}`)
    }

    //versiyani bosganda pagega o'tish
    const goToVersiya = async (id) => {
        history.push(`/chiquvchi/ko'rish/xomaki/${id}`)
    }

    //tasdiqlash function
    const tasdiqlash = useCallback(async () => {
        console.log(obj);
        if (params.name === 'imzolash_uchun') {
            try {
                const res = await axiosInstanceOut.patch(`missive/sign?id=${obj.id}`);
                console.log(res.data)
                Alert(setAlert, 'success', 'Muvoffaqqiyatli tasdiqladingiz')
                setTimeout(() => {
                    history.push('/chiquvchi/imzolangan')
                }, [2000])
            } catch (error) {
                console.log(error);
            }
        }

        if (params.name === 'tasdiqlash_uchun') {
            let id = null;
            obj?.confirmatives?.forEach((d) => {
                if (d.workPlaceID === JSON.parse(localStorage.getItem('ids'))) {
                    console.log(d)
                    id = d.id
                }
            })
            try {
                const res = await axiosInstanceOut.patch(`missive/ready-conf?conf=${id}`);
                console.log(res.data)
                Alert(setAlert, 'success', 'Muvoffaqqiyatli tasdiqladingiz')
                setTimeout(() => {
                    history.push('/chiquvchi/tasdiqlangan')
                }, [2000])
            } catch (error) {
                console.log(error);
            }
        }
    }, [history, obj, params.name])


    const setEDIT = () => {
        setEdit(!edit)
        setEditRad(false)
    }

    //rad qilish function
    const radEtish = useCallback(async () => {
        let id = null;
        if (params.name !== 'imzolash_uchun') {
            obj?.confirmatives?.forEach((d) => {
                if (d.workPlaceID === JSON.parse(localStorage.getItem('ids'))) {
                    console.log(d)
                    id = d.id
                }
            })
        }
        try {
            const res = await axiosInstanceOut.patch(`missive/reject`, {
                message: radCommentRef?.current?.value,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                missiveID: obj?.id,
                rejectType: params.name === 'imzolash_uchun' ? 1 : 2,
                rejectedWorkPlaceID: JSON.parse(localStorage.getItem('ids')),
                rootMissiveID: obj?.rootMissiveID
            });
            // console.log(res.data)
            if (params.name === 'imzolash_uchun') {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli rad qilindi')
                setTimeout(() => {
                    history.push('/chiquvchi/imzolash_uchun')
                }, [2000])
            } else {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli rad qilindi')
                setTimeout(() => {
                    history.push('/chiquvchi/tasdiqlash_uchun')
                }, [2000])
            }
        } catch (error) {
            console.log(error);
        }
        console.log({
            message: radCommentRef?.current?.value,
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            missiveID: obj?.id,
            rejectType: params.name === 'imzolash_uchun' ? 1 : 2,
            rejectedWorkPlaceID: JSON.parse(localStorage.getItem('ids')),
            rootMissiveID: obj?.rootMissiveID
        })
    }, [obj, radCommentRef?.current?.value])

    //kanselyar journal va sanani tanlab junatish
    const sentDocument = async (id) => {
        try {
            const res = await axiosInstanceOut.patch(`missive/ready-sender?id=` + id);
            // console.log(res.data)

            if (params.name === 'xomaki') {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli yubordingiz')
                setTimeout(() => {
                    history.push('/chiquvchi/jarayonda')
                }, [2000])
            }
        } catch (error) {
            console.log(error);
        }


    }

    const isOfficeMenejer = async () => {
        console.log({
            id: params.id,
            journalID: journalRef?.current?.props?.value?.value || "",
            number: journalsCurrentNumber,
            registeredAt: `${startDate.toLocaleDateString().split("/")[0].length === 1 ? "0" + startDate.toLocaleDateString().split("/")[0] : startDate.toLocaleDateString().split("/")[0]}/${startDate.toLocaleDateString().split("/")[1].length === 1 ? "0" + startDate.toLocaleDateString().split("/")[1] : startDate.toLocaleDateString().split("/")[1]}/${startDate.toLocaleDateString().split("/")[2]}`
        })
        try {
            const res = await axiosInstanceOut.patch(`missive/register`, {
                id: params.id,
                journalID: journalRef?.current?.props?.value?.value || "",
                number: journalsCurrentNumber,
                registeredAt: `${startDate.toLocaleDateString().split("/")[0].length === 1 ? "0" + startDate.toLocaleDateString().split("/")[0] : startDate.toLocaleDateString().split("/")[0]}/${startDate.toLocaleDateString().split("/")[1].length === 1 ? "0" + startDate.toLocaleDateString().split("/")[1] : startDate.toLocaleDateString().split("/")[1]}/${startDate.toLocaleDateString().split("/")[2]}`
            });
            // console.log(res.data)
            setTimeout(() => {
                history.push('/chiquvchi/yuborilgan')
            }, [2000])
        } catch (error) {
            console.log(error);
        }

    }

    console.log(obj);

    return (
        <div className="content content-mobile" style={{ marginBottom: "130px", marginTop: '2rem' }}>
            <h1 style={{
                margin: "10px 0 0 20px",
                fontWeight: "bold",
                textTransform: "upperCase"
            }}>Ko'rish</h1>

            <div className="card-body card-body-mobile">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", minHeight: "52px" }}>
                    <ChiquvchiContentNavbar currentUser={currentUser} permission={permission} ranks={ranks} />
                    <li className="nav-item">
                        <NavLink to={`/chiquvchi/ko'rish/${params.name}/${params.id}`} className="nav-link"
                            activeClassName='NavLinkLi'>
                            <i className="fa-solid fa-gavel mr-1"></i> Ko'rish
                        </NavLink>
                    </li>
                </ul>

                <div className="card">
                    <div className="d-flex justify-content-center mt-2">
                        <div style={{ textAlign: 'center' }}>
                            {
                                params?.name === 'xomaki' ? <>
                                    <div>
                                        {
                                            obj?.versions?.map((item, index) => {
                                                return (
                                                    <>
                                                        <button key={index} type={'button'}
                                                            onClick={() => goToVersiya(item?.id)}
                                                            className={`btn btn-primary mr-2`}>{item.version} -
                                                            versiya
                                                        </button>
                                                    </>
                                                )
                                            })
                                        }
                                        <button type={'button'} className={'btn btn-outline text-primary'}
                                            onClick={() => createNewVersiya(obj?.id)}
                                            style={{ fontSize: '20px' }}><i className="fa-sharp fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </> : ''
                            }
                        </div>
                    </div>

                    <div className="row pl-3 pb-3">

                        {
                            obj?.missiveFile &&
                            <div className="col-lg-5 mt-3 border pl-0 pr-0 unit2 templateCkeditor">
                                <CKEditor
                                    readOnly={edit}
                                    initData={obj?.missiveFile?.content}
                                    style={{ maxWidth: '1000px', margin: '0 auto' }}
                                    config={{
                                        extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                    }}
                                    onChange={(event, editor) => {
                                        // console.log(event);
                                        console.log(event?.editor?.getData());
                                        // console.log(event?.editor)
                                        setContent(String(event?.editor?.getData()))
                                    }}
                                    type="classic"
                                    popupHeight='500px'
                                    onBeforeLoad={CKEDITOR => {
                                    }}
                                    onInstanceReady={({ editor }) => {
                                        // console.log(editor)
                                        editor.getData(content)
                                        // Handles native `instanceReady` event.
                                        // console.log(editor);
                                    }}
                                />
                                {/*{*/}
                                {/*    (params.name === 'tasdiqlash_uchun' || params.name === 'imzolash_uchun') &&*/}
                                {/*    <button onClick={() => setEDIT()} type={'button'}*/}
                                {/*            className={'btn btn-success mt-3 mb-3 ml-3'}>O'zgartirish</button>*/}
                                {/*}*/}

                            </div>
                        }

                        <div className={`col-lg-7`}>
                            <div className="card-block mt-3">

                                <div className="card-box">
                                    <ChiquvchiHujjatAylanishYuli obj={obj} />
                                </div>


                                {/*asos*/}
                                {/*<div className={' card-box col-lg-12 d-none'}>*/}
                                {/*    <div className={'card mt-3 '}>*/}
                                {/*        <div*/}
                                {/*            className="card-header bg-primary text-white header-elements-inline">*/}
                                {/*            <h6 className="card-title"*/}
                                {/*                style={{*/}
                                {/*                    fontWeight: "bold",*/}
                                {/*                    textTransform: "upperCase"*/}
                                {/*                }}>Asos</h6>*/}
                                {/*        </div>*/}
                                {/*        <div className="card-body border p-1">*/}
                                {/*            <table id="myTable"*/}
                                {/*                   className="table table-bordered table-striped table-hover Tab">*/}
                                {/*                <thead>*/}
                                {/*                <tr className="bg-dark text-white NavLink text-center">*/}
                                {/*                    <th style={{width: '30 %'}} className="qabul">Fayl</th>*/}
                                {/*                    <th style={{width: '40 %'}}*/}
                                {/*                        className="ariza">Korrespondent*/}
                                {/*                    </th>*/}
                                {/*                    <th style={{width: '30 %'}} className="murojaat">Reg № /*/}
                                {/*                        Muddati*/}
                                {/*                    </th>*/}
                                {/*                </tr>*/}
                                {/*                </thead>*/}
                                {/*                <tbody>*/}
                                {/*                <td className="text-color "></td>*/}
                                {/*                <td className="text-center ">Davlat tilida ish yuritish*/}
                                {/*                    asoslarini o'qitish va malaka oshirish markazi*/}
                                {/*                </td>*/}
                                {/*                <td className="text-center ">*/}
                                {/*                    <span style={{*/}
                                {/*                        color: 'white',*/}
                                {/*                        borderRadius: '5px',*/}
                                {/*                        fontSize: '10px'*/}
                                {/*                    }} className="bg-primary p-1">№ 5731</span>*/}
                                {/*                    <hr/>*/}
                                {/*                    <span>01.06.2022</span>*/}
                                {/*                </td>*/}
                                {/*                </tbody>*/}
                                {/*            </table>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*file ko'rish*/}
                                <ChiquvchiFileBiriktiribYuklash data={obj} params={params} />
                                {
                                    obj?.readyPDF && params.name === 'yuborilgan' &&
                                    <ChiquvchiFileYuklash data={obj} />
                                }


                                {
                                    (params.name === 'imzolangan' && ranks.includes(8)) &&
                                    <>

                                        <div className={' card-box col-lg-12'}>
                                            <div className="row">
                                                {/* <div className="col-12">
                                                    <input type="text" style={{ height: '40px' }}
                                                        className="p-2 form-control form-control-outline InputBox"
                                                        placeholder="Korrespondent pochtasi" disabled={true}
                                                        defaultValue={obj.email}
                                                    />
                                                </div> */}

                                                <div className="col-12 mt-3">
                                                    <Select
                                                        options={journals}
                                                        placeholder="Devonxona"
                                                        isClearable={true}
                                                        onChange={(e) => setJournalsCurrentNumber(e.currentNumber)}
                                                        ref={journalRef}
                                                        isDisabled={params.name === 'yuborilgan'}
                                                        className="Rahbariyat"
                                                        styles={colourStyles}
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <input type="text" style={{ height: '40px' }}
                                                        value={journalsCurrentNumber}
                                                        className="p-2 form-control form-control-outline InputBox"
                                                        placeholder="№" disabled={true} />
                                                </div>

                                                <div className="col-3 mt-3">
                                                    <div
                                                        className="inputBox d-flex align-items-center justify-content-end input-border w-100 bg-white"
                                                        style={{ height: '40px' }}>
                                                        <DatePicker
                                                            className={'didlineKorres'}
                                                            id={'qisqacha2'}
                                                            selected={startDate}
                                                            onChange={(date) => setStartDate(date)}
                                                            dateFormat={'dd.MM.yyyy'}
                                                            isClearable
                                                            showYearDropdown
                                                            scrollableMonthYearDropdown
                                                            placeholderText="Chiquvchi sana"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button type={'button'} onClick={() => isOfficeMenejer()}
                                                className={'btn btn-primary mt-3'}>Xujjatni
                                                yuborish
                                            </button>
                                        </div>
                                    </>

                                }

                                {
                                    // params.name === 'xomaki' &&
                                    <>
                                        {(params.name !== 'jarayonda') && (params.name === 'xomaki' || params.name === 'yuborilgan') &&
                                            <button type="button" className="btn btn-primary ml-2 mt-3 mb-3"
                                                onClick={() => sentDocument(obj.id)}>
                                                <i className="fa-solid fa-download mr-1"></i>
                                                Yuborish
                                            </button>}
                                        {
                                            (params.name !== 'jarayonda') && (params.name === 'tasdiqlash_uchun' || params.name === 'imzolash_uchun') &&
                                            <div className={'d-flex justify-content-between'}>
                                                <div className={'position-relative d-flex'}>
                                                    <button type={'button'}
                                                        onClick={tasdiqlash}
                                                        className={`btn  ml-2 mt-3 mb-3 btn-success`}
                                                        style={{ display: editRad ? "block" : "none" }}>Tasdiqlash
                                                    </button>
                                                    <button type={'button'} className={'btn btn-danger ml-2 mt-3 mb-3 '}
                                                        onClick={() => setOpenTextComment(true)}>Rad etish
                                                    </button>
                                                </div>
                                            </div>

                                        }
                                    </>
                                }

                                <div className="card mx-2">
                                    <div className="card-header bg-danger text-white header-elements-inline">
                                        <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>
                                            Rad etilgan</h6>
                                    </div>
                                    <div className="card-body px-2">
                                        {
                                            (obj?.feedback?.confFeedbacks?.length > 0 || obj?.feedback?.signatoryFeedbacks?.length > 0) &&
                                            <div className="col-lg-12 pl-2 pr-2 mb-3">
                                                <table className="table table-bordered table-striped table-hover Tab">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">Ism familiyasi</th>
                                                            <th className="text-center">Rad etish sanasi</th>
                                                            <th className="text-center">Izoh</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {/*Fikrlar  :*/}
                                                        {
                                                            obj?.feedback?.confFeedbacks?.map((feedback) => {
                                                                return (

                                                                    <tr key={feedback?.missiveID} className={'mb-2'}>
                                                                        <td className="text-center">{ShortUser(feedback?.firstName?.trim(), feedback?.lastName?.trim())}</td>
                                                                        <td className="text-center">{feedback?.rejectedAt?.substr(0,10)} <br /> {feedback?.rejectedAt?.substr(11,5)}</td>
                                                                        <td className="text-center">{feedback?.content}</td>
                                                                        {/* <h6 className={'fw-bold'}
                                                                            style={{ fontWeight: 'bold' }}>{ShortUser(feedback?.firstName.trim(), feedback?.lastName?.trim())} :</h6>
                                                                        <p className={'m-0'}>Rad etilgan sanasi: {feedback?.rejectedAt}</p>

                                                                        <p className={'m-0'}>Rad etilgan sababi: {feedback?.content}</p> */}

                                                                    </tr>

                                                                )
                                                            })
                                                        }
                                                        {
                                                            obj?.feedback?.signatoryFeedbacks?.map((feedback) => {
                                                                return (
                                                                    <tr key={feedback?.missiveID} className={'mb-2'}>
                                                                        <td className="text-center">{ShortUser(feedback?.firstName?.trim(), feedback?.lastName?.trim())}</td>
                                                                        <td className="text-center">{feedback?.rejectedAt?.substr(0,10)} <br /> {feedback?.rejectedAt?.substr(11,5)}</td>
                                                                        <td className="text-center">{feedback?.content}</td>
                                                                        {/* <h6 className={'fw-bold'}
                                                                            style={{ fontWeight: 'bold' }}>{ShortUser(feedback?.firstName?.trim(), feedback?.lastName?.trim())} :</h6>
                                                                        <p className={'m-0'}
                                                                            style={{ color: "#ff0000" }}>{feedback?.content}</p> */}
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        }

                                        {
                                            (params.name === 'tasdiqlash_uchun' || params.name === 'imzolash_uchun') && openTextComment &&
                                            <div className="col-lg-12">
                                                <textarea className={'form-control mb-3'} disabled={openText}
                                                    ref={radCommentRef} name="" id="" cols="30"
                                                    rows="5"></textarea>
                                                <button type={'button'} onClick={() => setOpenText(!openText)}
                                                    className={`btn ${!openText ? 'btn-primary' : 'btn-success'}`}>{!openText ? "Saqlash" : "O'zgartirish"}</button>
                                                {
                                                    openText && <button type={'button'} className={'btn btn-primary ml-2'}
                                                        onClick={() => radEtish()}
                                                    >Yuborish
                                                    </button>
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>


                                {/*rada etish modal*/}
                                {/*{openModal && (*/}
                                {/*    <div className={'adminWindow'}>*/}
                                {/*        <div className="modal-dialog modal-sm pt-5 ">*/}
                                {/*            <div className="modal-content">*/}
                                {/*                <div className="modal-header bg-primary text-white">*/}
                                {/*                    <h5 className="modal-title ">Rad etish</h5>*/}
                                {/*                    <button className="close" onClick={() => setOpenModal(false)}*/}
                                {/*                            data-dismiss="modal">&times;</button>*/}
                                {/*                </div>*/}

                                {/*                <div className="modal-body shadowKiruvchi text-center" style={{*/}
                                {/*                    padding: "10px",*/}
                                {/*                    margin: "10px",*/}
                                {/*                    borderRadius: '5px'*/}
                                {/*                }}>*/}
                                {/*                    <textarea className={'form-control form-control-outline'}*/}
                                {/*                              placeholder={'Izoh kiriting'} name="" id="" cols="30"*/}
                                {/*                              ref={radCommentRef}*/}
                                {/*                              rows="5"></textarea>*/}
                                {/*                </div>*/}

                                {/*                <div className="modal-footer d-flex justify-content-center">*/}
                                {/*                    <button type={'button'} onClick={() => setOpenModal(false)}*/}
                                {/*                            className="btn btn-danger"*/}
                                {/*                            style={{width: "150px"}}>bekor qilish*/}
                                {/*                    </button>*/}
                                {/*                    <button type={'button'} onClick={() => radEtish()}*/}
                                {/*                            className="btn btn-success"*/}
                                {/*                            style={{width: "150px"}}>tasdiqlash*/}
                                {/*                    </button>*/}

                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*)}*/}


                                {/* alert */}
                                {alert.open && (
                                    <div
                                        className={`alert alert-${alert.color} alertNotice alert-styled-left alert-dismissible`}>
                                        <span className="font-weight-semibold">{alert.text}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default React.memo(ChiquvchiXomakiKurishContent)