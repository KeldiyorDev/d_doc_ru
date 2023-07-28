import React from "react";

const MainAllFiles = ({ hujjat, index }) => {
  return (
    hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pdf" ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
            style={{ fontSize: "20px" }} />
          {/* <a href={url + "/api/file/view/" + hujjat.id} target="_blank" rel="noreferrer noopener">PDF FILE</a> */}
          {hujjat?.originalName}
        </th>
      </tr>
    ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "doc" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "docx") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-word mr-2 fa-2x wordIcon"
            style={{ fontSize: "20px" }} />
          {hujjat?.originalName}
        </th>
      </tr>
    ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xls" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xlsx") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-excel mr-2 fa-2x excelIcon"
            style={{ fontSize: "20px" }} />
          {hujjat?.originalName}
        </th>
      </tr>
    ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "ppt" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pptx") ? (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
            style={{ fontSize: "20px" }} />
          {hujjat?.originalName}
        </th>
      </tr>
    ) : (
      <tr key={index}>
        <th className="d-flex align-items-center cursor-pointer">
          <i className="far fa-file-archive mr-2 fa-2x rarIcon"
            style={{ fontSize: "20px" }}></i>
          {hujjat?.originalName}
        </th>
      </tr>
    )
  )
}

export default React.memo(MainAllFiles);