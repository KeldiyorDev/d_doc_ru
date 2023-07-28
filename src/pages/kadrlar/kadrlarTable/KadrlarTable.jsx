import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { NavLink, useHistory, useParams } from "react-router-dom";
import AlertContent, { Alert } from "../../../component/alert/Alert";
import { axiosInstanceKadr } from "../../../config";
import KadrlarTableContent from "./kadrlarTableContent/KadrlarTableContent";
import KadrlarTableNavbar from "./KadrlarTableNavbar";
import { CheckBoxSelection, Inject, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";

const KadrlarTable = ({ currentUser, permission1, ranks }) => {
  let history = useHistory();
  const [branchs, setBranchs] = useState([])
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [addModal, setAddModal] = useState(false)
  const [addNotActiveModal, setAddNotActiveModal] = useState(false)
  const [updateBranchModal, setUpdateBranchModal] = useState({ isShow: false, branch: { id: 0, main: false, name: "" }, check: false })
  const [deleteBranchModal, setDeleteBranchModal] = useState({ isShow: false, branch: { id: 0, main: false, name: "" } })
  const [deleteNotActiveModal, setDeleteNotActiveModal] = useState({ isShow: false, users: [], name: "" })
  const [createNotActiveModal, setCreateNotActiveModal] = useState({ isShow: false, users: [], name: "" })
  const [newBranchModal, setNewBranchModal] = useState({ isShow: false, branch: { id: 0, main: false, name: "" } })
  const [newNotActive, setNewNotActive] = useState([])
  const [globalSearch, setGlobalSearch] = useState([])
  // const [globalSearchBranch, setGlobalSearchBranch] = useState({ isShow: false, users: [] })

  const oi = localStorage.getItem("oi")


  const branchRef = useRef()
  const branchNotActiveRef = useRef()
  const globalSearchRef = useRef()

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axiosInstanceKadr.get(`branch/getAll/${oi}`).then(res => {
        console.log(res.data);

        const newBranchs = res.data.filter((item) => item.name !== "DUBLIKATLAR")
        res.data?.forEach((item) => {
          if (item.name === "DUBLIKATLAR") {
            axiosInstanceKadr.get(`getCount/${oi}`).then(response => {
              item.count = response.data
            })
            newBranchs.push(item)
          }
        })

        console.log(newBranchs);
        setBranchs(newBranchs);

      })

      axiosInstanceKadr.get(`getAllNotActive/${oi}`).then(res => {
        console.log(res.data)
        setNewNotActive(res.data)
      })
    }

    return () => {
      isMounted = false
    }
  }, [oi])

  const addClassNav = () => {
    console.log(branchRef.current.value);

    const data = {
      name: branchRef.current.value,
      orgId: oi
    }

    axiosInstanceKadr.post(`branch/create`, data).then((res) => {

      const newBranchs = branchs.filter((item) => item.name !== "DUBLIKATLAR")
      newBranchs.push(res.data)
      branchs?.forEach((item) => {
        if (item.name === "DUBLIKATLAR") {
          newBranchs.push(item)
        }
      })
      setBranchs(newBranchs);
      Alert(setAlert, "success", "Muvafaqqiyatli qo'shildi");
      history.push(`/kadrlar/${branchRef.current.value}`)
      setAddModal(false)
    }).catch(err => Alert(setAlert, "warning", err.response.data))
  }

  const updateBranch = () => {

    console.log(updateBranchModal.branch.main);

    axiosInstanceKadr.patch(`branch/update`, {
      id: updateBranchModal.branch.id,
      name: branchRef.current.value,
      main: updateBranchModal.check,
    }).then((res) => {
      console.log(res.data);

      const newBranchs = branchs?.filter((item) => {

        if (item.id === res.data.id) {
          item.name = branchRef.current.value;
          item.main = updateBranchModal.check
        } else {
          item.main = false
        }

        return item
      })

      const newBranchs2 = newBranchs.filter((item) => (!(item.name === "DUBLIKATLAR" || item.main === true)))
      newBranchs?.forEach((item) => {
        if (item.name === "DUBLIKATLAR") {
          newBranchs2.push(item)
        }

        if (item.main) {
          newBranchs2.unshift(item)
        }
      })
      setBranchs(newBranchs2);

      // setBranchs(newBranchs)
      setUpdateBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" }, check: false })
      history.push(`/kadrlar/${res.data.name}`)
      Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi");
    }).catch(err => Alert(setAlert, "warning", err.response.data))
  }

  const deleteBranch = () => {
    setUpdateBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" }, check: false })

    axiosInstanceKadr.delete(`branch/delete/${deleteBranchModal.branch.id}`).then((res) => {
      console.log(res.data);
      const newBranchs = branchs?.filter((item) => item.id !== deleteBranchModal.branch.id)
      setBranchs(newBranchs)
      history.push(branchs.length > 0 ? `/kadrlar/${branchs[0].name}` : `/kadrlar/Asosiy`)
      Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi");
      setDeleteBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } });
    }).catch(error => {
      Alert(setAlert, "warning", error?.response?.data);
      setDeleteBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })
    })

  }

  console.log(updateBranchModal);

  const checkMainFunc = () => {
    let newBranch = updateBranchModal.branch
    let newCheck = updateBranchModal.check
    // newBranch.main = !updateBranchModal.branch.main
    newCheck = !updateBranchModal.check

    console.log(newBranch);
    setUpdateBranchModal({ isShow: true, branch: newBranch, check: newCheck })
  }

  const { name } = useParams()
  const activeBranchId = branchs?.filter((item) => item.name === name)[0]?.id
  console.log(activeBranchId);

  const NotActiveSelect = ({ data }) => {
    const option = data?.map((item) => {
      let itemOption = {
        value: item?.id,
        label: `${item.lastName} ${item.firstName} ${item.middleName}`
      }
      return itemOption
    })

    console.log(option);

    return (

      <Select
        // ref={sendingOrgRef}
        placeholder="Kadrlar:"
        name="colors"
        options={option}
        className="w-100"
        classNamePrefix="select"
        onChange={(e) => console.log(e)}
      />
    )
  }

  const deleteNotActiveFunc = () => {
    const ids = deleteNotActiveModal?.users?.map((item) => {
      return item.id
    })

    console.log(ids);

    axiosInstanceKadr.post(`acceptance`, {
      ids: ids,
      branchId: null,
      agree: false
    }).then(res => {
      Alert(setAlert, "success", "Muvofaqqiyatli o'chirildi");
      let newArr = newNotActive?.filter((item) => item.orgName !== deleteNotActiveModal.name)
      setNewNotActive(newArr)
      setDeleteNotActiveModal({ isShow: false, users: [], name: "" });
      setNewBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })
    }
    )
  }

  const createNotActiveFunc = () => {
    axiosInstanceKadr.post(`branch/create`, {
      name: branchNotActiveRef.current.value,
      orgId: oi
    }).then((res) => {
      const branchId = res.data.id

      const ids = createNotActiveModal?.users?.map((item) => {
        return item.id
      })

      console.log(ids);
      console.log(res.data.id);

      axiosInstanceKadr.post(`acceptance`, {
        orgId: oi,
        ids: ids,
        branchId: branchId,
        agree: true
      }).then(res => {
        console.log(res.data);
        Alert(setAlert, "success", "Добавлено успешно");
        setBranchs([...branchs, { id: branchId, name: branchNotActiveRef.current.value, main: false }])
        history.push(`/kadrlar/${branchNotActiveRef.current.value}`)


        let newArr = newNotActive?.filter((item) => item.orgName !== createNotActiveModal.name)
        console.log(newArr);
        setNewNotActive(newArr)

        setAddNotActiveModal(false)
        setCreateNotActiveModal({ isShow: false, users: [], name: "" })
        setNewBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })
      }).catch((err) => {
        Alert(setAlert, "danger", err.response.data);
      })
    })

  }

  const keyDown = (e, type) => {
    if (e.key === "Enter" && type === "branchAdd") {
      addClassNav();
    }
  }

  // Keng qidirish
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axiosInstanceKadr.get(`getAllNotPageable/${oi}`).then(res => {
        console.log(res.data);
        const newGlobalOption = res.data?.map((item) => {
          const option = {
            branchId: item.branchId,
            id: item.id,
            label: `${item.firstName} ${item.lastName} ${item.middleName}`,
          }
          return option
        })

        console.log(newGlobalOption);
        setGlobalSearch(newGlobalOption)

      })
    }

    return () => {
      isMounted = false
    }
  }, [oi, branchs])

  // let fields1 = { groupBy: 'branchName', text: 'user', value: 'id' };

  const searchGlobalFunc = (e) => {
    // console.log(globalSearchRef.current.value);
    // if (globalSearchRef.current.value.length > 0) {
    //   setGlobalSearchBranch({ isShow: true, users: globalSearchRef.current.value });
    //   history.push(`/kadrlar/KENG%20QIDIRISH`)
    // }

    console.log(e);
    history.push(`/kadrlar/${e.branchId}/${e.id}/mehnat_daftarchasi`)

  }

  return (
    <div className="content kadr-bg" style={{ background: "#fff" }}>
      <div className="mb-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: "bold", textTransform: "upperCase" }}>Отдел кадров</h1>
        <div className="d-flex" style={{ gap: "1rem" }}>

          <div className="" style={{ width: "400px" }}>
            {/* <MultiSelectComponent
              popupHeight='500px'
              popupWidth="400px"
              width="400px"
              fields={fields1}
              dataSource={globalSearch}
              placeholder="Kadrni tanlash"
              mode="CheckBox"
              ref={globalSearchRef}
              enableGroupCheckBox="true"
              allowFiltering="true"
              unSelectAllText="Barchasini olib tashlash"
              selectAllText="Barchasini belgilash"
              showSelectAll="true"
              filterBarPlaceholder="Qidirish">
              <Inject services={[CheckBoxSelection]} />
            </MultiSelectComponent> */}
            {console.log(globalSearch)}
            <Select
              ref={globalSearchRef}
              placeholder="Широкий поиск:"
              name="colors"
              options={globalSearch}
              className="w-100"
              classNamePrefix="select"
              onChange={(e) => searchGlobalFunc(e)}
            />

          </div>

          {newNotActive.length > 0 && (
            <button type="button" class="btn btn-success position-relative" onClick={() => { setNewBranchModal({ isShow: true, branch: { id: 0, main: false, name: "" } }); }}>
              <i className="fa-solid fa-folder-open mr-1" style={{ fontSize: "18px" }}></i>  Новый
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {newNotActive.length}
              </span>
            </button>
          )}

          <button onClick={() => setAddModal(true)} type="submit" title="Qo'shish" className="btn btn-primary p-2" style={{ padding: "4px 8px" }}>
            <i className="icon-plus3 mr-1" style={{ fontSize: "18px" }}></i> Создать группу
          </button>
        </div>

      </div>

      {branchs?.length > 0 && (
        <div className="card-body p-0">
          <KadrlarTableNavbar branchs={branchs} setUpdateBranchModal={setUpdateBranchModal} activeBranchId={activeBranchId} />

          <KadrlarTableContent currentUser={currentUser} permission={permission1} ranks={ranks} activeBranchId={activeBranchId} branchs={branchs} />
        </div>
      )}

      {addModal && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Создать новую группу</h5>
                <button onClick={() => setAddModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <div className="modal-body pb-0 px-2">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline InputCard"
                      placeholder="Placeholder"
                      ref={branchRef}
                      onKeyDown={(e) => keyDown(e, "branchAdd")}
                    />
                    <label
                      className="label-floating kadrInp">Имя группы:</label>
                  </div>
                </div>

                <div className="modal-footer px-0">
                  <button onClick={() => addClassNav()} type="button" className="btn btn-primary" style={{ height: "48px" }}>
                    <i class="icon-plus3 mr-1"></i> Добавлять</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {updateBranchModal.isShow && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Guruh nomini o'zgartirish</h5>
                <button onClick={() => setUpdateBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" }, check: false })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <div className="modal-body pb-0 px-3">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline InputCard"
                      placeholder="Placeholder"
                      defaultValue={updateBranchModal?.branch?.name}
                      ref={branchRef}
                    />
                    <label
                      className="label-floating kadrInp">Имя группы:</label>
                  </div>
                </div>



                <div className="modal-footer px-0" style={{ display: "flex", justifyContent: "space-between" }}>

                  <div>
                    {
                      updateBranchModal?.branch.main ? (
                        <div className="custom-control custom-checkbox custom-control-success" style={{ fontSize: "1rem", display: "flex", alignContent: "center" }}>
                          <input type="checkbox" className="custom-control-input" id="chek" checked={true} />
                          <label className="custom-control-label" for="chek" style={{ textTransform: "uppercase" }}>Отмечено как основное качество</label>
                        </div>
                      )
                        : (
                          <div className="custom-control custom-checkbox custom-control-success" style={{ fontSize: "1rem", display: "flex", alignContent: "center" }}>
                            <input type="checkbox" className="custom-control-input" id="chek" checked={updateBranchModal?.check} onChange={() => checkMainFunc()} />
                            <label className="custom-control-label" for="chek" style={{ textTransform: "uppercase" }}>Определение главного качества.</label>
                          </div>)
                    }

                  </div>
                  <div className="d-flex" style={{ gap: "1rem" }}>
                    <button onClick={() => updateBranch()} type="button" className="btn btn-success" style={{ height: "48px" }}>
                      <i class="fa-solid fa-floppy-disk mr-1"></i> Сохранять</button>

                    <button onClick={() => setDeleteBranchModal({ isShow: true, branch: updateBranchModal.branch })} type="button" className="btn btn-danger" style={{ height: "48px" }}>
                      <i class="icon-bin mr-1"></i> Выключать</button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {deleteBranchModal.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Выключать</h5>
              <button onClick={() => setDeleteBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <form action="#">
              <div className="modal-body pb-0">
                <div className="form-group">
                  <h5> Вы подтверждаете 
                    <span className="text-danger" style={{ fontWeight: "600" }}> удалить </span> эта информация
                  </h5>
                </div>

              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => { deleteBranch() }} type="button" style={{ minWidth: "80px" }} className="btn btn-danger">Да</button>
                <button onClick={() => setDeleteBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })} type="button" style={{ minWidth: "80px" }} className="btn btn-primary">Yo'q</button>
              </div>
            </form>
          </div>
        </div>
      </div>}

      {newBranchModal.isShow && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Принятие кадри</h5>
                <button onClick={() => setNewBranchModal({ isShow: false, branch: { id: 0, main: false, name: "" } })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <form >
                <div className="modal-body p-3">

                  {
                    newNotActive.length > 0 && (
                      newNotActive.map((item, index) => {
                        return (
                          <div className="new-kadr mb-2">
                            <h3 style={{ fontWeight: "bold", }}>{index + 1}.{item.orgName}</h3>
                            <div className="" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                              <NotActiveSelect data={item.kadrDTOS} />


                              <i onClick={() => setCreateNotActiveModal({ isShow: true, users: item.kadrDTOS, name: item.orgName })} class="fa-solid fa-square-plus text-success" style={{ fontSize: "60px", cursor: "pointer" }}></i>
                              <i onClick={() => setDeleteNotActiveModal({ isShow: true, users: item.kadrDTOS, name: item.orgName })} class="fa-solid fa-square-minus text-danger" style={{ fontSize: "60px", cursor: "pointer" }}></i>
                            </div>
                          </div>
                        )
                      })
                    )
                  }

                </div>

              </form>
            </div>
          </div>
        </div>
      )}

      {deleteNotActiveModal.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Выключать</h5>
              <button onClick={() => setDeleteNotActiveModal({ isShow: false, users: [], name: "" })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <form action="#">
              <div className="modal-body pb-0">
                <div className="form-group">
                  <h5> Вы уверены, что хотите
                    <span className="text-danger" style={{ fontWeight: "600" }}> удалить </span> это кадры?
                  </h5>
                </div>

              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => { deleteNotActiveFunc() }} type="button" style={{ minWidth: "80px" }} className="btn btn-danger">Ha</button>
                <button onClick={() => setDeleteNotActiveModal({ isShow: false, users: [], name: "" })} type="button" style={{ minWidth: "80px" }} className="btn btn-primary">Yo'q</button>
              </div>
            </form>
          </div>
        </div>
      </div>}

      {createNotActiveModal.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Выключать</h5>
              <button onClick={() => setCreateNotActiveModal({ isShow: false, users: [], name: "" })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <form action="#">
              <div className="modal-body pb-0">
                <div className="form-group">
                  <h5> Вы уверены, что хотите
                    <span className="text-success" style={{ fontWeight: "600" }}> добавить </span> это кадры?
                  </h5>
                </div>

              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => { setAddNotActiveModal(true) }} type="button" style={{ minWidth: "80px" }} className="btn btn-danger">Ha</button>
                <button onClick={() => setCreateNotActiveModal({ isShow: false, users: [], name: "" })} type="button" style={{ minWidth: "80px" }} className="btn btn-primary">Yo'q</button>
              </div>
            </form>
          </div>
        </div>
      </div>}

      {addNotActiveModal && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Добавить новую группу</h5>
                <button onClick={() => setAddNotActiveModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <form >
                <div className="modal-body pb-0 px-2">
                  <div className="form-group form-group-floating">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline InputCard"
                        placeholder="Placeholder"
                        ref={branchNotActiveRef}
                      />
                      <label
                        className="label-floating kadrInp">Имя группы:</label>
                    </div>
                  </div>

                  <div className="modal-footer px-0">
                    <button onClick={() => createNotActiveFunc()} type="button" className="btn btn-primary" style={{ height: "48px" }}>
                      <i class="icon-plus3 mr-1"></i> Добавлять</button>
                  </div>
                </div>


              </form>
            </div>
          </div>
        </div>
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )


}

export default React.memo(KadrlarTable)