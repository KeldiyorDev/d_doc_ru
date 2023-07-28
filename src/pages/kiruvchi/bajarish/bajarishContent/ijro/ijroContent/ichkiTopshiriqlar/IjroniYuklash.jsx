import React, { useState } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";
import AllFilesInline from "./AllFilesInline";

const IjroniYuklash = ({ openIjroniYuklash, setOpenIjroniYuklash, params, setAlert, setChange, change }) => {
  const [file, setFile] = useState(null);

  const uploadFile = (e) => {
    setFile(null);
    setTimeout(() => {
      setFile(e.target.files);
    }, 100);
  }

  const deleteFile = (index) => {
    let arr = Object.values(file)?.filter((f, i) => {
      return i !== index;
    });
    setFile(arr);
  }

  // ijro hujjatini saqlash
  const ijroHujjatiniSaqlash = async (dat) => {
    // let cardType = document.querySelector('.cardTypeYuklash')?.querySelector('.css-qc6sy-singleValue')?.textContent;
    // let cardName = document.querySelector('.cardNameYuklash')?.querySelector('.css-qc6sy-singleValue')?.textContent;
    // let ruyxatNumber = document.querySelector('.ruyxatNumber').value;
    let izohMatni = document.querySelector('.izohMatni')?.value;

    let fileId = [];
    // let selectCheckboxIjro = document.querySelectorAll('.selectCheckboxIjro');
    // selectCheckboxIjro.forEach((d) => {
    //     if (d.checked) {
    //         fileId.push(d.getAttribute('idInput'));
    //     }
    // });
    // let count = 0;
    // count = fileId.length;

    // let cardTypeId = notParentsCard.filter((n) => {
    //     return n.label === cardType;
    // })

    // let cardNameId = cardsName.filter((n) => {
    //     return n.label === cardName;
    // })

    // let visibleInputsCheckbox = document.querySelector('.visibleInputs');

    for (let i = 0; i < file?.length; i++) {
      const formData = new FormData()
      let fileType = (file[i]?.type === "application/zip" || file[i]?.type === "application/gzip" || file[i]?.type === "application/msword" || file[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file[i]?.type === "application/vnd.ms-powerpoint" || file[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file[i]?.type === "application/vnd.ms-excel" || file[i]?.type === "application/x-rar-compressed" || file[i]?.type === "application/pdf");

      // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
      // if (fileType) {
      formData.append("file", file[i]);
      let res = await axiosInstance.post("document/saveDuplicateFile/" + JSON.parse(localStorage.getItem('oi')), formData)
      fileId.push(res.data);
    }
    // }

    if (fileId.length > 0) {
      if (izohMatni?.length > 0) {
        try {
          if (params.name === "bajarish") {
            await axiosInstance.post(`forDoing/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatni,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
          if (params.name === "umumlashtiruvchi") {
            await axiosInstance.post(`gen/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
              comment: izohMatni,
              filesId: fileId,
              moduleId: null,
              journalId: null,
              journalNumber: null,
              otherFilesCount: 0
            })
          }
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
          setOpenIjroniYuklash({ open: false, obj: {} });
          setChange(!change);
          setFile(null);
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert(setAlert, "warning", "Izoh kiritish majburiy");
        setOpenIjroniYuklash({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Fayl tanlash majburiy");
      setOpenIjroniYuklash({ open: false, obj: {} });
    }

    // if (visibleInputsCheckbox.checked) {
    //     if (izohMatni?.length > 0) {

    //     } else {
    //         Alert(setAlert, "warning", "Izoh matni kiritilmagan");
    //         setOpenIjroniYuklash({ open: false, obj: {} });
    //     }
    // } else {
    //     if (fileId.length > 0) {
    //         if (cardType) {
    //             if (cardName) {
    //                 if (ruyxatNumber) {
    //                     if (izohMatni.length > 0) {
    //                         try {
    //                             if (params.name === "bajarish") {
    //                                 await axiosInstance.post(`forDoing/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatni,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeId[0].value,
    //                                     journalId: cardNameId[0].value,
    //                                     journalNumber: ruyxatNumber,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             if (params.name === "umumlashtiruvchi") {
    //                                 await axiosInstance.post(`gen/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatni,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeId[0].value,
    //                                     journalId: cardNameId[0].value,
    //                                     journalNumber: ruyxatNumber,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             if (params.name === "bajarilmagan") {
    //                                 await axiosInstance.post(`notDoneDocs/${JSON.parse(localStorage.getItem('ids'))}/${dat.documentId}`, {
    //                                     comment: izohMatni,
    //                                     filesId: fileId,
    //                                     moduleId: cardTypeId[0].value,
    //                                     journalId: cardNameId[0].value,
    //                                     journalNumber: ruyxatNumber,
    //                                     otherFilesCount: count
    //                                 }, {
    //                                     headers: {
    //                                         Authorization: "Bearer " + currentUser
    //                                     }
    //                                 })
    //                             }
    //                             document.querySelector('.ijroSana').value = "";
    //                             document.querySelector('.izohMatni').value = "";
    //                             setChange(!change);
    //                             setOpenIjroniYuklash({ open: false, obj: {} });
    //                             Alert(setAlert, "success", "Muvaffaqiyatli yuklandi!");
    //                             setFile(null);
    //                         } catch (error) {
    //                             console.log(error.response);
    //                             Alert(setAlert, "warning", error.response?.data);
    //                             setOpenIjroniYuklash({ open: false, obj: {} });
    //                         }
    //                     } else {
    //                         Alert(setAlert, "warning", "Ko'pi bilan 300 ta harfdan iborat bo'lishi kerak");
    //                         setOpenIjroniYuklash({ open: false, obj: {} });
    //                     }
    //                 } else {
    //                     Alert(setAlert, "warning", "Ruyxat nomer kiritilmagan");
    //                     setOpenIjroniYuklash({ open: false, obj: {} });
    //                 }
    //             } else {
    //                 Alert(setAlert, "warning", "Card nomi tanlanmagan");
    //                 setOpenIjroniYuklash({ open: false, obj: {} });
    //             }
    //         } else {
    //             Alert(setAlert, "warning", "Card tanlanmagan");
    //             setOpenIjroniYuklash({ open: false, obj: {} });
    //         }
    //     }
    // }

    // if (fileId?.length > 0 || file?.length > 0) {
    //     if (izohMatni?.length < 301) {

    //     } else {
    //         Alert(setAlert, "warning", "Kamida 150 ta harfdan ko'pi bilan 300 ta harfdan iborat bo'lishi kerak");
    //         setOpenIjroniYuklash({ open: false, obj: {} });
    //     }
    // } else {
    //     Alert(setAlert, "warning", "Fayl tanlash majburiy");
    //     setOpenIjroniYuklash({ open: false, obj: {} });
    // }
  }

  return (
    <div className="adminWindow" style={{ display: openIjroniYuklash.open ? "block" : "none" }}>
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content" style={{ maxHeight: "700px", overflowY: "scroll" }}>
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title"
              style={{ fontWeight: "bold", textTransform: "upperCase" }}>
              Ijro hujjati</h6>
            <button type="button" className="close" onClick={() => setOpenIjroniYuklash({ open: false, obj: {} })}>&times;</button>
          </div>
          {/* <div className="row ">
                        <div className="col-lg-12 d-flex align-items-center pl-4 pt-2">
                            <input
                                type="checkbox"
                                style={{ width: "18px", height: "18px" }}
                                className="cursor-pointer mr-1 visibleInputs mb-0"
                                defaultChecked={true}
                                onClick={(e) => clickCheckboxed0(e)}
                            />
                            <label className="mb-0">Faqat faylni tanlash</label>
                        </div>
                    </div> */}
          <div className="modal-body">
            {/* <div className="form-group form-group-floating visibleForm" style={{ display: "none" }}>
                            <div className="row">
                                <div className="col-lg-4 mb-3">
                                    <label className="mb-0" style={{ fontSize: "12px", fontWeight: "bold" }}>Modul tanlash:</label>
                                    <Select
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
                                        options={cardsName}
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
                                        className="form-control form-control-outline ruyxatNumber"
                                        onChange={(e) => setSearchReg(e.target.value)}
                                        placeholder="Reg№"
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
                                                        <a href={url + "/api/file/view/" + d.id}>{d?.originalName}</a>
                                                        <input type="checkbox" style={{ width: "30px", height: "20px" }} className="selectCheckboxIjro" idInput={d?.id} />
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
                    minLength="150"
                    maxLength="300"
                    className="form-control form-control-outline izohMatni"
                    placeholder="Комментарий"
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
                <label className="d-block text-muted mb-0">Фиксированные форматы:doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
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
                    <AllFilesInline
                      hujjat={hujjat}
                      i={i}
                      deleteFile={deleteFile}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer pr-0">
              <button type="button" className="btn btn-primary" onClick={() => ijroHujjatiniSaqlash(openIjroniYuklash.obj)}>Сохранять</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(IjroniYuklash);