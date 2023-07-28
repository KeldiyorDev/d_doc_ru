import React, { useRef } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const AddDirection = ({ notParentsCard, yunalishlar, currentUser, setAlert, setYunalishlar }) => {
  const directionNameref = useRef();
  const cardref = useRef();

  // yunalish qushish 
  const yunalishQushish = async (e) => {
    e.preventDefault();
    let yunalishNomi = directionNameref.current.value;
    const kartochkalar = cardref.current?.props?.value;

    if (yunalishNomi) {
      // yunalish kiritish
      try {
        const res = await axiosInstance.post("cardType", {
          cardName: yunalishNomi,
          parentCardTypeId: kartochkalar ? kartochkalar.value : null
        })
        if (res.data?.parentCardType) {
          Alert(setAlert, "success", "Маршрут успешно добавлен");
        } else {
          Alert(setAlert, "success", "Маршрут успешно добавлен");
          setYunalishlar(prev => [...prev, res.data]);
        }
        directionNameref.current.value = "";
        cardref.current?.props?.value && cardref.current.removeValue(cardref.current.props.value);
      } catch (error) {
        console.log(error?.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
      document.querySelector('.close11').click();
    } else {
      Alert(setAlert, "warning", "Не введено название направления");
    }
  }

  return (
    <div id="yonalish" className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-lg ">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Окно управления картами</h5>
            <button type="button" className="close close11" data-dismiss="modal">&times;</button>
          </div>

          <div className="modal-body py-2">
            <form onSubmit={yunalishQushish} className="yunalishForm">
              <div className="row">
                {yunalishlar?.length === 0 ? (
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline yunalishNomi"
                          placeholder="Введите название пункта назначения"
                          autoFocus
                          ref={directionNameref}
                        />
                        <label className="label-floating">Введите название пункта назначения</label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="col-lg-12">
                      <div className="form-group form-group-floating">
                        <Select
                          options={notParentsCard}
                          placeholder="Направление"
                          className="kartochkalar"
                          isClearable={true}
                          ref={cardref}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group form-group-floating mb-2">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline yunalishNomi"
                            placeholder="Placeholder"
                            autoFocus
                            ref={directionNameref}
                          />
                          <label className="label-floating">Введите название пункта назначения</label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="col-lg-12 text-right">
                  <span className="error text-danger d-block" style={{ textTransform: "capitalize" }}></span>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <i className="fas fa-save mr-1"></i> Сохранять
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddDirection);