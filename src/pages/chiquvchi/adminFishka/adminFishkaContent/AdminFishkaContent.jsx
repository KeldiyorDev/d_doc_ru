import React, { useEffect, useState } from "react";
import { axiosInstanceOut, axiosInstance, urlOut } from "../../../../config";
import AlertContent, { Alert } from '../../../../component/alert/Alert';
import ChiquvchiNavbar from "../../../superadmin/admin/adminContent/chiquvchi/chiquvchiNavbar";
import './adminFishkaContent.css';

const ChiquvchiFishkaContent = ({ currentUser }) => {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [isVisible1, setIsVisible1] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);
    const [isVisible4, setIsVisible4] = useState(false);
    const [data, setData] = useState([]);
    let fileType = (file?.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg");
    let fileType1 = (file2?.type === "image/png" || file2?.type === "image/jpg" || file2?.type === "image/jpeg");
    let fileType2 = (file3?.type === "image/png" || file3?.type === "image/jpg" || file3?.type === "image/jpeg");
    let fileType3 = (file4?.type === "image/png" || file4?.type === "image/jpg" || file4?.type === "image/jpeg");
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    // barcha fishkalarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getAllFishka = async () => {
            try {
                const res = await axiosInstanceOut.get("fishka/all/" + JSON.parse(localStorage.getItem('oi')))
                console.log(res.data)
                res?.data?.forEach((d) => {
                    if (d.fishkaType === 'BOSS') {
                        setIsVisible1(d.isVisible)
                    }
                    if (d.fishkaType === 'CHIEF_1') {
                        setIsVisible2(d.isVisible)
                    }
                    if (d.fishkaType === 'CHIEF_2') {
                        setIsVisible3(d.isVisible)
                    }
                    if (d.fishkaType === 'CHIEF_3') {
                        setIsVisible4(d.isVisible)
                    }
                })
                if (isMounted)
                    setData(res.data);

            } catch (error) {
                console.log(error.response);
            }
        }
        getAllFishka();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // rahbar
    const submitHandlerFile1 = async () => {
        let fileId = '';
        if (fileType) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                fileId = res?.data;
                console.log(res?.data)
            } catch (error) {
                console.log(error.response);
            }
        }
        axiosInstanceOut.post("fishka", {
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            orgID: JSON.parse(localStorage.getItem('oi')),
            fishkaType: 1,
            fileID: fileId?.length > 0 ? fileId : data?.filter((d) => d.fishkaType === 'BOSS')[0].file.id,
            isVisible: isVisible1
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response);
            Alert(setAlert, "warning", err?.response?.data);
        })
    }

    //aparat 1
    const submitHandlerFile2 = async () => {
        let fileId = '';
        if (fileType1) {
            const formData = new FormData();
            formData.append("file", file2);
            try {
                let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                fileId = res?.data;
                console.log(res?.data)
            } catch (error) {
                console.log(error.response);
            }

        }
        axiosInstanceOut.post("fishka", {
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            orgID: JSON.parse(localStorage.getItem('oi')),
            fishkaType: 2,
            fileID: fileId?.length > 0 ? fileId : data?.filter((d) => d.fishkaType === 'CHIEF_1')[0].file.id,
            isVisible: isVisible2
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response);
                Alert(setAlert, "warning", err?.response?.data);
            })
    }

    //aparat 2
    const submitHandlerFile3 = async () => {
        let fileId = '';
        if (fileType2) {
            const formData = new FormData();
            formData.append("file", file3);
            try {
                let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                fileId = res?.data;
                console.log(res?.data)
            } catch (error) {
                console.log(error.response);
            }

        }
        axiosInstanceOut.post("fishka", {
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            orgID: JSON.parse(localStorage.getItem('oi')),
            fishkaType: 3,
            fileID: fileId?.length > 0 ? fileId : data?.filter((d) => d.fishkaType === 'CHIEF_2')[0].file.id,
            isVisible: isVisible3
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                Alert(setAlert, "warning", err?.response?.data);
            })
    }

    //aparat 3
    const submitHandlerFile4 = async () => {
        let fileId = '';
        if (fileType3) {
            const formData = new FormData();
            formData.append("file", file4);
            try {
                let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                fileId = res?.data;
                console.log(res?.data)
            } catch (error) {
                console.log(error.response);
            }

        }
        axiosInstanceOut.post("fishka", {
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            orgID: JSON.parse(localStorage.getItem('oi')),
            fishkaType: 4,
            fileID: fileId?.length > 0 ? fileId : data?.filter((d) => d.fishkaType === 'CHIEF_3')[0].file.id,
            isVisible: isVisible4
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
                Alert(setAlert, "warning", err?.response?.data);
            })
    }


    // 1-file ni width va height ni aniqlash
    const changeFile1 = (e) => {
        console.log(e.target.files[0])
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0]);
    }

    // 2-file ni width va height ni aniqlash
    const changeFile2 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile2(e.target.files[0]);
    }

    // 3-file ni width va height ni aniqlash
    const changeFile3 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            setFile3(e.target.files[0]);
        }
    }

    // 3-file ni width va height ni aniqlash
    const changeFile4 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile4(e.target.files[0]);
    }

    return (
        <div className="content mb-5">
            <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Фишка</h3>
            <div className="">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <ChiquvchiNavbar />
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active fishkaAdmin" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{ padding: "20px 30px" }}>

                                {/* boss_1 */}
                                {/*{data.map((dat, index) => (*/}
                                <div>
                                    {/*{dat.systemName === "boss_1" && (*/}
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div
                                                    className="card-header bg-primary text-white header-elements-inline">
                                                    <h6 className="card-title" style={{
                                                        fontWeight: "bold",
                                                        fontSize: "18px"
                                                    }}>Директор</h6>
                                                </div>
                                                <div className="w-100">
                                                    <>
                                                        {
                                                            file ? <>
                                                                <div>
                                                                    <img
                                                                        src={file && URL?.createObjectURL(file)}
                                                                        alt="" />
                                                                </div>
                                                            </> :
                                                                data?.length > 0 && data?.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                item?.fishkaType === 'BOSS' &&
                                                                                <div key={i}>
                                                                                    <img
                                                                                        src={`${urlOut}file/${item?.file?.id}`}
                                                                                        alt="" />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                    </>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-lg-8">
                                                                <span
                                                                    style={{ fontSize: "12px", color: "crimson" }}
                                                                    className="fishka1"></span>
                                                                <div
                                                                    className="form-group form-group-floating  row">
                                                                    <div
                                                                        className="col-lg-10 d-flex align-items-center">
                                                                        <div className="input mb-2 mr-2"
                                                                            onClick={() => setIsVisible1(!isVisible1)}>
                                                                            {
                                                                                isVisible1 ?
                                                                                    <input type="checkbox"
                                                                                        checked={true} /> :
                                                                                    <input type="checkbox"
                                                                                        checked={false} />
                                                                            }
                                                                        </div>
                                                                        <label className="custom-file"
                                                                            style={{ height: "54px" }}>
                                                                            <input
                                                                                type="file"
                                                                                className="custom-file-input w-100"
                                                                                onClick={(e) => e.target.value = null}
                                                                                onChange={(e) => changeFile1(e)}
                                                                                accept=".png, .jpeg, .jpg"
                                                                            />
                                                                            <span
                                                                                className="custom-file-label text-muted w-100">
                                                                                {fileType ? file.name : "Faylni tanlash"}
                                                                            </span>
                                                                        </label>
                                                                        <a style={{ display: "none" }}
                                                                            rel="noreferrer noopener"
                                                                            href="https://online-image-resizer.com/"
                                                                            target="_blank"
                                                                            className="text-success a1">https://online-image-resizer.com/</a>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <button type="button"
                                                                            onClick={() => submitHandlerFile1()}
                                                                            style={{ width: "130px" }}
                                                                            className="btn btn-primary">
                                                                            <i className="fas fa-save mr-1"
                                                                                style={{ fontSize: "16px" }}></i>Сохранять
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*)}*/}
                                </div>
                                {/*))}*/}

                                {/* boss_2 */}
                                {/*{data.map((dat, index) => (*/}
                                <div>
                                    {/*{dat.systemName === "boss_2" && (*/}
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div
                                                    className="card-header bg-primary text-white header-elements-inline">
                                                    <h6 className="card-title" style={{
                                                        fontWeight: "bold",
                                                        fontSize: "18px"
                                                    }}> Аппрат 1 </h6>
                                                </div>
                                                <div className="w-100">
                                                    <>
                                                        {
                                                            file2 ? <>
                                                                <div>
                                                                    <img
                                                                        src={file2 && URL?.createObjectURL(file2)}
                                                                        alt="" />
                                                                </div>
                                                            </> :
                                                                data?.length > 0 && data.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                item?.fishkaType === 'CHIEF_1' &&
                                                                                <div key={i}>
                                                                                    <img
                                                                                        src={`${urlOut}file/${item?.file?.id}`}
                                                                                        alt="" />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                    </>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-lg-8">
                                                                <span
                                                                    style={{ fontSize: "12px", color: "crimson" }}
                                                                    className="fishka2"></span>
                                                                <div
                                                                    className="form-group form-group-floating  row">
                                                                    <div
                                                                        className="col-lg-10 d-flex align-items-center">
                                                                        <div className="input mr-2"
                                                                            onClick={() => setIsVisible2(!isVisible2)}>
                                                                            {
                                                                                isVisible2 ?
                                                                                    <input type="checkbox"
                                                                                        checked={true} /> :
                                                                                    <input type="checkbox"
                                                                                        checked={false} />
                                                                            }
                                                                        </div>
                                                                        <label className="custom-file">
                                                                            <input
                                                                                type="file"
                                                                                className="custom-file-input w-100"
                                                                                onClick={(e) => e.target.value = null}
                                                                                onChange={(e) => changeFile2(e)}
                                                                                accept=".png, .jpeg, .jpg"
                                                                            />
                                                                            <span
                                                                                className="custom-file-label text-muted w-100">
                                                                                {fileType1 ? file2.name : "Выберите файл"}
                                                                            </span>
                                                                        </label>
                                                                        <a style={{ display: "none" }}
                                                                            rel="noreferrer noopener"
                                                                            href="https://online-image-resizer.com/"
                                                                            target="_blank"
                                                                            className="text-success a2">https://online-image-resizer.com/</a>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <button type="button"
                                                                            onClick={() => submitHandlerFile2()}
                                                                            style={{ width: "130px" }}
                                                                            className="btn btn-primary">
                                                                            <i className="fas fa-save mr-1"
                                                                                style={{ fontSize: "16px" }}></i>Сохранять
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*// )}*/}
                                </div>
                                {/*// ))}*/}

                                {/* boss3 */}
                                {/*{data.map((dat, index) => (*/}
                                <div>
                                    {/*{dat.systemName === "boss_3" && (*/}
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div
                                                    className="card-header bg-primary text-white header-elements-inline">
                                                    <h6 className="card-title" style={{
                                                        fontWeight: "bold",
                                                        fontSize: "18px"
                                                    }}>Aparat 2</h6>
                                                </div>
                                                <div className="w-100">
                                                    <>
                                                        {
                                                            file3 ? <>
                                                                <div>
                                                                    <img
                                                                        src={file3 && URL?.createObjectURL(file3)}
                                                                        alt="" />
                                                                </div>
                                                            </> :
                                                                data?.length > 0 && data.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                item?.fishkaType === 'CHIEF_2' &&
                                                                                <div key={i}>
                                                                                    <img
                                                                                        src={`${urlOut}file/${item?.file?.id}`}
                                                                                        alt="" />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                    </>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-lg-8">
                                                                <span
                                                                    style={{ fontSize: "12px", color: "crimson" }}
                                                                    className="fishka3"></span>
                                                                <div
                                                                    className="form-group form-group-floating  row">
                                                                    <div
                                                                        className="col-lg-10 d-flex align-items-center">
                                                                        <div className="input mr-2"
                                                                            onClick={() => setIsVisible3(!isVisible3)}>
                                                                            {
                                                                                isVisible3 ?
                                                                                    <input type="checkbox"
                                                                                        checked={true} /> :
                                                                                    <input type="checkbox"
                                                                                        checked={false} />
                                                                            }
                                                                        </div>
                                                                        <label className="custom-file">
                                                                            <input
                                                                                type="file"
                                                                                className="custom-file-input w-100"
                                                                                onClick={(e) => e.target.value = null}
                                                                                onChange={(e) => changeFile3(e)}
                                                                                accept=".png, .jpeg, .jpg"
                                                                            />
                                                                            <span
                                                                                className="custom-file-label text-muted w-100">
                                                                                {fileType2 ? file3.name : "Выберите файл"}
                                                                            </span>
                                                                        </label>
                                                                        <a style={{ display: "none" }}
                                                                            rel="noreferrer noopener"
                                                                            href="https://online-image-resizer.com/"
                                                                            target="_blank"
                                                                            className="text-success a3">https://online-image-resizer.com/</a>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <button type="button"
                                                                            onClick={() => submitHandlerFile3()}
                                                                            style={{ width: "130px" }}
                                                                            className="btn btn-primary">
                                                                            <i className="fas fa-save mr-1"
                                                                                style={{ fontSize: "16px" }}></i> Сохранять
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*// )}*/}
                                </div>
                                {/*// ))}*/}

                                {/* guruh rahbari */}
                                {/*{data.map((dat, index) => (*/}
                                <div>
                                    {/*{dat.systemName === "chief_of_group" && (*/}
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="card mb-0">
                                                <div
                                                    className="card-header bg-primary text-white header-elements-inline">
                                                    <h6 className="card-title" style={{
                                                        fontWeight: "bold",
                                                        fontSize: "18px"
                                                    }}> Аппрат 3</h6>
                                                </div>
                                                <div className="w-100">
                                                    <>
                                                        {
                                                            file4 ? <>
                                                                <div>
                                                                    <img
                                                                        src={file4 && URL?.createObjectURL(file4)}
                                                                        alt="" />
                                                                </div>
                                                            </> :
                                                                data?.length > 0 && data.map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            {
                                                                                item?.fishkaType === 'CHIEF_3' &&
                                                                                <div key={i}>
                                                                                    <img
                                                                                        src={`${urlOut}file/${item?.file?.id}`}
                                                                                        alt="" />
                                                                                </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                        }
                                                    </>
                                                </div>
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-lg-8">
                                                                <span
                                                                    style={{ fontSize: "12px", color: "crimson" }}
                                                                    className="fishka4"></span>
                                                                <div
                                                                    className="form-group form-group-floating  row">
                                                                    <div
                                                                        className="col-lg-10 d-flex align-items-center">
                                                                        <div className="input mr-2"
                                                                            onClick={() => setIsVisible4(!isVisible4)}>
                                                                            {
                                                                                isVisible4 ?
                                                                                    <input type="checkbox"
                                                                                        checked={true} /> :
                                                                                    <input type="checkbox"
                                                                                        checked={false} />
                                                                            }
                                                                        </div>
                                                                        <label className="custom-file">
                                                                            <input
                                                                                type="file"
                                                                                className="custom-file-input w-100"
                                                                                onClick={(e) => e.target.value = null}
                                                                                onChange={(e) => changeFile4(e)}
                                                                                accept=".png, .jpeg, .jpg"
                                                                            // size={}
                                                                            />
                                                                            <span
                                                                                className="custom-file-label text-muted w-100">
                                                                                {fileType3 ? file4.name : "Выберите файл"}
                                                                            </span>
                                                                        </label>
                                                                        <a style={{ display: "none" }}
                                                                            rel="noreferrer noopener"
                                                                            href="https://online-image-resizer.com/"
                                                                            target="_blank"
                                                                            className="text-success a4">https://online-image-resizer.com/</a>
                                                                    </div>
                                                                    <div className="col-lg-2">
                                                                        <button type="button"
                                                                            onClick={() => submitHandlerFile4()}
                                                                            style={{ width: "130px" }}
                                                                            className="btn btn-primary">
                                                                            <i className="fas fa-save mr-1"
                                                                                style={{ fontSize: "16px" }}></i>Сохранять
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*)}*/}
                                </div>
                                {/*))}*/}
                            </div>
                            {/* alert */}
                            <AlertContent alert={alert} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ChiquvchiFishkaContent);