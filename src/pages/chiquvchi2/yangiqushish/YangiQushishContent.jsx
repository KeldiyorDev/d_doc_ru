import { CKEditor } from 'ckeditor4-react';
import React from 'react'
import { useCallback } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import AlertContent, { Alert } from '../../../component/alert/Alert';
import MultiSelect from '../../../component/inputSelect/multiSelect';
// import Select2 from '../utils/Select/Select2';
import { ShortUser } from '../../../component/ShortUser';
import { axiosInstance, axiosInstanceOut, urlOut } from '../../../config';
import ChiquvchiNavbar2 from '../chiquvchiNavbar2/ChiquvchiNavbar2'
import { closeOptions, colourStyles } from '../utils/additionFunctions';
import UploadFile from '../utils/UploadFile'
import { CheckBoxSelection, Inject, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import { IsFileType } from '../../../component/IsFilType';
import { excelOption, pdfOption, powerPointOption, wordOption, zipRarOption } from '../utils/FileOption';
// import { MultiSelect } from 'react-multi-select-component';


const YangiQushishContent = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    const [getTemplateData, setGetTemplateData] = useState({ open: false, obj: {} });
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [data1, setData1] = useState('')
    const [data2, setData2] = useState('')
    const [isDisebled, setIsDisebled] = useState(false)
    const [ichkiTashkilotlar, setIchkiTashkilotlar] = useState([])
    const [tashqiTashkilotlar, setTashqiTashkilotlar] = useState([])
    const [devonxona, setdevonxona] = useState({})
    const [shortInfo, setShortInfo] = useState('')
    const commonElement = useRef();


    // Hikmat aka selectlari
    const [ichkiTashkilotlarQiymat, setIchkiTashkilotlarQiymat] = useState([])
    const [tashqiTashkilotlarQiymat, setTashqiTashkilotlarQiymat] = useState([])

    //ilova uchun
    const [ilovalar, setIlovalar] = useState([])

    // CKEditor uchun
    const [shablon, setShablon] = useState([])

    //multi select uchun
    const [hamkorlar, setHamkorlar] = useState([]);
    const [rahbariyat, setRahbariyat] = useState([]);
    const [fishka, setFishka] = useState([]);

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

    // file
    const [file, setFile] = useState(null);

    const deleteFile = useCallback((index) => {
        let arr = Object?.values(file)?.filter((f, i) => {
            return i !== index
        });
        setFile(arr);
    }, [file]);

    const uploadFile = useCallback((e) => {
        setFile(null);
        setTimeout(() => {
            setFile(e.target.files);
        }, 200);
    }, [setFile]);


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
                    const res = await axiosInstanceOut.get("template/all/" + JSON.parse(localStorage.getItem('ids')) + "/" + JSON.parse(localStorage.getItem('oi')));
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
                        if (d.id !== Number(localStorage.getItem("oi"))) {
                            arr.push({ value: d.id, label: d.name })
                        }
                    })
                    setIchkiTashkilotlar(arr);
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
                    const res = await axiosInstanceOut.get("fishka/allIsVisible/" + JSON.parse(localStorage.getItem('oi')));
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
                    const arr = [];

                    const newArr = res.data.sort(function (a, b) {
                        return a.id - b.id;
                    });

                    newArr?.forEach((d) => {
                        arr.push({ value: d.id, label: d.name, email: d.email, exat: d.exat })
                    })
                    console.log(arr);
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


    // // file ni o'zgaruvchiga olish
    // useEffect(() => {
    //     let isMounted = true;
    //     let arr = [];
    //     if (file) {
    //         Object.values(file)?.forEach((d) => {
    //             arr.push(d);
    //         })
    //         if (isMounted)
    //             setFiles(arr);
    //     }

    //     return () => {
    //         isMounted = false;
    //     }
    // }, [file]);

    const getTemplate = (item) => {
        console.log(item)
        let templateCkeditor = document.querySelector('.templateCkeditor');
        templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = item.content;
        setGetTemplateData({ open: true, obj: item })
    }

    useEffect(() => {
        setData1(String(getTemplateData?.obj?.content));
    }, [getTemplateData])


    let fields1 = {
        text: 'label',
        value: 'value',
        groupBy: 'deparmentName'
    };


    const goToYangi = () => {
        window.location.reload()
    }

    const goToXomaki = () => {
        history.push('/chiquvchi2/tab/xomaki')
    }

    const setRahbar = useCallback(async (e) => {
        console.log(e)
        try {
            const res = await axiosInstanceOut.post("" + e.value)
            console.log(res.data)
        } catch (error) {
            console.log(error.response);
        }
    }, [])


    console.log(shortInfo)
    const saveAllData = useCallback(async () => {
        setIsDisebled(true)
        let templateCkeditor = document.querySelector('.templateCkeditor');
        let shortInfo1 = templateCkeditor.querySelector('.cke_wysiwyg_div').innerText;
        // clearForm()

        let formData = new FormData()
        formData.append('file', file)
        formData.append('orgId', JSON.parse(localStorage.getItem('oi')))

        let fileId = [];
        let ichkiIds = [], tashqiIds = [];
        // ichkiTashkilotlarQiymat.forEach((d) => {
        //     ichkiIds.push({ correspondentID: d.value })
        // })

        // console.log(tashqiTashkilotlarQiymat);

        // tashqiTashkilotlarQiymat.forEach((d) => {
        //     tashqiIds.push({ correspondentID: d?.id, correspondentEmail: d?.email, correspondentExat: d?.exat })
        // })

        console.log(ichkiRef?.current?.props?.value);
        if (ichkiRef?.current?.props?.value?.length > 0) {
            ichkiRef?.current?.props?.value?.forEach((item) => {
                ichkiIds.push({ correspondentID: item.value })
            })
        }

        console.log(tashqiRef?.current?.props?.value);
        if (tashqiRef?.current?.props?.value?.length > 0) {
            tashqiRef?.current?.props?.value.forEach((d) => {
                tashqiIds.push({ correspondentID: d?.value, correspondentEmail: d?.email, correspondentExat: d?.exat })
            })
        }
        console.log(file);




        const appendixList = []
        ilovalar?.forEach((item, index) => {
            appendixList.push({
                order: index,
                content: item.content,
                type: item.type
            })
        })

        console.log(ilovalar);
        console.log(appendixList);
        console.log(file);

        if (file) {
            // file upload
            for (let i = 0; i < Object?.values(file)?.length; i++) {
                // console.log(Object.values(file)[i]?.name);
                const formData = new FormData();
                let fileType = IsFileType(Object.values(file)[i]);
                let fileType2 = pdfOption.includes(Object.values(file)[i]?.name?.split('.')[Object.values(file)[i]?.name?.split('.').length - 1])
                    || wordOption.includes(Object.values(file)[i]?.name?.split('.')[Object.values(file)[i]?.name?.split('.').length - 1])
                    || powerPointOption.includes(Object.values(file)[i]?.name?.split('.')[Object.values(file)[i]?.name?.split('.').length - 1])
                    || excelOption.includes(Object.values(file)[i]?.name?.split('.')[Object.values(file)[i]?.name?.split('.').length - 1])
                    || zipRarOption.includes(Object.values(file)[i]?.name?.split('.')[Object.values(file)[i]?.name?.split('.').length - 1])

                // console.log(i);
                // console.log(fileType);
                // console.log(fileType2);

                if (fileType || fileType2) {
                    formData?.append("file", Object?.values(file)[i]);
                    try {
                        let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                        fileId.push(res?.data);
                        console.log(res?.data)
                    } catch (error) {
                        console.log(error.response);
                    }
                } else {
                    console.log("qarab ko'r");
                }
            }
        }

        if (ichkiIds.length > 0 || tashqiIds.length > 0) {
            if (rahbariyatRef.current?.props.value) {
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
                        fishkaID: fishkaRef.current?.props?.value?.value,
                        appendixList: appendixList
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
                            fishkaID: fishkaRef.current?.props?.value?.value,
                            appendixList: appendixList
                        })
                        console.log(res.data)
                        setOpenModal({ open: true, obj: {} })
                        setIsDisebled(false)
                    } catch (error) {
                        console.log(error.response);
                        setIsDisebled(false)
                    }
                } else {
                    Alert(setAlert, "warning", "Fishka tanlanmagan");
                }
            } else {
                Alert(setAlert, "warning", "Imzolovchilar tanlanmagan");
            }
        } else {
            Alert(setAlert, "warning", "Tashqi yoki ichki tashkilotlar tanlanmagan");
        }
    }, [data1, devonxona?.value, file, ilovalar])

    // hikmat aka selectlari

    // choosed data (agarda bittalik tanlansa)
    const chooseDataHandler1 = (item) => {
        if (item.isChoose) {
            setIchkiTashkilotlarQiymat(prev => [...prev, item.data]);
        } else {
            setIchkiTashkilotlarQiymat(prev => {
                return prev.filter(elem => elem.value !== item.data.value)
            });
        }
    }

    // agarda barchasini tanlasa
    const chooseAllDataHandler1 = (item) => {
        setIchkiTashkilotlarQiymat(item);
    }


    // choosed data (agarda bittalik tanlansa)
    const chooseDataHandler2 = (item) => {
        if (item.isChoose) {
            setTashqiTashkilotlarQiymat(prev => [...prev, item.data]);
        } else {
            setTashqiTashkilotlarQiymat(prev => {
                return prev.filter(elem => elem.value !== item.data.value)
            });
        }
    }

    // agarda barchasini tanlasa
    const chooseAllDataHandler2 = (item) => {
        setTashqiTashkilotlarQiymat(item);
    }

    const ilovaContentFunc = (index, content) => {
        const newArr = ilovalar.filter((item, index2) => {
            if (index === index2) {
                item.content = content
            }

            return item
        })

        console.log(newArr);
        setIlovalar(newArr)
    }

    const ilovaTypeFunc = (index) => {
        const newArr = ilovalar.filter((item, index2) => {
            if (index === index2) {
                item.type = item.type === "kitob" ? "albom" : "kitob"
            }

            return item
        })

        console.log(newArr);
        setIlovalar(newArr)
    }

    return (
        <div className="content content-mobile tabContent mt-3" ref={commonElement}>
            {/* <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Yangi Qo'shish</h3> */}
            <div className="card-body card-body-mobile p-0">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
                    <ChiquvchiNavbar2 permission={permission} ranks={ranks} currentUser={currentUser} />
                </ul>
                <div className="tab-content pb-5">
                    <form ref={allDataRef}>
                        <div className="tab-pane fade show active p-2 pt-3 bg-white card" styleid="colored-tab1">
                            <div className="new">
                                <div className="row">
                                    <div className="col-lg-12 px-0">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3 d-flex  justify-content-between ">
                                                <div className="chiquvchiSelect" style={{ width: '100%' }}>
                                                    <Select
                                                        // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                        placeholder="Внутренние организации"
                                                        isMulti
                                                        styles={colourStyles}
                                                        isClearable={true}
                                                        ref={ichkiRef}
                                                        name="colors"
                                                        options={ichkiTashkilotlar}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                    />
                                                    {/* <MultiSelect
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
                                                    /> */}
                                                    {/* <Select2
                                                        data={ichkiTashkilotlar}
                                                        // parentId={"parentIchkiTashkilotlarSelect"}
                                                        // id={"ichkiTashkilotlarSelect"}
                                                        className="select_with_checkbox"
                                                        className2="select_with_checkbox2"
                                                        allClassName="select_checkbox_all_item"
                                                        chooseDataHandler={chooseDataHandler1}
                                                        chooseAllDataHandler={chooseAllDataHandler1}
                                                    /> */}

                                                    {/* <MultiSelect*/}
                                                    {/*    options={ichkiTashkilotlar}*/}
                                                    {/*    value={ichkiTashkilotlarQiymat}*/}
                                                    {/*    onChange={setIchkiTashkilotlarQiymat}*/}
                                                    {/*    labelledBy="Ichki tashkilotlar"*/}
                                                    {/*/>*/}
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <div className="w-100">
                                                    <Select
                                                        options={rahbariyat}
                                                        placeholder="Подписанты"
                                                        onChange={(e) => setRahbar(e)}
                                                        ref={rahbariyatRef}
                                                        onMenuOpen={closeOptions}
                                                        className="Tasdiqlovchilar"
                                                        styles={colourStyles}
                                                        isClearable={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3 chiquvchiSelect">
                                                <Select
                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                    placeholder="Внешние организации"
                                                    isMulti
                                                    styles={colourStyles}
                                                    isClearable={true}
                                                    ref={tashqiRef}
                                                    name="colors"
                                                    options={tashqiTashkilotlar}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />
                                                {/* <MultiSelect
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
                                                /> */}

                                                {/* <Select2
                                                    data={tashqiTashkilotlar}
                                                    className="select_with_checkbox2"
                                                    className2="select_with_checkbox"
                                                    allClassName="select_checkbox_all_item2"
                                                    chooseDataHandler={chooseDataHandler2}
                                                    chooseAllDataHandler={chooseAllDataHandler2}
                                                    setIchkiTashkilotlarQiymat={setIchkiTashkilotlarQiymat}
                                                    setTashqiTashkilotlarQiymat={setTashqiTashkilotlarQiymat}
                                                    tashqiTashkilotlar={tashqiTashkilotlar}
                                                    setTashqiTashkilotlar={setTashqiTashkilotlar}
                                                /> */}

                                                {/*<div className={"tashqiMulti"}>*/}
                                                {/*    <MultiSelect*/}
                                                {/*        options={tashqiTashkilotlar}*/}
                                                {/*        value={tashqiTashkilotlarQiymat}*/}
                                                {/*        onChange={setTashqiTashkilotlarQiymat}*/}
                                                {/*        labelledBy="Tashqi tashkilotlar"*/}
                                                {/*    />*/}
                                                {/*</div>*/}

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
                                                    placeholder="Фишка"
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
                                                <div className="custom-file" style={{ height: "45px" }}>
                                                    <input type="file"
                                                        style={{ height: "45px" }}
                                                        onClick={(e) => e.target.value = null}
                                                        onChange={(e) => uploadFile(e)}
                                                        multiple="multiple" className="custom-file-input"
                                                        id="customFile"
                                                    // onClick={closeOptions}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">Файл 
                                                    загружен</label>
                                                </div>

                                                <span>Фиксированные форматы: doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</span>
                                            </div>
                                            <div className="col-lg-12 mt-3">
                                                <ul>
                                                    {
                                                        file && Object?.values(file)?.map((hujjat, i) => (
                                                            <UploadFile
                                                                hujjat={hujjat}
                                                                index={i}
                                                                deleteFile={deleteFile}
                                                            />
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="col-lg-12 d-flex mt-3 d-flex justify-content-end">
                                                <button type={'button'} className="btn btn-primary mb-3 "
                                                    onClick={() => saveAllData()} disabled={isDisebled}>
                                                    Сохранять
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row unit1">
                                    <div className="col-lg-12 p-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <div className={'templateCkeditor'} style={{ width: '980px', overflow: "auto" }}>
                                            <CKEditor
                                                initData={data1}
                                                style={{ width: '980px !important', margin: '0 auto', overflow: "scroll" }}
                                                config={{
                                                    extraPlugins: ["pagebreak", "fakeobjects", "emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                    // font_defaultLabel: 'Times New Roman',
                                                    // fontSize_defaultLabel: '55px'
                                                }}
                                                onChange={(event) => {
                                                    console.log(event);
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


                                        {
                                            ilovalar.length > 0 && ilovalar?.map((item, index) => {
                                                return (
                                                    <div className="col-12 border px-0 shadowBox1 my-3">
                                                        <div className={'p-3'} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <h2>{index + 1} - ilova</h2>
                                                            <button type={'button'} onClick={() => ilovaTypeFunc(index)}
                                                                className={`btn btn-primary bg-${item.type === "kitob" ? 'danger' : 'primary'}`}
                                                                style={{
                                                                    width: '200px',
                                                                    marginTop: "10px"
                                                                }}> {item.type === "kitob" ? "Albom ga o'tkazish" : "Kitob ga o'tkazish"}</button>
                                                        </div>
                                                        <div
                                                            className={`col-lg-12 d-flex flex-lg-column align-items-center justify-content-center ${item.type === "kitob" ? 'isBook' : 'isAlbom'}`}>
                                                            <CKEditor
                                                                initData=""
                                                                style={{
                                                                    maxWidth: item.type === "kitob" ? '1000px' : '1600px',
                                                                    margin: '0 auto',
                                                                    maxHeght: item.type === "kitob" ? '1101px' : '501px',
                                                                    display: "flex",
                                                                    overflow: "scroll"
                                                                }}
                                                                config={{
                                                                    extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    setData2(String(event.editor.getData()));
                                                                    ilovaContentFunc(index, String(event.editor.getData()))
                                                                }}
                                                                type="classic"
                                                                popupHeight='1000px'
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="col-lg-12 text-center w-100 px-0">
                                            <div className="btn btn-primary w-100"
                                                onClick={() => setIlovalar([...ilovalar, { type: "kitob", content: "" }])}>
                                                Добавить приложение
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {
                                (shablon?.length > 0) && (
                                    <div className={'mt-3 px-2'}>
                                        <div className="card-header bg-primary text-white header-elements-inline">
                                            <h6 className="card-title"
                                                style={{ fontWeight: "bold", textTransform: "upperCase" }}>Шаблоны</h6>
                                        </div>
                                        <div className="card-body border row px-2" style={{ cursor: 'pointer' }}>
                                            <div className="col-lg-12">
                                                <table id="myTable"
                                                    className="table table-bordered table-striped table-hover Tab">
                                                    <thead className={'theadSticky'}>
                                                        <tr className="bg-dark text-white NavLink text-center">
                                                            <th id='tabRow' style={{ width: '10%' }}
                                                                className="id file_kor_short_not">№
                                                            </th>
                                                            <th id='tabRow' style={{ width: '35 %' }}
                                                                className="qabul file_kor_short">Фотки
                                                            </th>
                                                            <th id='tabRow' style={{ width: '35 %' }}
                                                                className="ariza file_kor_short_not">Именование
                                                            </th>
                                                            <th id='tabRow' style={{ width: '30 %' }}
                                                                className="ariza file_kor_short_not">Краткая
                                                            </th>
                                                            <th id='tabRow' style={{ width: '20%' }}
                                                                className="text-center harakat file_kor_short_not">Дата
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
                                                                <td className=" ariza" style={{ textAlign: 'center' }}><span
                                                                    className={'text-color file_kor_short_not'}>{data?.shortInfo}</span>
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
                                                                        }}>Вы уверены, что хотите удалить шаблон?</h3>
                                                                </div>

                                                                <div className="modal-footer d-flex justify-content-center">
                                                                    <button type={'button'}
                                                                        onClick={() => setOpenModal({
                                                                            open: false,
                                                                            obj: {}
                                                                        })}
                                                                        className="btn btn-danger"
                                                                        style={{ width: "150px" }}>Отмена
                                                                    </button>
                                                                    <button type={'button'}
                                                                        // onClick={() => deleteShablon(openModal.obj)}
                                                                        className="btn btn-success"
                                                                        style={{ width: "150px" }}>Подтверждение
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
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
                                                style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Новый
                                                Введен
                                                исходящий
                                                документ</h3>
                                        </div>

                                        <div className="modal-footer d-flex justify-content-center">
                                            <button type={'button'} onClick={() => goToYangi()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Новый
                                            </button>
                                            <button type={'button'} onClick={() => goToXomaki()}
                                                className="btn btn-success"
                                                style={{ width: "150px" }}>Временное
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
}

export default React.memo(YangiQushishContent)
