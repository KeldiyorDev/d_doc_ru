import React, { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import ContentNavbar from "../../../../contentNavbar/ContentNavbar";
import { axiosInstance } from "../../../../../../config";
import AlertContent from '../../../../../../component/alert/Alert';
import SettingsForms from "./settingsForms/SettingsForms";
import DeleteModal from "./deleteModal/DeleteModal";
import { ShortUser } from "../../../../../../component/ShortUser";
import "react-datepicker/dist/react-datepicker.css";
import './sozlamaContent.css';

const SozlamaContent = ({ currentUser, permission, ranks }) => {
  const params = useParams();
  const [data, setData] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [startDate1, setStartDate1] = useState('');
  const [startDate2, setStartDate2] = useState('');

  const journalref = useRef();
  const journalNumref = useRef();
  const cardTyperef = useRef();
  const cardNameref = useRef();
  const submissionFormref = useRef();
  const confirmerref = useRef();
  const korrespondentref = useRef();
  const outNumref = useRef();
  const pageCountref = useRef();
  const shortDescref = useRef();

  // id ga mos documentni olish
  useEffect(() => {
    let isMounted = true;
    // tooltip ni o'chirish
    document.querySelector('.tooltip')?.remove();
    const getData = async () => {
      try {
        const res = await axiosInstance.get("document/" + params.id);
        res.data?.journal?.uzName && journalref.current.setValue({ value: res.data?.journal.id, label: res.data?.journal?.uzName });
        journalNumref.current.value = res.data?.journal?.beginNumber;
        res.data?.card?.cardType?.parentCardType?.cardName && cardTyperef.current.setValue({ value: res.data?.card?.cardType?.parentCardType?.id, label: res.data?.card?.cardType?.parentCardType?.cardName });
        res.data?.card?.cardName && cardNameref.current.setValue({ value: res.data?.card?.id, label: res.data?.card?.cardName });
        res.data?.submissionForm?.name && submissionFormref.current.setValue({ value: res.data?.submissionForm?.id, label: res.data?.submissionForm?.name });
        res.data?.confirmer?.workPlaceId && confirmerref.current.setValue({ value: res.data?.confirmer?.workPlaceId, label: ShortUser(res.data?.confirmer?.firstName.trim(), res.data?.confirmer?.lastName.trim()).toUpperCase() });
        res.data?.correspondent?.orgName && korrespondentref.current.setValue({ value: res.data?.correspondent?.id, label: res.data?.correspondent?.orgName });
        outNumref.current.value = res.data?.outNumber;
        pageCountref.current.value = res.data?.pageCount;
        shortDescref.current.value = res.data?.shortDescription;

        if (isMounted) {
          setStartDate1(new Date(res.data?.outDate))
          setStartDate2(new Date(res.data?.registrationAt))
          setData(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [params.id]);

  return (
    <div className="content mb-5 ">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Настройка</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />

          <li className="nav-item">
            <NavLink to={`/kiruvchi/sozlash/${params.id}/${params.name}`} className="nav-link"
              activeClassName='NavLinkLi'>
              <i className="fab fa-whmcs mr-1"></i>Настройка
            </NavLink>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body px-2">
                {/* forms */}
                <SettingsForms
                  data={data}
                  setAlert={setAlert}
                  currentUser={currentUser}
                  startDate1={startDate1}
                  setStartDate1={setStartDate1}
                  startDate2={startDate2}
                  setStartDate2={setStartDate2}
                  params={params}
                  setDeleteModal={setDeleteModal}
                  journalref={journalref}
                  journalNumref={journalNumref}
                  cardTyperef={cardTyperef}
                  cardNameref={cardNameref}
                  submissionFormref={submissionFormref}
                  confirmerref={confirmerref}
                  korrespondentref={korrespondentref}
                  outNumref={outNumref}
                  pageCountref={pageCountref}
                  shortDescref={shortDescref}
                />

                {/* modal delete */}
                {(deleteModal.open && !data?.isCameOtherOrg) && (
                  <DeleteModal
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    currentUser={currentUser}
                    params={params}
                    data={data}
                    setAlert={setAlert}
                    setData={setData}
                  />
                )}
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div >
    </div >
  )
}

export default React.memo(SozlamaContent);