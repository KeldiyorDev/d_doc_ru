import React from 'react'
import { urlOut } from '../../../config'
import { excelOption, pdfOption, powerPointOption, wordOption } from './FileOption'

export default function BiriktirilganFayllar({ data }) {
    return (
        data?.baseFiles?.length > 0 && (
            <div className={'card-box col-lg-12'}>
                <div className={'card mt-3'}>
                    <div className="card-header bg-primary text-white header-elements-inline">
                        <h6 className="card-title"
                            style={{
                                fontWeight: "bold",
                                textTransform: "upperCase"
                            }}>Biriktirilgan fayllar</h6>
                    </div>
                    <div className="card-body border ">
                        <div className="border d-flex">
                            <table className="table table-bordered table-striped table-hover Tab">
                                <thead>
                                    <tr>
                                        <th>Fayl</th>
                                        <th>Nomi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data?.baseFiles?.map((item, index) => {
                                            return (
                                                <>
                                                    <tr key={index}>
                                                        <th className=" border p-2"
                                                            style={{ width: '30%' }}>
                                                            {
                                                                (pdfOption.includes(item?.contentType?.split('/')[item?.contentType?.split('/').length - 1]) ||
                                                                    pdfOption.includes(item?.name?.split('.')[item?.name?.split('.').length - 1])) ? (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
                                                                            style={{ fontSize: "20px" }} />
                                                                        <a className="pt-1"
                                                                            href={urlOut + "file/" + item?.id}
                                                                            target="_blank" rel="noopener noreferrer">PDF FILE</a>
                                                                    </span>
                                                                ) : (wordOption.includes(item?.contentType?.split('/')[item?.contentType?.split('/').length - 1]) ||
                                                                    wordOption.includes(item?.name?.split('.')[item?.name?.split('.').length - 1])) ? (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                                            style={{ fontSize: "20px" }} />
                                                                        <a className="pt-1"
                                                                            href={urlOut + "file/" + item?.id}
                                                                            target="_blank" rel="noopener noreferrer">WORD FILE</a>
                                                                    </span>
                                                                ) : (excelOption.includes(item?.contentType?.split('/')[item?.contentType?.split('/').length - 1]) ||
                                                                    excelOption.includes(item?.name?.split('.')[item?.name?.split('.').length - 1])) ? (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                                            style={{ fontSize: "20px" }} />
                                                                        <a className="pt-1"
                                                                            href={urlOut + "file/" + item?.id}
                                                                            target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
                                                                    </span>
                                                                ) : (powerPointOption.includes(item?.contentType?.split('/')[item?.contentType?.split('/').length - 1]) ||
                                                                    powerPointOption.includes(item?.name?.split('.')[item?.name?.split('.').length - 1])) ? (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                                            style={{ fontSize: "20px" }} />
                                                                        <a className="pt-1"
                                                                            href={urlOut + "file/" + item?.id}
                                                                            target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="d-flex align-items-center cursor-pointer mb-1">
                                                                        <i className="far fa-file-archive mr-1 fa-2x rarIcon"
                                                                            style={{ fontSize: "20px" }}></i>
                                                                        <a className="pt-1"
                                                                            href={urlOut + "file/" + item?.id}
                                                                            target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
                                                                    </span>
                                                                )
                                                            }
                                                        </th>
                                                        <th className=" text-color border p-2"
                                                            style={{ width: '70%' }}>
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
    )
}
