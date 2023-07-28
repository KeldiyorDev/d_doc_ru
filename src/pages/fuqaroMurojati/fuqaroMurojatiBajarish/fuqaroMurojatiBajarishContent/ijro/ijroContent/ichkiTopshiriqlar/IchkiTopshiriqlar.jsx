import React, { useEffect, useState } from "react";
import { axiosInstance, axiosInstanceFq, urlFq } from "../../../../../../../config";
import { Alert } from "../../../../../../../component/alert/Alert";
import { status } from "../../../../../../../component/status/Status";
import jwtDecode from "jwt-decode";
// import Select from 'react-select';

const IchkiTopshiriqlar = ({
    data,
    dateFormat,
    params,
    setAlert,
    currentUser,
    history,
    setChange,
    change,
    statusName,
    setSave,
    ranks,
    setRefresh,
    setOpenIjroniYuklash, openIjroniYuklash, openButtonCLick, setOpenButtonClick
}) => {
    const [closedIjro, setClosedIjro] = useState({ open: false, obj: {} });
    const [openIjro, setOpenIjro] = useState({ open: false, obj: {} });


    const [openIjroniUzgartirish, setOpenIjroniUzgartirish] = useState({ open: false, obj: {}, index: null });
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);
    const [chooseFiles, setChooseFiles] = useState([]);
    const [files, setFiles] = useState([]);

    // api ketadigan sanani formatlash
    const dateFormatSet = (date) => {
        // return date?.slice(5, date?.length) + '-0' + date?.slice(3, 4) + '-' + date?.slice(0, 2)
        return date.length < 10 ? (date?.slice(2, 4) + '.0' + date?.slice(0, 1) + '.' + date?.slice(5, date?.length)) : date?.slice(3, 5) + '.' + (date?.slice(0, 2) + '.' + date?.slice(6, date?.length));
    }

    // ijrocontent yo'naltirmaganlar uchun commentni yashirish va ko'rsatish
    const setOpenStrFunc = (index, name) => {
        if (name === "n") {
            document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqBlock').style.display = "block";
            document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqNone').style.display = "none";
        } else {
            document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqBlock').style.display = "none";
            document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqNone').style.display = "block";
        }
    }

    // rad etish tugmasi
    const radEtish = async (dat) => {
        let textarea = document.querySelector('.closedIjroTextArea').value;

        if (textarea.length > 0) {
            try {
                const res = await axiosInstanceFq.post("inExecutor/reject", {
                    comment: textarea,
                    inExecutorID: dat?.id,
                })
                setRefresh(res.data)
                setClosedIjro({ open: false, obj: {} });
                Alert(setAlert, "success", "Hujjat rad etildi");

            } catch (error) {
                console.log(error.response);
            }
        } else {
            Alert(setAlert, "warning", "Izoh yozish majburiy");
            setClosedIjro({ open: false, obj: {} });
        }
    }

    // tasdiqlash
    const tasdiqlash = async (dat) => {
        let textarea = document.querySelector('.closedIjroTextArea').value;
        let sanaTasdiqlash = document.querySelector('.sanaTasdiqlash').value;

        if (textarea.length > 0 && sanaTasdiqlash.length > 8) {
            try {
                const res = await axiosInstanceFq.post("inExecutor/accept", {
                    comment: textarea,
                    inExecutorID: dat?.id,
                    doneAt: dateFormatSet(new Date(sanaTasdiqlash).toLocaleDateString()) || null
                })
                setRefresh(res.data)
                setOpenIjro({ open: false, obj: {} });
                // history.push('/fuqaro/murojati/nazorat')
                Alert(setAlert, "success", "Hujjat tasdiqlandi");
            } catch (error) {
                console.log(error.response);
            }

        } else {
            Alert(setAlert, "warning", "Izoh yozish majburiy");
            setOpenIjro({ open: false, obj: {} });
        }
    }

    const uzgartirish = (dat, index) => {
        setOpenIjroniUzgartirish({ open: true, obj: dat, index: index });
        setOpenIjroniYuklash({ open: true, obj: dat, index: index });
        console.log(openIjroniUzgartirish, openIjroniYuklash)

        // shu yerdan davom ettiramiz
        let arr = [];
        dat?.executeDocument?.otherFiles?.forEach((f) => {
            arr.push(f);
        })
        let arr1 = [];
        dat?.executeDocument?.otherFiles?.forEach((f) => {
            arr1.push(f);
        })
        setChooseFiles(arr);
        // setOtherFiles(arr1);
    }

    const passedPage = async (index) => {
        setSave(false)
        try {
            if (params.name === "ma'lumot-uchun") {
                try {
                    await axiosInstanceFq.post(`inExecutor/done/${data?.inExecutorViewDTOS[index]?.id}`, {})
                    history.push("/fuqaro/murojati/ma'lumot-uchun");
                } catch (error) {
                    console.log(error.response);
                }
            }
            if (params.name === "nazoratda") {
                try {
                    await axiosInstanceFq.post(`inExecutor/done/${data?.inExecutorViewDTOS[index]?.id}`, {})
                    history.push("/fuqaro/murojati/nazorat");
                } catch (error) {
                    console.log(error.response);
                }
            }
        } catch (error) {
            console.log(error.response);
        }
    }

    // ijrocontent yo'naltirganlar uchun commentni yashirish va ko'rsatish
    useEffect(() => {
        let isMounted = true;
        let trNumberRedirect = document.querySelectorAll('.trNumberRedirect');
        let IzohTashqiTopshiriqBlockY = document.querySelectorAll('.IzohTashqiTopshiriqBlockY');
        let IzohTashqiTopshiriqNoneY = document.querySelectorAll('.IzohTashqiTopshiriqNoneY');

        // ichki topshiriqning commentini yashirish yoki ko'rsatish
        if (isMounted) {
            trNumberRedirect?.forEach((d) => {
                d.querySelector('.IzohIchkiTopshiriqNoneY')?.addEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
                })
                d.querySelector('.IzohIchkiTopshiriqBlockY')?.addEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
                })
            })

            // tashqi topshiriqning commentini yashirish yoki ko'rsatish
            IzohTashqiTopshiriqBlockY.forEach((d, i) => {
                d.addEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "block";
                    IzohTashqiTopshiriqBlockY[i].style.display = "none";
                })
            })
            IzohTashqiTopshiriqNoneY.forEach((d, i) => {
                d.addEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "none";
                    IzohTashqiTopshiriqBlockY[i].style.display = "block";
                })
            })
        }

        return () => {
            trNumberRedirect?.forEach((d) => {
                d.querySelector('.IzohIchkiTopshiriqNoneY')?.removeEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
                })
                d.querySelector('.IzohIchkiTopshiriqBlockY')?.removeEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
                })
            })

            IzohTashqiTopshiriqBlockY.forEach((d, i) => {
                d.removeEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "block";
                    IzohTashqiTopshiriqBlockY[i].style.display = "none";
                })
            })
            IzohTashqiTopshiriqNoneY.forEach((d, i) => {
                d.removeEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "none";
                    IzohTashqiTopshiriqBlockY[i].style.display = "block";
                })
            })
            isMounted = false;
        }
    }, [data]);

    const uploadFile = (e) => {
        setFile(null);
        setTimeout(() => {
            setFile(e.target.files);
        }, 100);
    }

    const uploadFile1 = (e) => {
        setFile1(null);
        setTimeout(() => {
            setFile1(e.target.files);
        }, 100);
    }

    const deleteFile = (index) => {
        let arr = Object.values(file)?.filter((f, i) => {
            return i !== index;
        });
        setFile(arr);
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


    // ijro hujjatini saqlash
    const ijroHujjatiniSaqlash = async (dat) => {

        let izohMatni = document.querySelector('.izohMatni')?.value;

        let fileId = [];

        for (let i = 0; i < file?.length; i++) {
            const formData = new FormData()
            let fileType = (file[i]?.type === "application/zip" || file[i]?.type === "application/gzip" || file[i]?.type === "application/msword" || file[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file[i]?.type === "application/vnd.ms-powerpoint" || file[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file[i]?.type === "application/vnd.ms-excel" || file[i]?.type === "application/x-rar-compressed" || file[i]?.type === "application/pdf");

            // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
            if (fileType) {
                formData.append("file", file[i]);
                let res = await axiosInstanceFq.post("/file/upload/" + JSON.parse(localStorage.getItem('oi')), formData)
                fileId.push(res.data.data);
            }
        }
        console.log(fileId)

        if (fileId.length > 0) {
            if (izohMatni?.length > 0) {
                try {
                    if (params.name === "bajarishUchun" || params.name === "umumlashtiruvchi") {
                        await axiosInstanceFq.post(`inExecutor/executeDocument`, {
                            comment: izohMatni,
                            filesID: fileId,
                            inExecutorID: data?.inExecutorViewDTOS[openIjroniYuklash.index]?.id,
                        })
                        setSave(false)
                    }
                    console.log({
                        comment: izohMatni,
                        filesID: fileId,
                        inExecutorID: data?.inExecutorViewDTOS[openIjroniYuklash.index]?.id,
                    })

                    if (params.name === "bajarilmagan") {
                        await axiosInstance.post(`notDoneDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
                            comment: izohMatni,
                            filesId: fileId,
                            moduleId: null,
                            journalId: null,
                            journalNumber: null,
                            otherFilesCount: 0
                        })
                    }
                    Alert(setAlert, "success", "Muvaffaqiyatli yuklandi!");
                    setOpenIjroniYuklash({ open: false, obj: {}, index: null });
                    setOpenIjroniUzgartirish({ open: false, obj: {}, index: null });
                    setChange(!change);
                    setFile(null);
                } catch (error) {
                    console.log(error);
                }
            } else {
                Alert(setAlert, "warning", "Izoh kiritish majburiy");
            }
        } else {
            Alert(setAlert, "warning", "Fayl tanlash majburiy");
        }
    }

    // ijro hujjatini o'zgartirish
    const ijroHujjatiniUzgartirishSaqlash = async (dat) => {

        let izohMatniUzgartirish = document.querySelector('.izohMatniUzgartirish')?.value;

        let fileId = [];

        for (let i = 0; i < files?.length; i++) {
            const formData = new FormData()
            let fileType = (files[i]?.type === "application/zip" || files[i]?.type === "application/gzip" || files[i]?.type === "application/msword" || files[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || files[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || files[i]?.type === "application/vnd.ms-powerpoint" || files[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || files[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || files[i]?.type === "application/vnd.ms-excel" || files[i]?.type === "application/x-rar-compressed" || files[i]?.type === "application/pdf");

            // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
            if (fileType) {
                formData.append("file", files[i]);
                let res = await axiosInstanceFq.post("/file/upload/" + JSON.parse(localStorage.getItem('oi')), formData)
                fileId.push(res?.data?.data);
            }
        }

        // oldingi tanlangan file id larini olish
        chooseFiles.forEach((d) => {
            fileId.push(d.id);
        })

        if (fileId.length > 0) {
            if (izohMatniUzgartirish.length > 0) {
                try {

                    const res = await axiosInstanceFq.post(`inExecutor/executeDocument`, {
                        comment: izohMatniUzgartirish,
                        filesID: fileId,
                        inExecutorID: data?.inExecutorViewDTOS[openIjroniYuklash.index]?.id,

                    })
                    Alert(setAlert, "success", "Muvaffaqiyatli yuklandi!");
                    setOpenIjroniUzgartirish({ open: false, obj: {} });
                    setOpenIjroniYuklash({ open: false, obj: {} });
                    setChange(!change);
                    setFile1(null);
                    setFiles([]);
                } catch (error) {
                    console.log(error.response);
                }
            } else {
                Alert(setAlert, "warning", "Izoh kiritish majburiy");
            }
        } else {
            Alert(setAlert, "warning", "Fayl tanlash majburiy");
        }
    }
    console.log(data)

    return (
        <>
            <div className="card-box">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white header-elements-inline">
                            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Ichki
                                Topshiriqlar</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover Tab">
                                    <thead className="bg-dark text-white NavLink text-center">
                                        <tr>
                                            <th style={{ width: "15%" }}>Topshiriq</th>
                                            <th style={{ width: "20%" }}>Muddat/holat</th>
                                            <th style={{ width: "30%" }}>Qo'shimcha izoh</th>
                                            <th style={{ width: "40%" }}>Ijro</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.inExecutorViewDTOS?.length > 0 && data?.inExecutorViewDTOS?.map((dat, index) => (
                                            <tr key={index} className="text-center trNumber">
                                                <td>
                                                    <p>{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</p>
                                                    <p className="badge badge-primary">REG № {data?.regNumber}</p>
                                                    <p>{dateFormat(dat?.deadline)}</p>
                                                </td>
                                                <td>
                                                    <p>{dateFormat(dat?.statusDate)}</p>
                                                    {/* refresh bo'lmasdan o'zgartirish */}
                                                    <span className="badge text-white mr-1 span1"
                                                        style={{ backgroundColor: statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.color }}>{statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.LatinName}</span><br />
                                                    <span className="d-flex align-items-center justify-content-center"><br />
                                                        {params.name === "nazoratdanOlish" && (
                                                            (dat?.documentStatusCode === 4) && (
                                                                <>
                                                                    <i className="fas fa-close text-danger cursor-pointer iconCheckDanger"
                                                                        onClick={() => setClosedIjro({ open: true, obj: dat })}
                                                                        style={{ fontSize: "20px" }}></i>
                                                                    <i className="fas fa-check text-success cursor-pointer iconCheckSuccess"
                                                                        onClick={() => setOpenIjro({ open: true, obj: dat })}
                                                                        style={{ fontSize: "20px" }}></i>
                                                                </>
                                                            )
                                                        )}
                                                        {(dat?.documentStatusCode === 6) && (
                                                            <div className="userCommit">
                                                                <span>{dat?.comment}</span>
                                                            </div>
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="text-left" style={{ wordBreak: "break-word" }}>
                                                    {dat?.description}
                                                </td>
                                                <td className="text-left" style={{ wordBreak: "break-word" }}>
                                                    <>
                                                        {(dat?.executeDocument?.comment) ? (
                                                            <p>

                                                                <span className="mb-1">
                                                                    {/* <strong>Izoh:&nbsp;</strong> */}
                                                                    <span style={{ fontWeight: "400" }}>
                                                                        <span onClick={() => setOpenStrFunc(index, "n")}
                                                                            style={{ display: "none" }}
                                                                            className="cursor-pointer IzohIchkiTopshiriqNone">
                                                                            <strong>Izoh:</strong>&nbsp; {dat?.executeDocument?.comment}<span
                                                                                style={{
                                                                                    color: "blue",
                                                                                    fontSize: "11px"
                                                                                }}>&nbsp; yashirish</span>
                                                                        </span>
                                                                        <span onClick={() => setOpenStrFunc(index, "b")}
                                                                            style={{ display: "block" }}
                                                                            className="cursor-pointer IzohIchkiTopshiriqBlock">
                                                                            <strong>Izoh:</strong>&nbsp; {dat?.executeDocument?.comment?.substring(0, 50)}...
                                                                            {dat?.executeDocument?.comment?.length > 50 ? (
                                                                                <span style={{
                                                                                    color: "blue",
                                                                                    fontSize: "11px"
                                                                                }}>&nbsp; davomi</span>
                                                                            ) : (
                                                                                <span></span>
                                                                            )}
                                                                        </span>
                                                                    </span>
                                                                </span>
                                                                <div className="mt-1">
                                                                    <strong>File:&nbsp;</strong>
                                                                    <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                                                        {dat.executeDocument?.otherFiles?.length > 0 && dat.executeDocument?.otherFiles?.map((hujjat, ind1) => (
                                                                            <span key={ind1}>
                                                                                {hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                                                                    <span
                                                                                        className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
                                                                                            style={{ fontSize: "20px" }} />
                                                                                        <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener">PDF FILE, </a>
                                                                                    </span>
                                                                                ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                                                    <span
                                                                                        className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                        <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                                                            style={{ fontSize: "20px" }} />
                                                                                        <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener">WORD FILE, </a>
                                                                                    </span>
                                                                                ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                                                    <span
                                                                                        className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                                                            style={{ fontSize: "20px" }} />
                                                                                        <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener">EXCEL FILE, </a>
                                                                                    </span>
                                                                                ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                                                    <span
                                                                                        className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                                                            style={{ fontSize: "20px" }} />
                                                                                        <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener">POWERPOINT FILE, </a>
                                                                                    </span>
                                                                                ) : (
                                                                                    <span
                                                                                        className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                        <i className="far fa-file-archive mr-1 fa-2x rarIcon"
                                                                                            style={{ fontSize: "20px" }}></i>
                                                                                        <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                            target="_blank"
                                                                                            rel="noreferrer noopener">ZIP, RAR FILE, </a>
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                {(parseInt(dat?.workplaceID) === JSON.parse(localStorage.getItem('ids'))) && (data?.inExecutorViewDTOS?.filter((dats) => parseInt(dats?.workplaceID) === JSON.parse(localStorage.getItem('ids')))[0]?.documentStatusCode !== 8) && (dat.executeDocument?.otherFiles?.length) > 0 && (
                                                                    <div>
                                                                        <span
                                                                            className="d-block infoBtn bg-dark cursor-pointer m-auto d-flex align-items-center justify-content-center"
                                                                            onClick={() => uzgartirish(dat, index)}
                                                                            data-popup="tooltip" data-bs-toggle="tooltip"
                                                                            data-bs-placement="top" title="O'zgartirish">
                                                                            <i className="icon-pencil5"></i>
                                                                        </span>
                                                                    </div>
                                                                )}

                                                            </p>
                                                        ) : (
                                                            <>
                                                                {(parseInt(dat?.workplaceID) === JSON.parse(localStorage.getItem('ids'))) && (params.name === 'bajarishUchun' || params.name === 'umumlashtiruvchi') && (
                                                                    <div className="d-flex justify-content-center">
                                                                        <span
                                                                            className="infoBtn bg-dark cursor-pointer text-white p-2"
                                                                            onClick={() => setOpenIjroniYuklash({
                                                                                open: true,
                                                                                obj: dat,
                                                                                index: index
                                                                            })} data-popup="tooltip"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            title="Ijroni yuklash">
                                                                            <i className="icon-file-upload"></i>
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                {(parseInt(dat?.workplaceID) === JSON.parse(localStorage.getItem('ids')) && (params.name === 'malumotUchun' || params.name === 'nazorat') && !(params.name === 'bajarilgan') &&
                                                                    <div className="d-flex justify-content-center">
                                                                        <button
                                                                            className="btn btn-success"
                                                                            onClick={() => setOpenButtonClick({
                                                                                open: true,
                                                                                obj: dat,
                                                                                index: index
                                                                            })}
                                                                            style={{ textTransform: "capitalize" }}
                                                                        >
                                                                            button
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    {/* button tugma uchun */}
                                    {openButtonCLick.open && (
                                        <div className="adminWindow">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header bg-primary text-white">
                                                        <h6 className="modal-title">Statusga o'tish oynasi</h6>
                                                        <button type="button" className="close"
                                                            onClick={() => setOpenButtonClick({
                                                                open: false,
                                                                obj: {},
                                                                index: null
                                                            })}>×
                                                        </button>
                                                    </div>
                                                    <div className="modal-body text-center">
                                                        <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }}
                                                            className="text-danger">Ogoh bo'ling!</h3>
                                                        <h5>Bajarilgan statusini qabul qilasizmi?</h5>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger"
                                                            onClick={() => setOpenButtonClick({
                                                                open: false,
                                                                obj: {},
                                                                index: null
                                                            })}>Yo'q
                                                        </button>
                                                        <button type="button" className="btn btn-primary ml-1"
                                                            onClick={() => passedPage(openButtonCLick.index)}>Ha
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* faqat yo'naltirganlar */}
                                    <tbody>
                                        {data?.inExecutorInformationList?.length > 0 && data?.inExecutorInformationList?.map((dat) => (
                                            dat?.directedInExecutors?.map((user, i) => (
                                                <>
                                                    {/* ajratish uchun chiziq */}
                                                    {i === 0 && (
                                                        <tr key={user.id}>
                                                            <td colSpan={4}>
                                                                <hr style={{
                                                                    height: '2px',
                                                                    backgroundColor: "#000",
                                                                    width: "100%"
                                                                }} />
                                                            </td>
                                                        </tr>
                                                    )}
                                                    <tr key={user.id} className="text-center trNumberRedirect">
                                                        <td>
                                                            <p>{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</p>
                                                            <p className="badge badge-primary">REG
                                                                № {data?.document?.journalNumber}</p>
                                                            <p>{dateFormat(user?.documentStatusAtTheMoment)}</p>
                                                        </td>
                                                        <td className="py-2 px-0">
                                                            <p>{(user?.directFirstName && user?.directFirstName?.length > 1) ? ((((user?.directFirstName[0].toUpperCase() === "S" || user?.directFirstName[0].toUpperCase() === "C") && user?.directFirstName[1].toUpperCase() === "H")) ? user?.directFirstName.substring(0, 2) + ". " : user?.directFirstName?.substring(0, 1) + ". ") : ""}{user?.directLastName}</p>
                                                            <p>{dateFormat(user?.deadline)}</p>
                                                            <span className="badge text-white mr-1 span1"
                                                                style={{ backgroundColor: status.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span><br />
                                                            {params.name === "nazoratdanOlish" && (
                                                                (user.documentStatus === "IN_PROCESS") && (
                                                                    <>
                                                                        <i className="fas fa-close text-danger cursor-pointer iconCheckDanger"
                                                                            onClick={() => setClosedIjro({
                                                                                open: true,
                                                                                obj: user
                                                                            })} style={{ fontSize: "20px" }}></i>
                                                                        <i className="fas fa-check text-success cursor-pointer iconCheckSuccess"
                                                                            onClick={() => setOpenIjro({
                                                                                open: true,
                                                                                obj: user
                                                                            })} style={{ fontSize: "20px" }}></i>
                                                                    </>
                                                                )
                                                            )}
                                                            {(user?.documentStatus === "REJECTED") && (
                                                                <div className="userCommit">
                                                                    <span>{user?.comment}</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="text-left" style={{ wordBreak: "break-word" }}>
                                                            {user?.description}
                                                        </td>
                                                        <td className="text-left" style={{ wordBreak: "break-word" }}>
                                                            <>
                                                                {(user?.executeDocument?.otherFiles?.length > 0 || user?.otherFiles?.comment) ? (
                                                                    <p>
                                                                        <span className="mb-1">
                                                                            <span style={{ fontWeight: "400" }}>
                                                                                <span style={{ display: "none" }}
                                                                                    className="cursor-pointer IzohIchkiTopshiriqNoneY">
                                                                                    <strong>Izoh:</strong>&nbsp; {user?.executeDocument?.comment}
                                                                                    <span style={{
                                                                                        color: "blue",
                                                                                        fontSize: "11px"
                                                                                    }}>&nbsp; yashirish</span>
                                                                                </span>
                                                                                <span style={{ display: "block" }}
                                                                                    className="cursor-pointer IzohIchkiTopshiriqBlockY">
                                                                                    <strong>Izoh:</strong>&nbsp; {user?.executeDocument?.comment?.substring(0, 50)}...
                                                                                    {user?.executeDocument?.comment?.length > 50 ? (
                                                                                        <span style={{
                                                                                            color: "blue",
                                                                                            fontSize: "11px"
                                                                                        }}>&nbsp; davomi</span>
                                                                                    ) : (
                                                                                        <span></span>
                                                                                    )}
                                                                                </span>
                                                                            </span>
                                                                        </span>
                                                                        <div className="mt-1">
                                                                            <strong>File:&nbsp;</strong>
                                                                            <div className="d-flex"
                                                                                style={{ flexWrap: "wrap" }}>
                                                                                {user?.executeDocument?.chosenFiles?.length > 0 && user?.executeDocument?.chosenFiles?.map((hujjat, index2) => (
                                                                                    <span key={index2}>
                                                                                        {hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                                                                            <span
                                                                                                className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                                <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
                                                                                                    style={{ fontSize: "20px" }} />
                                                                                                <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener">PDF FILE, </a>
                                                                                            </span>
                                                                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                                                            <span
                                                                                                className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                                <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                                                                    style={{ fontSize: "20px" }} />
                                                                                                <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener">WORD FILE, </a>
                                                                                            </span>
                                                                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                                                            <span
                                                                                                className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                                <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                                                                    style={{ fontSize: "20px" }} />
                                                                                                <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener">EXCEL FILE, </a>
                                                                                            </span>
                                                                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                                                            <span
                                                                                                className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                                <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                                                                    style={{ fontSize: "20px" }} />
                                                                                                <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener">POWERPOINT FILE, </a>
                                                                                            </span>
                                                                                        ) : (
                                                                                            <span
                                                                                                className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                                                                                <i className="far fa-file-archive mr-1 fa-2x rarIcon"
                                                                                                    style={{ fontSize: "20px" }}></i>
                                                                                                <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                                                                    target="_blank"
                                                                                                    rel="noreferrer noopener">ZIP, RAR FILE, </a>
                                                                                            </span>
                                                                                        )}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                        {(parseInt(user?.workplaceID) === JSON.parse(localStorage.getItem('ids'))) && (
                                                                            <span
                                                                                className="d-block infoBtn updateIconIjro bg-dark cursor-pointer m-auto d-flex align-items-center justify-content-center"
                                                                                onClick={() => uzgartirish(user, i)}
                                                                                data-popup="tooltip"
                                                                                data-bs-toggle="tooltip"
                                                                                data-bs-placement="top"
                                                                                title="O'zgartirish">
                                                                                <i className="icon-pencil5"></i>
                                                                            </span>
                                                                        )}
                                                                    </p>
                                                                ) : (
                                                                    <>
                                                                        {(parseInt(user?.workplaceID) === JSON.parse(localStorage.getItem('ids'))) && (
                                                                            <div className="d-flex justify-content-center">
                                                                                <span
                                                                                    className="infoBtn uploadIconIjro bg-dark cursor-pointer"
                                                                                    onClick={() => setOpenIjroniYuklash({
                                                                                        open: true,
                                                                                        obj: user,
                                                                                        index: i
                                                                                    })} data-popup="tooltip"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-bs-placement="top"
                                                                                    title="Ijroni yuklash">
                                                                                    <i className="icon-file-upload"></i>
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {(parseInt(user?.workplaceID) === JSON.parse(localStorage.getItem('ids')) && (params.name === "nazorat" || params.name === "malumotUchun" || (params.name === 'bajarilmagan' && data?.document?.isShowButton))) && (
                                                                            <div className="d-flex justify-content-center">
                                                                                <button
                                                                                    className="btn btn-success"
                                                                                    onClick={() => setOpenButtonClick({
                                                                                        open: true,
                                                                                        obj: user,
                                                                                        index: i
                                                                                    })}
                                                                                    style={{ textTransform: "capitalize" }}
                                                                                >
                                                                                    button
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {closedIjro.open && (
                <div className="adminWindow text-center">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h6 className="modal-title">Izoh kiriting:</h6>
                            </div>
                            <div className="modal-body ">
                                <textarea
                                    name=""
                                    rows="8"
                                    className="form-control closedIjroTextArea"
                                >
                                </textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-link bekorQilish"
                                    onClick={() => setClosedIjro({ open: false, obj: {} })}>Yopish
                                </button>
                                <button type="button" className="btn btn-danger"
                                    onClick={() => radEtish(closedIjro.obj)}>Rad etish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {openIjro.open && (
                <div className="adminWindow text-center">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h6 className="modal-title">Tasdiqlash oynasi:</h6>
                            </div>
                            <div className="modal-body ">
                                <input
                                    type="date"
                                    className="form-control mb-2 sanaTasdiqlash"
                                />
                                <textarea
                                    name=""
                                    rows="8"
                                    className="form-control closedIjroTextArea"
                                    placeholder="Izoh..."
                                >
                                </textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-link bekorQilish"
                                    onClick={() => setOpenIjro({ open: false, obj: {} })}>Yopish
                                </button>
                                <button type="button" className="btn btn-success"
                                    onClick={() => tasdiqlash(openIjro.obj)}>Tasdiqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ijroni yuklash uchun */}
            <div className="adminWindow" style={{ display: openIjroniYuklash.open ? "block" : "none" }}>
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content" style={{ maxHeight: "700px", overflowY: "scroll" }}>
                        <div className="modal-header bg-primary text-white">
                            <h6 className="modal-title"
                                style={{ fontWeight: "bold", textTransform: "upperCase" }}>
                                Ijro hujjati</h6>
                            <button type="button" className="close"
                                onClick={() => setOpenIjroniYuklash({ open: false, obj: {} })}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <textarea
                                            cols="5"
                                            rows="5"
                                            id="malumot"
                                            minLength="150"
                                            maxLength="300"
                                            className="form-control form-control-outline izohMatni"
                                            placeholder="Izoh"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body pt-0 mt-2 px-0" style={{ zIndex: "-1 !important", width: "100%" }}>
                                <div className="form-group w-100 mb-0">
                                    <label className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                                            onClick={(e) => e.target.value = null}
                                            onChange={(e) => uploadFile(e)}
                                            multiple
                                        />
                                        <span className="custom-file-label w-100">
                                            {file?.length > 0 ? `${file?.length} ta fayl tanlandi` : "Faylni yuklash"}
                                        </span>
                                    </label>
                                    <label className="d-block text-muted mb-0">Ruxsat etilgan formatlar:doc, docx,
                                        xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="errorAddIjro text-danger"></span>
                            </div>

                            {/* all files select */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul>
                                        {file?.length > 0 && Object.values(file)?.map((hujjat, i) => (
                                            hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>PDF FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>WORD FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xls" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xlsx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>EXCEL FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>POWERPOINT FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>ZIP, RAR FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer pr-0">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => ijroHujjatiniSaqlash(openIjroniYuklash.obj)}>Saqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ijroni uzgartirish uchun */}
            <div className="adminWindow " style={{ display: openIjroniUzgartirish.open ? "block" : "none" }}>
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content adminWindowHeight">
                        <div className="modal-header bg-primary text-white">
                            <h6 className="modal-title"
                                style={{ fontWeight: "bold", textTransform: "upperCase" }}>
                                Ijro hujjati</h6>
                            <button type="button" className="close"
                                onClick={() => setOpenIjroniUzgartirish({ open: false, obj: {} })}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="position-relative">
                                        <textarea
                                            cols="5"
                                            rows="5"
                                            id="malumot"
                                            maxLength="300"
                                            className="form-control form-control-outline izohMatniUzgartirish"
                                            placeholder="Izoh"
                                            defaultValue={openIjroniUzgartirish.obj?.executeDocument?.comment}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body pt-0 mt-2 px-0">
                                <div className="form-group w-100 mb-0">
                                    <span
                                        className="text-muted">{chooseFiles?.length > 0 ? chooseFiles?.length + " ta fayl tanlangan" : "Faylni yuklash"}</span>
                                    <label className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                                            onClick={(e) => e.target.value = null}
                                            onChange={(e) => uploadFile1(e)}
                                            multiple
                                            style={{ width: "100%" }}
                                        />
                                        <span className="custom-file-label w-100">
                                            {files?.length > 0 ? `${files?.length} ta fayl tanlandi` : "Faylni yuklash"}
                                        </span>
                                    </label>
                                    <label className="d-block text-muted mb-0">Ruxsat etilgan formatlar:doc, docx,
                                        xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="errorAddIjro text-danger"></span>
                            </div>

                            {/* all files select */}
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="mb-0">
                                        {chooseFiles?.length > 0 && chooseFiles?.map((hujjat, i) => (
                                            hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>PDF FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>WORD FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>EXCEL FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>POWERPOINT FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>ZIP, RAR FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                    <ul>
                                        {files?.length > 0 && files?.map((hujjat, i) => (
                                            hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>PDF FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile2(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>WORD FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile2(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xls" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xlsx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>EXCEL FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile2(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>POWERPOINT FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile2(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            ) : (
                                                <li key={i} className='kiruvchiMain'>
                                                    <div className='d-flex align-items-center'>
                                                        <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                            style={{ fontSize: "28px" }} />
                                                        <span className='pt-1'>ZIP, RAR FILE</span>
                                                    </div>
                                                    <span onClick={() => deleteFile2(i)}> <i className="icon-trash"></i></span>
                                                </li>
                                            )
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer pr-0">
                                <button type="button" className="btn btn-primary"
                                    onClick={() => ijroHujjatiniUzgartirishSaqlash(openIjroniUzgartirish.obj)}>Saqlash
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(IchkiTopshiriqlar)