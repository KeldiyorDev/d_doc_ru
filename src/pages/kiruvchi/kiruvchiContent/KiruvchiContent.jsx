import React, { useState, useCallback } from 'react';
import ContentNavbar from '../contentNavbar/ContentNavbar';
import InputContentForm from './inputContentForm/InputContentForm';
import AlertContent from '../../../component/alert/Alert';
import "react-datepicker/dist/react-datepicker.css";
import './kiruvchiContent.css';

const KiruvchiContent = ({ currentUser, permission, ranks }) => {
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const deleteFile = useCallback((index) => {
    let arr = Object.values(file)?.filter((f, i) => {
      return i !== index
    });
    setFile(arr);
  }, [file]);

  const uploadFile = useCallback((e) => {
    setFile(null);
    setTimeout(() => {
      setFile(e.target.files);
    }, 200);
  }, [setFile]);

  return (
    <div className="content content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Добавить новое</h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", position: "relative", width: "100%", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>
        <div className="tab-content mb-5">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "0 10px" }}>
                {/* form malumotlari */}
                <InputContentForm
                  file={file}
                  setFile={setFile}
                  setAlert={setAlert}
                  currentUser={currentUser}
                  deleteFile={deleteFile}
                  uploadFile={uploadFile}
                />
              </div>
            </div>
          </div>

          {file?.length > 0 && Object.values(file)?.map((f, i) => (
            f.type?.split('/')[f.type?.split('/').length - 1] === "pdf" && (
              <embed
                src={URL.createObjectURL(f)}
                type={f?.type}
                width="100%"
                height="1500px"
                key={i}
              />
            )
          ))}

          {/* alert content */}
          <AlertContent alert={alert} />
        </div>
      </div>
    </div >
  )
}

export default React.memo(KiruvchiContent);