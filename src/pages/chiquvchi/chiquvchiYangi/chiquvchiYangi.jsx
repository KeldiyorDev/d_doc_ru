import React, { useCallback, useEffect, useRef, useState } from 'react';
import { axiosInstance, axiosInstanceOut, urlOut } from "../../../config";
import { IsFileType } from "../../../component/IsFilType";
import AlertContent, { Alert } from "../../../component/alert/Alert";
import ChiquvchiContentNavbar from "../chiquvchiContentNavbar/chiquvchiContentNavbar";
import MultiSelect from "../../../component/inputSelect/multiSelect";
import Select from "react-select";
import { CheckBoxSelection, Inject, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { CKEditor } from "ckeditor4-react";
import parse from "html-react-parser";
import { NavLink, useHistory, useParams } from "react-router-dom";
import './chiquvchiYangi.css'

const ChiquvchiYangi = ({ currentUser, permission, ranks }) => {
    const params = useParams()
    const history = useHistory()
    const [file1, setFile1] = useState(null);
    const [files, setFiles] = useState([]);
    const [chooseFiles, setChooseFiles] = useState([]);
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [ichkiTashkilotlar, setIchkiTashkilotlar] = useState([])
    const [tashqiTashkilotlar, setTashqiTashkilotlar] = useState([])
    const [allData, setAllData] = useState([])
    const [ichkiTashkilotlarQiymat, setIchkiTashkilotlarQiymat] = useState([])
    const [tashqiTashkilotlarQiymat, setTashqiTashkilotlarQiymat] = useState([])
    const [devonxona, setdevonxona] = useState({})
    const [shortInfo, setShortInfo] = useState('')
    const [fishka, setFishka] = useState([]);
    const commonElement = useRef();
    const fishkaRef = useRef();

    // CKEditor uchun
    const [shablon, setShablon] = useState([])

    //multi select uchun
    const [hamkorlar, setHamkorlar] = useState([]);
    const [rahbariyat, setRahbariyat] = useState([]);

    //ilova uchun
    const [ilova, setIlova] = useState(false);
    const [isAlbom, setIsAlbom] = useState(false);
    const [openModal, setOpenModal] = useState({ open: false, obj: {} });

    const Hamkor = useRef();
    const ichkiRef = useRef()
    const tashqiRef = useRef()
    const devonxonaRef = useRef()
    // const pochtaRef = useRef()
    // const eXatRef = useRef()
    const rahbariyatRef = useRef()
    const dataCKEditor1ref = useRef();
    const dataCKEditor2ref = useRef();
    const allDataRef = useRef();

    //close all options
    const closeOptions = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
        input_checkbox_items.forEach((d, i) => {
            d.style.display = "none";
        })
    }

    const getData1 = () => {
        // console.log(datas);
        // setData(parse(datas));
        if (dataCKEditor1ref?.current?.style.display === "none") dataCKEditor1ref.current.style.display = "block";
        else dataCKEditor1ref.current.style.display = "none";
    }

    const getData2 = () => {
        // console.log(datas);
        // setData(parse(datas));
        if (dataCKEditor2ref?.current?.style.display === "none") dataCKEditor2ref.current.style.display = "block";
        else dataCKEditor2ref.current.style.display = "none";
    }

    const getTemplate = (item) => {
        console.log(item)
        let templateCkeditor = document.querySelector('.templateCkeditor');
        templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = item.content;
        // setGetTemplateData({open: true, obj: item})
    }

    // barcha rahbariyatdagilarni o'qib olish
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
                    let arr = [];
                    res.data.forEach((d) => {
                        let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
                        arr.push({ value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}` })
                    });

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

    //ichki tashkilotlar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("organization/in-orgs");
                    console.log(res.data)
                    let arr = [];
                    res.data.forEach((d) => {
                        arr.push({ value: d.id, name: d.name })
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

    //tashqi tashkilotlar
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstance.get("organization/out-orgs");
                    console.log(res.data)
                    let arr = [];
                    res.data.forEach((d) => {
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
                    setdevonxona({ value: res?.data?.id, label: res?.data?.name })
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
                                let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
                                arr.push({
                                    value: d?.workPlaceId,
                                    label: `${firstname}${d?.lastName}`,
                                    deparmentName: dat?.deparmentName
                                });
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

    const uploadFile1 = (e) => {
        setFiles([]);

        setTimeout(() => {
            setFile1(e.target.files);
        }, 100);
    }

    const deleteFile1 = (index) => {
        let arr = chooseFiles?.filter((f, i) => {
            return i !== index;
        });
        setChooseFiles(arr);
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
        if (file1) {
            Object.values(file1)?.forEach((d) => {
                arr.push(d);
            })
            if (isMounted)
                setFiles(arr);
        }

        return () => {
            isMounted = false;
        }
    }, [file1]);
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

    const Onclick = useCallback(() => {
        console.log(1)
        setData1("<p>Salom</p>");
    }, [currentUser])


    let fields1 = {
        text: 'label',
        value: 'value',
        groupBy: 'deparmentName'
    };

    // ichkini tanlaganda
    const changeHandler = useCallback(async (e) => {
        console.log(e);
        // try {
        //     const res = await axiosInstance.post("cardType/child")
        //     let arr1 = [];
        //     res.data.forEach((d) => {
        //         arr1.push({value: d.id, label: d.cardName})
        //     });
        //
        // } catch (error) {
        //     console.log(error.response);
        // }
    }, [currentUser])


    const goToYangi = () => {

    }

    const setRahbar = useCallback(async (e) => {
        console.log(e)
        // try {
        //     const res = await axiosInstanceOut.post("" + e.value)
        //     console.log(res.data)
        // } catch (error) {
        //     console.log(error.response);
        // }
    }, [currentUser])

    const clearForm = () => {
        rahbariyatRef.current?.props?.value && rahbariyatRef.current.removeValue(rahbariyatRef.current.props.value)
        if (Hamkor.current?.props?.value?.length > 0) {
            Hamkor.current?.props?.value?.forEach(d => {
                Hamkor?.current?.removeValue(d);
            })
        }
        // console.log(ichkiRef.current.)
        if (ichkiRef.current?.value?.length > 0) {
            ichkiRef.current.value = [];
            // ichkiRef.current?.value?.forEach(d => {
            //     ichkiRef?.current?.target?.removeValue(d);
            // })
        }

        setOpenModal({ open: true, obj: {} })
    }


    //
    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.get("missive/raw/" + params?.id);
                    console.log(res?.data)
                    console.log(rahbariyat)
                    setAllData([res.data])
                    let arr = [];
                    res?.data?.baseFiles?.forEach((f) => {
                        arr.push(f);
                    })
                    setChooseFiles(arr);
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser, rahbariyat]);

    const saveAllData = useCallback(async () => {
        // clearForm()

        let templateCkeditor = document.querySelector('.templateCkeditor');
        let shortInfo1 = templateCkeditor.querySelector('.cke_wysiwyg_div').innerText;
        let formData = new FormData()
        formData.append('file', file1)
        formData.append('orgId', JSON.parse(localStorage.getItem('oi')))

        let fileId = [];
        let ichkiIds = [], tashqiIds = [];
        ichkiTashkilotlarQiymat.forEach((d) => {
            ichkiIds.push({ correspondentID: d.value })
        })

        tashqiTashkilotlarQiymat.forEach((d) => {
            tashqiIds.push({ correspondentID: d?.value, correspondentEmail: d?.email, correspondentExat: d?.exat })
        })
        console.log(ichkiIds)
        console.log(tashqiIds)
        console.log(files)
        console.log(chooseFiles)
        if (ichkiIds.length > 0 ? ichkiIds : allData[0]?.inReceivers || tashqiIds.length > 0 ? tashqiIds : allData[0]?.outReceivers) {
            // file upload
            if (Object.values(files)?.length > 0) {
                for (let i = 0; i < Object?.values(files)?.length; i++) {
                    const formData = new FormData();
                    let fileType = IsFileType(Object.values(files)[i]);

                    // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
                    if (fileType) {
                        formData?.append("file", Object?.values(files)[i]);
                        try {
                            let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                            fileId.push(res?.data);
                            console.log(res?.data)
                        } catch (error) {
                            console.log(error.response);
                        }
                    }
                }
                // oldingi tanlangan file id larini olish
                chooseFiles?.forEach((d) => {
                    fileId.push(d.id);
                })

            } else {
                allData[0]?.baseFiles.forEach((file) => {
                    fileId.push(file.id);
                });
            }
            if (rahbariyatRef?.current?.props?.value ? allData[0]?.signatoryWorkPlace : rahbariyatRef?.current?.props?.value?.value) {
                if (Hamkor?.current?.value) {
                    try {
                        const res = await axiosInstanceOut.post("missive/version", {
                            rootID: allData[0]?.rootID,
                            orgID: JSON.parse(localStorage.getItem('oi')),
                            workPlaceID: JSON.parse(localStorage.getItem('ids')),
                            signatoryWorkPlaceID: rahbariyatRef?.current?.props?.value ? allData[0]?.signatoryWorkPlace : rahbariyatRef?.current?.props?.value?.value,
                            confirmativeWorkPlaceIDs: Hamkor?.current?.value,
                            departmentID: devonxona?.value,
                            outReceivers: tashqiIds.length > 0 ? tashqiIds : allData[0]?.outReceivers,
                            inReceivers: ichkiIds.length > 0 ? ichkiIds : allData[0]?.inReceivers,
                            baseFileIDs: fileId,
                            content: data1.length > 0 ? data1 : allData[0]?.missiveContent,
                            shortInfo: shortInfo1.substring(0, 300) + '...',
                            fishkaID: fishkaRef.current ? fishkaRef.current?.props.value.value : allData[0].ishkaGetDTO.id
                        })
                        console.log(res.data)
                        history.push('/chiquvchi/xomaki')
                    } catch (error) {
                        console.log(error.response);
                    }
                } else {
                    Alert(setAlert, "warning", "Партнеры не выбраны");
                }
            } else {
                Alert(setAlert, "warning", "Подписанты не выбраны");
            }
        } else {
            Alert(setAlert, "warning", "Не выбраны ни внешние, ни внутренние организации");
        }
        console.log({
            rootID: allData[0]?.rootID,
            orgID: JSON.parse(localStorage.getItem('oi')),
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            signatoryWorkPlaceID: rahbariyatRef?.current?.props?.value ? allData[0]?.signatoryWorkPlace : rahbariyatRef?.current?.props?.value?.value,
            confirmativeWorkPlaceIDs: Hamkor?.current?.value,
            departmentID: devonxona?.value,
            outReceivers: tashqiIds.length > 0 ? tashqiIds : allData[0]?.outReceivers,
            inReceivers: ichkiIds.length > 0 ? ichkiIds : allData[0]?.inReceivers,
            baseFileIDs: fileId,
            content: data1.length > 0 ? data1 : allData[0]?.missiveContent,
            shortInfo: shortInfo1.substring(0, 300) + '...',
            fishkaID: fishkaRef.current ? fishkaRef.current?.props.value.value : allData[0].ishkaGetDTO.id
        })
    }, [currentUser, ichkiTashkilotlarQiymat, tashqiTashkilotlarQiymat, files, allData, data1])

    return (
        <div className="content content-mobile " ref={commonElement}>
            <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Yangi versiya</h3>
            <div className="card-body card-body-mobile p-0">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
                    <ChiquvchiContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
                    <li className="nav-item">
                        <NavLink to={`/chiquvchi/yangi/versiya/${params.id}`} className="nav-link"
                            activeClassName='NavLinkLi'>
                            <i className="fa-solid fa-gavel mr-1"></i> Новая версия
                        </NavLink>
                    </li>
                </ul>
                <div className="tab-content pb-5">
                    <form ref={allDataRef}>
                        <div className="tab-pane fade show active p-3 bg-white card" styleid="colored-tab1">
                            <div className="border">
                                <div className="card-body card-body-mobile p-0">
                                    <h1 className="px-2">Кореспондент</h1>
                                    <div className="row">
                                        <div className="col-lg-12 px-0">
                                            <div className="row">
                                                <div className="col-lg-6 mb-3 d-flex  justify-content-between ">
                                                    <div className="" style={{ width: '100%' }}>
                                                        <MultiSelect selectData={ichkiTashkilotlar}
                                                            placeholder='Внутренние организации'
                                                            inputRef={ichkiRef}
                                                            defaultData={allData[0]?.inReceivers}
                                                            setIchkiTashkilotlarQiymat={setIchkiTashkilotlarQiymat}
                                                            setTashqiTashkilotlarQiymat={setTashqiTashkilotlarQiymat}
                                                            index={0}
                                                            isDisabled={false}
                                                            orgClass={"internalOrg"}
                                                        />
                                                    </div>

                                                </div>

                                                {
                                                    rahbariyat.length > 0 ? <div className="col-lg-6 mb-3">
                                                        <Select
                                                            defaultValue={[rahbariyat?.find((d) => d?.value === allData[0]?.signatoryWorkPlace)]}
                                                            options={rahbariyat}
                                                            placeholder="Подписанты"
                                                            // onChange={(e) => setRahbar(e)}
                                                            ref={rahbariyatRef}
                                                            onMenuOpen={closeOptions}
                                                            // isDisabled={true}
                                                            className="Tasdiqlovchilar"
                                                            styles={colourStyles}
                                                        // isClearable={true}
                                                        />
                                                    </div> : ''
                                                }


                                                <div className="col-lg-6 mb-3">
                                                    <MultiSelect selectData={tashqiTashkilotlar}
                                                        placeholder='Внешние организации'
                                                        inputRef={tashqiRef}
                                                        index={1}
                                                        defaultData={allData[0]?.outReceivers}
                                                        setIchkiTashkilotlarQiymat={setIchkiTashkilotlarQiymat}
                                                        setTashqiTashkilotlarQiymat={setTashqiTashkilotlarQiymat}
                                                        orgClass={"externalOrg"}
                                                        isDisabled={false}
                                                    />
                                                </div>
                                                {
                                                    devonxona && <div className="col-lg-6 mb-3">
                                                        <Select
                                                            // options={tasnif3}
                                                            value={devonxona}
                                                            // placeholder="Devonxona"
                                                            isDisabled={true}
                                                            isClearable={true}
                                                            styles={colourStyles}
                                                            onMenuOpen={closeOptions}
                                                        />
                                                    </div>
                                                }

                                                <div className="col-lg-6 d-flex">
                                                    <div className="custom-file">
                                                        <input type="file"
                                                            multiple="multiple" className="custom-file-input"
                                                            id="customFile"
                                                            // disabled={true}
                                                            onChange={(e) => uploadFile1(e)}
                                                            onClick={closeOptions}
                                                        />
                                                        <label className="custom-file-label" htmlFor="customFile">Файл загружен</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <MultiSelectComponent
                                                        id="mtselement"
                                                        value={allData[0]?.confirmativeWorkPlaces}
                                                        className="korrespondent1"
                                                        popupHeight='500px'
                                                        fields={fields1}
                                                        dataSource={hamkorlar}
                                                        placeholder="Партнеры"
                                                        mode="CheckBox"
                                                        // isDisabled={true}
                                                        ref={Hamkor}
                                                        enableGroupCheckBox="true"
                                                        allowFiltering="true"
                                                        unSelectAllText="unSelect All"
                                                        selectAllText="Select All"
                                                        showSelectAll="true"
                                                        filterBarPlaceholder="Поиск">
                                                        <Inject services={[CheckBoxSelection]} />
                                                    </MultiSelectComponent>
                                                </div>
                                                {
                                                    allData.length > 0 && <div className="col-lg-12">
                                                        <Select
                                                            options={fishka}
                                                            placeholder="Fishka"
                                                            defaultValue={{
                                                                value: allData[0]?.fishkaGetDTO?.id,
                                                                label: allData[0]?.fishkaGetDTO?.fishkaType
                                                            }}
                                                            // onChange={(e) => setFishkas(e)}
                                                            ref={fishkaRef}
                                                            onMenuOpen={closeOptions}
                                                            className="Fishka"
                                                            styles={colourStyles}
                                                            isClearable={true}
                                                        />
                                                    </div>
                                                }
                                                <div className="col-lg-12 mt-3">
                                                    {/* all files select */}
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <ul className="mb-0">
                                                                {chooseFiles?.length > 0 && chooseFiles?.map((hujjat, i) => (
                                                                    hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pdf" ? (
                                                                        <li key={i} className='kiruvchiMain'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                                                    style={{ fontSize: "28px" }} />
                                                                                <span className='pt-1'>PDF FILE</span>
                                                                            </div>
                                                                            {/*<span onClick={() => deleteFile1(i)}> <i*/}
                                                                            {/*    className="icon-trash"></i></span>*/}
                                                                        </li>
                                                                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "doc" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "docx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                                        <li key={i} className='kiruvchiMain'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                                                    style={{ fontSize: "28px" }} />
                                                                                <span className='pt-1'>WORD FILE</span>
                                                                            </div>
                                                                            {/*<span onClick={() => deleteFile1(i)}> <i*/}
                                                                            {/*    className="icon-trash"></i></span>*/}
                                                                        </li>
                                                                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xls" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xlsx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                                        <li key={i} className='kiruvchiMain'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                                                    style={{ fontSize: "28px" }} />
                                                                                <span className='pt-1'>EXCEL FILE</span>
                                                                            </div>
                                                                            {/*<span onClick={() => deleteFile1(i)}> <i*/}
                                                                            {/*    className="icon-trash"></i></span>*/}
                                                                        </li>
                                                                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "ppt" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pptx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                                        <li key={i} className='kiruvchiMain'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                                                    style={{ fontSize: "28px" }} />
                                                                                <span
                                                                                    className='pt-1'>POWERPOINT FILE</span>
                                                                            </div>
                                                                            {/*<span onClick={() => deleteFile1(i)}> <i*/}
                                                                            {/*    className="icon-trash"></i></span>*/}
                                                                        </li>
                                                                    ) : (
                                                                        <li key={i} className='kiruvchiMain'>
                                                                            <div className='d-flex align-items-center'>
                                                                                <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                                                    style={{ fontSize: "28px" }} />
                                                                                <span
                                                                                    className='pt-1'>ZIP, RAR FILE</span>
                                                                            </div>
                                                                            {/*<span onClick={() => deleteFile1(i)}> <i*/}
                                                                            {/*    className="icon-trash"></i></span>*/}
                                                                        </li>
                                                                    )
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 d-flex mt-3 d-flex justify-content-end">
                                                    <button type={'button'} className="btn btn-primary mb-3 "
                                                        onClick={() => saveAllData()}>
                                                        Сохранять
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {
                                    allData.length > 0 && <div className="row unit2">
                                        <div className="col-lg-12 p-4 templateCkeditor" style={{ textAlign: 'center ' }}>
                                            <CKEditor
                                                initData={allData[0]?.missiveContent}
                                                style={{ maxWidth: '1000px', margin: '0 auto' }}
                                                config={{
                                                    extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                }}
                                                onChange={(event, editor) => {
                                                    // console.log(event);
                                                    console.log(event?.editor?.getData());
                                                    setShortInfo(event?.editor.getSelection().root.$.innerText);
                                                    // console.log(event.editor)
                                                    setData1(String(event?.editor?.getData()))
                                                }}
                                                type="classic"
                                                popupHeight='500px'
                                                onBeforeLoad={CKEDITOR => {
                                                    // Handles `beforeLoad` event which is fired before an editor instance is created.
                                                    // CKEDITOR.disableAutoInline = true
                                                }}
                                                onInstanceReady={({ editor }) => {
                                                    // console.log(editor)
                                                    editor.getData(data1)
                                                    // Handles native `instanceReady` event.
                                                    // console.log(editor);
                                                }}
                                            />
                                            <button type="button" className={'btn btn-primary mt-3'} onClick={getData1}>Get
                                                Data
                                            </button>
                                            <div ref={dataCKEditor1ref} style={{ display: "none" }}>
                                                {parse(data1)}
                                            </div>
                                        </div>
                                    </div>
                                }

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
                                                className="col-lg-12 d-flex flex-lg-column align-items-center justify-content-center unit2">
                                                <CKEditor
                                                    initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>"
                                                    style={{
                                                        maxWidth: '1000px',
                                                        margin: '0 auto',
                                                        display: ilova ? 'block' : 'none'
                                                    }}
                                                    config={{
                                                        extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                    }}
                                                    onChange={(event, editor) => {
                                                        // console.log(event);
                                                        // console.log(event.editor.getData());
                                                        setData2(String(event.editor.getData()))
                                                    }}
                                                    type="classic"
                                                    popupHeight='1000px'
                                                    onBeforeLoad={CKEDITOR => {
                                                        // Handles `beforeLoad` event which is fired before an editor instance is created.
                                                        // CKEDITOR.disableAutoInline = true
                                                    }}
                                                    onInstanceReady={({ editor }) => {
                                                        // Handles native `instanceReady` event.
                                                        // console.log(editor);
                                                    }}
                                                />
                                                <button style={{ display: ilova ? 'block' : 'none', margin: "10px 0" }}
                                                    className={'btn btn-primary'} type="button"
                                                    onClick={getData2}>Получить данные
                                                </button>
                                                <div ref={dataCKEditor2ref} style={{ display: "none" }}>
                                                    {data2 && parse(data2)}
                                                </div>
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
                                            style={{ fontWeight: "bold", textTransform: "upperCase" }}>Шаблоны</h6>
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
                                                            className="qabul file_kor_short">Фото
                                                        </th>
                                                        <th id='tabRow' style={{ width: '35 %' }}
                                                            className="ariza file_kor_short_not">Именование
                                                        </th>
                                                        <th id='tabRow' style={{ width: '20%' }}
                                                            className="text-center harakat file_kor_short_not">Дата
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {shablon?.map((data, index) => (
                                                        <tr id="kor" key={data.id} onClick={() => getTemplate(data)}
                                                        // style={{backgroundColor: !data.forColor && '#ffffa6'}}
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
                                                                {/*<hr/>*/}
                                                                {/*{data?.senderFirstName + ' ' + data?.senderLastName}*/}
                                                            </td>


                                                            <td className="harakat" style={{ textAlign: 'center' }}>
                                                                {data?.createdAt?.toLocaleString().substring(0, 10).split('-').reverse().join('.')}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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
                                                style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Вставлен 
                                                новый 
                                                исходящий 
                                                документ</h3>
                                        </div>

                                        <div className="modal-footer d-flex justify-content-center">
                                            <button type={'button'} onClick={() => goToYangi()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Новый
                                            </button>
                                            <button type={'button'} onClick={() => saveAllData()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Временный
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>

                    {/*alert content*/}
                    <AlertContent alert={alert} />
                </div>
            </div>
        </div>
    )
};

export default ChiquvchiYangi;