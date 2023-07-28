import React, { useRef, useState } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const UpdateDirection = ({ setUpdateYunalish, updateYunalish, currentUser, setAlert, setYunalishlar, yunalishlar, notParentsCard }) => {
  const [yunalishQ, setYunalishQ] = useState("");
  const directionref = useRef();
  const notParentsCardref = useRef();

  // yunalish qushish va hamma yunalishni o'qib olish
  const yunalishQushish = async (e) => {
    e.preventDefault();
    if (directionref.current.value) {
      // yunalish kiritish
      try {
        const res = await axiosInstance.post("cardType", {
          cardName: yunalishQ,
          parentCardTypeId: notParentsCardref.current.props.value.value  // arr[0]?.value || null
        })

        if (res.data?.parentCardType) {
          let orgNames = document.querySelectorAll('.cardAccordion');
          orgNames.forEach((org) => {
            org.querySelector('.orgname').addEventListener('click', () => {
              if (org.querySelector('.openTash').style.display === "none") {
                org.querySelector('.openTash').style.display = "block";
              } else {
                org.querySelector('.openTash').style.display = "none";

              }
            })
          })
        } else {
          Alert(setAlert, "success", "Маршрут успешно добавлен");
          setYunalishlar(prev => [...prev, res.data]);
        }
      } catch (error) {
        console.log(error?.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
      setYunalishQ("");
      document.querySelector('.close11').click();
    } else {
      Alert(setAlert, "warning", "Не введено направление");
    }
  }

  // update direction
  const yunalishUzgartirish = async (dat) => {
    if (directionref.current.value) {
      try {
        const res = await axiosInstance.patch("cardType", {
          id: dat.id,
          cardName: directionref.current.value,
          parentCardTypeId: notParentsCardref.current.props.value ? notParentsCardref.current.props.value.value : dat?.parentCardType?.id  // arr[0]?.value || dat?.parentCardType?.id
        })
        let arr1 = yunalishlar.filter((c) => {
          if (c.id === res.data.id) {
            c.id = res.data.id;
            c.cardName = res.data.cardName;
            c.parentCardType = res.data.parentCardType;
          }
          return c;
        })
        Alert(setAlert, "success", "Маршрутизация успешно переименована")
        setYunalishlar(arr1)
        let orgNames = document.querySelectorAll('.cardAccordion');
        orgNames.forEach((org) => {
          org.querySelector('.orgname').addEventListener('click', () => {
            if (org.querySelector('.openTash').style.display === "none") {
              org.querySelector('.openTash').style.display = "block";
            } else {
              org.querySelector('.openTash').style.display = "none";

            }
          })
        })
        setUpdateYunalish({ open: false, obj: {} });
      } catch (error) {
        console.log(error?.response);
        setUpdateYunalish({ open: false, obj: {} });
        Alert(setAlert, "warning", error?.response?.data);
      }
    } else {
      setUpdateYunalish({ open: false, obj: {} });
      Alert(setAlert, "warning", "Необходимо ввести имя пункта назначения.")
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog modal-lg ">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Изменить окно</h5>
            <button type="button" className="close"
              onClick={() => setUpdateYunalish({ open: false, obj: {} })}>&times;</button>
          </div>

          <div className="modal-body">
            <form onSubmit={yunalishQushish} className="yunalishForm">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline"
                          placeholder="Placeholder"
                          defaultValue={updateYunalish.obj.cardName}
                          autoFocus
                          onChange={(e) => setYunalishQ(e.target.value)}
                          ref={directionref}

                        />
                        <label className="label-floating">Направление</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <Select
                        options={notParentsCard}
                        placeholder="Kartochkalar"
                        ref={notParentsCardref}
                      />

                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <span className="error text-danger d-block"
                    style={{ textTransform: "capitalize" }}></span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => yunalishUzgartirish(updateYunalish.obj)}
                  >
                   Изменять
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

export default React.memo(UpdateDirection);