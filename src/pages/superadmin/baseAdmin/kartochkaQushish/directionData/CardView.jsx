import React, { useEffect, useRef } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const CardView = ({ notParentsCardClick, notParentsCard, setCardKurish, cardKurish, currentUser, setAlert, cardsName, setBoshTashkilotlar, boshTashkilotlar, setNotParentsCard }) => {
  const cardTyperef = useRef();
  const cardref = useRef();
  const cardNameref = useRef();
  const expireref = useRef();
  const orderNumberref = useRef();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      cardKurish.obj.cardType?.parentCardType && cardTyperef.current.props.onChange({ value: cardKurish.obj.cardType?.parentCardType?.id, label: cardKurish.obj.cardType?.parentCardType?.cardName });
      cardKurish.obj.cardType && cardref.current.props.onChange({ value: cardKurish.obj.cardType?.id, label: cardKurish.obj.cardType?.cardName });
      cardNameref.current.value = cardKurish.obj.cardName;
      expireref.current.value = cardKurish.obj.expireDate;
      orderNumberref.current.value = cardKurish.obj.orderNumber;
    }
    const getData = async () => {
      try {
        const res = await axiosInstance.get("cardType")
        let arr = [];
        if (res.data?.length > 0) {
          res.data.forEach((item) => {
            arr.push({ value: item.id, label: item.cardName });
          })
        }
        if (isMounted) {
          setNotParentsCard(arr);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardKurish.open]);
  console.log(cardKurish);
  // update card
  const kartochkaUzgartirish = async (dat) => {
    let cardTypeId = cardTyperef.current?.props?.value;
    let card1 = cardref.current?.props?.value;
    let cardName = cardNameref.current.value;
    let orderNumber = orderNumberref.current.value;
    let expireDate = expireref.current.value;

    console.log(cardTypeId);
    console.log(card1);

    if (cardTypeId) {
      if (card1) {
        if (cardName) {
          if (expireDate) {
            try {
              console.log({
                id: dat.id,
                cardName: cardName,
                orderNumber: orderNumber,
                expireDate: expireDate,
                cardTypeId: card1 ? card1.value : dat.cardType ? dat.cardType.id : null
              });
              const res = await axiosInstance.patch("card", {
                id: dat.id,
                cardName: cardName,
                orderNumber: orderNumber,
                expireDate: expireDate,
                cardTypeId: card1 ? card1.value : dat.cardType ? dat.cardType.id : null
              })
              console.log(res.data);
              let arr1 = boshTashkilotlar.filter((d) => {
                if (d.id === res.data.id) {
                  d.id = res.data.id;
                  d.orderNumber = res.data.orderNumber;
                  d.cardName = res.data.cardName;
                  d.cardType = res.data.cardType;
                  d.expireDate = res.data.expireDate;
                }
                return d;
              })
              Alert(setAlert, "success", "Изменено успешно");
              setBoshTashkilotlar(arr1);

              console.log(arr1);
              // try {
              //   const res1 = await axiosInstance.get("card/cardType/" + res.data.cardType.id, {
              //     headers: {
              //       Authorization: "Bearer " + currentUser
              //     }
              //   })
              //   setBoshTashkilotlar(res1.data);
              // } catch (error) {
              //   console.log(error?.response);
              // }
              setCardKurish({ open: false, obj: {} });
              console.log("cardkurish", cardKurish);
            } catch (error) {
              console.log(error);
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
            <button type="button" className="close closeSave" onClick={() => setCardKurish({ open: false, obj: {} })}>&times;</button>
          </div>

          <div className="modal-body pb-0">
            <form className="tashkilotForm2Uzgartirish">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <Select
                          options={notParentsCard}
                          onChange={notParentsCardClick}
                          placeholder="Направление"
                          className="cardTypeIdUzgartirish"
                          ref={cardTyperef}
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
                          options={cardsName}
                          placeholder="Название маршрута"
                          className="card1Uzgartirish"
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
                        ref={cardNameref}
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
                          ref={expireref}
                        />
                        <label className="label-floating">Срок Исполнение</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-lg-6">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline orderNumber"
                          placeholder="Placeholder"
                          ref={orderNumberref}
                        />
                        <label className="label-floating">Порядковый номер</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex justify-content-end">
                  <button type="button" onClick={() => kartochkaUzgartirish(cardKurish.obj)} className="btn btn-primary">
                    <i className="icon-floppy-disk mr-1"></i>Изменять
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

export default React.memo(CardView);