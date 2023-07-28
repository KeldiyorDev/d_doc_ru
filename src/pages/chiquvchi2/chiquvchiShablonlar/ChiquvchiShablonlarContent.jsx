import React, { useRef, useState } from 'react';
import ChiquvchiShablonNavbar from "./ChiquvchiShablonNavbar";
import { IsFileTypeOut } from "../../../component/IsFilType";
import { axiosInstanceOut, urlOut } from "../../../config";
import { CKEditor } from 'ckeditor4-react';
import '../chiquvchi2.css'
import { closeOptions } from '../utils/additionFunctions';
import { useHistory } from 'react-router-dom';
import AlertContent, { Alert } from '../../../component/alert/Alert';

const ChiquvchiShablonlarContent = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    const [data, setData] = useState('')
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [editibleData, setEditibleData] = useState({})
    const [file, setFile] = useState(null);
    const [isGlobal, setIsGlobal] = useState(false)
    // const dataCKEditorref = useRef();
    const dataNameref = useRef();

    const changeFile = (e) => {
        console.log(e.target.files[0])
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0]);
    }

    const saveShablon = async () => {
        let templateCkeditor = document.querySelector('.templateCkeditor');
        let shortInfo = templateCkeditor.querySelector('.cke_wysiwyg_div').innerText;

        let fileId = '';
        // file upload
        console.log(file)
        if (file) {
            const formData = new FormData();
            let fileType = IsFileTypeOut(file);
            if (fileType) {
                formData?.append("file", file);
                try {
                    let res = await axiosInstanceOut.post(`file?orgId=${JSON.parse(localStorage.getItem('oi'))}`, formData)
                    fileId = res?.data;
                    console.log(res?.data)
                } catch (error) {
                    console.log(error.response);
                }
            }
        }

        console.log({
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            orgID: JSON.parse(localStorage.getItem('oi')),
            fileID: fileId,
            content: data,
            name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
            idGlobal: isGlobal
        })
        try {
            const res = await axiosInstanceOut.post("template/", {
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                orgID: JSON.parse(localStorage.getItem('oi')),
                fileID: fileId,
                content: data,
                shortInfo: shortInfo.substring(0, 200),
                name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                isGlobal: isGlobal
            })
            Alert(setAlert, 'success', "Muvoffaqqiyatli qo'shildi")

            setTimeout(() => {
                history.push("/chiquvchi2/shablon/mavjud");
            }, 2000)
            console.log(res.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className="content content-mobile mt-3">
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
                <ChiquvchiShablonNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
            </ul>
            <div className="card-body card-body-mobile p-0">
                <div className="tab-content pb-5 shablon">
                    <div className="tab-pane fade show active p-3 bg-white card row" styleid="colored-tab1">
                        <div className="col-lg-12 mb-3 px-0">
                            <input type="text" className="form-control form-control-lg p-2"
                                style={{ height: '45px' }}
                                id="korrespondent2"
                                ref={dataNameref}
                                placeholder="Имя" />
                        </div>
                        <div className="col-lg-12 mb-3 px-0" style={{ display: "flex", justifyContent: "center" }}>
                            <div className={'templateCkeditor'} style={{ width: '980px', overflow: "auto" }}>
                                <CKEditor
                                    style={{ width: '980px !important', margin: '0 auto', overflow: "scroll" }}
                                    config={{
                                        extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                    }}
                                    onChange={(event, editor) => {
                                        setData(String(event?.editor?.getData()))
                                    }}
                                    type="classic"
                                    popupHeight='500px'
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col-lg-6">

                                <input type="file"
                                    // onClick={(e) => e.target.value = null}
                                    onChange={(e) => changeFile(e)}
                                    className="custom-file-input"
                                    id="customFile"
                                    accept="image/*"
                                    onClick={closeOptions}
                                />
                                <label className="custom-file-label" htmlFor="customFile">Прикрепить изображение</label>
                            </div>

                            <div className="col-lg-3 d-flex align-items-center justify-content-center mb-3" onClick={() => setIsGlobal(!isGlobal)}>
                                <input type="checkbox" class="selectCheckbox"
                                    checked={isGlobal}
                                    style={{ width: "30px", height: "20px" }}>
                                </input>
                                <p className={'mr-2 p-0 mb-0'} style={{ fontSize: "18px" }}>Разрешение другим</p>
                            </div>

                            <div className="col-lg-3 mb-3">
                                <button type={'button'} className={'btn btn-success w-100'}
                                    onClick={() => saveShablon()}>Добавлять
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "start" }}>
                            {
                                (editibleData?.image?.id || file) && <div className="mb-3">
                                    <div className="img">
                                        {
                                            file ?
                                                <img height={"200px"} src={URL?.createObjectURL(file)} alt="" /> :
                                                <img height={"200px"} src={`${urlOut}file/${editibleData?.image?.id}`}
                                                    alt="" />
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* alert */}
            < AlertContent alert={alert} />
        </div>
    );
};

export default React.memo(ChiquvchiShablonlarContent);