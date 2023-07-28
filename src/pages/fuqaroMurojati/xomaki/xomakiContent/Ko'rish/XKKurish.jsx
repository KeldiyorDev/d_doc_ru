import React from "react";
import { urlFq } from "../../../../../config";

export default function XKKurish({ data }) {
  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{
              fontWeight: "bold",
              textTransform: "upperCase"
            }}>Kiruvchi</h6>
          </div>
          <div className="card-body">
            <div className="p-0">
              <table
                className="table table-bordered table-striped table-hover Tab">
                <tbody>
                  {data?.files?.length > 0 && data?.files?.map((hujjat, index) => (
                    hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pdf" ? (
                      <tr key={index}>
                        <th className="d-flex align-items-center cursor-pointer">
                          <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                            style={{ fontSize: "20px" }} />
                          <a href={urlFq + "/api/file/view/" + hujjat?.id}
                            target="_blank"
                            rel="noreferrer noopener">PDF FILE</a>
                        </th>
                      </tr>
                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "doc" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "docx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                      <tr key={index}>
                        <th className="d-flex align-items-center cursor-pointer">
                          <i className="far fa-file-word mr-2 fa-2x wordIcon"
                            style={{ fontSize: "20px" }} />
                          <a href={urlFq + "/api/file/view/" + hujjat?.id}
                            target="_blank"
                            rel="noreferrer noopener">WORD FILE</a>
                        </th>
                      </tr>
                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xls" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "xlsx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                      <tr key={index}>
                        <th className="d-flex align-items-center cursor-pointer">
                          <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                            style={{ fontSize: "20px" }} />
                          <a href={urlFq + "/api/file/view/" + hujjat?.id}
                            target="_blank"
                            rel="noreferrer noopener">EXCEL FILE</a>
                        </th>
                      </tr>
                    ) : (hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "ppt" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "pptx" || hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                      <tr key={index}>
                        <th className="d-flex align-items-center cursor-pointer">
                          <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                            style={{ fontSize: "20px" }} />
                          <a href={urlFq + "/api/file/view/" + hujjat?.id}
                            target="_blank"
                            rel="noreferrer noopener">POWERPOINT
                            FILE</a>
                        </th>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <th className="d-flex align-items-center cursor-pointer">
                          <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                            style={{ fontSize: "20px" }}></i>
                          <a href={urlFq + "/api/file/view/" + hujjat?.id}
                            target="_blank"
                            rel="noreferrer noopener">ZIP, RAR
                            FILE</a>
                        </th>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}