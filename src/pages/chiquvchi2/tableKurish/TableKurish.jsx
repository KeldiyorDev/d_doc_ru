import { CKEditor } from 'ckeditor4-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import AlertContent, { Alert } from '../../../component/alert/Alert';
import { axiosInstanceOut, url, urlOut } from '../../../config';
import ChiquvchiNavbar2 from '../chiquvchiNavbar2/ChiquvchiNavbar2';
import { colourStyles } from '../utils/additionFunctions';
import BiriktirilganFayllar from '../utils/BiriktirilganFayllar';
import HujjatAylanishYuli from '../utils/HujjatAylanishYuli';
import YuklashUchunFayllar from '../utils/YuklashUchunFayllar';
import RadEtilgan from '../utils/RadEtilgan';
import RadEtishModal from '../utils/RadEtishModal';

const TableKurish = ({ currentUser, permission, ranks }) => {
    const params = useParams();
    const history = useHistory()
    const [startDate, setStartDate] = useState('');
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [data, setData] = useState({});
    const [content, setContent] = useState('');
    const [obj, setObj] = useState({});
    const [radEtishModal, setRadEtishModal] = useState(false);
    const [edit, setEdit] = useState(true);
    const [editRad, setEditRad] = useState(true);
    const [journals, setJournals] = useState([]);
    const [journalsCurrentNumber, setJournalsCurrentNumber] = useState(null);
    const radCommentRef = useRef()
    const journalRef = useRef()

    const [isShowIlova, setIsShowIlova] = useState(false)

    // ekran full
    const [full, setFull] = useState(false)

    //idga mos malumotlarni olish
    useEffect(() => {
        let isMounted = true;
        let templateCkeditor = document.querySelector('.templateCkeditor');

        if (currentUser) {
            if (params.name === 'xomaki' || params.name === 'rad_etilgan') {
                const getData = async () => {
                    try {
                        const res = await axiosInstanceOut.get(`missive/sketchy/${JSON.parse(localStorage.getItem('ids'))}/${params.id}`);
                        console.log(res.data)
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
    }, [currentUser, params])

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
        history.push(`/chiquvchi2/yangi/versiya/${d}`)
    }

    //versiyani bosganda pagega o'tish
    const goToVersiya = async (id) => {
        history.push(`/chiquvchi2/kurish/xomaki/${id}`)
    }

    //tasdiqlash function
    const tasdiqlash = useCallback(async () => {
        console.log(obj);

        // const confId = obj?.confirmatives?.filter((item) => item.workPlaceID === Number(localStorage.getItem("ids")))?.[0].id
        // console.log(confId);

        if (params.name === 'imzolash_uchun') {
            try {
                const res = await axiosInstanceOut.patch(`missive/sign?id=${obj.id}`);
                console.log(res.data)
                Alert(setAlert, 'success', 'Muvoffaqqiyatli tasdiqladingiz')
                setTimeout(() => {
                    history.push('/chiquvchi2/tab/imzolangan')
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
                const res = await axiosInstanceOut.patch(`missive/ready-conf?conf=${id}&missiveId=${params.id}`);
                console.log(res.data)
                Alert(setAlert, 'success', 'Muvoffaqqiyatli tasdiqladingiz')
                setTimeout(() => {
                    history.push('/chiquvchi2/tab/tasdiqlangan')
                }, [2000])
            } catch (error) {
                console.log(error);
            }
        }
    }, [history, obj, params.id, params.name])


    const setEDIT = () => {
        setEdit(!edit)
        setEditRad(false)
    }

    //kanselyar journal va sanani tanlab junatish
    const sentDocument = async (id) => {
        try {
            const res = await axiosInstanceOut.patch(`missive/ready-sender?id=` + id);
            // console.log(res.data)

            if (params.name === 'xomaki') {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli yubordingiz')
                setTimeout(() => {
                    history.push('/chiquvchi2/tab/jarayonda')
                }, [2000])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const isOfficeMenejer = async () => {
        let date = document.querySelector('.didlineKorres').value;

        console.log(date.split('.')[2] + "-" + date.split('.')[1] + "-" + date.split('.')[0]);
        console.log({
            id: params.id,
            journalID: journalRef?.current?.props?.value?.value || "",
            number: journalsCurrentNumber,
            // registeredAt: `${startDate?.toLocaleDateString()?.split(".")[0]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[0] : startDate?.toLocaleDateString()?.split(".")[0]}/${startDate?.toLocaleDateString()?.split(".")[1]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[1] : startDate?.toLocaleDateString()?.split(".")[1]}/${startDate?.toLocaleDateString()?.split(".")[2]}`
            registeredAt: date.split('.')[2] + "-" + date.split('.')[1] + "-" + date.split('.')[0]
        })
        try {
            const res = await axiosInstanceOut.patch(`missive/register`, {
                id: params.id,
                journalID: journalRef?.current?.props?.value?.value || "",
                number: journalsCurrentNumber,
                // registeredAt: `${startDate?.toLocaleDateString()?.split(".")[0]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[0] : startDate?.toLocaleDateString()?.split(".")[0]}/${startDate?.toLocaleDateString()?.split(".")[1]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[1] : startDate?.toLocaleDateString()?.split(".")[1]}/${startDate?.toLocaleDateString()?.split(".")[2]}`
                // registeredAt: `${startDate?.toLocaleDateString()?.split(".")[0]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[0] : startDate?.toLocaleDateString()?.split(".")[0]}/${startDate?.toLocaleDateString()?.split(".")[1]?.length === 1 ? "0" + startDate?.toLocaleDateString()?.split(".")[1] : startDate?.toLocaleDateString()?.split(".")[1]}/${startDate?.toLocaleDateString()?.split(".")[2]}`
                registeredAt: date.split('.')[2] + "-" + date.split('.')[1] + "-" + date.split('.')[0]
            });
            // console.log(res.data)
            setTimeout(() => {
                history.push('/chiquvchi2/tab/yuborilgan')
            }, [2000])
        } catch (error) {
            console.log(error);
        }
    }

    console.log(obj);

    return (
        <div className="content content-mobile mb-5 px-0" style={{ background: "transparent" }}>
            <div className="card-body card-body-mobile">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", minHeight: "52px" }}>
                    <ChiquvchiNavbar2 currentUser={currentUser} permission={permission} ranks={ranks} />
                    <li className="nav-item">
                        <NavLink to={`/chiquvchi2/kurish/${params.name}/${params.id}`} className="nav-link Navli"
                            activeClassName='NavLinkLi'>
                            <i className="fa-solid fa-gavel mr-1"></i> Вид
                        </NavLink>
                    </li>
                </ul>

                <div className="card">
                    {/* <div className="d-flex justify-content-center mt-2">
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
                    </div> */}

                    <div className="row pl-3 pb-3 kurishCkEditor">
                        <div className={`${full ? "col-lg-12" : "col-lg-6"}`} >
                            <button className="btn btn-primary m-0 mt-3 w-100"
                                onClick={() => setFull(!full)}>
                                {full ? "Ekranni qisqartirish" : "To'liq ekran"}
                            </button>
                            {
                                params.name === "xomaki" ? (
                                    <>
                                        {
                                            obj?.missiveFile && (
                                                <div className="w-100 mt-3 border pl-0 pr-0 unit2 templateCkeditor"
                                                    style={{ width: "800px", overflow: "scroll" }}>
                                                    <CKEditor
                                                        readOnly={edit}
                                                        initData={obj?.missiveFile?.content}
                                                        style={{ width: '780px !important', margin: '0 auto', overflow: "scroll" }}
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
                                                </div>
                                            )
                                        }

                                        {
                                            obj?.appendixList && <div className="btn btn-primary w-100 mt-3"
                                                onClick={() => setIsShowIlova(!isShowIlova)}>
                                                {!isShowIlova ? "Ilovalarni ko'rish" : "Ilovalarni yopish"}
                                            </div>
                                        }

                                        {
                                            (obj?.appendixList && isShowIlova) && (
                                                <>
                                                    {
                                                        obj?.appendixList.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <h2 className='text-center mt-3 kurishCkeditor'>{index + 1}-ilova</h2>
                                                                    <div className="w-100 mt-3 border pl-0 pr-0 unit2 templateCkeditor"
                                                                        style={{
                                                                            width: "800px",
                                                                            overflow: "scroll",
                                                                            maxHeght: item.type === "kitob" ? '1101px' : '501px',
                                                                        }}>
                                                                        <CKEditor
                                                                            readOnly={edit}
                                                                            initData={item?.content}
                                                                            style={{
                                                                                width: item.type === "kitob" ? '780px !important' : '1180px !important',
                                                                                margin: '0 auto',
                                                                                maxHeght: item.type === "kitob" ? '1101px !important' : '501px !important',
                                                                                display: "flex",
                                                                                overflow: "scroll",
                                                                                // width: '780px ',
                                                                            }}
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
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div className="borderPdf mt-3">
                                            {
                                                obj?.readyPDF?.id && (
                                                    <embed
                                                        src={urlOut + "file/" + obj?.readyPDF?.id}
                                                        type="application/pdf"
                                                        width="100%"
                                                        height="1000px"
                                                    />
                                                )
                                            }
                                        </div>

                                        {
                                            (obj?.appendixPdfList) && <div className="btn btn-primary w-100 mt-3"
                                                onClick={() => setIsShowIlova(!isShowIlova)}>
                                                {!isShowIlova ? "Ilovalarni ko'rish" : "Ilovalarni yopish"}
                                            </div>
                                        }

                                        {
                                            (obj?.appendixPdfList && isShowIlova) && obj?.appendixPdfList?.map((item) => {
                                                return (
                                                    <div className="borderPdf mt-3">
                                                        <embed
                                                            src={urlOut + "file/" + item?.id}
                                                            type="application/pdf"
                                                            width="100%"
                                                            height="1000px"
                                                        />
                                                    </div>
                                                )
                                            })

                                        }
                                    </>
                                )
                            }

                        </div>
                        <div className={`col-lg-6`} style={{ display: full ? "none" : "block" }}>
                            <div className="card-block mt-3">

                                <div className="card-box">
                                    <HujjatAylanishYuli obj={obj} />
                                </div>

                                <BiriktirilganFayllar data={obj} params={params} />

                                {
                                    obj?.readyPDF && params.name === 'yuborilgan' &&
                                    <YuklashUchunFayllar data={obj} />
                                }

                                {
                                    (params.name === 'imzolangan' && ranks.includes(8)) &&
                                    <>
                                        <div className={'card-box col-lg-12'}>
                                            <div className="row px-0 mx-0">
                                                <div className="col-lg-12 px-0 my-2">
                                                    <Select
                                                        options={journals}
                                                        placeholder="Jurnalni tanlang"
                                                        isClearable={true}
                                                        onChange={(e) => setJournalsCurrentNumber(e.currentNumber)}
                                                        ref={journalRef}
                                                        isDisabled={params.name === 'yuborilgan'}
                                                        className="Rahbariyat"
                                                        styles={colourStyles}
                                                    />
                                                </div>

                                                <div className="col-lg-6 pl-0 mb-2">
                                                    <input type="text" style={{ height: '45px' }}
                                                        value={journalsCurrentNumber}
                                                        className="p-2 form-control form-control-outline InputBox"
                                                        placeholder="№" disabled={true} />
                                                </div>

                                                <div className="col-lg-6 pr-0 mb-2">
                                                    <div
                                                        className="inputBox d-flex align-items-center justify-content-end input-border w-100 bg-white"
                                                        style={{ height: '45px' }}>
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

                                            <button onClick={() => isOfficeMenejer()}
                                                className={'btn btn-success w-100 mt-2'}> Отправить 
                                                документ
                                            </button>
                                        </div>
                                    </>

                                }

                                {
                                    // params.name === 'xomaki' &&
                                    <>
                                        {(params.name !== 'jarayonda' && params.name === 'xomaki' && !obj?.rejected) && (
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-success w-100"
                                                        style={{ marginRight: "50px !important" }}
                                                        onClick={() => sentDocument(obj.id)}>
                                                        Отправить
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        {
                                            (params.name !== 'jarayonda') && (params.name === 'tasdiqlash_uchun' || params.name === 'imzolash_uchun') && (
                                                <div className='row'>
                                                    <div className="col-lg-6">
                                                        <button
                                                            onClick={tasdiqlash}
                                                            className={`btn my-2 btn-success w-100`}
                                                            style={{ display: editRad ? "block" : "none" }}>
                                                           Подтверждение
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button
                                                            className={'btn btn-danger my-2 w-100'}
                                                            onClick={() => setRadEtishModal(true)}>
                                                          Отклонить это
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                    </>
                                }

                                {
                                    params.name === "rad_etilgan" && (
                                        <RadEtilgan
                                            obj={obj}
                                        />
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {
                radEtishModal && (
                    <RadEtishModal
                        setRadEtishModal={setRadEtishModal}
                        obj={obj}
                        Alert={Alert}
                        setAlert={setAlert}
                    />
                )
            }

            {/* alert */}
            < AlertContent alert={alert} />
        </div >
    )
}

export default React.memo(TableKurish)

