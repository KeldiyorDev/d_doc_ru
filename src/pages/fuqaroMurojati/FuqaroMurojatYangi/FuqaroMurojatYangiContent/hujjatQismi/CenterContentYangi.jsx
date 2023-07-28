import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from 'react-redux';
import { DESCRIPTION1, DESCRIPTION2, DESCRIPTION3 } from "../../../../../context/AuthReducer";
import { axiosInstance, axiosInstanceFq } from "../../../../../config";
import AlertContent, { Alert } from "../../../../../component/alert/Alert";
import TashqiBajaruvchilarF
  from "../../../xomaki/xomakiContent/Ko'rish/editXomaki/centerContent/tashqiBajaruvchilarF/TashqiBajaruvchilarF";
import IchkiBajaruvchilarF
  from "../../../xomaki/xomakiContent/Ko'rish/editXomaki/centerContent/ichkiBajaruvchilarF/IchkiBajaruvchilarF";
import IchkiBajaruvchilarFYangi from "./ichkiBajaruvchilarF/IchkiBajaruvchilarFYangi";
import TashqiBajaruvchilarFYangi from "./tashqiBajaruvchilarF/TashqiBajaruvchilarFYangi";
import loginOther from "../../../../LoginOther/LoginOther";
import {
  description1CitizemAppeal,
  description2CitizemAppeal,
  description3CitizemAppeal
} from "../../../../../redux/actions/actionCitizenAppeal";

let idCheckbox = null;
let tasnif1All = [];
let tasnif2All = [];
let tasnif3All = [];

