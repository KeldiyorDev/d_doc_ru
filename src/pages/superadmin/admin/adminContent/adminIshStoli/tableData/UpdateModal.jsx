import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { ShortUser } from "../../../../../../component/ShortUser";
import { axiosInstance, axiosInstanceKadr } from "../../../../../../config";

const UpdateModal = ({ setUpdateModal, updateModal, setAlert, currentUser, qushimchaUpdate, biriktirilganIjrochilar, lavozimlar, selectBulimlar, setData, selected }) => {
  const [ranks, setRanks] = useState([]);
  const [huquqlar, setHuquqlar] = useState([]);
  const [ishStoli, setIshStoli] = useState([]);
  const [qushimchaLavozimlar, setQushimchaLavozimlar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const rankref = useRef();
  const rangeUserref = useRef();
  const positionref = useRef();
  const lawref = useRef();
  const extrarankref = useRef();
  const extradepartmentref = useRef();
  const extrarank1ref = useRef();
  const worktableref = useRef();
  const extrapositionref = useRef();
  const extralawref = useRef();
  const extrarank2ref = useRef();

  console.log(updateModal);

  // ranklarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getAllRank = async () => {
      try {
        const res = await axiosInstance.get("role")
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: `${d.name}` });
        })

        if (isMounted)
          setRanks(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getAllRank();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // barcha huquqlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getAllHuquqlar = async () => {
      try {
        const res = await axiosInstance.get("permission")
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.name });
        })

        if (isMounted)
          setHuquqlar(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getAllHuquqlar();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  console.log(updateModal.obj);
  // malumotlarni o'zgartirish
  const yangilash = async (dat) => {
    // asosiy uchun
    let rank = rankref.current?.props?.value;
    let biriktirilganIjrochi = rangeUserref.current?.props?.value;
    let lavozimi = positionref.current?.props?.value;
    let huquqlar1 = lawref.current?.props?.value;
    let qushimchaRanki = extrarankref.current?.props?.value;

    // qushimcha uchun
    let qushimchaBulim1 = extradepartmentref.current?.props?.value;
    let qushimchaRank1 = extrarank1ref.current?.props?.value;
    let qushimchaIshStoli = worktableref.current?.props?.value;
    let qushimchaLavozimi1 = extrapositionref.current?.props?.value;
    let qushimchaHuquqlar1 = extralawref.current?.props?.value;
    let qushimchaRank2 = extrarank2ref.current?.props?.value;

    // // huquq tanlangan bo'lsa id sini olish
    let arrLaw = [];
    huquqlar1?.forEach((h) => {
      arrLaw.push(h.value);
    })

    let bulimlar = [];
    bulimlar = selectBulimlar?.filter((d) => {
      return d.label === dat.departmentName;
    })

    // huquq tanlangan bo'lsa id sini olish
    let qLaw1 = [];
    qushimchaHuquqlar1?.forEach((h) => {
      qLaw1.push(h.value);
    })

    if (rank) {
      if (biriktirilganIjrochi) {
        if (lavozimi) {
          axiosInstance.patch("workplace", {
            id: dat.id,
            userPositionsId: lavozimi ? [lavozimi.value] : [dat.userPositions[0]?.id],
            userId: biriktirilganIjrochi ? biriktirilganIjrochi.value : dat.user.id,
            rolesId: (rank && qushimchaRanki) ? [rank.value, qushimchaRanki.value] : rank ? [rank.value] : qushimchaRanki ? [qushimchaRanki.value] : [],
            permissionsId: arrLaw,
            departmentId: bulimlar?.length > 0 ? bulimlar[0]?.value : null,

            workPlaceId2: qushimchaIshStoli ? qushimchaIshStoli.value : null,
            departmentId2: qushimchaBulim1 ? qushimchaBulim1.value : null,
            rolesId2: (qushimchaRank1 && qushimchaRank2) ? [qushimchaRank1.value, qushimchaRank2.value] : qushimchaRank1 ? [qushimchaRank1.value] : qushimchaRank2 ? [qushimchaRank2.value] : [],  // (qRank1.length > 0 && qRanks2.length > 0) ? [qRank1[0]?.value, qRanks2[0]?.value] : qRank1?.length > 0 ? [qRank1[0]?.value] : qRanks2?.length > 0 ? [qRanks2[0]?.value] : [],
            userPositionsId2: qushimchaLavozimi1 ? [qushimchaLavozimi1.value] : [],
            permissionsId2: qLaw1
          })
            .then(res3 => {
              // console.log(res3.data);
              // kadrga malumotni yuborish
              axiosInstanceKadr.post(`attachment/${localStorage.getItem('oi')}`, {
                userID: res3.data.user?.id,
                pin: res3.data.user.pnfl,
                position: res3.data.userPositions[0].name,
                department: res3.data.departmentName,
              }).then(res4 => {
                console.log(res4.data);
              }).catch(error => console.log(error))

              axiosInstance.get(`workplace?orgId=${JSON.parse(localStorage.getItem('oi'))}&page=` + selected)
                .then(response => {
                  setData(response.data);
                })
                .catch(err => {
                  console.log(err.response);
                })

              Alert(setAlert, 'success', "Информация успешно изменена");
            })
            .catch(err => {
              console.log(err);
              Alert(setAlert, 'warning', err?.response?.data);
            })
          setUpdateModal({ open: false, obj: {} });
        } else {
          Alert(setAlert, "warning", "Позиция не выбрана");
          setUpdateModal({ open: false, obj: {} });
        }
      } else {
        Alert(setAlert, "warning", "Исполнитель не привязан");
        setUpdateModal({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Ранк не выбран");
      setUpdateModal({ open: false, obj: {} });
    }
  }

  const logChangeBulim = async (e, tag) => {
    try {
      const res = await axiosInstance.get(`workplace/notAttached/${e.value}/${tag.id}`)
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.tempName });
      })
      setIshStoli(arr1);
    } catch (error) {
      console.log(error.response);
    }

    // qushimcha bo'lim id si orqali lavozimlarni o'qib olish
    try {
      const res = await axiosInstance.get("department/user_position/" + e.value)
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.name });
      })
      setQushimchaLavozimlar(arr1);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog modal-xl"
        style={{ maxHeight: "650px", overflowY: "scroll" }}>
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Добавить рабочий стол</h6>
            <button type="button" className="close" onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</button>
          </div>
          <div className="modal-body pb-0">
            <form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group form-group-floating mb-0">
                    <div className="position-relative">
                      <input type="text"
                        className="form-control form-control-outline departmentName"
                        placeholder="Placeholder"
                        defaultValue={updateModal.obj?.departmentName}
                        disabled
                      />
                      <label className="label-floating">Название раздела</label>
                    </div>
                  </div>
                </div>
              </div>
              <hr style={{ backgroundColor: "lightgray" }} className="my-2" />

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline"
                        placeholder="Placeholder"
                        data-mask="99999999999999"
                        defaultValue={updateModal.obj?.uniqueCode}
                        disabled
                      />
                      <label className="label-floating">Уникальный код</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    {updateModal.obj?.userRoles?.length > 0 ? (
                      <Select
                        defaultValue={{
                          value: updateModal.obj?.userRoles[0]?.id,
                          label: updateModal.obj?.userRoles[0]?.name
                        }}
                        options={ranks}
                        isClearable={true}
                        placeholder="Rank"
                        className="rank"
                        ref={rankref}
                      />
                    ) : (
                      <Select
                        options={ranks}
                        placeholder="Rank"
                        className="rank"
                        ref={rankref}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    {updateModal?.obj.user ? (
                      <Select
                        defaultValue={{
                          value: updateModal.obj.user?.id,
                          label: ShortUser(updateModal.obj.user.firstName, updateModal.obj.user.lastName.toUpperCase())
                        }}
                        options={biriktirilganIjrochilar}
                        isClearable={true}
                        placeholder="Прикрепленный исполнитель"
                        className="biriktirilganIjrochi"
                        ref={rangeUserref}
                      />
                    ) : (
                      <Select
                        options={biriktirilganIjrochilar}
                        isClearable={true}
                        placeholder="Прикрепленный исполнитель"
                        className="biriktirilganIjrochi"
                        ref={rangeUserref}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    {updateModal.obj?.userPositions?.length > 0 ? (
                      <Select
                        defaultValue={{
                          value: updateModal?.obj?.userPositions[0]?.id,
                          label: updateModal?.obj?.userPositions[0]?.name
                        }}
                        options={lavozimlar}
                        isClearable={true}
                        placeholder="Позиция"
                        className="lavozimi"
                        ref={positionref}
                      />
                    ) : (
                      <Select
                        options={lavozimlar}
                        isClearable={true}
                        placeholder="Позиция"
                        className="lavozimi"
                        ref={positionref}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center pl-0">
                <button type="button" className="btn btn-primary"
                  onClick={() => setVisible(!visible)} style={{
                    padding: "0px 8px",
                    textTransform: "capitalize"
                  }}>
                  {visible ? (
                    <i className="icon-minus2 pt-1 pr-1"
                      style={{ fontSize: "12px" }}></i>
                  ) : (
                    <i className="icon-plus2 pt-1 pr-1"
                      style={{ fontSize: "12px" }}></i>
                  )}
                 Дополнительные права и Ранк
                </button>
              </div>
              {visible && (
                <div className="row mt-3 visibleDiv1 py-2 bgh">
                  <div className="col-lg-6">
                    <div className="form-group mb-0">
                      <Select
                        defaultValue={huquqlar.filter((d) => updateModal.obj?.permissions?.find((f) => f.name === d.label)?.name)}
                        options={huquqlar}
                        placeholder="Права, предоставленные работнику"
                        className="huquqlar"
                        isMulti
                        isClearable={true}
                        ref={lawref}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 qoshimchaVazifaLavozim" id="qoshimchaVazifa">
                    <div className="form-group mb-0">
                      {updateModal.obj?.userRoles?.length === 2 ? (
                        <Select
                          defaultValue={{
                            value: updateModal.obj?.userRoles[1]?.id,
                            label: updateModal.obj?.userRoles[1]?.name
                          }}
                          options={ranks}
                          placeholder="Ранк"
                          className="qushimchaRanki"
                          isClearable={true}
                          ref={extrarankref}
                        />
                      ) : (
                        <Select
                          options={ranks}
                          placeholder="Дополнительный ранк"
                          className="qushimchaRanki"
                          isClearable={true}
                          ref={extrarankref}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
              <hr style={{ marginTop: "10px" }} />

              <div className="col-lg-6 d-flex align-items-center pl-0 mb-3">
                <button type="button" className="btn btn-primary"
                  onClick={() => setVisible1(!visible1)} style={{
                    padding: "0px 8px",
                    textTransform: "capitalize"
                  }}>
                  {visible1 ? (
                    <i className="icon-minus2 pt-1 pr-1"
                      style={{ fontSize: "12px" }}></i>
                  ) : (
                    <i className="icon-plus2 pt-1 pr-1"
                      style={{ fontSize: "12px" }}></i>
                  )}
                  Дополнительный отдел и должность
                </button>
              </div>
              {visible1 && (
                <>
                  <div className="row mt-3 visibleDiv py-2 bgh">
                    <div className="col-lg-6">
                      <div className="form-group mb-0">
                        {qushimchaUpdate ? (
                          <Select
                            defaultValue={{
                              value: qushimchaUpdate?.departmentName,
                              label: qushimchaUpdate?.departmentName
                            }}
                            options={selectBulimlar}
                            onChange={(e) => logChangeBulim(e, updateModal.obj)}
                            placeholder="Отделение"
                            className="qushimchaBulim1"
                            isClearable={true}
                            ref={extradepartmentref}
                          />
                        ) : (
                          <Select
                            options={selectBulimlar}
                            onChange={(e) => logChangeBulim(e, updateModal.obj)}
                            placeholder="Отделение"
                            className="qushimchaBulim1"
                            isClearable={true}
                            ref={extradepartmentref}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 qoshimchaVazifaLavozim" id="qoshimchaVazifa">
                      <div className="form-group mb-0">
                        {qushimchaUpdate?.userRoles?.length > 0 ? (
                          <Select
                            defaultValue={{
                              value: qushimchaUpdate?.userRoles[0]?.id,
                              label: qushimchaUpdate?.userRoles[0]?.name
                            }}
                            options={ranks}
                            placeholder="Ранк"
                            className="qushimchaRank1"
                            isClearable={true}
                            ref={extrarank1ref}
                          />
                        ) : (
                          <Select
                            options={ranks}
                            placeholder="Дополнительный ранк"
                            className="qushimchaRank1"
                            isClearable={true}
                            ref={extrarank1ref}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row visibleDiv py-2 bgh">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <Select
                          options={ishStoli}
                          isClearable={true}
                          placeholder="Рабочий стол"
                          className="qushimchaIshStoli"
                          ref={worktableref}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        {qushimchaUpdate?.userPositions?.length > 0 ? (
                          <Select
                            defaultValue={{
                              value: qushimchaUpdate?.userPositions[0]?.id,
                              label: qushimchaUpdate?.userPositions[0]?.name
                            }}
                            options={qushimchaLavozimlar}
                            isClearable={true}
                            placeholder="Позиция"
                            className="qushimchaLavozimi1"
                            ref={extrapositionref}
                          />
                        ) : (
                          <Select
                            options={qushimchaLavozimlar}
                            isClearable={true}
                            placeholder="Позиция"
                            className="qushimchaLavozimi1"
                            ref={extrapositionref}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 d-flex align-items-center pl-0">
                    <button type="button"
                      className="btn btn-primary"
                      onClick={() => setVisible2(!visible2)}
                      style={{
                        padding: "0px 8px",
                        textTransform: "capitalize"
                      }}>
                      {visible ? (
                        <i className="icon-minus2 pt-1 pr-1"
                          style={{ fontSize: "12px" }}></i>
                      ) : (
                        <i className="icon-plus2 pt-1 pr-1"
                          style={{ fontSize: "12px" }}></i>
                      )}
                     Дополнительные права и звание
                    </button>
                  </div>
                  {visible2 && (
                    <div className="row mt-3 visibleDiv1 py-2 bgh">
                      <div className="col-lg-6">
                        <div className="form-group mb-0">
                          <Select
                            options={huquqlar}
                            isClearable={true}
                            placeholder="Права, предоставленные работнику"
                            className="qushimchaHuquqlar1"
                            isMulti
                            ref={extralawref}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 qoshimchaVazifaLavozim" id="qoshimchaVazifa">
                        <div className="form-group mb-0">
                          {qushimchaUpdate?.userRoles?.length === 2 ? (
                            <Select
                              defaultValue={{
                                value: qushimchaUpdate?.userRoles[1]?.name,
                                label: qushimchaUpdate?.userRoles[1]?.name
                              }}
                              options={ranks}
                              placeholder="Дополнительный ранк"
                              className="qushimchaRank2"
                              isClearable={true}
                              ref={extrarank2ref}
                            />
                          ) : (
                            <Select
                              options={ranks}
                              placeholder="Дополнительный ранк"
                              className="qushimchaRank2"
                              isClearable={true}
                              ref={extrarank2ref}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <button type="button"
                          onClick={() => yangilash(updateModal.obj)}
                          className="btn btn-primary form-control form-control-outline">
                          <i className="fas fa-save"
                            style={{ fontSize: "18px" }}></i> Сохранять
                        </button>
                      </div>
                    </div>
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

export default React.memo(UpdateModal);