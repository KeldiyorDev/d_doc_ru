import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import UserInfo from "../../components/UserInfo";
import KadrlarNavbar from "../../kadrlarNavbar/KadrlarNavbar";

const RagbatlantirishContent = ({ currentUser, permission, ranks }) => {
    console.log('a');
    return (
        <div className="content mb-5" >
            <div className="card" style={{ margin: "15px", padding: "15px", display: "flex !important" }}>
                <UserInfo />

                <div className="card-body p-0 pt-3">
                    <div className="card">
                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                            <KadrlarNavbar />
                        </ul>

                        <div className="tab-pane fade show active bg-white" id="colored-tab1">
                            <div className="card-body card-body-mobile">
                                <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
                                    <tr style={{ background: "#ECF3FF" }}>
                                        <td className="text-center id">YMMT da ma'lumot topilmadi</td>
                                    </tr>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(RagbatlantirishContent)