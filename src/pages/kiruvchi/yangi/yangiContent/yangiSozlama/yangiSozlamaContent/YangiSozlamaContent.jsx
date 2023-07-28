import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import ContentNavbar from "../../../../contentNavbar/ContentNavbar";
import { axiosInstance, axiosInstanceOut } from "../../../../../../config";
import NewSettingsForms from "./newSettingsForms/NewSettingsForms";
import DeleteModalSettings from "./deleteModalSettings/DeleteModalSettings";
import AlertContent from "../../../../../../component/alert/Alert";
import './yangiSozlamaContent.css';

const SozlamaContent = ({ currentUser, permission, ranks }) => {
  const params = useParams();
  const [data, setData] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const submissionFormref = useRef();
  const korrespondentref = useRef();
  const outNumref = useRef();
  const outDateref = useRef();
  const shortDescref = useRef();

  // id ga mos documentni olish
  useEffect(() => {
    let isMounted = true;
    // tooltip ni o'chirish
    document.querySelector('.tooltip')?.remove();
    const getData = async () => {
      if (params?.id) {
        try {
          const res = await axiosInstance.get(`newDoc/${params.docId}/${params.id}`)
          submissionFormref.current.value = res.data?.submissionForm?.name;
          korrespondentref.current.value = res.data?.correspondent?.orgName;
          outNumref.current.value = res.data.outNumber;
          outDateref.current.value = res.data?.outDate;
          shortDescref.current.value = res.data?.shortDescription;
          console.log(res.data);
          if (isMounted)
            setData(res.data);
        } catch (error) {
          console.log(error.response);
        }
      } else {
        try {
          const res = await axiosInstanceOut.get(`missive/getNewDoc/${params.missiveId}`)
          submissionFormref.current.value = res.data?.submissionForm?.name;
          korrespondentref.current.value = res.data?.correspondent?.orgName;
          outNumref.current.value = res.data.outNumber;
          outDateref.current.value = res.data?.outDate;
          shortDescref.current.value = res.data?.shortDescription;
          console.log(res.data);
          if (isMounted)
            setData(res.data);
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.docId, params.id, params.missiveId]);

  return (
    <div className="content mb-5 ">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Настройка</h3>
      <div className="card-body pt-2">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />

          {params?.id ? (
            <li className="nav-item">
              <NavLink to={`/kiruvchi/y/sozlash/${params.id}/${params.name}`} className="nav-link" activeClassName='NavLinkLi'>
                <i className="fab fa-whmcs mr-1"></i>Настройка
              </NavLink>
            </li>
          ) :
            (
              <li className="nav-item">
                <NavLink to={`/kiruvchi/y/sozlash/${params.missiveId}`} className="nav-link" activeClassName='NavLinkLi'>
                  <i className="fab fa-whmcs mr-1"></i>Настройка
                </NavLink>
              </li>
            )}
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body">
                {/* forms */}
                <NewSettingsForms
                  data={data}
                  setAlert={setAlert}
                  currentUser={currentUser}
                  params={params}
                  submissionFormref={submissionFormref}
                  korrespondentref={korrespondentref}
                  outNumref={outNumref}
                  outDateref={outDateref}
                  shortDescref={shortDescref}
                />

                {/* modal delete */}
                {deleteModal.open && (
                  <DeleteModalSettings
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                  />
                )}
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SozlamaContent);