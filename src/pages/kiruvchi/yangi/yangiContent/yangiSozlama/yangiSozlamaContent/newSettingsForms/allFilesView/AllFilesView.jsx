import React from "react";
import { url, urlOut } from "../../../../../../../../config";
import { excelOption, pdfOption, powerPointOption, wordOption } from "../../../../../../../chiquvchi2/utils/FileOption";
import { useParams } from "react-router-dom";

const AllFilesView = ({ data }) => {
  const params = useParams()
  return (
    <div>
      {data?.files?.length > 0 && (
        data?.files?.map((hujjat, index) => (
          (index !== 0) && (
            (pdfOption.includes(hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1]) ||
              pdfOption.includes(hujjat?.filePath?.split('.')[hujjat?.filePath?.split('/').length - 1])) ? (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox py-2">
                {/* file rasmi */}
                <div className="d-flex align-items-center">
                  <i className="far fa-file-pdf mr-3 fa-2x pdfIcon" style={{ fontSize: "50px", paddingLeft: "16px" }} />
                  {
                    params?.id ? (
                      <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">PDF FILE</a>
                    ) : (
                      <a href={urlOut + `file/` + hujjat?.originalName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">PDF FILE</a>
                    )
                  }
                </div>
                {/* fileni o'chirish ikonkasi  ( onClick={() => setDeleteModal({ open: true, obj: hujjat })} )*/}
                <i className="fas fa-trash-alt mr-3 fa-2x trashTag" />
              </div>
            ) : (wordOption.includes(hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1]) ||
              wordOption.includes(hujjat?.filePath?.split('.')[hujjat?.filePath?.split('.').length - 1])) ? (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox">
                {/* file rasmi */}
                <div className="d-flex align-items-center">
                  <i className="far fa-file-word mr-3 fa-2x wordIcon" style={{ fontSize: "50px", paddingLeft: "16px" }} />
                  <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }}>WORD FILE</a>
                  {
                    params?.id ? (
                      <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">PDF FILE</a>
                    ) : (
                      <a href={urlOut + `file/` + hujjat?.originalName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">PDF FILE</a>
                    )
                  }
                </div>
                {/* fileni o'chirish ikonkasi */}
                <i className="fas fa-trash-alt mr-3 fa-2x trashTag" />
              </div>
            ) : (excelOption.includes(hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1]) ||
              excelOption.includes(hujjat?.filePath?.split('.')[hujjat?.filePath?.split('.').length - 1])) ? (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox">
                {/* file rasmi */}
                <div className="d-flex align-items-center">
                  <i className="far fa-file-excel mr-3 fa-2x excelIcon" style={{ fontSize: "50px", paddingLeft: "16px" }} />
                  {
                    params?.id ? (
                      <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">EXCEL FILE</a>
                    ) : (
                      <a href={urlOut + `file/` + hujjat?.originalName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">EXCEL FILE</a>
                    )
                  }
                </div>
                {/* fileni o'chirish ikonkasi */}
                <i className="fas fa-trash-alt mr-3 fa-2x trashTag" />
              </div>
            ) : (powerPointOption.includes(hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1]) ||
              powerPointOption.includes(hujjat?.filePath?.split('.')[hujjat?.filePath?.split('.').length - 1])) ? (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox">
                {/* file rasmi */}
                <div className="d-flex align-items-center">
                  <i className="far fa-file-powerpoint mr-3 fa-2x pptIcon" style={{ fontSize: "50px", paddingLeft: "16px" }} />
                  {
                    params?.id ? (
                      <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">POWERPOINT FILE</a>
                    ) : (
                      <a href={urlOut + `file/` + hujjat?.originalName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">POWERPOINT FILE</a>
                    )
                  }
                </div>
                {/* fileni o'chirish ikonkasi */}
                <i className="fas fa-trash-alt mr-3 fa-2x trashTag" />
              </div>
            ) : (
              <div key={index} className="d-flex align-items-center justify-content-between mb-3 shadowBox">
                {/* file rasmi */}
                <div className="d-flex align-items-center">
                  <i className="far fa-file-archive mr-2 fa-2x rarIcon" style={{ fontSize: "50px", paddingLeft: "16px" }} />
                  {
                    params?.id ? (
                      <a href={url + `/api/file/view/` + hujjat?.generatedName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">ZIP, RAR FILE</a>
                    ) : (
                      <a href={urlOut + `file/` + hujjat?.originalName} style={{ fontSize: "18px" }} target="_blank" rel="noreferrer">ZIP, RAR FILE</a>
                    )
                  }
                </div>
                {/* fileni o'chirish ikonkasi */}
                <i className="fas fa-trash-alt mr-3 fa-2x trashTag" />
              </div>
            )
          )
        ))
      )}
    </div>
  )
}

export default React.memo(AllFilesView);