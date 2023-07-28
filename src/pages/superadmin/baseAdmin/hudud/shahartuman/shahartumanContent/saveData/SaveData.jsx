import React, { useRef } from "react";
import Select from "react-select";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const SaveData = ({ currentUser, setAlert, setData, notParentsCard }) => {
  const cardTyperef = useRef();
  const nameref = useRef();

  const saveData = async () => {
    let cardTypeId = cardTyperef.current?.props?.value;
    let nomi = nameref.current.value;

    if (cardTypeId) {
      if (nomi.length > 0) {
        try {
          const res = await axiosInstanceFq.post('district/create', {
            name: nomi,
            provinceId: cardTypeId.value
          })
          Alert(setAlert, 'success', `Информация успешно добавлена`);
          setData(prev => [...prev, res.data.data]);
          nameref.current.value = "";
          cardTypeId.current?.props?.value && cardTypeId.current.removeValue(cardTypeId.current.props.value);
        } catch (error) {
          console.log(error?.response)
          Alert(setAlert, 'warning', `${error?.response?.data?.message}`)
        }
      } else {
        Alert(setAlert, 'warning', `Не введено название маршрута`);
      }
    } else {
      Alert(setAlert, 'warning', `Направление не выбрано`);
    }
  }

  return (
    <form className="">
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <Select
              options={notParentsCard}
              // onChange={notParentsCardClick}
              placeholder="Направление:"
              className="cardTypeId"
              isClearable={true}
              ref={cardTyperef}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-outline nomi"
                placeholder="Placeholder"
                ref={nameref}
              />
              <label className="label-floating">Именование</label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <button type="button" style={{ width: "150px", height: "55px" }} onClick={() => saveData()} className="btn btn-primary">
            <i className="icon-floppy-disk mr-1"></i> Именование
          </button>
        </div>
      </div>
    </form>
  )
}

export default React.memo(SaveData);