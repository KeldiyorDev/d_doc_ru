import React, { useEffect, useRef } from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";
import Select from 'react-select';

const UpdateDirection = ({ currentUser, notParentsCard, setAlert, yunalishlar, setYunalishlar, setNotParentsCard, setTashkilotlar, tashkilotlar, setUpdateYunalish, updateYunalish }) => {
  const directionNameref = useRef();
  const cardref = useRef();
  const orderNumberref = useRef();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      directionNameref.current.value = updateYunalish.obj?.cardName;
      updateYunalish?.obj?.parentCardType?.cardName && cardref.current.props.onChange({ value: updateYunalish?.obj?.parentCardType?.id, label: updateYunalish?.obj?.parentCardType?.cardName });
      orderNumberref.current.value = updateYunalish.obj?.orderNumber;
    }

    // const getData = async () => {
    //   try {
    //     const res = await axiosInstance.get("cardType", {
    //       headers: {
    //         Authorization: "Bearer " + currentUser,
    //       }
    //     })
    //     let arr = [];
    //     if (res.data?.length > 0) {
    //       res.data.forEach((item) => {
    //         arr.push({ value: item.id, label: item.cardName });
    //       })
    //     }
    //     if (isMounted) {
    //       setNotParentsCard(arr);
    //     }
    //   } catch (error) {
    //     console.log(error?.response);
    //   }
    // }
    // getData();

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateYunalish.open]);

  // update direction
  const yunalishUzgartirish = async (dat) => {
    let yunalishNomi1 = directionNameref.current.value;
    let orderNumber = orderNumberref.current.value;
    let kartochkalar1 = cardref.current?.props?.value;

    if (yunalishNomi1) {
      try {
        const res = await axiosInstance.patch("cardType", {
          id: dat.id,
          orderNumber: orderNumber,
          cardName: yunalishNomi1,
          parentCardTypeId: kartochkalar1 ? kartochkalar1.value : null // arr[0]?.value || dat?.parentCardType?.id
        })
        if (!res.data.parentCardType) {
          let arr = yunalishlar.filter((c) => {
            if (c.id === res.data.id) {
              c.id = res.data.id;
              c.orderNumber = res.data.orderNumber;
              c.cardName = res.data.cardName;
              c.parentCardType = res.data.parentCardType;
            }
            return c;
          })
          setYunalishlar(arr);
        } else {
          let arr = tashkilotlar.filter((c) => {
            if (c.id === res.data.id) {
              c.id = res.data.id;
              c.orderNumber = res.data.orderNumber;
              c.cardName = res.data.cardName;
              c.parentCardType = res.data.parentCardType;
            }
            return c;
          })
          setTashkilotlar(arr);
        }

        try {
          const res1 = await axiosInstance.get("cardType")
          setYunalishlar(res1.data);
        } catch (error) {
          console.log(error?.response);
        }
        Alert(setAlert, "success", "Название маршрута успешно изменено")
        setUpdateYunalish({ open: false, obj: {} });
      } catch (error) {
        console.log(error?.response);
        setUpdateYunalish({ open: false, obj: {} });
        Alert(setAlert, "warning", error?.response?.data);
      }
    } else {
      setUpdateYunalish({ open: false, obj: {} });
      Alert(setAlert, "warning", "Необходимо ввести название маршрута")
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog modal-lg ">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Изменить окно</h5>
            <button type="button" className="close" onClick={() => setUpdateYunalish({ open: false, obj: {} })}>&times;</button>
          </div>

          <div className="modal-body pb-0">
            <form className="yunalishForm">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline yunalishNomi1"
                        placeholder="Placeholder"
                        autoFocus
                        ref={directionNameref}
                      />
                      <label className="label-floating">Введите название пункта назначения</label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group form-group-floating">
                    <Select
                      options={notParentsCard}
                      placeholder="Направление"
                      isClearable={true}
                      className="kartochkalar1"
                      ref={cardref}
                    />
                  </div>
                </div>
                <div className="m-0 p-0 col-lg-12">
                  <span className="error text-danger d-block" style={{ textTransform: "capitalize" }}></span>
                  <div className="but-num">
                    <div className="col-lg-2">
                      <div className="form-group form-group-floating">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline orderNumber"
                            placeholder="Placeholder"
                            autoFocus
                            ref={orderNumberref}
                          />
                          <label className="label-floating">Порядковый номер</label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => yunalishUzgartirish(updateYunalish.obj)}
                    >
                      Изменять
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UpdateDirection);