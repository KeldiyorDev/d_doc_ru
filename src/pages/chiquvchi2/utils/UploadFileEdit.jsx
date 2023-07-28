import React from 'react'
import { excelOption, pdfOption, powerPointOption, wordOption } from './FileOption'

export default function UploadFileEdit({ hujjat, index, deleteFile }) {
    console.log(index);
    return (
        (pdfOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1]) ||
            pdfOption.includes(hujjat?.path?.split('.')[hujjat?.path?.split('/').length - 1])) ? (
            <li key={index} className='kiruvchiMain'>
                <div className='d-flex align-items-center'>
                    <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                        style={{ fontSize: "28px" }} />
                    <span className='pt-1'>PDF FILE</span>
                </div>
                <span onClick={() => deleteFile(index)}>
                    <i className="icon-trash"></i></span>
            </li>
        ) : (wordOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1]) ||
            wordOption.includes(hujjat?.path?.split('.')[hujjat?.path?.split('.').length - 1])) ? (
            <li key={index} className='kiruvchiMain'>
                <div className='d-flex align-items-center'>
                    <i className="far fa-file-word mr-2 fa-2x wordIcon"
                        style={{ fontSize: "28px" }} />
                    <span className='pt-1'>WORD FILE</span>
                </div>
                <span onClick={() => deleteFile(index)}>
                    <i className="icon-trash"></i></span>
            </li>
        ) : (excelOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1]) ||
            excelOption.includes(hujjat?.path?.split('.')[hujjat?.path?.split('.').length - 1])) ? (
            <li key={index} className='kiruvchiMain'>
                <div className='d-flex align-items-center'>
                    <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                        style={{ fontSize: "28px" }} />
                    <span className='pt-1'>EXCEL FILE</span>
                </div>
                <span onClick={() => deleteFile(index)}>
                    <i className="icon-trash"></i></span>
            </li>
        ) : (powerPointOption.includes(hujjat?.contentType?.split('/')[hujjat?.contentType?.split('/').length - 1]) ||
            powerPointOption.includes(hujjat?.path?.split('.')[hujjat?.path?.split('.').length - 1])) ? (
            <li key={index} className='kiruvchiMain'>
                <div className='d-flex align-items-center'>
                    <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                        style={{ fontSize: "28px" }} />
                    <span
                        className='pt-1'>POWERPOINT FILE</span>
                </div>
                <span onClick={() => deleteFile(index)}>
                    <i className="icon-trash"></i></span>
            </li>
        ) : (
            <li key={index} className='kiruvchiMain'>
                <div className='d-flex align-items-center'>
                    <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                        style={{ fontSize: "28px" }} />
                    <span
                        className='pt-1'>ZIP, RAR FILE</span>
                </div>
                <span onClick={() => deleteFile(index)}>
                    <i className="icon-trash"></i></span>
            </li>
        )
    )
}
