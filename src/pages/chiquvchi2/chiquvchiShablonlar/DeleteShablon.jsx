import React from 'react'
import { useHistory } from 'react-router-dom';
import { axiosInstanceOut } from '../../../config';

export default function DeleteShablon({ deleteModal, setDeleteModal, getTableData, setGetTableData, Alert, setAlert }) {
    const history = useHistory()

    const deleteFunc = () => {
        console.log(deleteModal);
        try {
            const res = axiosInstanceOut.delete("template?ID=" + deleteModal.id)
            console.log(res.data)
            const arr = getTableData.filter((item, i) => item.id !== deleteModal.id)
            setGetTableData(arr);
            Alert(setAlert, 'success', "Muvoffaqqiyatli o'chirildi");

            setTimeout(() => {
                if (arr.length === 0) {
                    history.push("/chiquvchi2/shablon/yaratish")
                }
            }, 2000)

            setDeleteModal({ isShow: false, id: 0 })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className={'adminWindow'}>
            <div className="modal-dialog pt-5 ">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title ">O'chirish</h5>
                        <button className="close"
                            onClick={() => setDeleteModal({ isShow: false, id: 0 })}
                            data-dismiss="modal">&times;</button>
                    </div>


                    <h3 className="font-weight-semibold text-center w-100 py-2">
                        Shablonni <span className='text-danger'>o'chirishni</span>  tasdiqlaysizmi?
                    </h3>

                    <div className="modal-footer d-flex justify-content-center">
                        <button type={'button'} onClick={() => deleteFunc()}
                            className="btn btn-success"
                            style={{ width: "150px" }}>Tasdiqlash
                        </button>
                        <button type={'button'}
                            onClick={() => setDeleteModal({ isShow: false, id: 0 })}
                            className="btn btn-danger"
                            style={{ width: "150px" }}>Bekor qilish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
