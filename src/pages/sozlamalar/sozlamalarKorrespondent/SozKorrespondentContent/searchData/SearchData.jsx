import React from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const SearchData = ({ currentUser, setAlert, setStirData, setOrgNameId, pageId, setYunalishQidirishHajmi }) => {

  const searchOrg = async (e) => {
    setOrgNameId(e);
    if (e.length !== 0) {
      try {
        const res = await axiosInstance.post("organization/search", {
          orgName: e,
          page: pageId,
        })
        setYunalishQidirishHajmi(res.data)
      } catch (error) {
        console.log(error.response);
      }
    } else {
      setYunalishQidirishHajmi([])
    }
  }

  // sitr bo'yicha qidirish
  const qidirish = async () => {
    let sitri = document.querySelector('.sitri').value;

    if (sitri) {
      if (sitri.length === 11) {
        // to do server
        try {
          const res = await axiosInstance.get(`organization/showCorrespondent/${sitri}/${JSON.parse(localStorage.getItem('oi'))}`)
          if (res.data?.orgName) {
            document.querySelector('.tashNomi').value = res.data?.orgName;
            document.querySelector('.manzil').value = res.data?.address;
            document.querySelector('.telefon').value = res.data?.mobileNumber;
            document.querySelector('.email').value = res.data?.orgEmail;
            document.querySelector('.exat').value = res.data?.orgExat;
            setStirData(res.data);
            Alert(setAlert, "success", "Информация успешно найдена");
          } else {
            Alert(setAlert, "warning", "Ошибка")
          }
        } catch (error) {
          Alert(setAlert, "warning", error.response?.data);
        }
      } else {
        Alert(setAlert, "warning", "STIR был введен ошибочно");
      }
    } else {
      Alert(setAlert, "warning", "СТИРи не включены");
      Alert(setAlert, "warning", "СТИРи не включены");
    }
  }

  const enter = (e) => {
    if (e.code === "Enter") {
      qidirish();
    }
  }

  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="form-group form-group-floating">
          <div className="position-relative">
            <input
              type="text"
              data-mask="999-999-999"
              className="form-control form-control-outline sitri"
              placeholder="Placeholder"
              maxLength={11}
              onKeyDown={(e) => enter(e)}
            />
            <label className="label-floating">Организация СТИР</label>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="form-group form-group-floating">
          <div className="position-relative">
            <button type="button" onClick={qidirish} className="btn btn-primary form-control">Поиск </button>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <input type="text"
          className={'form-control form-control-outline'}
          placeholder="Search..."
          style={{ height: "56px" }}
          onChange={(e) => searchOrg(e.target.value)}
        />
      </div>
    </div>
  )
}

export default React.memo(SearchData);