import React, { useState, useEffect } from "react";
import './administratsiya.css';
import { useParams } from "react-router-dom";
import TashkilotKurishNavbar from "../../tashkilotKurishNavbar/TashkilotKurishNavbar";
import { axiosInstance } from "../../../../../../../config";
import AlertContent from '../../../../../../../component/alert/Alert';
import TableData from "../tableData/TableData";
import SearchData from "../searchData/SearchData";

const AdministratsiyaContent = ({ currentUser }) => {
  const [organizationId, setOrganizationId] = useState(0);
  const [purpose, setPurpose] = useState([]);
  const params = useParams();
  const [organization, setOrganization] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // id bo'yicha malumotlarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get('organization/' + params?.id)
        console.log(res?.data)
        if (useEffectCount) {
          setOrganizationId(res.data?.id)
          setOrganization(res?.data?.adminstrators);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser, params.id]);

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Администратор</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <TashkilotKurishNavbar params={params.id} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px" }}>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal_theme_primary"><i className="icon-user-plus "></i> Добавить администратора</button>
                <div id="modal_theme_primary" className="modal fade" tabIndex="-1">
                  <div className="modal-dialog modal-lg ">
                    <div className="modal-content">
                      <div className="modal-header bg-primary text-white">
                        <h1 className="modal-title">Добавить администратора</h1>
                        <button type="button" className="close close4" data-dismiss="modal">&times;</button>
                      </div>

                      <div className="modal-body p-1">
                        {/* search data */}
                        <SearchData
                          setAlert={setAlert}
                          currentUser={currentUser}
                          params={params}
                          setPurpose={setPurpose}
                          purpose={purpose}
                          setOrganization={setOrganization}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* table data */}
                <TableData
                  organization={organization}
                  setAlert={setAlert}
                  currentUser={currentUser}
                  organizationId={organizationId}
                  params={params}
                  purpose={purpose}
                  setOrganization={setOrganization}
                />
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

export default React.memo(AdministratsiyaContent);