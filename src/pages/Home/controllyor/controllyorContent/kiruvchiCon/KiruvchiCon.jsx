import React, { useEffect, useState } from "react";
import { url } from "../../../../../config";

const KiruvchiCon = ({ data, params }) => {
  const [isPdf, setIsPdf] = useState([]);

  // pdf bor yoki yo'qligini aniqlash
  useEffect(() => {
    let isMounted = true;
    if (data) {
      let arr = [];
      data?.document?.files?.forEach((file, index) => {
        if (index !== 0 && file.extention === "application/pdf") {
          arr.push(file.id);
        }
      });
      if (isMounted)
        setIsPdf(arr);
    }

    return () => {
      isMounted = false;
    }
  }, [data]);

  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Входящий</h6>
          </div>
          <div className="card-body">
            <div className="p-0">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody>
                  {data?.document?.files?.length > 0 && data?.document?.files?.map((hujjat, index) => (
                    (index !== 0) && (
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
                  ))}
                  {isPdf.length > 0 && (
                    <tr>
                      <th className="d-flex align-items-center justify-content-end cursor-pointer p-0">
                        <a href={url + `/api/document/getDocumentFiles/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`}
                          className="btn btn-primary w-100"
                        >Загружать файлы вместе</a>
                      </th>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(KiruvchiCon);