import React, { useRef, useState } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const ViewCard = ({ cardKurish, setCardKurish, setAlert, currentUser, setBoshTashkilotlar, boshTashkilotlar, notParentsCard }) => {
  const [cardsName, setCardsName] = useState([]);
  const cardtypeidref = useRef();
  const cardref = useRef();
  const cardnameref = useRef();
  const expiredateref = useRef();

  const notParentsCardClick = async (e) => {
    try {
      const res = await axiosInstance.get("cardType/" + e.value)
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      setCardsName(arr);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const kartochkaUzgartirish = async (dat) => {
    if (cardtypeidref.current?.props?.value) {
      if (cardref.current?.props?.value) {
        if (cardnameref.current.value) {
          if (expiredateref.current.value) {
            try {
              const res = await axiosInstance.patch("card", {
                id: dat.id,
                cardName: cardnameref.current.value,
                expireDate: expiredateref.current.value,
                cardTypeId: cardtypeidref.current.props.value ? cardtypeidref.current.props.value.value : dat.cardType.id,  // arr.length > 0 ? arr[0]?.value : dat.cardType.id
              })
              let arr = boshTashkilotlar.filter((d) => {
                if (d.id === res.data.id) {
                  d.id = res.data.id;
                  d.cardName = res.data.cardName;
                  d.cardType = res.data.cardType;
                  d.expireDate = res.data.expireDate;
                }
                return d;
              })
              Alert(setAlert, "success", "Изменено успешно");
              setBoshTashkilotlar(arr);
              setCardKurish({ open: false, obj: {} });
            } catch (error) {
              console.log(error.response);
            }
          } else {
            Alert(setAlert, "warning", "Срок не указан");
          }
        } else {
          Alert(setAlert, "warning", "Имя карты не введено");
        }
      } else {
        Alert(setAlert, "warning", "Карта должна быть выбрана");
      }
    } else {
      Alert(setAlert, "warning", "Тип карты должен быть выбран");
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Сменить карту</h5>
            <button type="button" className="close closeSave"
              onClick={() => setCardKurish({ open: false, obj: {} })}>&times;</button>
          </div>

          <div className="modal-body">
            <form className="tashkilotForm2Uzgartirish">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <Select
                          defaultValue={{
                            value: cardKurish.obj.cardType?.parentCardType?.id,
                            label: cardKurish.obj.cardType?.parentCardType?.cardName
                          }}
                          options={notParentsCard}
                          onChange={notParentsCardClick}
                          placeholder="Tuman(Shahar)"
                          className="cardTypeIdUzgartirish"
                          isClearable={true}
                          ref={cardtypeidref}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <Select
                          defaultValue={{
                            value: cardKurish.obj.cardType?.id,
                            label: cardKurish.obj.cardType?.cardName
                          }}
                          options={cardsName}
                          placeholder="Card nomi"
                          className="card1Uzgartirish"
                          isClearable={true}
                          ref={cardref}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <input
                        type="text"
                        className="form-control form-control-outline cardNameUzgartirish"
                        placeholder="Placeholder"
                        defaultValue={cardKurish.obj.cardName}
                        ref={cardnameref}
                      />
                      <label className="label-floating">Название карты</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline expireDateUzgartirish"
                          placeholder="Placeholder"
                          defaultValue={cardKurish.obj.expireDate}
                          ref={expiredateref}
                        />
                        <label className="label-floating">Срок оплаты</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-2">
                  <button type="button" onClick={() => kartochkaUzgartirish(cardKurish.obj)} className="btn btn-primary">
                    <i className="icon-floppy-disk mr-1"></i> Изменять
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

export default React.memo(ViewCard);