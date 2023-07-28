import React, { useCallback, useEffect, useRef, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import ChiquvchiContentNavbar from "../chiquvchiContentNavbar/chiquvchiContentNavbar";
import Select from "react-select";
import { CheckBoxSelection, Inject, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { axiosInstance, axiosInstanceOut, urlOut } from "../../../config";
import parse from 'html-react-parser';
import MultiSelect from "../../../component/inputSelect/multiSelect";
import { IsFileType } from "../../../component/IsFilType";
import AlertContent, { Alert } from "../../../component/alert/Alert";
import { useHistory } from "react-router-dom";
import { CKEditor } from 'ckeditor4-react';
import './chiquvchiContent.css';
import { ShortUser } from "../../../component/ShortUser";
import { excelOption } from './Options';

const ChiquvchiContent = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [getTemplateData, setGetTemplateData] = useState({ open: false, obj: {} });
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [ichkiTashkilotlar, setIchkiTashkilotlar] = useState([])
    const [tashqiTashkilotlar, setTashqiTashkilotlar] = useState([])
    const [ichkiTashkilotlarQiymat, setIchkiTashkilotlarQiymat] = useState([])
    const [tashqiTashkilotlarQiymat, setTashqiTashkilotlarQiymat] = useState([])
    const [devonxona, setdevonxona] = useState({})
    const [shortInfo, setShortInfo] = useState('')
    const commonElement = useRef();

    // CKEditor uchun
    const [shablon, setShablon] = useState([])

    //multi select uchun
    const [hamkorlar, setHamkorlar] = useState([]);
    const [rahbariyat, setRahbariyat] = useState([]);
    const [fishka, setFishka] = useState([]);

    //ilova uchun
    const [ilova, setIlova] = useState(false);
    const [isAlbom, setIsAlbom] = useState(false);
    const [openModal, setOpenModal] = useState({ open: false, obj: {} });

    const Hamkor = useRef();
    const ichkiRef = useRef()
    const tashqiRef = useRef()
    const devonxonaRef = useRef()
    const rahbariyatRef = useRef()
    const dataCKEditor1ref = useRef();
    const dataCKEditor2ref = useRef();
    const allDataRef = useRef();
    const fishkaRef = useRef();

    //close all options
    const closeOptions = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
        input_checkbox_items.forEach((d, i) => {
            d.style.display = "none";
        })
    }

    const getData1 = () => {
        if (dataCKEditor1ref?.current?.style.display === "none") dataCKEditor1ref.current.style.display = "block";
        else dataCKEditor1ref.current.style.display = "none";
    }

    const getData2 = () => {
        if (dataCKEditor2ref?.current?.style.display === "none") dataCKEditor2ref.current.style.display = "block";
        else dataCKEditor2ref.current.style.display = "none";
    }

    // barcha rahbariyatdagilarni o'qib olish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
                    console.log(res.data);
                    let arr = [];
                    res?.data?.forEach((d) => {
                        arr.push({ value: d?.workPlaceId, label: ShortUser(d.firstName.trim(), d.lastName.trim()) })
                    });
                    console.log(res.data);
                    if (isMounted)
                        setRahbariyat(arr);
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

    // shablonlar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.get("template/all/" + JSON.parse(localStorage.getItem('ids')));
                    console.log(res.data)
                    setShablon(res.data)
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

    //ichki tashkilotlar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("organization/in-orgs");
                    console.log(res.data, localStorage.getItem("oi"));
                    console.log(JSON.parse(localStorage.getItem("oi")));
                    let arr = [];
                    res?.data?.forEach((d) => {
                        if (d.id != Number(localStorage.getItem("oi"))) {
                            arr.push({ value: d.id, name: d.name })
                        }
                    })
                    setIchkiTashkilotlar(arr)
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


    //fishkalarni o'qib olish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.get("fishka/all/" + JSON.parse(localStorage.getItem('oi')));
                    console.log(res.data)
                    let arr = [];
                    res?.data?.forEach((d) => {
                        arr.push({ value: d.id, label: d.fishkaType })
                    })
                    setFishka(arr)
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

    //tashqi tashkilotlar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("organization/out-orgs");
                    console.log(res.data)
                    let arr = [];

                    arr = res.data.sort(function (a, b) {
                        return a.id - b.id;
                    });

                    arr.forEach((d) => {
                        arr.push({ value: d.id, name: d.name, email: d.email, exat: d.exat })
                    })
                    setTashqiTashkilotlar(arr)
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

    //qabulxonalar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get(`department/all-workplace/` + JSON.parse(localStorage.getItem('ids')));
                    console.log(res.data)
                    setdevonxona({ value: res?.data?.id, label: res?.data?.name })
                    devonxonaRef.current.props.value.value = res?.data?.id
                    devonxonaRef.current.props.value.label = res?.data?.name
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
                                if (JSON.parse(localStorage.getItem('ids')) !== d.workPlaceId) {
                                    arr.push({
                                        value: d?.workPlaceId,
                                        label: ShortUser(d.firstName.trim(), d.lastName.trim()),
                                        deparmentName: dat?.deparmentName
                                    });
                                }
                            })
                        }
                    })

                    if (isMounted)
                        setHamkorlar(arr)
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

    //devonxona
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get(`department/all/` + JSON.parse(localStorage.getItem('oi')));
                    console.log(res.data)

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


    const uploadFile2 = (e) => {
        setFiles([]);

        setTimeout(() => {
            setFile(e.target.files);
        }, 100);
    }


    const deleteFile2 = (index) => {
        let arr = files?.filter((f, i) => {
            return i !== index;
        });
        setFiles(arr);
    }

    // // file ni o'zgaruvchiga olish
    useEffect(() => {
        let isMounted = true;
        let arr = [];
        if (file) {
            Object.values(file)?.forEach((d) => {
                arr.push(d);
            })
            if (isMounted)
                setFiles(arr);
        }

        return () => {
            isMounted = false;
        }
    }, [file]);


    //select input style
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

    const getTemplate = (item) => {
        console.log(item)
        let templateCkeditor = document.querySelector('.templateCkeditor');
        templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = item.content;
        setGetTemplateData({ open: true, obj: item })
    }

    useEffect(() => {
        setData1(String(getTemplateData?.obj?.content));
    }, [getTemplateData.open])


    let fields1 = {
        text: 'label',
        value: 'value',
        groupBy: 'deparmentName'
    };


    const goToYangi = () => {
        window.location.reload()
    }

    const goToXomaki = () => {
        history.push('/chiquvchi/xomaki')
    }

    const setRahbar = useCallback(async (e) => {
        console.log(e)
        try {
            const res = await axiosInstanceOut.post("" + e.value)
            console.log(res.data)
        } catch (error) {
            console.log(error.response);
        }
    }, [currentUser])


    console.log(shortInfo)
    const saveAllData = useCallback(async () => {

        let templateCkeditor = document.querySelector('.templateCkeditor');
        let shortInfo1 = templateCkeditor.querySelector('.cke_wysiwyg_div').innerText;
        // clearForm()

        let formData = new FormData()
        formData.append('file', file)
        formData.append('orgId', JSON.parse(localStorage.getItem('oi')))

        let fileId = [];
        let ichkiIds = [], tashqiIds = [];
        ichkiTashkilotlarQiymat.forEach((d) => {
            ichkiIds.push({ correspondentID: d.value })
        })

        console.log(tashqiTashkilotlarQiymat);

        tashqiTashkilotlarQiymat.forEach((d) => {
            tashqiIds.push({ correspondentID: d?.id, correspondentEmail: d?.email, correspondentExat: d?.exat })
        })

        console.log(file);

        if (file) {
            // file upload
            for (let i = 0; i < Object?.values(file)?.length; i++) {
                const formData = new FormData();
                console.log(i);
                // let fileType = IsFileType(Object.values(file)[i]);

                // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
                // if (fileType) {
                formData?.append("file", Object?.values(file)[i]);
                try {
                    let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                    fileId.push(res?.data);
                    console.log(res?.data)
                } catch (error) {
                    console.log(error.response);
                }
                // }
            }
        }

        if (ichkiIds.length > 0 || tashqiIds.length > 0) {
            if (rahbariyatRef.current?.props.value) {
                // if (Hamkor?.current?.value) {
                if (fishkaRef.current?.props.value) {
                    console.log({
                        orgID: JSON.parse(localStorage.getItem('oi')),
                        workPlaceID: JSON.parse(localStorage.getItem('ids')),
                        signatoryWorkPlaceID: rahbariyatRef?.current?.props?.value?.value,
                        confirmativeWorkPlaceIDs: Hamkor?.current?.value ? Hamkor?.current?.value : [],
                        departmentID: devonxona?.value,
                        outReceivers: tashqiIds,
                        inReceivers: ichkiIds,
                        baseFileIDs: fileId,
                        content: data1,
                        shortInfo: shortInfo1.substring(0, 300) + '...',
                        fishkaID: fishkaRef.current?.props?.value?.value
                    });
                    try {
                        const res = await axiosInstanceOut.post("missive/", {
                            orgID: JSON.parse(localStorage.getItem('oi')),
                            workPlaceID: JSON.parse(localStorage.getItem('ids')),
                            signatoryWorkPlaceID: rahbariyatRef?.current?.props?.value?.value,
                            confirmativeWorkPlaceIDs: Hamkor?.current?.value ? Hamkor?.current?.value : [],
                            departmentID: devonxona?.value,
                            outReceivers: tashqiIds,
                            inReceivers: ichkiIds,
                            baseFileIDs: fileId,
                            content: data1,
                            shortInfo: shortInfo1.substring(0, 300) + '...',
                            fishkaID: fishkaRef.current?.props?.value?.value
                        })
                        console.log(res.data)
                        setOpenModal({ open: true, obj: {} })
                    } catch (error) {
                        console.log(error.response);
                        // Alert(setAlert, 'warning', `${error.response.data}`)
                    }
                } else {
                    Alert(setAlert, "warning", "Fishka tanlanmagan");
                }
                // } 
                // else {
                //     Alert(setAlert, "warning", "Hamkorlar tanlanmagan");
                // }
            } else {
                Alert(setAlert, "warning", "Imzolovchilar tanlanmagan");
            }
        } else {
            Alert(setAlert, "warning", "Tashqi yoki ichki tashkilotlar tanlanmagan");
        }
    }, [currentUser, ichkiTashkilotlarQiymat, tashqiTashkilotlarQiymat, file, data1, shortInfo])

    console.log(files);
    console.log(tashqiTashkilotlar);    

    return (
        <div className="content content-mobile tabContent" ref={commonElement}>
            <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Yangi Qo'shish</h3>
            <div className="card-body card-body-mobile p-0">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
                    <ChiquvchiContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
                </ul>
                <div className="tab-content pb-5">
                    <form ref={allDataRef}>
                        <div className="tab-pane fade show active p-3 bg-white card" styleid="colored-tab1">
                            <div className="border new">
                                <div className="card-body card-body-mobile p-0">
                                    <h1 className="px-2">Korrespondent</h1>
                                    <div className="row">
                                        <div className="col-lg-12 px-0">
                                            <div className="row">
                                                <div className="col-lg-6 mb-3 d-flex  justify-content-between ">
                                                    <div className="" style={{ width: '100%' }}>
                                                        <MultiSelect
                                                            selectData={ichkiTashkilotlar}
                                                            placeholder='Ichki tashkilotlar'
                                                            inputRef={ichkiRef}
                                                            isDisabled={false}
                                                            setIchkiTashkilotlarQiymat={setIchkiTashkilotlarQiymat}
                                                            setTashqiTashkilotlarQiymat={setTashqiTashkilotlarQiymat}
                                                            tashqiTashkilotlar={tashqiTashkilotlar}
                                                            setTashqiTashkilotlar={setTashqiTashkilotlar}
                                                            index={0}
                                                            orgClass={"internalOrg"}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="w-100">
                                                        <Select
                                                            options={rahbariyat}
                                                            placeholder="Imzolovchilar"
                                                            onChange={(e) => setRahbar(e)}
                                                            ref={rahbariyatRef}
                                                            onMenuOpen={closeOptions}
                                                            className="Tasdiqlovchilar"
                                                            styles={colourStyles}
                                                            isClearable={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <MultiSelect
                                                        selectData={tashqiTashkilotlar}
                                                        placeholder='Tashqi tashkilotlar'
                                                        inputRef={tashqiRef}
                                                        index={1}
                                                        isDisabled={false}
                                                        setIchkiTashkilotlarQiymat={setIchkiTashkilotlarQiymat}
                                                        setTashqiTashkilotlarQiymat={setTashqiTashkilotlarQiymat}
                                                        tashqiTashkilotlar={tashqiTashkilotlar}
                                                        setTashqiTashkilotlar={setTashqiTashkilotlar}
                                                        orgClass={"externalOrg"}
                                                    />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <Select
                                                        defaultValue={{
                                                            value: devonxona?.value,
                                                            label: devonxona?.label
                                                        }}
                                                        isDisabled={true}
                                                        isClearable={true}
                                                        ref={devonxonaRef}
                                                        className="Rahbariyat"
                                                        styles={colourStyles}
                                                        onMenuOpen={closeOptions}
                                                    />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <Select
                                                        options={fishka}
                                                        placeholder="Fishka"
                                                        // onChange={(e) => setFishkas(e)}
                                                        ref={fishkaRef}
                                                        onMenuOpen={closeOptions}
                                                        className="Fishka"
                                                        styles={colourStyles}
                                                        isClearable={true}
                                                    />
                                                </div>
                                                <div className="col-lg-6 ">
                                                    <MultiSelectComponent
                                                        id="mtselement"
                                                        className="korrespondent1"
                                                        popupHeight='500px'
                                                        fields={fields1}
                                                        dataSource={hamkorlar}
                                                        placeholder="Kelishilgan xodimlar"
                                                        mode="CheckBox"
                                                        ref={Hamkor}
                                                        enableGroupCheckBox="true"
                                                        allowFiltering="true"
                                                        unSelectAllText="unSelect All"
                                                        selectAllText="Select All"
                                                        showSelectAll="true"
                                                        filterBarPlaceholder="Qidirish">
                                                        <Inject services={[CheckBoxSelection]} />
                                                    </MultiSelectComponent>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="custom-file">
                                                        <input type="file"
                                                            onChange={(e) => uploadFile2(e)}
                                                            multiple="multiple" className="custom-file-input"
                                                            id="customFile"
                                                            onClick={closeOptions}
                                                        />
                                                        <label className="custom-file-label" htmlFor="customFile">Fayl
                                                            yuklash</label>
                                                    </div>

                                                    <span>Ruxsat etilgan formatlar: doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</span>
                                                </div>
                                                <div className="col-lg-12 mt-3">
                                                    <ul>
                                                        {files?.length > 0 && files?.map((hujjat, i) => (
                                                            hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
                                                                <li key={i} className='kiruvchiMain'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                                            style={{ fontSize: "28px" }} />
                                                                        <span className='pt-1'>PDF FILE</span>
                                                                    </div>
                                                                    <span onClick={() => deleteFile2(i)}> <i
                                                                        className="icon-trash"></i></span>
                                                                </li>
                                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                                <li key={i} className='kiruvchiMain'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                                            style={{ fontSize: "28px" }} />
                                                                        <span className='pt-1'>WORD FILE</span>
                                                                    </div>
                                                                    <span onClick={() => deleteFile2(i)}> <i
                                                                        className="icon-trash"></i></span>
                                                                </li>
                                                            ) : (excelOption.includes(hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1]))  ? (
                                                                <li key={i} className='kiruvchiMain'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                                            style={{ fontSize: "28px" }} />
                                                                        <span className='pt-1'>EXCEL FILE</span>
                                                                    </div>
                                                                    <span onClick={() => deleteFile2(i)}> <i
                                                                        className="icon-trash"></i></span>
                                                                </li>
                                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.ms-powerpoint") ? (
                                                                <li key={i} className='kiruvchiMain'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                                            style={{ fontSize: "28px" }} />
                                                                        <span
                                                                            className='pt-1'>POWERPOINT FILE</span>
                                                                    </div>
                                                                    <span onClick={() => deleteFile2(i)}> <i
                                                                        className="icon-trash"></i></span>
                                                                </li>
                                                            ) : (
                                                                <li key={i} className='kiruvchiMain'>
                                                                    <div className='d-flex align-items-center'>
                                                                        <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                                            style={{ fontSize: "28px" }} />
                                                                        <span
                                                                            className='pt-1'>ZIP, RAR FILE</span>
                                                                    </div>
                                                                    <span onClick={() => deleteFile2(i)}> <i
                                                                        className="icon-trash"></i></span>
                                                                </li>
                                                            )
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="col-lg-12 d-flex mt-3 d-flex justify-content-end">
                                                    <button type={'button'} className="btn btn-primary mb-3 "
                                                        onClick={() => saveAllData()}>
                                                        Saqlash
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row unit1">
                                    <div className="col-lg-12 p-4 " style={{ textAlign: 'center' }}>
                                        <div className={'templateCkeditor'} style={{ width: '1000px', margin: '0 auto' }}>
                                            <CKEditor
                                                initData={data1}
                                                style={{ maxWidth: '1000px' }}
                                                config={{
                                                    extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                }}
                                                onChange={(event) => {
                                                    setShortInfo(event?.editor.getSelection().root.$.innerText);
                                                    setData1(String(event?.editor?.getData()))
                                                }}
                                                type="classic"
                                                popupHeight='500px'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body card-body-mobile" style={{ padding: "10px" }}>
                                    <div className="row">
                                        <div className="col-12 border px-0 shadowBox1">
                                            <div className={'d-flex justify-content-between pb-2'}>
                                                <button type={'button'} className={'btn'}
                                                    onClick={() => setIlova(!ilova)}
                                                    style={{ fontSize: '20px' }}
                                                >
                                                    Ilova
                                                </button>
                                                <button type={'button'} onClick={() => setIsAlbom(!isAlbom)}
                                                    className={`btn btn-primary bg-${isAlbom ? 'danger' : 'primary'}`}
                                                    style={{
                                                        width: '150px',
                                                        display: ilova ? 'block' : 'none',
                                                        marginTop: "10px"
                                                    }}> {isAlbom ? 'Albom' : 'Kitob'}</button>
                                                <div style={{ width: '100px' }}></div>
                                            </div>
                                            <div
                                                className={`col-lg-12 d-flex flex-lg-column align-items-center justify-content-center ${!isAlbom ? 'isBook' : 'isAlbom'}`}
                                                style={{ display: !isAlbom ? 'none' : 'block' }}>
                                                <CKEditor
                                                    initData="<p>Kitob.</p>"
                                                    style={{
                                                        maxWidth: !isAlbom ? '1000px' : '1600px',
                                                        margin: '0 auto',
                                                        maxHeght: !isAlbom ? '1101px' : '501px',
                                                        display: ilova ? 'block' : 'none'
                                                    }}
                                                    config={{
                                                        extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                    }}
                                                    onChange={(event, editor) => {
                                                        setData2(String(event.editor.getData()))
                                                    }}
                                                    type="classic"
                                                    popupHeight='1000px'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                shablon.length > 0 &&
                                <div className={'mt-3'}>
                                    <div className="card-header bg-primary text-white header-elements-inline">
                                        <h6 className="card-title"
                                            style={{ fontWeight: "bold", textTransform: "upperCase" }}>Shablonlar</h6>
                                    </div>
                                    <div className="card-body border row" style={{ cursor: 'pointer' }}>
                                        <div className="col-lg-12">
                                            <table id="myTable"
                                                className="table table-bordered table-striped table-hover Tab">
                                                <thead className={'theadSticky'}>
                                                    <tr className="bg-dark text-white NavLink text-center">
                                                        <th id='tabRow' style={{ width: '10%' }}
                                                            className="id file_kor_short_not">№
                                                        </th>
                                                        <th id='tabRow' style={{ width: '35 %' }}
                                                            className="qabul file_kor_short">Rasmi
                                                        </th>
                                                        <th id='tabRow' style={{ width: '35 %' }}
                                                            className="ariza file_kor_short_not">Nomlanishi
                                                        </th>
                                                        <th id='tabRow' style={{ width: '20%' }}
                                                            className="text-center harakat file_kor_short_not">Sana
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {shablon?.map((data, index) => (
                                                        <tr id="kor" key={index} onClick={() => getTemplate(data)}
                                                        >
                                                            <td className="text-center id file_kor_short_not">{index + 1}</td>
                                                            <td className="text-color qabul mobile-table-none file_kor_short"
                                                                id='qabul'
                                                                style={{
                                                                    cursor: "pointer",
                                                                    wordWrap: "break-word",
                                                                    width: '20%',
                                                                    textAlign: 'center'
                                                                }}>
                                                                <img src={urlOut + 'file/' + `${data?.image?.id}`}
                                                                    width={200}
                                                                    alt="" />
                                                            </td>
                                                            <td className=" ariza" style={{ textAlign: 'center' }}><span
                                                                className={'text-color file_kor_short_not'}>{data?.name}</span>
                                                            </td>


                                                            <td className="harakat" style={{ textAlign: 'center' }}>
                                                                {data?.createdAt?.toLocaleString().substring(0, 10).split('-').reverse().join('.')}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            {openModal.open && (
                                                <div className={'adminWindow'}>
                                                    <div className="modal-dialog modal-sm pt-5 ">
                                                        <div className="modal-content">
                                                            <div className="modal-header bg-primary text-white">
                                                                <h5 className="modal-title"></h5>
                                                                <button className="close"
                                                                    onClick={() => setOpenModal({
                                                                        open: false,
                                                                        obj: {}
                                                                    })}
                                                                    data-dismiss="modal">&times;</button>
                                                            </div>

                                                            <div className="modal-body shadowKiruvchi text-center"
                                                                style={{
                                                                    padding: "10px",
                                                                    border: "1px solid lightgray",
                                                                    margin: "10px",
                                                                    backgroundColor: "lightgray"
                                                                }}>
                                                                <h3 className="font-weight-semibold py-1 px-1 "
                                                                    style={{
                                                                        borderRadius: '5px',
                                                                        fontSize: "20px",
                                                                        color: "#000"
                                                                    }}>Shablonni o'chirishni tasdiqlaysizmi?</h3>
                                                            </div>

                                                            <div className="modal-footer d-flex justify-content-center">
                                                                <button type={'button'}
                                                                    onClick={() => setOpenModal({
                                                                        open: false,
                                                                        obj: {}
                                                                    })}
                                                                    className="btn btn-danger"
                                                                    style={{ width: "150px" }}>Bekor qilish
                                                                </button>
                                                                <button type={'button'}
                                                                    // onClick={() => deleteShablon(openModal.obj)}
                                                                    className="btn btn-success"
                                                                    style={{ width: "150px" }}>Tasdiqlash
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            }

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
                                                style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Yangi
                                                chiquvchi
                                                hujjat
                                                kiritildi</h3>
                                        </div>

                                        <div className="modal-footer d-flex justify-content-center">
                                            <button type={'button'} onClick={() => goToYangi()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Yangi
                                            </button>
                                            <button type={'button'} onClick={() => goToXomaki()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Xomaki
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>

                    {/*alert content*/}
                    <AlertContent alert={alert} />

                    {/*{file?.length > 0 && Object.values(file)?.map((f, i) => (*/}
                    {/*    f.type?.split('/')[f.type?.split('/').length - 1] === "pdf" && (*/}
                    {/*        <embed*/}
                    {/*            src={URL.createObjectURL(f)}*/}
                    {/*            type={f?.type}*/}
                    {/*            width="100%"*/}
                    {/*            height="1500px"*/}
                    {/*            key={i}*/}
                    {/*        />*/}
                    {/*    )*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
    )
}

export default React.memo(ChiquvchiContent)