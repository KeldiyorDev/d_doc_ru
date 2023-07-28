import React from 'react'
import { axiosInstanceOut } from '../../../../config';

export default function XomakiDelete({ deleteModal, setDeleteModal, data, setData, Alert, setAlert, size, tab, setTotalElements }) {
    console.log(deleteModal);
    console.log(data);
    const deleteData = async () => {
        try {
            const res = await axiosInstanceOut.patch(`/missive/delete?id=${deleteModal.id}`)

            axiosInstanceOut.post("missive/list", {
                confirmativeWorkPlace: null,
                correspondent: null,
                shortInfo: null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                orgID: JSON.parse(localStorage.getItem('oi')),
                size: size,
                page: 0,
                tab: tab,
            }).then((res) => {
                setData(res.data?.content)
                setTotalElements(res.data?.totalElements)
            })
            setDeleteModal({ isShow: false, id: 0 });
            Alert(setAlert, 'success', 'Muvoffaqiyatli o`chirildi')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className={'adminWindow'}>
            <div className="modal-dialog modal-sm pt-5 ">
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
                        <button type={'button'}
                            className="btn btn-success" onClick={() => deleteData()}
                            style={{ width: "150px" }}>Tasdiqlash
                        </button>
                        <button type={'button'}
                            className="btn btn-danger" onClick={() => setDeleteModal({ isShow: false, id: 0 })}
                            style={{ width: "150px" }}>Bekor qilish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
