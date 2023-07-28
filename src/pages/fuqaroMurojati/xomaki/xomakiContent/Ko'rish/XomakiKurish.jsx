import React, {useEffect, useRef, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import NavbarFuqaroMurojat from "../../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import {NavLink} from 'react-router-dom';
import {axiosInstance, axiosInstanceFq, urlFq} from "../../../../../config";
import AlertContent, {Alert} from "../../../../../component/alert/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TezRezolutsiyaMazmuni
    from "../../../../kiruvchi/resolutsiya/resolutionContent/korish/korishContent/tezRezolutsiyaMazmuni/TezRezolutsiyaMazmuni";
import XKKurish from "./XKKurish";
import {useDispatch, useSelector} from "react-redux";
import {DESCRIPTION1, DESCRIPTION2, DESCRIPTION3} from "../../../../../context/AuthReducer";
import FuqaroBajaruvchilarKorish from "./korishXomaki/korishXomaki";
import {
    description1CitizemAppeal,
    description2CitizemAppeal,
    description3CitizemAppeal
} from "../../../../../redux/actions/actionCitizenAppeal";

let idCheckbox = null;
const XomakiKurish = ({currentUser, permission1, ranks}) => {

    //links parmets
    const params = useParams();
    const history = useHistory();

    //umumiy states
    // const {user} = useSelector(state => state);
    const { insta: user } = useSelector(state => state.user);
    const [startDate1, setStartDate1] = useState('');
    const [data, setData] = useState([]);
    const [xodimlar, setXodimlar] = useState([]);
    const [alert, setAlert] = useState({open: false, color: "", text: ""});
    const [nazorat, setNazorat] = useState(false)
    const dispatch = useDispatch();

    // problems states
    const [results, setResults] = useState([]);
    const [tasdiqlovchi, setTasdiqlovchi] = useState([]);
    const [addNewBox, setAddNewBox] = useState([]);
    const [yangiQushish, setYangiQushish] = useState([]);
    const [openBajaruvchi, setOpenBajaruvchi] = useState({open: false, obj: {}, index: null});
    const [tasnif1, setTasnif1] = useState([]);
    const [tasnif2, setTasnif2] = useState([]);
    const [tasnif3, setTasnif3] = useState([]);
    const [allexecutorsData, setAllexecutorsData] = useState([]);
    const [objData, setObjData] = useState([]);
    const [yunalishlar, setYunalishlar] = useState([]);
    //input parameters
    const resolutionContent = useRef();


    // api ketadigan sanani formatlash
    const dateFormatSet = (date) => {
        console.log(date)
        // return date.length < 10 ?date?.slice(5, date?.length) + '-' + date?.slice(0, 2) + '-0' + date?.slice(3, 4):date?.slice(6, date?.length) + '-' + date?.slice(0, 2) + '-' + date?.slice(3, 5);
        return date.length < 10 ?'0'+date.slice(3,4)+'.'+date.slice(0,2)+'.'+date.slice(5,date.length):date.slice(3,5)+'.'+date.slice(0,2)+'.'+date.slice(6,date.length);
    }

    // // api ketadigan sanani formatlash
    // const dateFormatSetIn = (date) => {
    //     return  date?.slice(8, date.length) + '.' + date?.slice(5, 7)+ '.' +date?.slice(0, 4) ;
    // }

    // id bo'yicha malumotni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get('appeal/' + params.id)
                console.log(res.data.data)

                if (isMounted) {
                    setObjData([res?.data?.data]);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser, params.id]);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get(`appeal/sketchy/${params?.id}`)
                if (isMounted) {
                    setData(res?.data?.data)
                    setStartDate1(new Date(res?.data?.data.deadline))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    // tasnif1 ni o'qib olish
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("ac_1/list")
                let arr = [];
                res.data.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })

                if (isMounted) {
                    dispatch(DESCRIPTION1(arr));
                    description1CitizemAppeal(arr)
                    setTasnif1(arr);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    // TASNIF LAR OLDIN MAVJUD BO'LSA, O'QIB OLISH
    useEffect(() => {
        let isMounted = true;

        if (objData[0]?.problems?.length > 0) {
            const getData = async () => {
                // TASNIF1 BO'LGAN HOLATDA TASNIF2 NI OLISH
                try {
                    const res = await axiosInstanceFq.get("ac_2/list/" + objData[0]?.problems[0]?.ac_1ID)
                    let arr = [];
                    res.data.data.forEach((d) => {
                        arr.push({value: d.id, label: d.name});
                    })

                    if (isMounted) {
                        dispatch(DESCRIPTION2(arr));
                        description2CitizemAppeal(arr)
                        setTasnif2(arr);
                    }
                } catch (error) {
                    console.log(error);
                }

                // TASNIF2 BO'LGAN HOLATDA TASNIF3 NI OLISH
                try {
                    const res = await axiosInstanceFq.get("ac_3/list/" + objData[0]?.problems[0]?.ac_2ID)
                    let arr = [];
                    res.data.data.forEach((d) => {
                        arr.push({value: d.id, label: d.name});
                    })

                    if (isMounted) {
                        dispatch(DESCRIPTION3(arr));
                        description3CitizemAppeal(arr)
                        setTasnif3(arr);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }

        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, objData, tasnif1]);

    const Bajaruvchilar = (index) => {
        // tashqi bajaruvchilar oldin tanlangan bo'lsa, dastlab hammasini unchecked qilish
        let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');

        tashqiBajUlInline.forEach((d) => {
            let idsDiv = d.querySelectorAll('.idsDiv');

            idsDiv.forEach((r) => {
                r.checked = false;
            })
        });

        tashqiBajUlInline.forEach((d) => {
            let idsDiv = d.querySelectorAll('.idsDiv');
            idsDiv.forEach((r) => {
                allexecutorsData.forEach((h) => {
                    if (h.index === index) {
                        h.tashqiBajaruvchilar.forEach((u) => {
                            if (u.ids.includes(r.getAttribute('ids'))) {
                                r.checked = true;
                            } else {
                                r.checked = false;
                            }
                        })
                    } else {
                        // r.checked = false;
                        d.querySelector('.allChecked').textContent = "Barchasini tanlash";
                        d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
                    }
                })
            })
        });
        setYangiQushish([]);
        setOpenBajaruvchi({open: true, obj: {}, index: index})
    }

    console.log(objData);
    // oldin tanlangan ichki va tashqi bajaruvchilarni allexecutorsData ga olish
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setAllexecutorsData([]);
            // setResults([]);
        }

        if (objData?.length > 0) {
            let dataObj, resultTashqiB = [], allDataObj = [];

            // ichki bajaruvchilar uchun
            objData[0]?.problems.forEach((d, indexBox) => {
                let inExecutorResolution = [];
                d.inExecutors.forEach((dat) => {

                    let obj = {
                        workPlaceId: dat?.workPlaceID,
                        deadline: dat?.deadline,
                        description: dat?.description,
                        executorStatusName: dat?.executorStatusCode,
                        isResponsible: dat?.isResponsible,
                    }
                    inExecutorResolution.push(obj);
                })

                // tashqi bajaruvchilar uchun
                let result = [];
                yunalishlar.forEach((w) => {
                    let arr = [], bool = true, s;
                    w.organizations.forEach((org) => {
                        d.outExecutors?.forEach((y) => {
                            if (y?.id === org?.id) {
                                arr.push(org.id);
                                if (bool) {
                                    s = y.generalName;
                                    bool = false;
                                }
                            }
                        })
                    })
                    if (arr.length > 0) {
                        result.push({id: w.id, ids: arr, value: s});
                    }
                })

                dataObj = {
                    index: indexBox,
                    ichkiBajaruvchilar: inExecutorResolution,
                    tashqiBajaruvchilar: result
                }
                resultTashqiB.push(result);
                allDataObj.push(dataObj);
            })

            if (isMounted) {
                // setResults(resultTashqiB);
                setAllexecutorsData(allDataObj);
            }
        }

        return () => {
            isMounted = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objData, yunalishlar]);


    const BajaruvchilarSaqlash = (indexBox) => {
        // tashqi bajaruvchi va forma ni massiv ichga olish
        let inExecutorResolution = [];
        let forms = document.querySelectorAll('.bajaruvchiForm');

        // ichki topshiriqlardagi chckbox ni faqat bittasini tanlash
        let checkboxSelect = document.querySelectorAll('.checkboxSelect');
        for (let i = 0; i < checkboxSelect.length; i++) {
            if (checkboxSelect[i].checked) {
                idCheckbox = i;
                break;
            }
        }

        forms.forEach((form, index2) => {
            let letter = "";
            let checkBoxCol1 = form.querySelector('.col1').querySelectorAll('.chb');
            checkBoxCol1.forEach((check) => {
                if (check.querySelector('.iconCheck').hasAttribute('style')) {
                    letter = check.querySelector('.iconCheck').textContent;
                }
            })
            let Xodim = form.querySelector('.XodimBajaruvchi')?.querySelector('.css-qc6sy-singleValue')?.textContent;
            let izohCol1 = form.querySelector('.izohCol1').value;
            let deadLine = form.querySelector('.bajaruvchiSana').value;


            let workPlace = [];
            // xodimni tanlagan payt workplaceId sini olish
            for (let i = 0; i < xodimlar.length; i++) {
                if (xodimlar[i].label === Xodim) {
                    workPlace.push(xodimlar[i]);
                }
            }

            let obj = {
                workPlaceId: workPlace[0]?.pl,
                deadline: deadLine,
                description: izohCol1,
                executorStatusName: letter === "N" ? 4 : letter === "U" ? 3 : letter === "M" ? 2 : 1,
                isResponsible: index2 === idCheckbox ? true : false,
                FIO: workPlace[0]
            }

            inExecutorResolution.push(obj);
        })

        let dataObj = {
            index: indexBox,
            ichkiBajaruvchilar: inExecutorResolution,
            tashqiBajaruvchilar: results
        }

        setResults([]);
        setOpenBajaruvchi({open: false, obj: {}, index: null});
        if (allexecutorsData.some((d) => d.index === indexBox)) {
            let arr = allexecutorsData.filter((d) => {
                if (d.index === indexBox) {
                    d.index = dataObj.index;
                    d.ichkiBajaruvchilar = dataObj.ichkiBajaruvchilar;
                    d.tashqiBajaruvchilar = dataObj.tashqiBajaruvchilar;
                }
                return d;
            })
            setAllexecutorsData(arr);
        } else {
            setAllexecutorsData(prev => [...prev, dataObj]);
        }
    }

    // barcha tasdiqlovchilarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
                let arr = [];
                res.data.forEach((d) => {
                    let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : "";
                    arr.push({value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}`})
                });

                if (isMounted)
                    setTasdiqlovchi(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // takroriy va duplicate lar button
    useEffect(() => {
        let isMounted = true;
        let myBtns = document.querySelectorAll('.myBtnn');

        if (isMounted) {
            myBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    document.querySelector('.tooltip')?.remove();
                    myBtns.forEach((btn) => {
                        btn.removeAttribute('style');
                    })
                    if (btn.hasAttribute('style')) {
                        btn.removeAttribute('style');
                    } else {
                        btn.style.backgroundColor = "#0056B8";
                        btn.style.color = "#fff";
                    }
                })
            });
        }

        return () => {
            isMounted = false;
        }
    }, []);

    // hamma malumotlarni saqlash
    const saveAllData = async (e) => {
        e.preventDefault();
        let accepted = true, accepted1 = true, num = null, problems = [], objFormData = {};

        // barcha tasnif1, tasnif2, tasnif3, shortDescription larni o'qib olish
        let addNewBoxForm = document.querySelectorAll('.addNewBoxForm');
        let formsOutlineElements = {}, allDataForm = [];
        addNewBoxForm.forEach((elem) => {
            user?.tasnif1.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif1').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif1 = d.value
            })
            user?.tasnif2.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif2').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif2 = d.value
            })
            user?.tasnif3.forEach((d) => {
                if (d?.label === elem.querySelector('.tasnif3').querySelector('.css-qc6sy-singleValue')?.textContent)
                    formsOutlineElements.tasnif3 = d.value
            })
            formsOutlineElements.shortDescription = elem.querySelector('.shortDescription')?.value;

            if (formsOutlineElements.tasnif1 && formsOutlineElements.tasnif2 && formsOutlineElements.tasnif3 && formsOutlineElements.shortDescription) {
                formsOutlineElements.yes = true
            } else {
                formsOutlineElements.yes = false
            }
            allDataForm.push(formsOutlineElements);
        });

        allDataForm.forEach((d, index) => {
            let inExecutors = [], outExecutors = [];

            // ichki bajaruvchilarni olish
            if (allexecutorsData[index]?.ichkiBajaruvchilar?.length > 0) {
                allexecutorsData[index]?.ichkiBajaruvchilar?.forEach((user, index2) => {
                    let obj = {
                        executorCode: user.executorStatusName ? user.executorStatusName : 1,
                        workPlaceID: user?.workPlaceId,
                        responsible: user?.isResponsible,
                        description: user?.description,
                        deadline: user.deadline,
                        id: data?.problems[index]?.inExecutors[index2]?.workPlaceID !== user?.workPlaceId ? null : data?.problems[index]?.inExecutors?.length > index2 ? data?.problems[index]?.inExecutors[index2]?.id : null,
                    }
                    inExecutors.push(obj);
                })
            }

            // console.log(inExecutors)

            // tashqi bajaruvchilarni olish
            if (allexecutorsData[index].tashqiBajaruvchilar.length > 0) {
                allexecutorsData[index].tashqiBajaruvchilar.forEach((user) => {
                    let obj = {
                        ids: user?.ids,
                        id: user?.id,
                        value: user?.value
                    }
                    outExecutors.push(obj);
                })
            }


            objFormData = {
                problemID: data.problems[index]?.id,
                inExecutors: inExecutors,
                outExecutors: outExecutors
                // openBajaruvchi.index !== null ? outExecutors : data?.problems[index].outExecutors
            }
            problems.push(objFormData);
        })

        allDataForm.forEach((d) => {
            if (!(d.yes)) accepted = false;
        })

        // ichki yoki tashqi bajaruvchilar bitta formada bo'lishi
        if (allexecutorsData.length > 0) {
            allexecutorsData.forEach((d) => {
                if (!(d.ichkiBajaruvchilar.length > 0 || d.tashqiBajaruvchilar.length > 0)) {
                    accepted1 = false;
                }
            })
        } else {
            accepted1 = false;
        }

        //umumiy malumotlarni yuborish

        try {
            const res = await axiosInstanceFq.post("/appeal/makeSketchy", {
                id: params?.id,
                resolutionContent: resolutionContent?.current?.value,
                problems: problems,
                workPlaceID: JSON.parse(localStorage.getItem("ids")),
                deadline: dateFormatSet(new Date(startDate1).toLocaleDateString()),
                orgID: JSON.parse(localStorage.getItem('oi'))
            });
            console.log(res?.data?.data)
            Alert(setAlert, 'success', `Muvaffaqqiyatli saqladingiz`)
            setTimeout(() => {
                history.push(`/fuqaro/murojati/xomaki`)
            }, [1000 * 1])
        } catch (error) {
            console.log(error);
        }
        console.log(
            {
                id: params?.id,
                resolutionContent: resolutionContent?.current?.value,
                problems: problems,
                workPlaceID: JSON.parse(localStorage.getItem("ids")),
                deadline: dateFormatSet(new Date(startDate1).toLocaleDateString()),
            }
        )
    }

    return (
        <div className="content mb-5 content-mobile">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase"}}>Ko'rish</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <NavbarFuqaroMurojat currentUser={currentUser} permission={permission1} ranks={ranks}/>
                    <li className="nav-item">
                        <NavLink exact to={`/fuqaro/murojati/xomaki/rezolutsyaga_tayyorlash/${params?.id}`}
                                 className="nav-link"
                                 activeClassName='NavLinkLi'>
                            <i className="icon-eye2 mr-1"/> Ko'rish
                        </NavLink>
                    </li>
                </ul>

                <div className="card">
                    <div className="row">
                        {data?.files?.length > 0 && (
                            <div className="col-lg-5">
                                <div className="card-body w-100 ccc">
                                    {(data?.files?.length > 0 && data.files?.find((a) => a?.contentType?.split('/')[a?.contentType?.split('/').length - 1] === "pdf")) && (
                                        <div className="borderPdf">
                                            {data?.files?.map((file, index) => (
                                                file?.contentType?.split('/')[file?.contentType?.split('/').length - 1] === "pdf" && (
                                                    <embed
                                                        src={urlFq + "/api/file/view/" + file?.id}
                                                        type="application/pdf"
                                                        width="100%"
                                                        height="1000px"
                                                        key={index}
                                                    />
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className={`col-lg-${data?.files?.length > 0 ? '7' : '12'}`}>
                            <div className="card-block mt-3 pb-3">
                                {/* asosiy */}
                                <div className="card-box">
                                    <div className="col-lg-12 ">
                                        <div className="card ">
                                            <div className="card-header bg-primary text-white header-elements-inline">
                                                <h6 className="card-title"
                                                    style={{fontWeight: "bold", textTransform: "upperCase"}}>Asosiy</h6>
                                            </div>
                                            <div className="card-body card-body-mobile">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="form-group form-group-floating row">
                                                            <div className="col-lg-12">
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
                                                                        className={'sanaAsosiy dateCustom'}
                                                                        id={'chiquvchiSana'}
                                                                        selected={startDate1}
                                                                        onChange={(date) => setStartDate1(date)}
                                                                        dateFormat={'dd.MM.yyyy'}
                                                                        isClearable
                                                                        placeholderText="Muddat/sana"
                                                                        showYearDropdown
                                                                        scrollableMonthYearDropdown
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="form-group form-group-floating row">
                                                            <div className="col-lg-12">
                                                                <div className="position-relative">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control daterange-single form-control-outline hujjatTuri"
                                                                        placeholder="Placeholder"
                                                                        value={data?.regNumber}
                                                                        disabled
                                                                    />
                                                                    <label className="label-floating">Jurnal
                                                                        nomer</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <table
                                                        className="table table-bordered table-striped table-hover Tab">
                                                        <tbody>
                                                        {data[0]?.files?.length > 0 && data[0]?.files?.map((hujjat, index) => (
                                                            hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pdf" ? (
                                                                <tr key={index}>
                                                                    <th className="d-flex align-items-center cursor-pointer">
                                                                        <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        {hujjat?.originalName}
                                                                    </th>
                                                                </tr>
                                                            ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "doc" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "docx") ? (
                                                                <tr key={index}>
                                                                    <th className="d-flex align-items-center cursor-pointer">
                                                                        <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        {hujjat?.originalName}
                                                                    </th>
                                                                </tr>
                                                            ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xls" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xlsx") ? (
                                                                <tr key={index}>
                                                                    <th className="d-flex align-items-center cursor-pointer">
                                                                        <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        {hujjat?.originalName}
                                                                    </th>
                                                                </tr>
                                                            ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "ppt" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pptx") ? (
                                                                <tr key={index}>
                                                                    <th className="d-flex align-items-center cursor-pointer">
                                                                        <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        {hujjat?.originalName}
                                                                    </th>
                                                                </tr>
                                                            ) : (
                                                                <tr key={index}>
                                                                    <th className="d-flex align-items-center cursor-pointer">
                                                                        <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        {hujjat?.originalName}
                                                                    </th>
                                                                </tr>
                                                            )
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fuqaro Murojati */}
                                <div className="card-box">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header bg-primary text-white header-elements-inline">
                                                <h6 className="card-title"
                                                    style={{fontWeight: "bold", textTransform: "upperCase"}}> Fuqaro
                                                    Ma'lumotlari</h6>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        {data?.citizenTypeCode === 2 ? (
                                                            <>
                                                                <div className="col-lg-4">
                                                                    <div
                                                                        className="form-group form-group-floating  row">
                                                                        <div className="col-lg-12">
                                                                            <div className="position-relative">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-outline InputCard"
                                                                                    placeholder="Placeholder"
                                                                                    value={data?.firstName}
                                                                                    disabled
                                                                                />
                                                                                <label
                                                                                    className="label-floating">Ism</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div
                                                                        className="form-group form-group-floating  row">
                                                                        <div className="col-lg-12">
                                                                            <div className="position-relative">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-outline InputCard"
                                                                                    placeholder="Placeholder"
                                                                                    value={data?.lastName}
                                                                                    disabled
                                                                                />
                                                                                <label
                                                                                    className="label-floating">Familiya</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <div
                                                                        className="form-group form-group-floating  row">
                                                                        <div className="col-lg-12">
                                                                            <div className="position-relative">
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-outline InputCard"
                                                                                    placeholder="Placeholder"
                                                                                    value={data?.middleName}
                                                                                    disabled
                                                                                />
                                                                                <label className="label-floating">Otasini
                                                                                    ismi</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="col-lg-6">
                                                                <div className="form-group form-group-floating  row">
                                                                    <div className="col-lg-12">
                                                                        <div className="position-relative">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-outline InputCard"
                                                                                placeholder="Placeholder"
                                                                                value={data?.lastName + '  ' + data?.firstName + '  ' + data?.middleName}
                                                                                disabled
                                                                            />
                                                                            <label className="label-floating">To'liq
                                                                                ismi</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div
                                                            className={`col-lg-${data?.citizenTypeCode !== 2 ? 6 : 4}`}>
                                                            <div className="form-group form-group-floating  row">
                                                                <div className="col-lg-12">
                                                                    <div className="position-relative">
                                                                        <input type="text"
                                                                               className="form-control form-control-outline InputCard"
                                                                               value="2-Sektor"
                                                                               placeholder="Placeholder" disabled/>
                                                                        <label className="label-floating">SEKTOR</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`col-lg-${data?.citizenTypeCode !== 2 ? 6 : 4}`}>
                                                            <div className="form-group form-group-floating  row">
                                                                <div className="col-lg-12">
                                                                    <div className="position-relative">
                                                                        <input
                                                                            type="text"
                                                                            disabled
                                                                            className="form-control form-control-outline InputCard"
                                                                            value={data?.address}
                                                                            placeholder="Placeholder"
                                                                        />
                                                                        <label
                                                                            className="label-floating">MANZIL </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={`col-lg-${data?.citizenTypeCode !== 2 ? 6 : 4}`}>
                                                            <div className="form-group form-group-floating  row">
                                                                <div className="col-lg-12">
                                                                    <div className="position-relative">
                                                                        <input
                                                                            type="text"
                                                                            disabled
                                                                            className="form-control form-control-outline InputCard"
                                                                            value={data?.phoneNumber}
                                                                            placeholder="Placeholder"
                                                                        />
                                                                        <label className="label-floating">Tel </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* kiruvchi */}
                                {data?.files?.length > 0 && (
                                    <XKKurish
                                        data={data}
                                    />
                                )}

                                {/* tezkor rezolutsiya va rezolutsiya mazmuni va  */}
                                <TezRezolutsiyaMazmuni
                                    objData={objData}
                                    data={data}
                                    currentUser={currentUser}
                                    setAlert={setAlert}
                                    resolutionContent={resolutionContent}
                                />

                                <FuqaroBajaruvchilarKorish currentUser={currentUser} objData={objData} tasnif1={tasnif1}
                                                           tasnif2={tasnif2} tasnif3={tasnif3}
                                                           Bajaruvchilar={Bajaruvchilar}
                                                           allexecutorsData={allexecutorsData}
                                                           openBajaruvchi={openBajaruvchi}
                                                           setOpenBajaruvchi={setOpenBajaruvchi}
                                                           BajaruvchilarSaqlash={BajaruvchilarSaqlash}
                                                           setTasnif2={setTasnif2} setTasnif1={setTasnif1}
                                                           setTasnif3={setTasnif3}
                                                           results={results} setResults={setResults}
                                                           xodimlar={xodimlar} setXodimlar={setXodimlar}
                                                           addNewBox={addNewBox} yangiQushish={yangiQushish}
                                                           setYangiQushish={setYangiQushish} setAddNewBox={setAddNewBox}
                                                           setYunalishlar={setYunalishlar}
                                                           yunalishlar={yunalishlar}
                                                           setAlert={setAlert} tasdiqlovchi={tasdiqlovchi} data={data}/>


                                <div className="card-box mt-2">
                                    <div className="col-lg-12 w-100 d-flex justify-content-between align-items-center">
                                        <div className="form-check d-flex align-items-center"
                                             onClick={() => setNazorat(!nazorat)}>
                                            {nazorat ? <input className="form-check-input" type="checkbox"
                                                              id="flexCheckDefault"
                                                              style={{width: "30px", height: "20px"}} checked/>
                                                : <input className="form-check-input" type="checkbox"
                                                         id="flexCheckDefault" style={{width: "30px", height: "20px"}}/>
                                            }
                                            <label className="form-check-label"
                                                   style={{fontSize: "20px"}}>
                                                Nazorat uchun
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary ml-1"
                                            onClick={saveAllData}
                                        >
                                            Saqlash
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* alert */}
                        <AlertContent alert={alert}/>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(XomakiKurish)