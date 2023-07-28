import React, { useRef } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const AddCard = ({ currentUser, setAlert, setChange, change, setBoshTashkilotlar, cardsName, notParentsCardClick, notParentsCard }) => {
  const cardTyperef = useRef();
  const directionNameref = useRef();
  const cardNameref = useRef();
  const expireDateref = useRef();
  const formreset = useRef();
  const btnCloseref = useRef();

  // kartochka qo'shish
  const kartochkaQushish = async (e) => {
    e.preventDefault();
    let cardTypeId = cardTyperef.current?.props?.value;
    let directionName = directionNameref.current?.props?.value;
    let cardName = cardNameref.current.value;
    let expireDate = expireDateref.current.value;

    if (cardTypeId) {
      if (directionName) {
        if (cardName) {
          if (expireDate) {
            if (parseInt(expireDate) > 0) {
              try {
                const res = await axiosInstance.post("card", {
                  cardName: cardName,
                  expireDate: expireDate,
                  cardTypeId: directionName ? directionName.value : null  // arr1[0].value
                })
                setBoshTashkilotlar(prev => [...prev, res.data]);
                Alert(setAlert, "success", "Карта успешно добавлена");
                formreset.current.reset();
                btnCloseref.current.click();
                cardTyperef.current?.props?.value && cardTyperef.current.removeValue(cardTyperef.current.props.value);
                directionNameref.current?.props?.value && directionNameref.current.removeValue(directionNameref.current.props.value);
                setChange(!change);
              } catch (error) {
                console.log(error?.response);
                Alert(setAlert, "warning", error.response.data);
              }
            } else {
              Alert(setAlert, "warning", "Время выполнения должно быть больше 0");
            }
          } else {
            Alert(setAlert, "warning", "Срок не указан");
          }
        } else {
          Alert(setAlert, "warning", "Не введено имя карты");
        }
      } else {
        Alert(setAlert, "warning", "Название маршрута не выбрано");
      }
    } else {
      Alert(setAlert, "warning", "Тип маршрута не выбран");
    }
  }

  return (
    <div id="modal_theme_primary" className="modal fade" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Добавить карту</h5>
            <button type="button" className="close" ref={btnCloseref} data-dismiss="modal">&times;</button>
          </div>

          <div className="modal-body pb-2">
            <form className="tashkilotForm2" onSubmit={kartochkaQushish} ref={formreset}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <Select
                        options={notParentsCard}
                        onChange={notParentsCardClick}
                        placeholder="Направление:"
                        className="cardTypeId"
                        ref={cardTyperef}
                        isClearable={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <Select
                        options={cardsName}
                        placeholder="Выберите название маршрута:"
                        className="card1"
                        ref={directionNameref}
                        isClearable={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating">
                    <input
                      type="text"
                      className="form-control form-control-outline cardName"
                      placeholder="Placeholder"
                      ref={cardNameref}
                    />
                    <label className="label-floating">Название карты</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline expireDate"
                        placeholder="Placeholder"
                        ref={expireDateref}
                      />
                      <label className="label-floating">Срок Исполнение</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-right">
                  <button
                    type="submit"
                    className="btn btn-primary">
                    <i className="icon-floppy-disk mr-1"></i>
                    Сохранять
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

export default React.memo(AddCard);