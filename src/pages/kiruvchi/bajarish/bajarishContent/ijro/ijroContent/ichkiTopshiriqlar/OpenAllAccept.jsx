import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const OpenAllAccept = ({ setHokimTasdiqlash, alert, setAlert, data, setData }) => {
    const history = useHistory()
    const { id } = useParams()

    console.log(data);

    // tasdiqlash
    const acceptFunc = async () => {
        let textarea = document.querySelector('.closedIjroTextArea').value;
        let sanaTasdiqlash = document.querySelector('.sanaTasdiqlash').value;

        const list = []
        data?.inExecutorInformationList?.forEach((item) => {
            if (item?.documentStatus === "IN_PROCESS" || item?.documentStatus === "DIRECTED") {
                list.push({
                    documentId: id,
                    workPlaceId: item?.workPlaceId,
                    tabName: item?.tabName,
                    comment: textarea,
                    date: sanaTasdiqlash || null
                })
            }
        })

        console.log(list);

        if (textarea.length > 0) {
            try {
                const res = await axiosInstance.post("controlling/acceptAll", list)
                console.log(res.data);
                setHokimTasdiqlash(false);
                Alert(setAlert, "success", "Все подтверждено");

                setTimeout(() => {
                    history.push("/kiruvchi/maxsusNazorat")
                }, [2000])

            } catch (error) {
                console.log(error.response);
            }
        } else {
            Alert(setAlert, "warning", "Требуется комментарий");
            setHokimTasdiqlash(false);
        }
    }

    return (
        <div className="adminWindow text-center">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h6 className="modal-title">Подтвердить все поле:</h6>
                    </div>
                    <div className="modal-body ">
                        <input
                            type="date"
                            className="form-control mb-2 sanaTasdiqlash"
                        />
                        <textarea
                            maxLength={250}
                            name=""
                            rows="8"
                            className="form-control closedIjroTextArea"
                            placeholder="Комментарий..."
                        >
                        </textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link bekorQilish" onClick={() => setHokimTasdiqlash(false)}>Закрити</button>
                        <button type="button" className="btn btn-success" onClick={() => acceptFunc()}> Подтверждение</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(OpenAllAccept);