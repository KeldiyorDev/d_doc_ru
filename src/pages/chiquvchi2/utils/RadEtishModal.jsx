import React, { useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { axiosInstanceOut } from '../../../config';

export default function RadEtishModal({ setRadEtishModal, obj, Alert, setAlert }) {
    const params = useParams()
    const history = useHistory()
    const radCommentRef = useRef()

    const radEtishFunc = () => {
        let id = null;
        if (params.name !== 'imzolash_uchun') {
            obj?.confirmatives?.forEach((d) => {
                if (d.workPlaceID === JSON.parse(localStorage.getItem('ids'))) {
                    console.log(d)
                    id = d.id
                }
            })
        }
        try {
            const res = axiosInstanceOut.patch(`missive/reject`, {
                message: radCommentRef?.current?.value,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
                missiveID: obj?.id,
                rejectType: params.name === 'imzolash_uchun' ? 1 : 2,
                rejectedWorkPlaceID: JSON.parse(localStorage.getItem('ids')),
                rootMissiveID: obj?.rootMissiveID
            });
            if (params.name === 'imzolash_uchun') {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli rad qilindi')
                setRadEtishModal(false)
                setTimeout(() => {
                    history.push('/chiquvchi2/tab/imzolash_uchun')
                }, 2000)
            } else {
                Alert(setAlert, 'success', 'Muvoffaqqiyatli rad qilindi')
                setRadEtishModal(false)
                setTimeout(() => {
                    history.push('/chiquvchi2/tab/tasdiqlash_uchun')
                }, 2000)
            }
        } catch (error) {
            console.log(error);
        }
        console.log({
            message: radCommentRef?.current?.value,
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            missiveID: obj?.id,
            rejectType: params.name === 'imzolash_uchun' ? 1 : 2,
            rejectedWorkPlaceID: JSON.parse(localStorage.getItem('ids')),
            rootMissiveID: obj?.rootMissiveID
        })
    }

    return (
        <div className={'adminWindow'}>
            <div className="modal-dialog pt-5 ">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title ">Rad etish</h5>
                        <button className="close"
                            onClick={() => setRadEtishModal(false)}
                            data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        <div class="col-lg-12 px-0">
                            <textarea className="form-control p-3 radComment"
                                maxLength={250}
                                cols="30" rows="10" ref={radCommentRef}
                                placeholder="Qisqacha izoh">
                            </textarea>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type={'button'}
                            className="btn btn-primary w-100"
                            onClick={() => radEtishFunc()}>
                            Yuborish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
