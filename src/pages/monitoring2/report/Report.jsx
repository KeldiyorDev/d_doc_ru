import React, { useRef, useState } from "react";
import AlertContent from "../../../component/alert/Alert";
import TableContentData from "./tableContentData/TableContentData";
import Elements from "./elements/Elements";
import Loading from "../../monitoring/hisobot/Loading";
import MonitoringNavbar from "../monitoringNavbar/MonitoringNavbar";

const Report = ({ currentUser }) => {
    const [data, setData] = useState({});
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const loader = useRef();

    return (
        <div className="content mb-5">
            <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Контрольная карта</h3>
            <div className="card-body p-0">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink ">
                    <MonitoringNavbar />
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{ padding: "10px 20px" }}>
                                <Elements
                                    currentUser={currentUser}
                                    loader={loader}
                                    setData={setData}
                                    setAlert={setAlert}
                                />

                                {/* table data */}
                                {data.bodies?.length > 0 && (
                                    <div className="stickyTable " id="accordion-default" >
                                        <TableContentData
                                            data={data}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* loader */}
                <Loading
                    loader={loader}
                />

                {/* alert */}
                <AlertContent alert={alert} />
            </div>
        </div>
    )
}

export default React.memo(Report);