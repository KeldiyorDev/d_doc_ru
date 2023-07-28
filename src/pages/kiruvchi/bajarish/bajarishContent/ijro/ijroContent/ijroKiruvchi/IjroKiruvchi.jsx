import React, { useEffect, useState } from "react";
import { url } from "../../../../../../../config";
import AllFilesKiruvchi from "./AllFilesKiruvchi";

const IjroKiruvchi = ({ data, params }) => {
  const [isPdf, setIsPdf] = useState([]);

  // pdf bor yoki yo'qligini aniqlash
  useEffect(() => {
    let isMounted = true;
    if (data) {
      let arr = [];
      data.document?.files?.forEach((file, index) => {
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
            <h6 className="card-title" style={{
              fontWeight: "bold",
              textTransform: "upperCase"
            }}>Входящий</h6>
          </div>
          <div className="card-body">
            <div className="p-0">
              <table
                className="table table-bordered table-striped table-hover Tab">
                <tbody>
                  {data?.document?.files?.length > 0 && data?.document?.files?.map((hujjat, index) => (
                    (index !== 0) && (
                      <AllFilesKiruvchi key={Math.random()}
                        hujjat={hujjat}
                        index={index}
                      />
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

export default React.memo(IjroKiruvchi);