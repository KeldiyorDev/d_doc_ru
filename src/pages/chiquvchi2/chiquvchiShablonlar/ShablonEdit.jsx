import React, { useRef, useState } from 'react';
import ChiquvchiShablonNavbar from "./ChiquvchiShablonNavbar";
import { IsFileTypeOut } from "../../../component/IsFilType";
import { axiosInstanceOut, urlOut } from "../../../config";
import { CKEditor } from 'ckeditor4-react';
import '../chiquvchi2.css'
import { closeOptions } from '../utils/additionFunctions';
import { useHistory, useLocation } from 'react-router-dom';
import AlertContent, { Alert } from '../../../component/alert/Alert';

const ShablonEdit = ({ currentUser, permission, ranks }) => {
    const history = useHistory()
    const item = useLocation()
    console.log(item);
    const [data, setData] = useState('')
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [file, setFile] = useState(null);
    const [isGlobal, setIsGlobal] = useState(item.state.isGlobal)
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
            fileID: file ? fileId : item?.state?.image?.id !== undefined ? item?.state?.image?.id : null,
            content: data ? data : item?.state.content,
            name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
            isGlobal: isGlobal,
            id: item.state.id,
            shortInfo: shortInfo.substring(0, 200)
        })
        try {
            const res = await axiosInstanceOut.patch("template/", {
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                fileID: file ? fileId : item?.state?.image?.id !== undefined ? item?.state?.image?.id : null,
                content: data ? data : item?.state.content,
                name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                isGlobal: isGlobal,
                id: item.state.id,
            shortInfo: shortInfo.substring(0, 200)
            })
            console.log(res.data)
            Alert(setAlert, 'success', "Muvoffaqqiyatli o'zgartirildi")

            setTimeout(() => {
                history.push("/chiquvchi2/shablon/mavjud");
            }, 2000)

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
                                defaultValue={item?.state?.name}
                                placeholder="Имя" />
                        </div>
                        <div className="col-lg-12 mb-3 px-0 templateCkeditor">
                            <CKEditor
                                initData={item?.state?.content}
                                style={{ maxWidth: '100%', margin: '0 auto' }}
                                config={{
                                    extraPlugins: ["emoji", "justify", "exportpdf", "language", "div", "font", "autolink", "colorbutton", "find", "forms", "link", "liststyle", "newpage", "pagebreak", "magicline", "print", "save", "tableresize", "widget", "uicolor", "smiley", "autogrow", "colordialog", "docprops", "devtools", "copyformatting", "codesnippet", "bidi", "a11yhelp", "autocomplete", "mentions", "indentblock", "panelbutton", "pastefromgdocs", "pastefromlibreoffice", "pastefromword", "pastetools", "preview", "scayt", "selectall", "sharedspace", "showblocks", "specialchar", "stylesheetparser", "table", "tableselection", "tabletools", "templates", "textmatch", "textwatcher", "widget", "clipboard", "codesnippetgeshi", "dialogadvtab", "divarea",],
                                }}
                                onChange={(event, editor) => {
                                    setData(String(event?.editor?.getData()))
                                }}
                                type="classic"
                                popupHeight='500px'
                                onBeforeLoad={CKEDITOR => {
                                    // Handles `beforeLoad` event which is fired before an editor instance is created.
                                    // CKEDITOR.disableAutoInline = true
                                }}
                            // onInstanceReady={({ editor }) => {

                            // }}
                            />
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
                                <label className="custom-file-label" htmlFor="customFile">
                                    {item?.state?.image?.path ? "Rasm biriktirilgan" : "Rasm biriktirish"}
                                </label>
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
                                    onClick={() => saveShablon()}>Изменять
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "start" }}>
                            {
                                (item?.state?.image?.id || file) && <div className="mb-3">
                                    <div className="img">
                                        {
                                            file ?
                                                <img height={"200px"} src={URL?.createObjectURL(file)} alt="" /> :
                                                <img height={"200px"} src={`${urlOut}file/${item?.state?.image?.id}`}
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

export default React.memo(ShablonEdit);