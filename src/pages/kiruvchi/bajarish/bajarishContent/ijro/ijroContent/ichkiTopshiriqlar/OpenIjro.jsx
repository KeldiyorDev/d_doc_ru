import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const OpenIjro = ({ setOpenIjro, openIjro, setAlert, params, setData }) => {

  // tasdiqlash
  const tasdiqlash = async (dat) => {
    let textarea = document.querySelector('.closedIjroTextArea').value;
    let sanaTasdiqlash = document.querySelector('.sanaTasdiqlash').value;

    if (textarea.length > 0) {
      try {
        await axiosInstance.post("controlling/accept", {
          documentId: dat?.documentId,
          workPlaceId: dat?.workPlaceId,
          tabName: dat?.tabName,
          comment: textarea,
          date: sanaTasdiqlash || null
        })
        setOpenIjro({ open: false, obj: {} });
        Alert(setAlert, "success", "Hujjat tasdiqlandi");
        const res1 = await axiosInstance.get(`document/inProcessDoc/${params.id}`);
        setData(res1.data);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      Alert(setAlert, "warning", "Izoh yozish majburiy");
      setOpenIjro({ open: false, obj: {} });
    }
  }

  return (
    <div className="adminWindow text-center">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Окно подтверждения:</h6>
          </div>
          <div className="modal-body ">
            <input
              type="date"
              className="form-control mb-2 sanaTasdiqlash"
            />
            <textarea
              name=""
              rows="8"
              className="form-control closedIjroTextArea"
              placeholder="Izoh..."
            >
            </textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link bekorQilish" onClick={() => setOpenIjro({ open: false, obj: {} })}>Закрывать</button>
            <button type="button" className="btn btn-success" onClick={() => tasdiqlash(openIjro.obj)}>Подтверждение</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(OpenIjro);