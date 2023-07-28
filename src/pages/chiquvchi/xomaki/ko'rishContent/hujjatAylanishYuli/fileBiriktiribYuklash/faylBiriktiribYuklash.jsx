import React, {useEffect, useState} from "react";
import {urlOut} from "../../../../../../config";

const ChiquvchiFileBiriktiribYuklash = ({data, params}) => {
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
        window.open(`${urlOut}/file/${id}`)
    }


    return (
        data?.baseFiles?.length>0&&
        <div className={' card-box col-lg-12'}>
            <div className={'card mt-3'}>
                <div
                    className="card-header bg-primary text-white header-elements-inline">
                    <h6 className="card-title"
                        style={{
                            fontWeight: "bold",
                            textTransform: "upperCase"
                        }}>Biriktirilgan fayllar</h6>
                </div>
                <div className="card-body border ">
                    <div className="border d-flex">
                        <table
                            className="table table-bordered table-striped table-hover Tab">
                            <tbody>
                            {
                                data?.baseFiles?.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <th className=" border p-2"
                                                    style={{width: '30%'}}>
                                                    {
                                                        item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                        - 1] === "pdf" ? (
                                                                <span
                                                                    className="d-flex align-items-center cursor-pointer mb-1">
                                                                    <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
                                                                       style={{fontSize: "20px"}}/>
                                                                        <a className="pt-1"
                                                                           href={urlOut + "file/" + item?.id}
                                                                           target="_blank" rel="noopener noreferrer">PDF FILE</a>
                                                                 </span>
                                                            ) :
                                                            (item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                - 1] === "doc" ||
                                                                item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                - 1] === "docx" ||
                                                                item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                - 1] ===
                                                                "vnd.openxmlformats-officedocument.wordprocessingml.document")
                                                                ? (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                                           style={{fontSize: "20px"}}/>
                                                                        <a className="pt-1"
                                                                           href={urlOut + "file/" + item?.id}
                                                                           target="_blank" rel="noopener noreferrer">WORD FILE</a>
                                                                    </span>
                                                                ) :
                                                                (item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                    - 1] === "xls" ||
                                                                    item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                    - 1] === "xlsx" ||
                                                                    item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                    - 1] ===
                                                                    "vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                                                                    ? (
                                                                        <span
                                                                            className="d-flex align-items-center cursor-pointer mb-1">
                                                                            <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                                               style={{fontSize: "20px"}}/>
                                                                            <a className="pt-1"
                                                                               href={urlOut + "file/" + item?.id}
                                                                               target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
                                                                        </span>
                                                                    ) :
                                                                    (item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                        - 1] === "ppt" ||
                                                                        item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                        - 1] === "pptx" ||
                                                                        item?.contentType?.split('/')[item?.contentType?.split('/').length
                                                                        - 1] ===
                                                                        "vnd.openxmlformats-officedocument.presentationml.presentation")
                                                                        ? (
                                                                            <span
                                                                                className="d-flex align-items-center cursor-pointer mb-1">
                                                                                <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                                                   style={{fontSize: "20px"}}/>
                                                                                <a className="pt-1"
                                                                                   href={urlOut + "file/" + item?.id}
                                                                                   target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
                                                                            </span>
                                                                        ) : (
                                                                            <span
                                                                                className="d-flex align-items-center cursor-pointer mb-1">
                                                                                <i className="far fa-file-archive mr-1 fa-2x rarIcon"
                                                                                   style={{fontSize: "20px"}}></i>
                                                                                <a className="pt-1"
                                                                                   href={urlOut + "file/" + item?.id}
                                                                                   target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
                                                                            </span>
                                                                        )
                                                    }
                                                </th>
                                                <th className=" text-color border p-2"
                                                    style={{width: '70%'}}>
                                                    {item?.originalName}
                                                </th>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ChiquvchiFileBiriktiribYuklash)