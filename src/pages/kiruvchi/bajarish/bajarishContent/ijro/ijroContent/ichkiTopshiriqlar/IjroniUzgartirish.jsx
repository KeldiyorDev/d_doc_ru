import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";
import AllFilesInline from "./AllFilesInline";
import ChooseFiles from "./ChooseFiles";

const IjroniUzgartirish = ({ openIjroniUzgartirish, setOpenIjroniUzgartirish, chooseFiles, setChooseFiles, params, setChange, change, setAlert }) => {
  const [files, setFiles] = useState([]);
  const [file1, setFile1] = useState(null);

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

  const deleteFile1 = (index) => {
    let arr = chooseFiles?.filter((f, i) => {
      return i !== index;
    });
    setChooseFiles(arr);
  }

  const uploadFile1 = (e) => {
    setFile1(null);
    setTimeout(() => {
      setFile1(e.target.files);
    }, 100);
  }

  const deleteFile2 = (index) => {
    let arr = files?.filter((f, i) => {
      return i !== index;
    });
    setFiles(arr);
  }

  // ijro hujjatini o'zgartirish
  const ijroHujjatiniUzgartirishSaqlash = async (dat) => {
    // let cardTypeUzgartirish = document.querySelector('.cardType')?.querySelector('.css-qc6sy-singleValue')?.textContent;
    // let cardNameUzgartirish = document.querySelector('.cardName')?.querySelector('.css-qc6sy-singleValue')?.textContent;
    // let ruyxatUzgartirish = document.querySelector('.ruyxatUzgartirish')?.value;
    let izohMatniUzgartirish = document.querySelector('.izohMatniUzgartirish')?.value;

    // let visibleInputsCheckbox = document.querySelector('.visibleInputs');

    let fileId = [];
    // let count = 0;
    // let selectCheckboxIjro = document.querySelectorAll('.selectCheckboxIjro');
    // selectCheckboxIjro.forEach((d) => {
    //     if (d.checked) {
    //         fileId.push(d.getAttribute('idInput'));
    //     }
    // });
    // count = fileId.length;

    for (let i = 0; i < files?.length; i++) {
      const formData = new FormData()
      // let fileType = (files[i]?.type === "application/zip" || files[i]?.type === "application/gzip" || files[i]?.type === "application/msword" || files[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || files[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || files[i]?.type === "application/vnd.ms-powerpoint" || files[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || files[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || files[i]?.type === "application/vnd.ms-excel" || files[i]?.type === "application/x-rar-compressed" || files[i]?.type === "application/pdf");

      // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
      // if (fileType) {
        formData.append("file", files[i]);
        let res = await axiosInstance.post("document/saveDuplicateFile/" + JSON.parse(localStorage.getItem('oi')), formData)
        fileId.push(res.data);
      }
    // }

    // oldingi tanlangan file id larini olish
    chooseFiles.forEach((d) => {
      fileId.push(d.id);
    })

    // let cardTypeUzgartirishId = notParentsCard.filter((d) => {
    //     return d.label === cardTypeUzgartirish;
    // })

    // // cardtypeid
    // let cardNameUzgartirishId = cardsName?.filter((d, i) => {
    //     return cardNameUzgartirish === d.label;
    // })

    if (fileId.length > 0) {
      if (izohMatniUzgartirish.length > 0) {
        try {
          if (params.name === "bajarish") {
            await axiosInstance.post(`forDoing/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatniUzgartirish,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
          if (params.name === "umumlashtiruvchi") {
            await axiosInstance.post(`gen/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatniUzgartirish,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
          if (params.name === "bajarilmagan") {
            await axiosInstance.post(`notDoneDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatniUzgartirish,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
          if (params.name === "radEtilgan") {
            await axiosInstance.post(`rejectedDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatniUzgartirish,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
          Alert(setAlert, "success", "Загружено успешно!");
          setOpenIjroniUzgartirish({ open: false, obj: {} });
          setChange(!change);
          setFile1(null);
          setFiles([]);
        } catch (error) {
          console.log(error.response);
        }
      } else {
        Alert(setAlert, "warning", "Требуется комментарий");
      }
    } else {
      Alert(setAlert, "warning", "Выбор файла обязателен");
    }

    // if (visibleInputsCheckbox.checked) {
    //     if (izohMatniUzgartirish.length > 0) {

    //     } else {
    //         Alert(setAlert, "warning", "Izoh matni kiritilmagan");
    //         setOpenIjroniUzgartirish({ open: false, obj: {} });
    //     }
    // } else {
    //     if (fileId.length > 0) {
    //         if (cardTypeUzgartirish) {
    //             if (cardNameUzgartirish) {
    //                 if (izohMatniUzgartirish.length > 0) {
    //                     if (ruyxatUzgartirish) {
    //                         try {
    //                             if (params.name === "bajarish") {
    //                                 await axiosInstance.post(`forDoing/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatniUzgartirish,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeUzgartirishId[0]?.value,
    //                                     journalId: cardNameUzgartirishId[0]?.value,
    //                                     journalNumber: ruyxatUzgartirish,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             if (params.name === "umumlashtiruvchi") {
    //                                 await axiosInstance.post(`gen/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatniUzgartirish,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeUzgartirishId[0]?.value,
    //                                     journalId: cardNameUzgartirishId[0]?.value,
    //                                     journalNumber: ruyxatUzgartirish,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             if (params.name === "bajarilmagan") {
    //                                 await axiosInstance.post(`notDoneDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatniUzgartirish,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeUzgartirishId[0]?.value,
    //                                     journalId: cardNameUzgartirishId[0]?.value,
    //                                     journalNumber: ruyxatUzgartirish,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             if (params.name === "radEtilgan") {
    //                                 await axiosInstance.post(`rejectedDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatniUzgartirish,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeUzgartirishId[0]?.value,
    //                                     journalId: cardNameUzgartirishId[0]?.value,
    //                                     journalNumber: ruyxatUzgartirish,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             setChange(!change);
    //                             setOpenIjroniUzgartirish({ open: false, obj: {} });
    //                             Alert(setAlert, "success", "Ma'lumot muvaffaqiyatli o'zgartirildi");
    //                             setFile1(null);
    //                             setIjroDataYuklash([]);
    //                         } catch (error) {
    //                             console.log(error.response);
    //                             Alert(setAlert, "warning", error.response?.data);
    //                             setOpenIjroniUzgartirish({ open: false, obj: {} });
    //                         }
    //                     } else {
    //                         Alert(setAlert, "warning", "Jurnal raqami kiritilmagan");
    //                         setOpenIjroniUzgartirish({ open: false, obj: {} });
    //                     }
    //                 } else {
    //                     Alert(setAlert, "warning", "Izoh kiritilmagan");
    //                     setOpenIjroniUzgartirish({ open: false, obj: {} });
    //                 }
    //             } else {
    //                 Alert(setAlert, "warning", "Card nomi tanlanmagan");
    //                 setOpenIjroniUzgartirish({ open: false, obj: {} });
    //             }
    //         } else {
    //             Alert(setAlert, "warning", "Card tanlanmagan");
    //             setOpenIjroniUzgartirish({ open: false, obj: {} });
    //         }
    //     } else {
    //         Alert(setAlert, "warning", "Fayl tanlash majburiy");
    //         setOpenIjroniUzgartirish({ open: false, obj: {} });
    //     }
    // }
  }

  return (
    <div className="adminWindow " style={{ display: openIjroniUzgartirish.open ? "block" : "none" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content adminWindowHeight">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Исполнительный документ</h6>
            <button type="button" className="close" onClick={() => setOpenIjroniUzgartirish({ open: false, obj: {} })}>&times;</button>
          </div>
          {/* <div className="row ">
                            <div className="col-lg-12 d-flex align-items-center pl-4 pt-2">
                                <input
                                    type="checkbox"
                                    onClick={(e) => clickCheckboxed(e)}
                                    style={{ width: "18px", height: "18px" }}
                                    className="cursor-pointer mr-1 visibleInputs mb-0"
                                // defaultChecked={!(openIjroniUzgartirish.obj?.executeDocument?.moduleName || openIjroniUzgartirish.obj?.executeDocument?.journalName || openIjroniUzgartirish.obj?.executeDocument?.journalNumber || openIjroniUzgartirish.obj?.executeDocument?.otherFiles.length > 0)}
                                />
                                <label className="mb-0">Faqat faylni tanlash</label>
                            </div>
                        </div> */}
          <div className="modal-body">
            {/* <div className="form-group form-group-floating visibleForm1" style={{ display: "none" }}>
                                <div className="row">
                                    <div className="col-lg-4 mb-3">
                                        <label className="mb-0" style={{ fontSize: "12px", fontWeight: "bold" }}>Modul tanlash:</label>
                                        <Select
                                            defaultValue={{ value: openIjroniUzgartirish.obj?.executeDocument?.moduleName, label: openIjroniUzgartirish.obj?.executeDocument?.moduleName }}
                                            options={notParentsCard}
                                            onChange={notParentsCardClick}
                                            placeholder="Kiruvchi"
                                            className="cardType cardTypeYuklash"
                                            isClearable={true}
                                            styles={colourStyles}
                                        />
                                    </div>
                                    <div className="col-lg-5 mb-3">
                                        <label className="mb-0" style={{ fontSize: "12px", fontWeight: "bold" }}>Jurnal:</label>
                                        <Select
                                            defaultValue={{ value: openIjroniUzgartirish.obj?.executeDocument?.journalName, label: openIjroniUzgartirish.obj?.executeDocument?.journalName }}
                                            options={cardsName}
                                            // onChange={logChange}
                                            placeholder="Jurnal"
                                            className="cardName cardNameYuklash"
                                            isClearable={true}
                                            styles={colourStyles}
                                        />
                                    </div>
                                    <div className="col-lg-2 mb-3">
                                        <label className="mb-0" style={{ fontSize: "12px", fontWeight: "bold" }}>Ro'yxatga:</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-outline ruyxatUzgartirish"
                                            onChange={(e) => setSearchReg(e.target.value)}
                                            placeholder="Reg№"
                                            defaultValue={openIjroniUzgartirish.obj?.executeDocument?.journalId}
                                        />
                                    </div>
                                    <div className="col-lg-1 d-flex align-items-center">
                                        <i className="fas fa-search text-white iconIjroCOntent" onClick={getFile}></i>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered datatable-select-single table-striped table-hover Tab">
                                            <tbody>
                                                {ijroDataYulash?.length > 0 && ijroDataYulash?.map((d, i) => (
                                                    <tr key={i}>
                                                        <td className="d-flex align-items-center justify-content-between">
                                                            <a href={url + "/api/file/view/" + d?.id}>{d?.originalName}</a>
                                                            <input type="checkbox" style={{ width: "30px", height: "20px" }} className="selectCheckboxIjro" idInput={d?.id} />
                                                        </td>
                                                    </tr>
                                                ))}
                                                {otherFiles?.length > 0 && otherFiles?.map((d, i) => (
                                                    <tr key={i}>
                                                        <td className="d-flex align-items-center justify-content-between">
                                                            <a href={url + "/api/file/view/" + d?.id}>{d?.originalName}</a>
                                                            <input
                                                                type="checkbox"
                                                                style={{ width: "30px", height: "20px" }}
                                                                className="selectCheckboxIjro"
                                                                idInput={d.id}
                                                                defaultChecked={true}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div> */}
            <div className="row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <textarea
                    cols="5"
                    rows="5"
                    id="malumot"
                    maxLength="300"
                    className="form-control form-control-outline izohMatniUzgartirish"
                    placeholder="Комментарий"
                    defaultValue={openIjroniUzgartirish.obj?.executeDocument?.comment}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-body pt-0 mt-2 px-0">
              <div className="form-group w-100 mb-0">
                <span className="text-muted">{chooseFiles?.length > 0 ? chooseFiles?.length + " файл выбран" : "Загрузить файл"}</span>
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
                    {files?.length > 0 ? `${files?.length} файл выбран` : "Загрузить файл"}
                  </span>
                </label>
                <label className="d-block text-muted mb-0">Фиксированные форматы:doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
              </div>
            </div>
            <div className="text-right">
              <span className="errorAddIjro text-danger"></span>
            </div>

            {/* all files select */}
            <div className="row">
              <div className="col-lg-12">
                <ul className="mb-0">
                  {chooseFiles?.length > 0 && chooseFiles.map((hujjat, i) => (
                    <ChooseFiles
                      hujjat={hujjat}
                      i={i}
                      deleteFile1={deleteFile1}
                    />
                  ))}
                </ul>
                <ul>
                  {files?.length > 0 && files.map((hujjat, i) => (
                    <AllFilesInline
                      hujjat={hujjat}
                      i={i}
                      deleteFile={deleteFile2}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer pr-0">
              <button type="button" className="btn btn-primary" onClick={() => ijroHujjatiniUzgartirishSaqlash(openIjroniUzgartirish.obj)}>Сохранять</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(IjroniUzgartirish);