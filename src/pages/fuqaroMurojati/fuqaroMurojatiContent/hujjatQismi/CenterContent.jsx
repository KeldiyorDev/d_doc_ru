import React, { useEffect, useState } from "react";
import Select from "react-select";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { axiosInstance, axiosInstanceFq } from "../../../../config";
import IchkiBajaruvchilarF from "./ichkiBajaruvchilarF/IchkiBajaruvchilarF";
import TashqiBajaruvchilarF from "./tashqiBajaruvchilarF/TashqiBajaruvchilarF";
import { useDispatch } from 'react-redux';
import { DESCRIPTION1, DESCRIPTION2, DESCRIPTION3 } from "../../../../context/AuthReducer";
import {
  description1CitizemAppeal,
  description2CitizemAppeal,
  description3CitizemAppeal
} from "../../../../redux/actions/actionCitizenAppeal";

let idCheckbox = null;
let tasnif1All = [];
let tasnif2All = [];
let tasnif3All = [];

export default function CenterContent({
  currentUser,
  colourStyles,
  saveAllData,
  ConfirmerRef,
  file,props,
  setFile, file1,
  setFile1,
  allexecutorsData,
  setAllexecutorsData,
                                        tasnif1Ref,tasnif2Ref,tasnif3Ref
}) {
  const [addNewBox, setAddNewBox] = useState(['1']);
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
  const [bajaruvchi, setBajaruvchi] = useState(false);

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
      description2CitizemAppeal(tasnif2All)
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
      description3CitizemAppeal(tasnif3All)
      setTasnif3(arr);
    } catch (error) {
      console.log(error);
    }
  }

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
              if (u.ids.includes(r.getAttribute('ids'))) {
                r.checked = true;
              } else {
                r.checked = false;
              }
            })
          } else {
            // r.checked = false;
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

  const deleteFun = (e) => {
    e.target.remove();
  }

  const uploadFile = (e) => {
    setFile(null);
    setTimeout(() => {
      setFile(e.target.files);
    }, 100);
  }

  const uploadFile1 = (e) => {
    setFile1(null);
    setTimeout(() => {
      setFile1(e.target.files);
    }, 100);
  }

  const deleteFile = (index) => {
    let arr = Object.values(file)?.filter((f, i) => {
      return i !== index;
    });
    setFile(arr);
  }

  const BajaruvchilarSaqlash = (indexBox) => {
    // tashqi bajaruvchi va forma ni massiv ichga olish
    let inExecutorResolution = [];
    let forms = document.querySelectorAll('.bajaruvchiForm');

    // ichki topshiriqlardagi checkbox ni faqat bittasini tanlash
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

  // barcha tasdiqlovchilarni o'qib olish
  useEffect(() => {
    let isMounted = true;

    if (currentUser) {
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
    }

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
            {addNewBox?.length > 0 &&
              <div className='col-lg-12 pl-2 pr-2 pt-2 pb-0'
                style={{ backgroundColor: 'rgb(200,200,200,0.5)' }}>
                {addNewBox.map((dat, index) => (
                  <form key={index} onSubmit={deleteFun} className={'addNewBoxForm col-12 mb-1 px-0'}>
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif1}
                              placeholder="TASNIF1"
                              onChange={notParentsCardClickTanif1}
                              isClearable={true}
                              className="tasnif1"
                              // ref={tasnif1Ref}
                            />
                            <div className="invalid-feedback">Maydonni tanlang</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif2}
                              onChange={notParentsCardClickTasnif2}
                              placeholder="TASNIF2"
                              isClearable={true}
                              className="tasnif2"
                              // ref={tasnif2Ref}
                            />
                            <div className="invalid-feedback">Maydonni tanlang</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="form-group row">
                          <div className="col-lg-12">
                            <Select
                              options={tasnif3}
                              placeholder="TASNIF3"
                              isClearable={true}
                              className="tasnif3"
                              // ref={tasnif3Ref}
                            />
                            <div className="invalid-feedback">Maydonni tanlang</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <button
                          type={'button'}
                          className={'btn bg-primary text-white w-100 btn-bajaruvchi'}
                          onClick={() => Bajaruvchilar(index)}
                          style={{ height: '56px' }}
                        >
                          Bajaruvchi
                          {allexecutorsData.some((d) => d.index === index) && (
                            <span className="bajaruvchiBadge">+</span>
                          )}
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group form-group-floating  row">
                          <div className="col-lg-11">
                            <div className="position-relative">
                              <textarea
                                className="form-control form-control-outline shortDescription"
                                style={{ height: '56px' }}
                              />
                              <label className="label-floating">QISQACHA MAZMUNI</label>
                              <div className="invalid-feedback">Maydonni to'ldiring</div>
                            </div>
                          </div>
                          <div className="col-lg-1 " style={{ flex: "1" }}>
                            <div style={{ height: "56px" }}>
                              <div
                                className="form-group mb-0 d-flex align-items-center justify-content-center">
                                <button type="submit" className="btn btn-danger "
                                  style={{ width: '100%', height: '56px' }}>
                                  <i className="icon-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                ))}
              </div>
            }

            {/*    open modal*/}
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
                    <IchkiBajaruvchilarF
                      currentUser={currentUser}
                      colourStyles={colourStyles}
                      xodimlar={xodimlar}
                      setXodimlar={setXodimlar}
                      yangiQushish={yangiQushish}
                      setYangiQushish={setYangiQushish}
                      allexecutorsData={allexecutorsData}
                      openBajaruvchi={openBajaruvchi}
                      bajaruvchi={bajaruvchi}
                      setBajaruvchi={setBajaruvchi}
                    />

                    {/* tashqi bajaruvchilar */}
                    <TashqiBajaruvchilarF
                      currentUser={currentUser}
                      setResults={setResults}
                      results={results}
                      setAlert={setAlert}
                      allexecutorsData={allexecutorsData}
                      openBajaruvchi={openBajaruvchi}
                      yunalishlar={yunalishlar}
                      setYunalishlar={setYunalishlar}
                    />
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                    <button onClick={() => BajaruvchilarSaqlash(openBajaruvchi.index)}
                      className="btn btn-success" style={{ width: "150px" }}>Saqlash
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`col-lg-12`}>
              <div className="row">
                <div className="col-lg-9"></div>
                <div className="col-lg-3 mt-1 text-right" style={{ paddingRight: '0px' }}>
                  <button type={'button'} onClick={() => newCreateBajaruvchiSelects()}
                    className={'btn bg-primary text-white w-75'}>Yangi
                  </button>
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
                    >
                      D
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group row">
                      <div className="col-lg-12 ">
                        <Select
                          options={tasdiqlovchi}
                          placeholder="Tasdiqlovchi"
                          className='tasdiqlovchi'
                          isClearable={true}
                          required={true}
                          ref={ConfirmerRef}
                          menuPlacement="top"
                        />
                        <div className="invalid-feedback">Maydonni tanlang</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating  row">
                      <div className="col-lg-12 ">
                        <div className="form-group form-group-float sm-mb-10">
                          <div className="custom-file" style={{ zIndex: "0" }}>
                            <input
                              type="file"
                              style={{ height: '56px', paddingTop: '15px' }}
                              className="custom-file-input fileKiruvchi"
                              id="custom-file-visible"
                              accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                              onClick={(e) => e.target.value = null}
                              onChange={(e) => uploadFile(e)}
                              multiple="multiple"
                              required
                            />
                            <label className="custom-file-label text-muted"
                              style={{ height: '56px', paddingTop: '15px' }}
                              htmlFor="custom-file-visible">
                              {file?.length > 0 ? `${file?.length} ta fayl tanlandi` : "Faylni tanlash"}
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
                            Saqlash
                          </button>
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
                              onClick={props}
                              style={{ display: 'block' }}
                              className="btn btn-primary form-control form-control-outline "
                          >
                            Props
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 mt-3">
                    {/* all files select */}
                    <ul>
                      {file?.length > 0 && Object.values(file)?.map((hujjat, i) => (
                        hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pdf" ? (
                          <li key={i} className='kiruvchiMain'>
                            <div className='d-flex align-items-center'>
                              <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                style={{ fontSize: "28px" }} />
                              <span className='pt-1'>PDF FILE</span>
                            </div>
                            <span onClick={() => deleteFile(i)}> <i
                              className="icon-trash"></i></span>
                          </li>
                        ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "doc" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "docx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                          <li key={i} className='kiruvchiMain'>
                            <div className='d-flex align-items-center'>
                              <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                style={{ fontSize: "28px" }} />
                              <span className='pt-1'>WORD FILE</span>
                            </div>
                            <span onClick={() => deleteFile(i)}> <i
                              className="icon-trash"></i></span>
                          </li>
                        ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xls" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "xlsx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                          <li key={i} className='kiruvchiMain'>
                            <div className='d-flex align-items-center'>
                              <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                style={{ fontSize: "28px" }} />
                              <span className='pt-1'>EXCEL FILE</span>
                            </div>
                            <span onClick={() => deleteFile(i)}> <i
                              className="icon-trash"></i></span>
                          </li>
                        ) : (hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "ppt" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "pptx" || hujjat?.type?.split('/')[hujjat?.type?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                          <li key={i} className='kiruvchiMain'>
                            <div className='d-flex align-items-center'>
                              <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                style={{ fontSize: "28px" }} />
                              <span className='pt-1'>POWERPOINT FILE</span>
                            </div>
                            <span onClick={() => deleteFile(i)}> <i
                              className="icon-trash"></i></span>
                          </li>
                        ) : (
                          <li key={i} className='kiruvchiMain'>
                            <div className='d-flex align-items-center'>
                              <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                style={{ fontSize: "28px" }} />
                              <span className='pt-1'>ZIP, RAR FILE</span>
                            </div>
                            <span onClick={() => deleteFile(i)}> <i
                              className="icon-trash"></i></span>
                          </li>
                        )
                      ))}
                    </ul>

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