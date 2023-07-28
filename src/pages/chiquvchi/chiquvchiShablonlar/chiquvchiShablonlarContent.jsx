import React, {useEffect, useRef, useState} from 'react';
import ChiquvchiShablonNavbar from "./chiquvchiShablonNavbar";
import {IsFileTypeOut} from "../../../component/IsFilType";
import {axiosInstanceOut, urlOut} from "../../../config";
import {CKEditor} from 'ckeditor4-react';
import './chiquvchiStyle.css'

const ChiquvchiShablonlarContent = ({currentUser, permission, ranks}) => {
    const [data, setData] = useState('')
    const [editibleData, setEditibleData] = useState({})
    const [file, setFile] = useState(null);
    const [openModal, setOpenModal] = useState({open: false, obj: {}});
    const [isGlobal, setIsGlobal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [getTableData, setGetTableData] = useState([]);
    // const dataCKEditorref = useRef();
    const dataNameref = useRef();


    //close all options
    const closeOptions = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
        input_checkbox_items.forEach((d, i) => {
            d.style.display = "none";
        })
    }

    useEffect(() => {
        let isMounted = true;

        if (currentUser) {
            const getData = async () => {
                try {
                    const res = await axiosInstanceOut.get(`template/all/` + JSON.parse(localStorage.getItem('ids')));
                    console.log(res.data)
                    setGetTableData(res.data)
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    const changeFile = (e) => {
        console.log(e.target.files[0])
        let img = new Image()
        img.src = window.URL.createObjectURL(e.target.files[0])
        setFile(e.target.files[0]);
    }

    const toEdit = (data) => {
        console.log(data)
        let templateCkeditor = document.querySelector('.templateCkeditor');
        templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = data.content;
        setIsEdit(true)
        setIsGlobal(data?.isGlobal)
        document.querySelector('.nom').value = data.name
        setEditibleData(data)
        // setEditModal({ open: true, obj: data.content })
    }

    const deleteShablon = async (data) => {
        // console.log(data.data)
        try {
            const res = await axiosInstanceOut.delete("template?ID=" + data?.data?.id)
            console.log(res.data)
            let arr = [];
            arr = getTableData;
            arr.forEach((d, i) => {
                if (d.id !== data?.data?.id) {
                    arr.push(d)
                }
            })
            setGetTableData(arr)
        } catch (error) {
            console.log(error.response);
        }
    }

    const saveShablon = async () => {
        let templateCkeditor = document.querySelector('.templateCkeditor');
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
            // for (let i = 0; i < Object?.values(file)?.length; i++) {
            //     // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
            //     console.log(fileType)
            //     console.log(fileId)
            //
            // }
        }
        if (isEdit) {
            console.log({
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                fileID: file ? fileId : editibleData?.image?.id !== undefined ? editibleData?.image?.id : null,
                content: data ? data : editibleData.content,
                name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                isGlobal: isGlobal,
                id: editibleData.id
            })
            try {

                const res = await axiosInstanceOut.patch("template/", {
                    workPlaceID: JSON.parse(localStorage.getItem('ids')),
                    fileID: file ? fileId : editibleData?.image?.id !== undefined ? editibleData?.image?.id : null,
                    content: data ? data : editibleData.content,
                    name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                    isGlobal: isGlobal,
                    id: editibleData.id
                })
                let arr = [];
                arr = getTableData.filter((d, i) => {
                    if (d.id === res.data.id) {
                        d.image = res.data.image
                        d.name=res.data.name
                        d.isGlobal=res.data.isGlobal
                        d.content=res.data.content
                    }
                    return d
                })
                setGetTableData(arr)
                templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = '';
                setIsEdit(false)
                setIsGlobal(false)
                setFile(null)
                document.querySelector('.nom').value = ''
                setEditibleData({})
                console.log(res.data)
            } catch (error) {
                console.log(error.response);
            }

        } else {
            console.log({
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                fileID: fileId,
                content: data,
                name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                idGlobal: isGlobal
            })
            try {
                const res = await axiosInstanceOut.post("template/", {
                    workPlaceID: JSON.parse(localStorage.getItem('ids')),
                    fileID: fileId,
                    content: data,
                    name: dataNameref.current?.value.length > 0 ? dataNameref.current?.value : '',
                    isGlobal: isGlobal
                })
                templateCkeditor.querySelector('.cke_wysiwyg_div').innerHTML = '';
                setIsEdit(false)
                setIsGlobal(false)
                document.querySelector('.nom').value = ''
                setEditibleData({})
                setFile(null)
                console.log(res.data)
                setGetTableData(prev => [...prev, res.data])
            } catch (error) {
                console.log(error.response);
            }

        }
    }

    return (
        <div className="content content-mobile ">
            <h3 style={{margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase"}}>Новый шаблон
                yaratish</h3>
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                style={{paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px"}}>
                <ChiquvchiShablonNavbar permission={permission} ranks={ranks} currentUser={currentUser}/>
            </ul>
            <div className="card-body card-body-mobile p-0">
                <div className="tab-content pb-5 shablon">
                    <div className="tab-pane fade show active p-3 bg-white card row" styleid="colored-tab1">
                        <div className="mb-3">
                            <input type="text" className="form-control form-control-lg p-2 nom"
                                   style={{height: '44px'}}
                                   id="korrespondent2"
                                   ref={dataNameref}
                                   placeholder="Nomi"/>
                        </div>
                        <div className="col-lg-12 mb-3 templateCkeditor">
                            <CKEditor
                                style={{maxWidth: '1000px', margin: '0 auto'}}
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
                        {
                            (editibleData?.image?.id || file) && <div className="col-lg-6 mb-3">
                                <div className="img">
                                    {
                                        file ?
                                            <img width={400} height={250} src={URL?.createObjectURL(file)} alt=""/> :
                                            <img width={400} height={250} src={`${urlOut}file/${editibleData?.image?.id}`}
                                                 alt=""/>
                                    }
                                </div>
                            </div>
                        }

                        <div className="mb-3 col-lg-6">

                            <input type="file"
                                // onClick={(e) => e.target.value = null}
                                   onChange={(e) => changeFile(e)}
                                   multiple="multiple" className="custom-file-input"
                                   id="customFile"
                                   onClick={closeOptions}
                            />
                            <label className="custom-file-label" htmlFor="customFile">Fayl
                                yuklash</label>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center mb-3" onClick={() => setIsGlobal(!isGlobal)}>
                            <span className={'mr-2'}>Boshqalarga ruhsat</span>
                            <input type="checkbox" checked={isGlobal}/>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <button type={'button'} className={'btn btn-primary'}
                                    onClick={() => saveShablon()}>Qo'shish
                            </button>
                        </div>

                        <div className="col-lg-12">
                            {
                                getTableData &&
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead className={'theadSticky'}>
                                    <tr className="bg-dark text-white NavLink text-center">
                                        <th id='tabRow' style={{width: '10%'}} className="id file_kor_short_not">№</th>
                                        <th id='tabRow' style={{width: '35 %'}} className="qabul file_kor_short">Rasmi
                                        </th>
                                        <th id='tabRow' style={{width: '35 %'}}
                                            className="ariza file_kor_short_not">Nomlanishi
                                        </th>
                                        <th id='tabRow' style={{width: '20%'}}
                                            className="text-center harakat file_kor_short_not">Harakatlar
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {getTableData?.map((data, index) => (
                                        <tr id="kor" key={index}
                                            // style={{backgroundColor: !data.forColor && '#ffffa6'}}
                                        >
                                            <td className="text-center id file_kor_short_not">{index + 1}</td>
                                            <td className="text-color qabul mobile-table-none file_kor_short" id='qabul'
                                                style={{cursor: "pointer", wordWrap: "break-word", width: '10%'}}>
                                                <img src={urlOut + 'file/' + `${data?.image?.id}`} width={200}
                                                     height={120} alt=""/>
                                            </td>
                                            <td className=" ariza" style={{textAlign: 'center'}}><span
                                                className={'text-color file_kor_short_not'}>{data?.name}</span>
                                                {/*<hr/>*/}
                                                {/*{data?.senderFirstName + ' ' + data?.senderLastName}*/}
                                            </td>


                                            <td className="harakat">
                                                <div>

                                                    <div
                                                        className="icon d-flex justify-content-center align-items-center w-100">

                                                        <button type={'button'}
                                                                onClick={() => toEdit(data)}
                                                                title="Yangilash"
                                                                className={'infoBtn bg-dark file_kor_short_not'}
                                                        >
                                                            <i className="icon-pencil5"/>
                                                        </button>
                                                        <button type={'button'} title={"o'chirish"}
                                                                className={'infoBtn bg-dark disableIfErr file_kor_short_not'}
                                                                onClick={() => setOpenModal({open: true, obj: {data}})}>
                                                            <i
                                                                className="fa-solid fa-trash"/>
                                                        </button>
                                                    </div>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            }

                            {openModal.open && (
                                <div className={'adminWindow'}>
                                    <div className="modal-dialog modal-sm pt-5 ">
                                        <div className="modal-content">
                                            <div className="modal-header bg-primary text-white">
                                                <h5 className="modal-title "></h5>
                                                <button className="close"
                                                        onClick={() => setOpenModal({open: false, obj: {}})}
                                                        data-dismiss="modal">&times;</button>
                                            </div>

                                            <div className="modal-body shadowKiruvchi text-center" style={{
                                                padding: "10px",
                                                border: "1px solid lightgray",
                                                margin: "10px",
                                                backgroundColor: "lightgray"
                                            }}>
                                                <h3 className="font-weight-semibold py-1 px-1 "
                                                    style={{
                                                        borderRadius: '5px',
                                                        fontSize: "20px",
                                                        color: "#000"
                                                    }}>Shablonni o'chirishni tasdiqlaysizmi?</h3>
                                            </div>

                                            <div className="modal-footer d-flex justify-content-center">
                                                <button type={'button'}
                                                        onClick={() => setOpenModal({open: false, obj: {}})}
                                                        className="btn btn-danger"
                                                        style={{width: "150px"}}>Bekor qilish
                                                </button>
                                                <button type={'button'} onClick={() => deleteShablon(openModal.obj)}
                                                        className="btn btn-success"
                                                        style={{width: "150px"}}>Tasdiqlash
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChiquvchiShablonlarContent;