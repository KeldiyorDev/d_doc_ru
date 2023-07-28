import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const OpenAllReject = ({ setHokimRadEtish, alert, setAlert, data, setData }) => {
    const history = useHistory()
    const { id } = useParams()

    console.log(data);

    // rad etish
    const rejectFunc = async () => {
        let textarea = document.querySelector('.closedIjroTextArea').value;

        const list = []
        data?.inExecutorInformationList?.forEach((item) => {
            if (item?.documentStatus === "IN_PROCESS") {
                list.push({
                    documentId: id,
                    workPlaceId: item?.workPlaceId,
                    tabName: item?.tabName,
                    comment: textarea,
                })
            }
        })

        console.log(list);


        if (textarea.length > 0) {
            try {
                const res = await axiosInstance.post("controlling/rejectAll", list)
                console.log(res.data);
                setHokimRadEtish(false);
                Alert(setAlert, "success", "Все документы были отклонены");

                setTimeout(() => {
                    history.push("/kiruvchi/maxsusNazorat")
                }, [2000])

            } catch (error) {
                console.log(error.response);
            }
        } else {
            Alert(setAlert, "warning", "Требуется комментарий");
            setHokimRadEtish(false);
        }
    }

    return (
        <div className="adminWindow text-center">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h6 className="modal-title">Отклонить все окна:</h6>
                    </div>
                    <div className="modal-body ">
                        <textarea
                            name=""
                            rows="8"
                            className="form-control closedIjroTextArea"
                            placeholder="Комментарий..."
                        >
                        </textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link bekorQilish" onClick={() => setHokimRadEtish(false)}>Закрыть</button>
                        <button type="button" className="btn btn-success" onClick={() => rejectFunc()}>Подтверждение</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(OpenAllReject);