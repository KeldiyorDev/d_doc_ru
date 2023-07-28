import React from "react";
import { url } from "../../../../../../../../config";

const ViewAllFilesSettings = ({ data, setDeleteModal }) => {
  return (
    data?.files?.length > 0 && data.files.map((hujjat, index) => (
      hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
        <div key={index}
          className="d-flex align-items-center justify-content-between mb-3 shadowBox py-2">
          {/* file rasmi */}
          <div className="d-flex align-items-center">
            <i className="far fa-file-pdf mr-3 fa-2x pdfIcon"
              style={{ fontSize: "50px", paddingLeft: "16px" }} />
            <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" style={{ fontSize: "18px" }} rel="noopener noreferrer">PDF FILE</a>
          </div>
          {/* fileni o'chirish ikonkasi */}
          <i className="fas fa-trash-alt mr-3 fa-2x trashTag"
            onClick={() => setDeleteModal({
              open: true,
              obj: hujjat
            })} />
        </div>
      ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
        <div key={index}
          className="d-flex align-items-center justify-content-between mb-3 shadowBox">
          {/* file rasmi */}
          <div className="d-flex align-items-center">
            <i className="far fa-file-word mr-3 fa-2x wordIcon"
              style={{ fontSize: "50px", paddingLeft: "16px" }} />
            <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px" }}>WORD FILE</a>
          </div>
          {/* fileni o'chirish ikonkasi */}
          <i className="fas fa-trash-alt mr-3 fa-2x trashTag"
            onClick={() => setDeleteModal({
              open: true,
              obj: hujjat
            })} />
        </div>
      ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
        <div key={index}
          className="d-flex align-items-center justify-content-between mb-3 shadowBox">
          {/* file rasmi */}
          <div className="d-flex align-items-center">
            <i className="far fa-file-excel mr-3 fa-2x excelIcon"
              style={{ fontSize: "50px", paddingLeft: "16px" }} />
            <a href={url + "/api/file/view/" + hujjat?.generatedName} rel="noopener noreferrer" target="_blank" style={{ fontSize: "18px" }}>EXCEL FILE</a>
          </div>
          {/* fileni o'chirish ikonkasi */}
          <i className="fas fa-trash-alt mr-3 fa-2x trashTag"
            onClick={() => setDeleteModal({
              open: true,
              obj: hujjat
            })} />
        </div>
      ) : (hujjat?.extention.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
        <div key={index}
          className="d-flex align-items-center justify-content-between mb-3 shadowBox">
          {/* file rasmi */}
          <div className="d-flex align-items-center">
            <i className="far fa-file-powerpoint mr-3 fa-2x pptIcon"
              style={{ fontSize: "50px", paddingLeft: "16px" }} />
            <a href={url + "/api/file/view/" + hujjat?.generatedName} rel="noopener noreferrer" target="_blank" style={{ fontSize: "18px" }}>POWERPOINT FILE</a>
          </div>
          {/* fileni o'chirish ikonkasi */}
          <i className="fas fa-trash-alt mr-3 fa-2x trashTag"
            onClick={() => setDeleteModal({
              open: true,
              obj: hujjat
            })} />
        </div>
      ) : (
        <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox">
          {/* file rasmi */}
          <div className="d-flex align-items-center">
            <i className="far fa-file-archive mr-3 fa-2x rarIcon"
              style={{ fontSize: "50px", paddingLeft: "16px" }} />
            <a href={url + "/api/file/view/" + hujjat?.generatedName} rel="noopener noreferrer" target="_blank" style={{ fontSize: "18px" }}>ZIP,RAR FILE</a>
          </div>
          {/* fileni o'chirish ikonkasi */}
          <i className="fas fa-trash-alt mr-3 fa-2x trashTag"
            onClick={() => setDeleteModal({
              open: true,
              obj: hujjat
            })} />
        </div>
      )
    ))
  )
}

export default React.memo(ViewAllFilesSettings);