import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const ClosedIjro = ({ closedIjro, setClosedIjro, setAlert, setData, params }) => {

  // rad etish tugmasi
  const radEtish = async (dat) => {
    let textarea = document.querySelector('.closedIjroTextArea').value;

    if (textarea?.length > 0) {
      try {
        const sendData = {
          documentId: dat?.documentId,
          workPlaceId: dat?.workPlaceId,
          tabName: dat?.tabName,
          comment: textarea
        }

        console.log(sendData);
        await axiosInstance.post("controlling/reject", sendData)
        setClosedIjro({ open: false, obj: {} });
        Alert(setAlert, "success", "Документ был отклонен");

        const res1 = await axiosInstance.get(`document/inProcessDoc/${params.id}`);
        setData(res1.data);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      Alert(setAlert, "warning", "Требуется комментарий");
      setClosedIjro({ open: false, obj: {} });
    }
  }

  return (
    <div className="adminWindow text-center">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Введите комментарий:</h6>
          </div>
          <div className="modal-body ">
            <textarea
              name=""
              rows="8"
              className="form-control closedIjroTextArea"
            >
            </textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link bekorQilish" onClick={() => setClosedIjro({ open: false, obj: {} })}>Закрывать</button>
            <button type="button" className="btn btn-danger" onClick={() => radEtish(closedIjro.obj)}> Отказ</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ClosedIjro);