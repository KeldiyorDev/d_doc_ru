import React from "react";

const ChooseFiles = ({ hujjat, deleteFile1, i }) => {
  return (
    hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-pdf mr-2 fa-2x pdfIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>PDF FILE</span>
        </div>
        <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-word mr-2 fa-2x wordIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>WORD FILE</span>
        </div>
        <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-excel mr-2 fa-2x excelIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>EXCEL FILE</span>
        </div>
        <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>POWERPOINT FILE</span>
        </div>
        <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-archive mr-2 fa-2x rarIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>ZIP, RAR FILE</span>
        </div>
        <span onClick={() => deleteFile1(i)}> <i className="icon-trash"></i></span>
      </li>
    )
  )
}

export default React.memo(ChooseFiles);