import React from "react";
import { url } from "../../../../../../../config";

const AllFilesKiruvchi = ({ hujjat, index }) => {
  return (
    hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-pdf mr-2 fa-2x pdfIcon" style={{ fontSize: "20px" }} />
          <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">PDF FILE</a>
        </th>
      </tr>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-word mr-2 fa-2x wordIcon"
            style={{ fontSize: "20px" }} />
          <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">WORD FILE</a>
        </th>
      </tr>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-excel mr-2 fa-2x excelIcon"
            style={{ fontSize: "20px" }} />
          <a href={url + "/api/file/view/" + hujjat?.generatedName}
            target="_blank" rel="noreferrer noopener">EXCEL FILE</a>
        </th>
      </tr>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
            style={{ fontSize: "20px" }} />
          <a href={url + "/api/file/view/" + hujjat?.generatedName}
            target="_blank" rel="noreferrer noopener">POWERPOINT FILE</a>
        </th>
      </tr>
    ) : (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-archive mr-2 fa-2x rarIcon"
            style={{ fontSize: "20px" }}></i>
          <a href={url + "/api/file/view/" + hujjat?.generatedName}
            target="_blank" rel="noreferrer noopener">ZIP, RAR FILE</a>
        </th>
      </tr>
    )
  )
}

export default React.memo(AllFilesKiruvchi);