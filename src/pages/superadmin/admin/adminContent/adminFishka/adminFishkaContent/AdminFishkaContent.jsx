import React, { useEffect, useState } from "react";
import { axiosInstance, url } from "../../../../../../config";
import AlertContent, { Alert } from '../../../../../../component/alert/Alert';
import AdminContentNavbar from "../../adminContentNavbar/AdminContentNavbar";
import './adminFishkaContent.css';

const AdminFishkaContent = ({ currentUser }) => {
    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const [file4, setFile4] = useState(null);
    const [blobBoss1, setBlobBoss1] = useState("");
    const [blobBoss2, setBlobBoss2] = useState("");
    const [blobBoss3, setBlobBoss3] = useState("");
    const [blobBoss4, setBlobBoss4] = useState("");
    let fileType = (file?.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg");
    let fileType1 = (file2?.type === "image/png" || file2?.type === "image/jpg" || file2?.type === "image/jpeg");
    let fileType2 = (file3?.type === "image/png" || file3?.type === "image/jpg" || file3?.type === "image/jpeg");
    let fileType3 = (file4?.type === "image/png" || file4?.type === "image/jpg" || file4?.type === "image/jpeg");
    const [data, setData] = useState([]);
    const [getAllPicture, setGetAllPicture] = useState([]);
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    // barcha rollarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getAllRollar = async () => {
            try {
                const res = await axiosInstance.get("role")

                if (isMounted)
                    setData(res.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getAllRollar();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // 1-file ni tanlash
    const submitHandlerFile1 = async (dat) => {
        if (fileType) {
            const formData = new FormData();
            formData.append("fishka", file);

            axiosInstance.post("fishka/saveFile/" + JSON.parse(localStorage.getItem('oi')), formData).then(res => {
                if (res.data) {
                    axiosInstance.post("fishka/saveBanner", {
                        fileId: res.data,
                        userRoleId: dat.id,
                        orgId: JSON.parse(localStorage.getItem('oi'))
                    })
                        .then(res1 => {
                            axiosInstance.get("fishka/getBannerPicture/" + res.data)
                                .then(res2 => {
                                    setBlobBoss1(res1.data);
                                })
                                .catch(err => {
                                    console.log(err.response);
                                })
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                } else {
                    console.log("идентификатор не пришел");
                }
            }).catch(err => {
                console.log(err.response);
                Alert(setAlert, "warning", err?.response?.data);
            })
        }
    }

    const submitHandlerFile2 = (dat) => {
        if (fileType1) {
            const formData = new FormData();
            formData.append("fishka", file2);
            axiosInstance.post("fishka/saveFile/" + JSON.parse(localStorage.getItem('oi')), formData)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        axiosInstance.post("fishka/saveBanner", {
                            fileId: res.data,
                            userRoleId: dat.id,
                            orgId: JSON.parse(localStorage.getItem('oi'))
                        })
                            .then(res1 => {
                                axiosInstance.get("fishka/getBannerPicture/" + res.data)
                                    .then(res2 => {
                                        setBlobBoss2(res1.data);
                                    })
                                    .catch(err => {
                                        console.log(err.response);
                                    })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        console.log("идентификатор не пришел");
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    Alert(setAlert, "warning", err?.response?.data);
                })
        }
    }

    // boss_3
    const submitHandlerFile3 = (dat) => {
        if (fileType2) {
            const formData = new FormData();
            formData.append("fishka", file3);
            axiosInstance.post("fishka/saveFile/" + JSON.parse(localStorage.getItem('oi')), formData)
                .then(res => {
                    if (res.data) {
                        axiosInstance.post("fishka/saveBanner", {
                            fileId: res.data,
                            userRoleId: dat.id,
                            orgId: JSON.parse(localStorage.getItem('oi'))
                        })
                            .then(res1 => {
                                axiosInstance.get("fishka/getBannerPicture/" + res.data)
                                    .then(res2 => {
                                        setBlobBoss3(res1.data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            })
                            .catch(err => {
                                console.log(err.response);
                            })
                    } else {
                        console.log("идентификатор не пришел");
                    }
                })
                .catch(err => {
                    console.log(err);
                    Alert(setAlert, "warning", err?.response?.data);
                })
        }
    }

    // guruh rahbar
    const submitHandlerFile4 = (dat) => {
        if (fileType3) {
            const formData = new FormData();
            formData.append("fishka", file4);
            axiosInstance.post("fishka/saveFile/" + JSON.parse(localStorage.getItem('oi')), formData)
                .then(res => {
                    if (res.data) {
                        axiosInstance.post("fishka/saveBanner", {
                            fileId: res.data,
                            userRoleId: dat.id,
                            orgId: JSON.parse(localStorage.getItem('oi'))
                        })
                            .then(res1 => {
                                axiosInstance.get("fishka/getBannerPicture/" + res.data)
                                    .then(res2 => {
                                        setBlobBoss4(res1.data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })
                            })
                            .catch(err => {
                                console.log(err.response);
                            })
                    } else {
                        console.log("идентификатор не пришел");
                    }
                })
                .catch(err => {
                    console.log(err);
                    Alert(setAlert, "warning", err?.response?.data);
                })
        }
    }

    // barcha fishkalarni o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getAllFishka = async () => {
            try {
                const res = await axiosInstance.get("fishka/getAllBanner?orgId=" + JSON.parse(localStorage.getItem('oi')))
                if (isMounted)
                    setGetAllPicture(res.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getAllFishka();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // 1-file ni width va height ni aniqlash
    const changeFile1 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            // console.log(img.width + "x" + img.height);
            if (img.width === 1200 && img.height === 400) {
                document.querySelector('.fishka1').textContent = "";
                document.querySelector('.a1').style.display = "none"
                setFile(e.target.files[0]);
            } else {
                document.querySelector('.fishka1').textContent = "Размер изображения должен быть 1200x400";
                document.querySelector('.a1').style.display = "block"
                setFile(null);
            }
        }
    }

    // 2-file ni width va height ni aniqlash
    const changeFile2 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            // console.log(img.width + "x" + img.height);
            if (img.width === 1200 && img.height === 400) {
                document.querySelector('.fishka2').textContent = "";
                document.querySelector('.a2').style.display = "none"
                setFile2(e.target.files[0]);
            } else {
                document.querySelector('.fishka2').textContent = "Размер изображения должен быть 1200x400";
                document.querySelector('.a2').style.display = "block"
                setFile2(null);
            }
        }
    }

    // 3-file ni width va height ni aniqlash
    const changeFile3 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            // console.log(img.width + "x" + img.height);
            if (img.width === 1200 && img.height === 400) {
                document.querySelector('.fishka3').textContent = "";
                document.querySelector('.a3').style.display = "none"
                setFile3(e.target.files[0]);
            } else {
                document.querySelector('.fishka3').textContent = "Размер изображения должен быть 1200x400";
                document.querySelector('.a3').style.display = "block"
                setFile3(null);
            }
        }
    }

    // 3-file ni width va height ni aniqlash
    const changeFile4 = (e) => {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        img.onload = () => {
            if (img.width === 1200 && img.height === 400) {
                document.querySelector('.fishka4').textContent = "";
                document.querySelector('.a4').style.display = "none"
                setFile4(e.target.files[0]);
            } else {
                document.querySelector('.fishka4').textContent = "Размер изображения должен быть 1200x400";
                document.querySelector('.a4').style.display = "block"
                setFile4(null);
            }
        }
    }

    return (
        <div className="content mb-5">
            <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Фишка</h3>
            <div className="">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <AdminContentNavbar />
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active fishkaAdmin" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{ padding: "20px 30px" }}>

                                {/* boss_1 */}
                                {data.map((dat, index) => (
                                    <div key={index}>
                                        {dat.systemName === "boss_1" && (
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-lg-8">
                                                    <div className="card">
                                                        <div className="card-header bg-primary text-white header-elements-inline">
                                                            <h6 className="card-title" style={{ fontWeight: "bold", fontSize: "18px" }}>Позиция 1</h6>
                                                        </div>
                                                        <div className="w-100">
                                                            <>
                                                                {blobBoss1.id ? (
                                                                    <img src={`${url}/api/file/view/${blobBoss1?.id}`} alt="" />
                                                                ) : (
                                                                    <>
                                                                        {getAllPicture.length > 0 && getAllPicture.map((image, i) => (
                                                                            <div key={i}>
                                                                                {(image?.id && image?.userRoleId === "Директор") && (
                                                                                    <img src={`${url}/api/file/view/${image?.generatedName}`} alt="" />
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </>
                                                        </div>
                                                        <div className="card-body">
                                                            <form onSubmit={submitHandlerFile1}>
                                                                <div className="row d-flex justify-content-center">
                                                                    <div className="col-lg-8">
                                                                        <span style={{ fontSize: "12px", color: "crimson" }} className="fishka1"></span>
                                                                        <div className="form-group form-group-floating  row">
                                                                            <div className="col-lg-10 ">
                                                                                <label className="custom-file" style={{ height: "54px" }}  >
                                                                                    <input
                                                                                        type="file"
                                                                                        className="custom-file-input w-100"
                                                                                        onClick={(e) => e.target.value = null}
                                                                                        onChange={(e) => changeFile1(e)}
                                                                                        accept=".png, .jpeg, .jpg"
                                                                                    />
                                                                                    <span className="custom-file-label text-muted w-100" >
                                                                                        {fileType ? file.name : "Выберите файл"}
                                                                                    </span>
                                                                                </label>
                                                                                <a style={{ display: "none" }} rel="noreferrer noopener" href="https://www.iloveimg.com/resize-image#resize-options,pixels" target="_blank" className="text-success a1">https://www.iloveimg.com/resize-image</a>
                                                                            </div>
                                                                            <div className="col-lg-2">
                                                                                <button type="button" onClick={() => submitHandlerFile1(dat)} style={{ width: "130px" }} className="btn btn-primary">
                                                                                    <i className="fas fa-save mr-1" style={{ fontSize: "16px" }}></i>Сохранять
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
                                        )}
                                    </div>
                                ))}

                                {/* boss_2 */}
                                {data.map((dat, index) => (
                                    <div key={index}>
                                        {dat.systemName === "boss_2" && (
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-lg-8">
                                                    <div className="card">
                                                        <div className="card-header bg-primary text-white header-elements-inline">
                                                            <h6 className="card-title" style={{ fontWeight: "bold", fontSize: "18px" }}>Позиция 2</h6>
                                                        </div>
                                                        <div className="d-flex justify-content-center">
                                                            <>
                                                                {blobBoss2.id ? (
                                                                    <img src={`${url}/api/file/download/${blobBoss2?.id}`} alt="" />
                                                                ) : (
                                                                    <>
                                                                        {getAllPicture.length > 0 && getAllPicture.map((image, i) => (
                                                                            <div key={i}>
                                                                                {image.userRoleId === "Первый заместитель" && (
                                                                                    // <img src={'data:image/png;base64,' + image.picture} alt="" style={{ width: "100%", height: "400px", objectFit: "cover", objectPosition: "bottom" }} />
                                                                                    <img src={`${url}/api/file/view/${image?.generatedName}`} alt="" />
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </>
                                                            {/* <img src={'data:image/png;base64,' + blobBoss2} alt="" /> */}
                                                        </div>
                                                        <div className="card-body">
                                                            <form>
                                                                <div className="row d-flex justify-content-center">
                                                                    <div className="col-lg-8">
                                                                        <span style={{ fontSize: "12px", color: "crimson" }} className="fishka2"></span>
                                                                        <div className="form-group form-group-floating  row">
                                                                            <div className="col-lg-10">
                                                                                <label className="custom-file" >
                                                                                    <input
                                                                                        type="file"
                                                                                        className="custom-file-input w-100"
                                                                                        onClick={(e) => e.target.value = null}
                                                                                        onChange={(e) => changeFile2(e)}
                                                                                        accept=".png, .jpeg, .jpg"
                                                                                    />
                                                                                    <span className="custom-file-label text-muted w-100">
                                                                                        {fileType1 ? file2.name : "Позиция 1"}
                                                                                    </span>
                                                                                </label>
                                                                                <a style={{ display: "none" }} rel="noreferrer noopener" href="https://www.iloveimg.com/resize-image#resize-options,pixels" target="_blank" className="text-success a2">https://www.iloveimg.com/resize-image</a>
                                                                            </div>
                                                                            <div className="col-lg-2">
                                                                                <button type="button" onClick={() => submitHandlerFile2(dat)} style={{ width: "130px" }} className="btn btn-primary">
                                                                                    <i className="fas fa-save mr-1" style={{ fontSize: "16px" }}></i>Сохранять
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
                                        )}
                                    </div>
                                ))}

                                {/* boss3 */}
                                {data.map((dat, index) => (
                                    <div key={index}>
                                        {dat.systemName === "boss_3" && (
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-lg-8">
                                                    <div className="card">
                                                        <div className="card-header bg-primary text-white header-elements-inline">
                                                            <h6 className="card-title" style={{ fontWeight: "bold", fontSize: "18px" }}>Позиция 3</h6>
                                                        </div>
                                                        <div className="d-flex justify-content-center w-100">
                                                            {blobBoss3.id ? (
                                                                <img src={`${url}/api/file/view/${blobBoss3?.id}`} alt="" />
                                                            ) : (
                                                                <>
                                                                    {getAllPicture.length > 0 && getAllPicture.map((image, i) => (
                                                                        <div key={i}>
                                                                            {image.userRoleId === "Заместитель" && (
                                                                                <img src={`${url}/api/file/view/${image?.generatedName}`} alt="" />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="card-body">
                                                            <form >
                                                                <div className="row d-flex justify-content-center">
                                                                    <div className="col-lg-8">
                                                                        <span style={{ fontSize: "12px", color: "crimson" }} className="fishka3"></span>
                                                                        <div className="form-group form-group-floating  row">
                                                                            <div className="col-lg-10">
                                                                                <label className="custom-file" >
                                                                                    <input
                                                                                        type="file"
                                                                                        className="custom-file-input w-100"
                                                                                        onClick={(e) => e.target.value = null}
                                                                                        onChange={(e) => changeFile3(e)}
                                                                                        accept=".png, .jpeg, .jpg"
                                                                                    />
                                                                                    <span className="custom-file-label text-muted w-100">
                                                                                        {fileType2 ? file3.name : "Выберите файл"}
                                                                                    </span>
                                                                                </label>
                                                                                <a style={{ display: "none" }} rel="noreferrer noopener" href="https://www.iloveimg.com/resize-image#resize-options,pixels" target="_blank" className="text-success a3">https://www.iloveimg.com/resize-image</a>
                                                                            </div>
                                                                            <div className="col-lg-2">
                                                                                <button type="button" onClick={() => submitHandlerFile3(dat)} style={{ width: "130px" }} className="btn btn-primary">
                                                                                    <i className="fas fa-save mr-1" style={{ fontSize: "16px" }}></i>Сохранять
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
                                        )}
                                    </div>
                                ))}

                                {/* guruh rahbari */}
                                {data.map((dat, index) => (
                                    <div key={index}>
                                        {dat.systemName === "chief_of_group" && (
                                            <div className="row d-flex justify-content-center">
                                                <div className="col-lg-8">
                                                    <div className="card mb-0">
                                                        <div className="card-header bg-primary text-white header-elements-inline">
                                                            <h6 className="card-title" style={{ fontWeight: "bold", fontSize: "18px" }}>Позиция 4</h6>
                                                        </div>
                                                        <div className="d-flex justify-content-center w-100">
                                                            {blobBoss4.id ? (
                                                                <img src={`${url}/api/file/view/${blobBoss4?.id}`} alt="" />
                                                            ) : (
                                                                <>
                                                                    {getAllPicture.length > 0 && getAllPicture.map((image, i) => (
                                                                        <div key={i}>
                                                                            {image.userRoleId === "Лидер группы" && (
                                                                                <img src={`${url}/api/file/view/${image?.generatedName}`} alt="" />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="card-body">
                                                            <form >
                                                                <div className="row d-flex justify-content-center">
                                                                    <div className="col-lg-8">
                                                                        <span style={{ fontSize: "12px", color: "crimson" }} className="fishka4"></span>
                                                                        <div className="form-group form-group-floating  row">
                                                                            <div className="col-lg-10">
                                                                                <label className="custom-file" >
                                                                                    <input
                                                                                        type="file"
                                                                                        className="custom-file-input w-100"
                                                                                        onClick={(e) => e.target.value = null}
                                                                                        onChange={(e) => changeFile4(e)}
                                                                                        accept=".png, .jpeg, .jpg"
                                                                                    // size={}
                                                                                    />
                                                                                    <span className="custom-file-label text-muted w-100">
                                                                                        {fileType3 ? file4.name : "Выберите файл"}
                                                                                    </span>
                                                                                </label>
                                                                                <a style={{ display: "none" }} rel="noreferrer noopener" href="https://www.iloveimg.com/resize-image#resize-options,pixels" target="_blank" className="text-success a4">https://www.iloveimg.com/resize-image</a>
                                                                            </div>
                                                                            <div className="col-lg-2">
                                                                                <button type="button" onClick={() => submitHandlerFile4(dat)} style={{ width: "130px" }} className="btn btn-primary">
                                                                                    <i className="fas fa-save mr-1" style={{ fontSize: "16px" }}></i>Сохранять
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
                                        )}
                                    </div>
                                ))}
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

export default React.memo(AdminFishkaContent);