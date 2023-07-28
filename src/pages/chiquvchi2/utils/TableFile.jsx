import React from 'react';
import { urlOut } from '../../../config';
import { excelOption, pdfOption, powerPointOption, wordOption } from './FileOption';

const TableFile = ({ hujjat, index }) => {
   console.log(hujjat);
   return (
      (pdfOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1])) ? (
         <span key={index} className="d-flex align-items-center cursor-pointer mb-1">
            <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
               style={{ fontSize: "20px" }} />
            <a className="pt-1"
               href={urlOut + "file/" + hujjat?.id}
               target="_blank" rel="noopener noreferrer">PDF FILE</a>
         </span>
      ) : (wordOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1])) ? (
         <span key={index} className="d-flex align-items-center cursor-pointer mb-1">
            <i className="far fa-file-word mr-1 fa-2x wordIcon"
               style={{ fontSize: "20px" }} />
            <a className="pt-1"
               href={urlOut + "file/" + hujjat?.id}
               target="_blank" rel="noopener noreferrer">WORD FILE</a>
         </span>
      ) : (excelOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1])) ? (
         <span key={index} className="d-flex align-items-center cursor-pointer mb-1">
            <i className="far fa-file-excel mr-1 fa-2x excelIcon"
               style={{ fontSize: "20px" }} />
            <a className="pt-1"
               href={urlOut + "file/" + hujjat?.id}
               target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
         </span>
      ) : (powerPointOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1])) ? (
         <span key={index} className="d-flex align-items-center cursor-pointer mb-1">
            <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
               style={{ fontSize: "20px" }} />
            <a className="pt-1"
               href={urlOut + "file/" + hujjat?.id}
               target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
         </span>
      ) : (
         <span key={index} className="d-flex align-items-center cursor-pointer mb-1">
            <i className="far fa-file-archive mr-1 fa-2x rarIcon"
               style={{ fontSize: "20px" }}></i>
            <a className="pt-1"
               href={urlOut + "file/" + hujjat?.id}
               target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
         </span>
      )
   )
}

export default React.memo(TableFile);