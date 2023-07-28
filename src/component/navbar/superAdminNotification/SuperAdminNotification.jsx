import React from "react";
import { Alert } from "../../alert/Alert";

const SuperAdminNotification = ({ openModalData, history, setAlert, setOpenModal }) => {

  const restOpenPageInfo = (data) => {
    if (data.stir) {
      history.push(`/super_base_admin_tashkilot-qushish/${data.stir}`)
    } else {
      Alert(setAlert, "warning", "Сайт организации СТИР недоступен")
    }
  }

  return (
    <div id="modal_large_bell" className="adminWindow" tabIndex="-1">
      <div style={{ width: "70%", margin: "auto" }}>
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Быть добавленным... </h5>
            <button type="button" className="close" data-dismiss="modal" onClick={() => setOpenModal(false)}>&times;</button>
          </div>

          <div className="modal-body">
            <table className="table table-bordered table-striped table-hover table-responsive">
              <tbody className='border-0'>
                {openModalData.map((items, index) => (
                  <tr key={index} onClick={() => restOpenPageInfo(items)} style={{ cursor: "pointer" }}>
                    <th className="TableLink" style={{ width: "3%", wordWrap: "break-word" }}>
                      {index + 1}
                    </th>
                    <th className="TableLink" style={{ width: "55%", wordWrap: "break-word" }}>
                      {items.orgName}
                    </th>
                    <th className="TableLink" style={{ width: "10%", textAlign: "center", fontSize: "15px", wordWrap: "break-word" }}>
                      {items.messageTime}
                    </th>
                    <th className="TableLink text-success" style={{ width: "17%", textAlign: "center", fontSize: "15px", wordWrap: "break-word" }}>
                      {items.message}
                    </th>
                    <th className="TableLink" style={{ width: "15%", textAlign: "center", fontSize: "15px", wordWrap: "break-word" }}>
                      {items.stir}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="modal-footer">
        <button type="button" className="btn btn-link" data-dismiss="modal" onClick={() => setOpenModal(false)}>Close</button>
      </div> */}
        </div>
      </div>
    </div>
  )
}

export default React.memo(SuperAdminNotification);