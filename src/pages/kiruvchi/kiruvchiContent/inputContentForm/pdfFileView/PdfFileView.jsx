import React from "react";
import AllFilesView from "./AllFilesView";

const PdfFileView = ({ deleteFile, file }) => {
  return (
    <ul>
      {file?.length > 0 && Object.values(file)?.map((hujjat, i) => (
        <AllFilesView
          hujjat={hujjat}
          key={i}
          i={i}
          deleteFile={deleteFile}
        />
      ))}
    </ul>
  )
}

export default React.memo(PdfFileView);