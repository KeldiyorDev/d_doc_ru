import React, {useEffect, useState} from "react";
import {urlFq} from "../../../../../../../config";

export default function IjroKiruvchi({data, params}) {
    const [isPdf, setIsPdf] = useState([]);

    // pdf bor yoki yo'qligini aniqlash
    useEffect(() => {
        let isMounted = true;
        if (data) {
            let arr = [];
            data?.files?.forEach((file, index) => {
                if (file.extention === "application/pdf") {
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

    const fileSave = (id) => {
      window.open(`${urlFq}/appeal/getAppealFiles/${id}`)
    }

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
                                    (index !== 0) && (
                                        hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                            <tr key={index}>
                                                <th className="d-flex align-items-center cursor-pointer">
                                                    <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                                       style={{fontSize: "20px"}}/>
                                                    <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                       target="_blank" rel="noreferrer noopener">PDF FILE</a>
                                                </th>
                                            </tr>
                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                            <tr key={index}>
                                                <th className="d-flex align-items-center cursor-pointer">
                                                    <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                       style={{fontSize: "20px"}}/>
                                                    <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                       target="_blank" rel="noreferrer noopener">WORD FILE</a>
                                                </th>
                                            </tr>
                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                            <tr key={index}>
                                                <th className="d-flex align-items-center cursor-pointer">
                                                    <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                       style={{fontSize: "20px"}}/>
                                                    <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                       target="_blank" rel="noreferrer noopener">EXCEL FILE</a>
                                                </th>
                                            </tr>
                                        ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                            <tr key={index}>
                                                <th className="d-flex align-items-center cursor-pointer">
                                                    <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                       style={{fontSize: "20px"}}/>
                                                    <a href={urlFq + "/file/view/" + hujjat?.generatedName}
                                                       target="_blank" rel="noreferrer noopener">POWERPOINT FILE</a>
                                                </th>
                                            </tr>
                                        ) : (
                                            <tr key={index}>
                                                <th className="d-flex align-items-center cursor-pointer">
                                                    <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                       style={{fontSize: "20px"}}></i>
                                                    <a href={urlFq + "/api/file/view/" + hujjat?.generatedName}
                                                       target="_blank" rel="noreferrer noopener">ZIP, RAR FILE</a>
                                                </th>
                                            </tr>
                                        )
                                    )
                                ))}
                                {/*{isPdf?.length > 0 && (*/}
                                <tr>
                                    <th className="d-flex align-items-center justify-content-center cursor-pointer text-center  btn btn-primary w-100"
                                        onClick={() => fileSave(data?.appealID)}>
                                       Fayllarni birlashtirib yuklash
                                    </th>
                                </tr>
                                {/*)}*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}