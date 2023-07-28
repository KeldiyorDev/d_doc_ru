import React from "react";

const AllFilesInline = ({ hujjat, i, deleteFile }) => {

  return (
    hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-pdf mr-2 fa-2x pdfIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>PDF FILE</span>
        </div>
        <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-word mr-2 fa-2x wordIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>WORD FILE</span>
        </div>
        <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xls" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xlsx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-excel mr-2 fa-2x excelIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>EXCEL FILE</span>
        </div>
        <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>POWERPOINT FILE</span>
        </div>
        <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
      </li>
    ) : (
      <li key={i} className='kiruvchiMain'>
        <div className='d-flex align-items-center'>
          <i className="far fa-file-archive mr-2 fa-2x rarIcon" style={{ fontSize: "28px" }} />
          <span className='pt-1'>ZIP, RAR FILE</span>
        </div>
        <span onClick={() => deleteFile(i)}> <i className="icon-trash"></i></span>
      </li>
    )
  )
}
export default React.memo(AllFilesInline);