export default function CenterContentYangi({
  files,
  setFiles,
  setChooseFiles,
  chooseFiles,
  fileUpload,
  setFileUpload,
  objData,
  currentUser,
  colourStyles,
  saveAllData,
  ConfirmerRef,
  file,
  setFile,
  file1,
  setFile1,
  allexecutorsData,
  setAllexecutorsData
}) {
  const [addNewBox, setAddNewBox] = useState([]);
  const dispatch = useDispatch();
  const [openBajaruvchi, setOpenBajaruvchi] = useState({ open: false, obj: {}, index: null });
  const [results, setResults] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [tasnif1, setTasnif1] = useState([]);
  const [tasnif2, setTasnif2] = useState([]);
  const [tasnif3, setTasnif3] = useState([]);
  const [xodimlar, setXodimlar] = useState([]);
  const [yangiQushish, setYangiQushish] = useState([]);
  const [tasdiqlovchi, setTasdiqlovchi] = useState([]);
  const [yunalishlar, setYunalishlar] = useState([]);

  // tasnif1 ni o'qib olish
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get("ac_1/list")
        let arr = [];
        res.data.data.forEach((d) => {
          arr.push({ value: d.id, label: d.name });
        })
        tasnif1All = [...tasnif1All, ...arr];
        if (isMounted) {
          dispatch(DESCRIPTION1(tasnif1All));
          description1CitizemAppeal(tasnif1All)
          setTasnif1(arr);
        }
        // tasnif2 ni o'qib olish
        try {
          const res = await axiosInstanceFq.get("ac_2/list/" + objData[0]?.problem?.ac_1ID)
          let arr = [];
          res.data.data.forEach((d) => {
            arr.push({ value: d.id, label: d.name });
          })
          tasnif2All = [...tasnif2All, ...arr];
          dispatch(DESCRIPTION2(tasnif2All));
          description2CitizemAppeal(tasnif2All)
          setTasnif2(arr);
          // tasnif3 ni o'qib olish
          try {
            const res = await axiosInstanceFq.get("ac_3/list/" + objData[0]?.problem?.ac_2ID)
            let arr = [];
            res.data.data.forEach((d) => {
              arr.push({ value: d.id, label: d.name });
            })
            tasnif3All = [...tasnif3All, ...arr];
            dispatch(DESCRIPTION3(tasnif3All));
            description3CitizemAppeal(tasnif3All)
            setTasnif3(arr);
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const notParentsCardClickTanif1 = async (e) => {
    // tasnif2 ni o'qib olish
    try {
      const res = await axiosInstanceFq.get("ac_2/list/" + e.value)
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })
      tasnif2All = [...tasnif2All, ...arr];
      dispatch(DESCRIPTION2(tasnif2All));
      setTasnif2(arr);
    } catch (error) {
      console.log(error);
    }
  }

  const notParentsCardClickTasnif2 = async (e) => {
    // tasnif3 ni o'qib olish
    try {
      const res = await axiosInstanceFq.get("ac_3/list/" + e.value)
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })
      tasnif3All = [...tasnif3All, ...arr];
      dispatch(DESCRIPTION3(tasnif3All));
      setTasnif3(arr);
    } catch (error) {
      console.log(error);
    }
  }

  // TASNIF LAR OLDIN MAVJUD BO'LSA, O'QIB OLISH
  useEffect(() => {
    let isMounted = true;

    if (objData[0]?.problems?.length > 0) {
      const getData = async () => {
        // TASNIF1 BO'LGAN HOLATDA TASNIF2 NI OLISH
        try {
          const res = await axiosInstanceFq.get("ac_2/list/" + objData[0]?.problems[0]?.ac_1ID)
          let arr = [];
          res.data.data.forEach((d) => {
            arr.push({ value: d.id, label: d.name });
          })
          if (isMounted) {
            dispatch(DESCRIPTION2(arr));
            setTasnif2(arr);
          }
        } catch (error) {
          console.log(error);
        }

        // TASNIF2 BO'LGAN HOLATDA TASNIF3 NI OLISH
        try {
          const res = await axiosInstanceFq.get("ac_3/list/" + objData[0]?.problems[0]?.ac_2ID)
          let arr = [];
          res.data.data.forEach((d) => {
            arr.push({ value: d.id, label: d.name });
          })

          if (isMounted) {
            dispatch(DESCRIPTION3(arr));
            setTasnif3(arr);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, objData, tasnif1]);

  const Bajaruvchilar = (index) => {
    // tashqi bajaruvchilar oldin tanlangan bo'lsa, dastlab hammasini unchecked qilish
    let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');

    tashqiBajUlInline.forEach((d) => {
      let idsDiv = d.querySelectorAll('.idsDiv');

      idsDiv.forEach((r) => {
        r.checked = false;
      })
    });

    tashqiBajUlInline.forEach((d) => {
      let idsDiv = d.querySelectorAll('.idsDiv');
      idsDiv.forEach((r) => {
        allexecutorsData.forEach((h) => {
          if (h.index === index) {
            h.tashqiBajaruvchilar.forEach((u) => {
              if (u.ids.includes(parseInt(r.getAttribute('ids')))) {
                r.checked = true;
              } else {
                r.checked = false;
              }
            })
          } else {
            d.querySelector('.allChecked').textContent = "Barchasini tanlash";
            d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
          }
        })
      })
    });
    setYangiQushish([]);
    setOpenBajaruvchi({ open: true, obj: {}, index: index })
  }

  const newCreateBajaruvchiSelects = () => {
    setAddNewBox(prev => [...prev, `1`]);
  }

  const deleteFun = (e, index) => {
    e.target.remove();
    if (index) {
      let arr = allexecutorsData.filter((d) => d.index !== index);
      setAllexecutorsData(arr);
    }
    setOpenBajaruvchi({ open: true, obj: {}, index: index })
  }

  const uploadFile1 = (e) => {
    setFiles(null);
    let arr = [];
    objData[0]?.files?.forEach((f) => {
      arr.push(f);
    })
    setChooseFiles(arr);
    setTimeout(() => {
      setFile1(e.target.files);
    }, 100);
  }

  const deleteFile1 = (index) => {
    let arr = chooseFiles?.filter((f, i) => {
      return i !== index;
    });
    setChooseFiles(arr);
  }

  const deleteFile2 = (index) => {
    let arr = files?.filter((f, i) => {
      return i !== index;
    });
    setFiles(arr);
  }
  // // file ni o'zgaruvchiga olish
  useEffect(() => {
    let isMounted = true;
    let arr = [];
    if (file1) {
      Object.values(file1)?.forEach((d) => {
        arr.push(d);
      })
      if (isMounted)
        setFiles(arr);
    }

    return () => {
      isMounted = false;
    }
  }, [file1]);

  // oldin tanlangan ichki va tashqi bajaruvchilarni allexecutorsData ga olish
  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      setAllexecutorsData([]);

    if (objData?.length > 0) {
      let dataObj, resultTashqiB = [], allDataObj = [];

      // ichki bajaruvchilar uchun
      let inExecutorResolution = [];
      objData[0]?.problem?.inExecutors?.forEach((dat) => {

        let obj = {
          workPlaceId: dat?.workPlaceID,
          deadline: dat?.deadline,
          description: dat?.description,
          executorStatusName: dat?.executorStatus,
          isResponsible: dat?.isResponsible,
        }
        inExecutorResolution.push(obj);
      })

      // tashqi bajaruvchilar uchun
      let result = [];
      yunalishlar.forEach((w) => {
        let arr = [], bool = true, s;
        w.organizations.forEach((org) => {
          objData[0]?.problem.outExecutors?.forEach((y) => {
            if (y?.id === org?.id) {
              arr.push(org.id);
              if (bool) {
                s = y.generalName;
                bool = false;
              }
            }
          })
        })
        if (arr.length > 0) {
          result.push({ id: w.id, ids: arr, value: s });
        }
      })

      dataObj = {
        index: 0,
        ichkiBajaruvchilar: inExecutorResolution,
        tashqiBajaruvchilar: result
      }
      resultTashqiB.push(result);
      allDataObj.push(dataObj);

      if (isMounted) {
        // setResults(resultTashqiB);
        setAllexecutorsData(allDataObj);
      }
    }

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objData, yunalishlar]);

  const BajaruvchilarSaqlash = (indexBox) => {
    // tashqi bajaruvchi va forma ni massiv ichga olish
    let inExecutorResolution = [];
    let forms = document.querySelectorAll('.bajaruvchiForm');

    // ichki topshiriqlardagi chckbox ni faqat bittasini tanlash
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');
    for (let i = 0; i < checkboxSelect.length; i++) {
      if (checkboxSelect[i].checked) {
        idCheckbox = i;
        break;
      }
    }

    forms.forEach((form, index2) => {
      let letter = "";
      let checkBoxCol1 = form.querySelector('.col1').querySelectorAll('.chb');
      checkBoxCol1.forEach((check) => {
        if (check.querySelector('.iconCheck').hasAttribute('style')) {
          letter = check.querySelector('.iconCheck').textContent;
        }
      })
      let Xodim = form.querySelector('.XodimBajaruvchi')?.querySelector('.css-qc6sy-singleValue')?.textContent;
      let izohCol1 = form.querySelector('.izohCol1').value;
      let deadLine = form.querySelector('.bajaruvchiSana').value;

      let workPlace = [];
      // xodimni tanlagan payt workplaceId sini olish
      for (let i = 0; i < xodimlar.length; i++) {
        if (xodimlar[i].label === Xodim) {
          workPlace.push(xodimlar[i]);
        }
      }

      let obj = {
        workPlaceId: workPlace[0]?.pl,
        deadline: deadLine,
        description: izohCol1,
        executorStatusName: letter === "N" ? 4 : letter === "U" ? 3 : letter === "M" ? 2 : 1,
        isResponsible: index2 === idCheckbox ? true : false,
        FIO: workPlace[0]
      }

      inExecutorResolution.push(obj);
    })
    let dataObj = {
      index: indexBox,
      ichkiBajaruvchilar: inExecutorResolution,
      tashqiBajaruvchilar: results
    }
    let countUsers = 0, isResponsible = 0;
    dataObj.ichkiBajaruvchilar.forEach((d) => {
      if (d?.workPlaceId) {
        countUsers++;
      }
      if (d.isResponsible) {
        isResponsible++;
      }
    })
    if ((countUsers === dataObj.ichkiBajaruvchilar?.length && isResponsible > 0) || dataObj.tashqiBajaruvchilar?.length > 0) {
      setResults([]);
      if (allexecutorsData.find(d => d.index === indexBox)) {
        let arr = allexecutorsData.filter((t) => {
          if (t.index === indexBox) {
            t.index = indexBox;
            t.ichkiBajaruvchilar = dataObj.ichkiBajaruvchilar;
            t.tashqiBajaruvchilar = dataObj.tashqiBajaruvchilar;
          }
          return t;
        })
        setAllexecutorsData(arr);
      } else {
        setAllexecutorsData(prev => [...prev, dataObj]);
      }
    } else {
      Alert(setAlert, "warning", "Ichki bajaruvchilarda bajaruvchi biriktirilmagan yoki tashqi bajaruvchi tanlamagan");
    }
    setOpenBajaruvchi({ open: false, obj: {}, index: null });
  }
  console.log(allexecutorsData)

  // barcha tasdiqlovchilarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
        let arr = [];
        res.data.forEach((d) => {
          let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : "";
          arr.push({ value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}` })
        });

        if (isMounted)
          setTasdiqlovchi(arr);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // takroriy va duplicate lar button
  useEffect(() => {
    let isMounted = true;
    let myBtns = document.querySelectorAll('.myBtnn');
    if (isMounted) {
      myBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          document.querySelector('.tooltip')?.remove();
          myBtns.forEach((btn) => {
            btn.removeAttribute('style');
          })
          if (btn.hasAttribute('style')) {
            btn.removeAttribute('style');
          } else {
            btn.style.backgroundColor = "#0056B8";
            btn.style.color = "#fff";
          }
        })
      });
    }

    return () => {
      isMounted = false;
    }
  }, []);


  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="row p-2">
            <div className='col-lg-12 pl-2 pr-2 pt-2 pb-0'
              style={{ backgroundColor: 'rgb(200,200,200,0.5)' }}>
              {/* oldin mavjud bo'lsa */}
              <form
                className={'addNewBoxForm col-12 mb-1 px-0'} id={objData[0]?.problem.id}>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        {tasnif1?.length > 0 && (
                          <Select
                            defaultValue={[tasnif1.find((d) => d.value === objData[0]?.problem?.ac_1ID)]}
                            options={tasnif1}
                            placeholder="TASNIF1"
                            onChange={notParentsCardClickTanif1}
                            isClearable={true}
                            isDisabled={true}
                            className="tasnif1"
                          />
                        )}
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        {tasnif2?.length > 0 && (
                          <Select
                            defaultValue={tasnif2.filter((d) => d.value === objData[0]?.problem?.ac_2ID)}
                            options={tasnif2}
                            onChange={notParentsCardClickTasnif2}
                            placeholder="TASNIF2"
                            isDisabled={true}
                            isClearable={true}
                            className="tasnif2"
                          />
                        )}
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group row">
                      <div className="col-lg-12">
                        {tasnif3?.length > 0 && (
                          <Select
                            defaultValue={[tasnif3.find((d) => d.value === objData[0]?.problem?.ac_3ID)]}
                            options={tasnif3}
                            placeholder="TASNIF3"
                            isDisabled={true}
                            isClearable={true}
                            className="tasnif3"
                          />
                        )}
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <button
                      type={'button'}
                      className={'btn bg-primary text-white w-100 btn-bajaruvchi'}
                      onClick={() => Bajaruvchilar(0)}
                      style={{ height: '56px' }}
                    >
                      Bajaruvchi
                      {(objData[0]?.problem?.inExecutors?.length > 0 || objData[0]?.problem?.outExecutors?.length > 0) || (allexecutorsData[0]?.ichkiBajaruvchilar?.length > 0 || allexecutorsData[0]?.tashqiBajaruvchilar?.length > 0) && (
                        <span className="bajaruvchiBadge">+</span>
                      )}
                    </button>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating  row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <textarea
                            className="form-control form-control-outline shortDescription"
                            style={{ height: '56px' }}
                            placeholder="Placeholder"
                            disabled={true}
                            defaultValue={objData[0]?.problem?.shortDescription}
                          />
                          <label className="label-floating">QISQACHA MAZMUNI</label>
                          <div className="invalid-feedback">Maydonni to'ldiring</div>
                        </div>
                      </div>
                      {/*<div className="col-lg-1 " style={{flex: "1"}}>*/}
                      {/*  <div style={{height: "56px"}}>*/}
                      {/*    <div*/}
                      {/*        className="form-group mb-0 d-flex align-items-center justify-content-center">*/}
                      {/*      <button type="submit" className="btn btn-danger "*/}
                      {/*              style={{width: '100%', height: '56px'}}>*/}
                      {/*        <i className="icon-trash"></i>*/}
                      {/*      </button>*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
              </form>

            </div>

            {/*open modal*/}
            <div className={'adminWindow'}
              style={{ display: openBajaruvchi.open ? "block" : "none", overflowY: 'auto' }}>
              <div className="modal-dialog modal-xl pt-5 ">
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title ">Bajaruvchilar</h5>
                    <button className="close"
                      onClick={() => setOpenBajaruvchi({ open: false, obj: {}, index: null })}
                      data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body shadowKiruvchi text-center"
                    style={{
                      padding: "10px",
                      border: "1px solid lightgray",
                      margin: "10px",
                      backgroundColor: "lightgray"
                    }}>
                    {/* ichki bajaruvchilar */}
                    <IchkiBajaruvchilarFYangi
                      currentUser={currentUser}
                      colourStyles={colourStyles}
                      xodimlar={xodimlar}
                      setXodimlar={setXodimlar}
                      yangiQushish={yangiQushish}
                      setYangiQushish={setYangiQushish}
                      allexecutorsData={allexecutorsData}
                      openBajaruvchi={openBajaruvchi}
                      objData={objData}
                    />

                    {/* tashqi bajaruvchilar */}
                    <TashqiBajaruvchilarFYangi
                      currentUser={currentUser}
                      setResults={setResults}
                      results={results}
                      setAlert={setAlert}
                      allexecutorsData={allexecutorsData}
                      openBajaruvchi={openBajaruvchi}
                      objData={objData}
                      setYunalishlar={setYunalishlar}
                      yunalishlar={yunalishlar}
                    />
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                    <button onClick={() => BajaruvchilarSaqlash(0)}
                      className="btn btn-success" style={{ width: "150px" }}>Saqlash
                    </button>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-lg-12">
              <div className="mt-3">
                <div className="form-group row">
                  <div className="col-lg-1 d-flex align-items-center">
                    <button
                      type="button"
                      className="myBtnn mr-1"
                      id="ClickoBtn"
                      title="Takroriy"
                      data-bs-toggle="tooltip"
                      data-popup="tooltip"
                      data-bs-placement="top"
                      style={{
                        backgroundColor: objData[0]?.appealStatus === 2 && "#0056B8",
                        color: objData[0]?.appealStatus === 2 && "#fff"
                      }}
                    >
                      T
                    </button>
                    <button
                      type="button"
                      className="myBtnn"
                      id="ClickBtn"
                      title="Duplikat"
                      data-bs-toggle="tooltip"
                      data-popup="tooltip"
                      data-bs-placement="top"
                      style={{
                        backgroundColor: objData[0]?.appealStatus === 1 && "#0056B8",
                        color: objData[0]?.appealStatus === 1 && "#fff"
                      }}
                    >
                      D
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group row">
                      <div className="col-lg-12 ">
                        {tasdiqlovchi?.length > 0 && (
                          <Select
                            defaultValue={tasdiqlovchi.find((d) => d.value === objData[0]?.confirmerID)}
                            options={tasdiqlovchi}
                            placeholder="Tasdiqlovchi"
                            isClearable={true}
                            ref={ConfirmerRef}
                            menuPlacement="top"
                          />
                        )}
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating  row">
                      <div className="col-lg-12 ">
                        <div className="form-group form-group-float sm-mb-10">
                          <div className="custom-file" style={{ position: "relative" }}>
                            <input
                              type="file"
                              style={{ height: '56px', paddingTop: '15px' }}
                              className="custom-file-input fileKiruvchi"
                              id="custom-file-visible"
                              disabled={true}
                              accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                              onClick={(e) => e.target.value = null}
                              onChange={(e) => uploadFile1(e)}
                              multiple="multiple"
                              required
                            />
                            <span className="text-muted" style={{
                              fontSize: "12px",
                              position: "absolute"
                            }}>{chooseFiles?.length} ta fayl oldin tanlandi</span>
                            <label className="custom-file-label text-muted"
                              style={{ height: '56px', paddingTop: '15px' }}
                              htmlFor="custom-file-visible">
                              {files?.length > 0 ? files?.length + "ta fayl tanlandi" : "Faylni tanlash"}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12 pr-0">
                        <div className="position-relative">
                          <button
                            type={'submit'}
                            id={'saveButton'}
                            onClick={saveAllData}
                            style={{ display: 'block' }}
                            className="btn btn-primary form-control form-control-outline "
                          >
                            O'zgartirish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    {/* all files select */}
                    <div className="row">
                      <div className="col-lg-12">
                        <ul className="mb-0">
                          {chooseFiles?.length > 0 && chooseFiles?.map((hujjat, i) => (
                            hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>PDF FILE</span>
                                </div>
                                <span onClick={() => deleteFile1(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>WORD FILE</span>
                                </div>
                                <span onClick={() => deleteFile1(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>EXCEL FILE</span>
                                </div>
                                <span onClick={() => deleteFile1(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>POWERPOINT FILE</span>
                                </div>
                                <span onClick={() => deleteFile1(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>ZIP, RAR FILE</span>
                                </div>
                                <span onClick={() => deleteFile1(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            )
                          ))}
                        </ul>
                        <ul>
                          {files?.length > 0 && files?.map((hujjat, i) => (
                            hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>PDF FILE</span>
                                </div>
                                <span onClick={() => deleteFile2(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>WORD FILE</span>
                                </div>
                                <span onClick={() => deleteFile2(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xls" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xlsx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>EXCEL FILE</span>
                                </div>
                                <span onClick={() => deleteFile2(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>POWERPOINT FILE</span>
                                </div>
                                <span onClick={() => deleteFile2(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            ) : (
                              <li key={i} className='kiruvchiMain'>
                                <div className='d-flex align-items-center'>
                                  <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                    style={{ fontSize: "28px" }} />
                                  <span className='pt-1'>ZIP, RAR FILE</span>
                                </div>
                                <span onClick={() => deleteFile2(i)}> <i
                                  className="icon-trash"></i></span>
                              </li>
                            )
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* {(openModal) && (
              <div className={'adminWindow'}>
                <div className="modal-dialog modal-sm pt-5 ">
                  <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                      <h5 className="modal-title ">Xomaki</h5>
                      <button className="close"
                        onClick={() => setOpenModal(false)}
                        data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body shadowKiruvchi text-center"
                      style={{
                        padding: "10px",
                        border: "1px solid lightgray",
                        margin: "10px",
                        backgroundColor: "lightgray"
                      }}>
                      <h3 className="font-weight-semibold py-1 px-1 " style={{
                        borderRadius: '5px',
                        fontSize: "20px",
                        color: "#000"
                      }}>Yangi hujjat kiritildi</h3>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                      <button onClick={() => setOpenModal(false)}
                        className="btn btn-success"
                        style={{ width: "150px" }}>Yangi
                      </button>
                      <button onClick={() => goToXomakiKorish()}
                        className="btn btn-success"
                        style={{ width: "150px" }}>Xomaki kurish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>
        {/* alert */}
        <AlertContent alert={alert} />
      </div>
    </div>
  )
}