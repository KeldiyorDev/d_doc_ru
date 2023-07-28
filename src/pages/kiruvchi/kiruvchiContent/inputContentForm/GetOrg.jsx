import React from "react";
import { Alert } from "../../../../component/alert/Alert";
import { axiosInstance } from "../../../../config";

const GetOrg = ({ setAlert, currentUser, sitrref, sitr2ref, orgNameref, shortDescref, addressref, fullNameref, phoneref, emailref, cityref, clearAllInputData, setIsChecked, isChecked }) => {

    const checkedHandler = (e) => {
        setIsChecked(e.target.checked)
    }

    // sitr orqali malumotlarni olish
    const tashkilotniOlish = async () => {
        if (sitrref?.current?.value) {
            if (sitrref.current.value?.length !== 11) {
                Alert(setAlert, "warning", "Sitr xato kiritilgan");
            } else {
                try {
                    const res = await axiosInstance.post("organization/searchinn", {
                        stir: sitrref.current.value
                    })
                    if (res.data.date?.le_NM_UZ === "") {
                        Alert(setAlert, "warning", "Ma'lumot topilmadi");
                        clearAllInputData();
                    } else {
                        cityref.current.props.onChange({ value: res.data.date?.soato_DESC_UZ, label: res.data.date?.soato_DESC_UZ });
                        orgNameref.current.value = res.data.date?.le_NM_UZ;
                        shortDescref.current.value = res.data.date?.acron_UZ;
                        addressref.current.value = res.data.date?.addr;
                        sitr2ref.current.value = res.data.date?.tin;
                        fullNameref.current.value = res.data.date?.head_NM;
                        phoneref.current.value = res.data.date?.phone;
                        emailref.current.value = res.data.date?.email;
                    }
                } catch (error) {
                    console.log(error?.response);
                    Alert(setAlert, "warning", "Ma'lumot topilmadi");
                    clearAllInputData();
                }
            }
        } else {
            Alert(setAlert, "warning", "Tahkilot sitri kiritilmagan");
        }
    }

    return (
        <form>
            <div className="row">
                <div className="col-lg-1 d-flex align-items-center justify-content-center mb-3">
                    <input type={'checkbox'} onChange={checkedHandler}
                        defaultChecked={isChecked} style={{ transform: 'scale(1.4)' }} />
                </div>
                <div className="col-lg-8">
                    <div className="form-group form-group-floating">
                        <div className="position-relative">
                            <input
                                type="text"
                                data-mask="999-999-999"
                                className="form-control form-control-outline sitri putStir"
                                placeholder="Placeholder"
                                disabled={isChecked}
                                ref={sitrref}
                            />
                            <label className="label-floating">Tashkilot sitri</label>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="form-group form-group-floating">
                        <div className="position-relative">
                            <button type="button" onClick={tashkilotniOlish} className="btn btn-primary form-control form-control-outline buttonStir">Olish</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default React.memo(GetOrg);