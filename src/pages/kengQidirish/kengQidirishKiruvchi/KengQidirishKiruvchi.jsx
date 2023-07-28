import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import Select from 'react-select'
import { Alert } from "../../../component/alert/Alert";
import { axiosInstance } from "../../../config";
import { ALL_SEARCH_DATA, SEND_DATA } from "../../../context/AuthReducer";
import { colourStyles } from "../../../App";
import FoundData from "../foundData/FoundData";
import Loader from "../../../component/loader/Loader";
import KiruvchiContent from "./kiruvchiContent/KiruvchiContent";
import { extensiveSearchAllData, extensiveSearchSendData } from "../../../redux/actions/actionExtensiveSearch";

const KengQidirishKiruvchi = ({ user, setAlert, selected, currentUser, setSelected }) => {
  const dispatch = useDispatch();
  const [oxirgiSana, setOxirgiSana] = useState(user.inputData?.deadline ? new Date(user.inputData?.deadline) : null);
  const [boshSana, setBoshSana] = useState(user.inputData?.outDate ? new Date(user.inputData?.outDate) : null);
  const [from, setFrom] = useState(user.inputData?.startDate ? new Date(user.inputData?.startDate) : null);
  const [to, setTo] = useState(user.inputData?.endDate ? new Date(user.inputData?.endDate) : null);
  const [ijrochi, setIjrochi] = useState([]);
  // for button
  const loader = useRef();
  const searchBtn = useRef();
  const exportBtn = useRef();
  const kiruvchiFlex = useRef();

  const ijrochiref = useRef();
  const cardTyperef = useRef();
  const cardNameRef = useRef();
  const chiqRaqamRef = useRef();
  const statusref = useRef();
  const executorStatusref = useRef();
  const regNomerRef = useRef();
  const userref = useRef();
  const submissionFormref = useRef();
  const korrespondentref = useRef();
  const izohRef = useRef();
  const allDataResetRef = useRef();

  const changeFun = (val) => {
    let kiruvchi = document.getElementById('kiruvchi');
    if (val.value === "Kiruvchi") {
      kiruvchi.style.display = 'flex';
    } else {
      kiruvchi.style.display = 'none';
    }
  }

  // barcha ijrochilarni o'qib olish
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await axiosInstance.get("executor/wide-coverage/" + JSON.parse(localStorage.getItem('ids')));
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d?.departmentId, label: d.departmentShortName, isDisabled: "true" });
          d.users.forEach((user) => {
            let u = (user?.firstName && user?.firstName.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : "" + user?.lastName;
            arr.push({ value: user.workPlaceId, label: `${u} ${user.lastName}` })
          })
        })

        if (isMounted) {
          setIjrochi(arr);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false
    }
  }, [currentUser, user?.inputData?.executorsId]);

  // pagination
  const handlePageClick = async (e) => {
    let ijrochilar = ijrochiref.current?.props?.value;
    let cardTypeName = cardTyperef.current?.props?.value;
    let cardName = cardNameRef.current?.props?.value;
    let status = statusref.current?.props?.value;
    let executorStatus = executorStatusref.current?.props?.value;
    let confirmerName = userref.current?.props?.value;
    let submissionForm = submissionFormref.current?.props?.value;
    let korrespondentText = korrespondentref.current?.props?.value;
    let formatFromStartDate = new Date(from).toLocaleDateString();
    let formatToEndDate = new Date(to).toLocaleDateString();
    let formatStartDate = new Date(boshSana).toLocaleDateString();
    let formatEndDate = new Date(oxirgiSana).toLocaleDateString();

    // barcha ijrochilarni id larini olish
    let userIds = [];
    let userName = [];

    ijrochilar?.forEach((user) => {
      userIds.push(user.value);
      userName.push(user);
    })

    try {
      const res = await axiosInstance.post("document/wide-coverage-search", {
        workPlaceId: JSON.parse(localStorage.getItem('ids')),
        deadline: oxirgiSana ? formatEndDate : null,
        outDate: boshSana ? formatStartDate : null,
        startDate: from ? formatFromStartDate : null,
        endDate: to ? formatToEndDate : null,
        executorsId: userIds,
        status: status ? status.value : null,
        regNumber: regNomerRef.current.value ? regNomerRef.current.value : null,
        outNumber: chiqRaqamRef.current.value ? chiqRaqamRef.current.value : null,
        cardId: cardName ? cardName.value : null,
        description: izohRef.current.value ? izohRef.current.value : null,
        correspondentId: korrespondentText ? korrespondentText.value : null,
        confirmerId: confirmerName ? confirmerName.value : null,
        submissionFormId: submissionForm ? submissionForm.value : null,
        executorStatus: executorStatus ? executorStatus.value : null,
        page: e.selected
      })
      dispatch(ALL_SEARCH_DATA(res.data));
      extensiveSearchAllData(res.data)
      let obj = {
        select: "Kiruvchi",
        workPlaceId: JSON.parse(localStorage.getItem('ids')),
        deadline: oxirgiSana ? new Date(oxirgiSana).toDateString() : null,
        outDate: boshSana ? new Date(boshSana).toDateString() : null,
        startDate: from ? new Date(from).toDateString() : null,
        endDate: to ? new Date(to).toDateString() : null,
        executorsId: userName,
        status: status,
        regNumber: regNomerRef.current.value ? regNomerRef.current.value : null,
        outNumber: chiqRaqamRef.current.value ? chiqRaqamRef.current.value : null,
        cardTypeName: cardTypeName,
        cardName: cardName,
        description: izohRef.current.value ? izohRef.current.value : null,
        correspondentName: korrespondentText,
        confirmerName: confirmerName,
        submissionFormName: submissionForm,
        executorStatus: executorStatus,
        page: e.selected
      }
      dispatch(SEND_DATA(obj));
      extensiveSearchSendData(obj)
    } catch (error) {
      setTimeout(() => {
        // loader.current.style.display = "none";
        Alert(setAlert, "warning", "Произошла ошибка при получении данных");
      }, 4000);
      console.log(error);
    }
    setSelected(e.selected);
  }

  // malumotlarni qidirish
  const hujjatQushish = async (e) => {
    e.preventDefault();
    setSelected(0);
    if (kiruvchiFlex.current.style.display === "flex") {
      let ijrochilar = ijrochiref.current?.props?.value;
      let cardTypeName = cardTyperef.current?.props?.value;
      let cardName = cardNameRef.current?.props?.value;
      let status = statusref.current?.props?.value;
      let executorStatus = executorStatusref.current?.props?.value;
      let confirmerName = userref.current?.props?.value;
      let submissionForm = submissionFormref.current?.props?.value;
      let korrespondentText = korrespondentref.current?.props?.value;
      let formatFromStartDate = new Date(from).toLocaleDateString();
      let formatToEndDate = new Date(to).toLocaleDateString();
      let formatStartDate = new Date(boshSana).toLocaleDateString();
      let formatEndDate = new Date(oxirgiSana).toLocaleDateString();
      loader.current.style.display = "flex";
      // barcha ijrochilarni id larini olish
      let userIds = [];
      let userName = [];

      ijrochilar?.forEach((user) => {
        userIds.push(user.value);
        userName.push(user);
      })

      try {
        const res = await axiosInstance.post("document/wide-coverage-search", {
          workPlaceId: JSON.parse(localStorage.getItem('ids')),
          deadline: oxirgiSana ? formatEndDate : null,
          outDate: boshSana ? formatStartDate.split('/').reverse().join('.') : null,
          startDate: from ? formatFromStartDate.split('/').reverse().join('.') : null,
          endDate: to ? formatToEndDate.split('/').reverse().join('.') : null,
          executorsId: userIds,
          status: status ? status.value : null,
          regNumber: regNomerRef.current.value ? regNomerRef.current.value : null,
          outNumber: chiqRaqamRef.current.value ? chiqRaqamRef.current.value : null,
          cardId: cardName ? cardName.value : null,
          description: izohRef.current.value ? izohRef.current.value : null,
          correspondentId: korrespondentText ? korrespondentText.value : null,
          confirmerId: confirmerName ? confirmerName.value : null,
          submissionFormId: submissionForm ? submissionForm.value : null,
          executorStatus: executorStatus ? executorStatus.value : null,
          page: selected
        })
        if (res.data.content.length > 0) {
          loader.current.style.display = "none";
          Alert(setAlert, "success", "Информация успешно найдена");
          dispatch(ALL_SEARCH_DATA(res.data));
          extensiveSearchAllData(res.data)
          let obj = {
            select: "Kiruvchi",
            workPlaceId: JSON.parse(localStorage.getItem('ids')),
            deadline: oxirgiSana ? new Date(oxirgiSana).toDateString() : null,
            outDate: boshSana ? new Date(boshSana).toDateString() : null,
            startDate: from ? new Date(from).toDateString() : null,
            endDate: to ? new Date(to).toDateString() : null,
            executorsId: userName,
            status: status,
            regNumber: regNomerRef.current.value ? regNomerRef.current.value : null,
            outNumber: chiqRaqamRef.current.value ? chiqRaqamRef.current.value : null,
            cardTypeName: cardTypeName,
            cardName: cardName,
            description: izohRef.current.value ? izohRef.current.value : null,
            correspondentName: korrespondentText,
            confirmerName: confirmerName,
            submissionFormName: submissionForm,
            executorStatus: executorStatus,
            page: selected
          }
          dispatch(SEND_DATA(obj));
          extensiveSearchSendData(obj)
        } else {
          loader.current.style.display = "none";
          Alert(setAlert, "warning", "Информация не найдена");
          dispatch(ALL_SEARCH_DATA([]));
          extensiveSearchAllData([])
          // dispatch(SEND_DATA({}));
        }
      } catch (error) {
        setTimeout(() => {
          loader.current.style.display = "none";
          Alert(setAlert, "warning", "Произошла ошибка при получении данных");
        }, 4000);
        console.log(error);
      }
    }
  }

  // enterni bosgan payt qidirish
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      hujjatQushish();
    }
  })

  const clearAllData = () => {
    if (ijrochiref.current?.props?.value) {
      if (ijrochiref.current?.props?.value?.length > 0) {
        ijrochiref.current?.props?.value.forEach(d => {
          ijrochiref.current.removeValue(d);
        })
      }
    }
    cardTyperef.current?.props?.value && cardTyperef.current.removeValue(cardTyperef.current?.props?.value);
    cardNameRef.current?.props?.value && cardNameRef.current.removeValue(cardNameRef.current?.props?.value);
    chiqRaqamRef.current.value && (chiqRaqamRef.current.value = "");
    statusref.current?.props?.value && statusref.current.removeValue(statusref.current?.props?.value);
    executorStatusref.current?.props?.value && executorStatusref.current.removeValue(executorStatusref.current?.props?.value);
    regNomerRef.current.value && (regNomerRef.current.value = "");
    userref.current?.props?.value && userref.current.removeValue(userref.current?.props?.value);
    submissionFormref.current?.props?.value && submissionFormref.current.removeValue(submissionFormref.current?.props?.value);
    korrespondentref.current?.props?.value && korrespondentref.current.removeValue(korrespondentref.current?.props?.value);
    izohRef.current.value && (izohRef.current.value = "");
    dispatch(ALL_SEARCH_DATA([]));
    extensiveSearchAllData([]);
  }

  return (
    <>
      {/* kiruvchi */}
      <div className="tab-content">
        <div className="tab-pane fade show active" id="colored-tab1">
          <div className="card">
            <div className="card-body card-body-mobile" style={{ padding: "20px 20px 0 20px" }}>
              <form onSubmit={hujjatQushish} ref={allDataResetRef}>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="form-group mb-0">
                      {user?.inputData.select === "Kiruvchi" ? (
                        <Select
                          defaultValue={{ value: user?.inputData.select, label: user?.inputData.select }}
                          options={[
                            { value: "Xujjat turi", label: "Xujjat turi", isDisabled: true },
                            { value: "Kiruvchi", label: "Kiruvchi" },
                            { value: "Chiquvchi", label: "Chiquvchi" },
                          ]}
                          onChange={changeFun}
                          placeholder="Тип документа"
                        />
                      ) : (
                        user?.inputData.select === "Chiquvchi" ? (
                          <Select
                            defaultValue={{ value: user?.inputData.select, label: user?.inputData.select }}
                            options={[
                            {value: "Xujjat turi", label: "Xujjat turi", isDisabled: true },
                            { value: "Kiruvchi", label: "Kiruvchi" },
                            { value: "Chiquvchi", label: "Chiquvchi" },
                            ]}
                            onChange={changeFun}
                            placeholder="Тип документа"
                          />
                        ) : (
                          <Select
                            options={[
                              {value: "Xujjat turi", label: "Xujjat turi", isDisabled: true },
                              { value: "Kiruvchi", label: "Kiruvchi" },
                              { value: "Chiquvchi", label: "Chiquvchi" },
                            ]}
                            onChange={changeFun}
                            placeholder="Тип документа"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="col-lg-2" >
                    <div className="form-group form-group-floating mb-0">
                      <div className="position-relative">
                        <button
                          type="submit"
                          className="btn btn-primary form-control"
                          ref={searchBtn}
                        >
                          <i className='fas fa-search mr-1'></i>Поиск
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2" >
                    <div className="form-group form-group-floating mb-0">
                      <div className="position-relative">
                        <button
                          type="button"
                          className="btn btn-primary form-control"
                          onClick={clearAllData}
                        >
                          <i className='fas fa-eraser mr-1'></i>Очистить
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <button
                            type="button"
                            className="btn btn-primary form-control"
                            ref={exportBtn}
                          >
                            <i className='fas fa-file-export mr-1'></i>Экспорт
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12" style={{ zIndex: 1 }}>
                        <Select
                          defaultValue={user?.inputData?.executorsId}
                          options={ijrochi}
                          placeholder="Исполнительный"
                          className="Ijrochi"
                          isClearable={true}
                          styles={colourStyles}
                          isMulti
                          closeMenuOnScroll={false}
                          ref={ijrochiref}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <KiruvchiContent
                  user={user}
                  from={from}
                  to={to}
                  cardTyperef={cardTyperef}
                  cardNameRef={cardNameRef}
                  chiqRaqamRef={chiqRaqamRef}
                  boshSana={boshSana}
                  statusref={statusref}
                  executorStatusref={executorStatusref}
                  regNomerRef={regNomerRef}
                  oxirgiSana={oxirgiSana}
                  userref={userref}
                  submissionFormref={submissionFormref}
                  korrespondentref={korrespondentref}
                  izohRef={izohRef}
                  setFrom={setFrom}
                  setTo={setTo}
                  kiruvchiFlex={kiruvchiFlex}
                  currentUser={currentUser}
                  setBoshSana={setBoshSana}
                  setOxirgiSana={setOxirgiSana}
                />
              </form>
            </div>
          </div>
        </div>
      </div >

      {/*kiruvchi:  barcha topilgan ma'lumotlar */}
      {user.data?.content?.length > 0 && (
        <FoundData
          data={user.data}
          selected={selected}
          setSelected={setSelected}
          handlePageClick={handlePageClick}
        />
      )}

      {/* loader */}
      <Loader loader={loader} />
    </>
  )
}

export default React.memo(KengQidirishKiruvchi);