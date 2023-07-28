import React from 'react';
import {urlOut} from "../../config";

const File = ({hujjat}) => {
   // console.log(hujjat);
    return (
        ((hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pdf") || (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.ms-powerpoint"))  ? (
            <span
                className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
           style={{fontSize: "20px"}}/>
        <a className="pt-1"
           href={urlOut + "/api/file/view/" + hujjat?.generatedName}
           target="_blank" rel="noopener noreferrer">PDF FILE</a>
      </span>
        ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "doc" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "docx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
            <span
                className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-word mr-1 fa-2x wordIcon"
           style={{fontSize: "20px"}}/>
        <a className="pt-1"
           href={urlOut + "/api/file/view/" + hujjat?.generatedName}
           target="_blank" rel="noopener noreferrer">WORD FILE</a>
      </span>
        ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xls" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xlsx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.ms-excel") ? (
            <span
                className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
           style={{fontSize: "20px"}}/>
        <a className="pt-1"
           href={urlOut + "/api/file/view/" + hujjat?.generatedName}
           target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
      </span>
        ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "ppt" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pptx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
            <span
                className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
           style={{fontSize: "20px"}}/>
        <a className="pt-1"
           href={urlOut + "/api/file/view/" + hujjat?.generatedName}
           target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
      </span>
        ) : (
            <span
                className="d-flex align-items-center cursor-pointer mb-1">
        <i className="far fa-file-archive mr-1 fa-2x rarIcon"
           style={{fontSize: "20px"}}></i>
        <a className="pt-1"
           href={urlOut + "/api/file/view/" + hujjat?.generatedName}
           target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
      </span>
        )
    )
}

export default File;