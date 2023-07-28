import React from "react";
import { url } from "../../../config";

export default function AllFiles({ hujjat }) {
  return (
    hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
      <span
        className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
          style={{ fontSize: "20px" }} />
        <a className="pt-1"
          href={url + "/api/file/view/" + hujjat?.generatedName}
          target="_blank" rel="noopener noreferrer">PDF FILE</a>
      </span>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
      <span
        className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-word mr-1 fa-2x wordIcon"
          style={{ fontSize: "20px" }} />
        <a className="pt-1"
          href={url + "/api/file/view/" + hujjat?.generatedName}
          target="_blank" rel="noopener noreferrer">WORD FILE</a>
      </span>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
      <span
        className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
          style={{ fontSize: "20px" }} />
        <a className="pt-1"
          href={url + "/api/file/view/" + hujjat?.generatedName}
          target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
      </span>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
      <span
        className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
          style={{ fontSize: "20px" }} />
        <a className="pt-1"
          href={url + "/api/file/view/" + hujjat?.generatedName}
          target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
      </span>
    ) : (
      <span
        className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-archive mr-1 fa-2x rarIcon"
          style={{ fontSize: "20px" }}></i>
        <a className="pt-1"
          href={url + "/api/file/view/" + hujjat?.generatedName}
          target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
      </span>
    )
  )
}