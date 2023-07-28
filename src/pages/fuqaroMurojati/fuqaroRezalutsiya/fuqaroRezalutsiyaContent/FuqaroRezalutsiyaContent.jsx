import React, { useState, useEffect } from "react";
import NavbarFuqaroMurojat from "../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import { axiosInstance, axiosInstanceFq, urlFq } from "../../../../config";
import { NavLink, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Alert } from "../../../../component/alert/Alert";
import XKKurish from "../../xomaki/xomakiContent/Ko'rish/XKKurish";
import TezRezolutsiyaMazmuni from "../../../kiruvchi/resolutsiya/resolutionContent/korish/korishContent/tezRezolutsiyaMazmuni/TezRezolutsiyaMazmuni";
import { colourStyles } from "../../../../App";
import TashqiBajaruvchilarKurish from "../../../kiruvchi/resolutsiya/resolutionContent/korish/korishContent/tashqiBajaruvchilarKurish/TashqiBajaruvchilarKurish";

export default function ResolutionContent({ currentUser,permission,ranks }) {
  console.log(permission)
  const params = useParams();
  const history = useHistory();
  const [yangiQushish, setYangiQushish] = useState([]);
  const [startDate1, setStartDate1] = useState('');
  const [data, setData] = useState([]);
  const [xodimlar, setXodimlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [rowLeinExecutorInformationListLength, setRowLeinExecutorInformationListLength] = useState(0);
  const [results, setResults] = useState([]);
  const [nazorat, setNazorat] = useState(false)
  const [viloyatData, setViloyatData] = useState(null);
  const [tumanData, setTumanData] = useState(null);
  const [mahallaData, setMahallaData] = useState(null);
  const [vil] = useState([]);
  const [secMahDef, setSecMahDef] = useState([]);
  const [tuman] = useState([]);
  const [mahalla, setMahalla] = useState([]);

  // api ketadigan sanani formatlash
  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  // id ga mos malumotni olish
  useEffect(() => {
    let isMounted = true;
    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get(`/template/${params.id}`)
        let arr = [];
        res.data.outExecutorResolutions.forEach((f) => {
          const parsed = JSON.parse(f.ids);
          arr.push(parsed);
        })

        if (isMounted) {
          setData(res.data)
          setStartDate1(new Date(res.data?.deadline))
          setResults(arr);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  // xodimlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`executor/executors/${JSON.parse(localStorage.getItem('ids'))}/${JSON.parse(localStorage.getItem('oi'))}`)
        let arr = [];
        res.data.forEach((dat) => {
          arr.push({ value: dat?.departmentShortName, label: dat?.departmentShortName, isDisabled: "true" });
          if (dat.users?.length > 0) {
            dat.users.forEach((d) => {
              let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : "";
              arr.push({
                value: d?.workPlaceId,
                label: `${firstname}${d?.lastName}`,
                isClearable: true,
              });
            })
          }
        })

        if (isMounted)
          setXodimlar(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const selectXodimFunc = () => {
    // setSelectXodim(e);
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      setRowLeinExecutorInformationListLength(data[0]?.inExecutorInformationList?.length);

    return () => {
      isMounted = false;
    }
  }, [data]);

  const notParentsCardClickViloyat = async (e) => setViloyatData(e);

  const notParentsCardClickTuman = async (e) => {
    setTumanData(e);
    try {
      let res = await axiosInstanceFq.get(`mahalla/byDistrict/` + e.value)
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name, sectorName: d.sector.name });
      })
      setMahalla(arr)
    } catch (error) {
      console.log(error.response);
    }
  }

  const notParentsCardClickMahalla = async (e) => {
    setMahallaData(e);
    setSecMahDef(e)
  }

  const deleteFun1 = (e) => {
    e.target.remove();
    setRowLeinExecutorInformationListLength(prev => prev - 1);
  }

  const deleteFun = (e) => {
    e.target.remove();
  }

  const newCreateBajaruvchi = () => {
    setYangiQushish(prev => [...prev, '1']);
  }

  // N U M tugmalar
  const checkedDivNazorat = (e, index) => {
    let div = document.querySelectorAll('.col1');
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[0].removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  const checkedDivUmum = (e, index) => {
    let div = document.querySelectorAll('.col1')
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      div.forEach((d) => {
        d.getElementsByClassName('iconCheck')[1].removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  const checkedDivM = (e, index) => {
    let div = document.querySelectorAll('.col1')
    if (!e.hasAttribute('style')) {
      let iconCheck = div[index]?.querySelectorAll('.iconCheck');
      iconCheck?.forEach((check) => {
        check.removeAttribute('style');
      })
      e.style.display = 'flex';
      e.style.backgroundColor = '#0056B8';
      e.style.color = '#fff';
    } else {
      e.removeAttribute('style');
    }
  }

  // hamma malumotlarni saqlash
  const saveAllData = async () => {
    let hujjatTuri = document.querySelector('.hujjatTuri')?.value;
    let sanaAsosiy = document.querySelector('.sanaAsosiy')?.value;
    let XodimBajaruvchi = document.querySelectorAll('.XodimBajaruvchi');
    let bajaruvchiSana = document.querySelectorAll('.bajaruvchiSana');

    let xodimBool = true;
    XodimBajaruvchi.forEach((xodim) => {
      if (!xodim.querySelector('.css-qc6sy-singleValue')?.textContent) {
        xodimBool = false;
      }
    })

    // eslint-disable-next-line no-unused-vars
    let sanaBool = true;
    bajaruvchiSana.forEach((date) => {
      if (!date.value) {
        sanaBool = false;
      }
    })

    if (hujjatTuri) {
      if (sanaAsosiy) {
        if (xodimBool) {
          // tashqi bajaruvchi va forma ni massiv ichga olish
          let inExecutorResolution = [];
          let forms = document.querySelectorAll('.bajaruvchiForm');
          let dateCutom = document.querySelector('.dateCustom').value;
          forms.forEach((form) => {
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

            // let period = [];

            let workPlace = [];
            // xodimni tanlagan payt workplaceId sini olish
            for (let i = 0; i < xodimlar.length; i++) {
              if (xodimlar[i].label === Xodim) {
                workPlace.push(xodimlar[i]);
                // if (!checkedXodim.includes(xodimlar[i].pl)) {
                //     workPlace.push(xodimlar[i]);
                //     checkedXodim.push(xodimlar[i].pl);
                //     break;
                // }
              }
            }

            let obj = {
              workPlaceId: workPlace[0]?.value,
              // repeatExecutePeriod: period[0]?.value,
              deadlineStr: deadLine,
              description: izohCol1,
              executorStatusName: letter === "N" ? "Nazorat uchun" : letter === "U" ? "Umumlashtiruvchi" : letter === "M" ? "Ma'lumot uchun" : "Bajarish uchun"
            }
            inExecutorResolution.push(obj);
          })

          try {
            const res = await axiosInstanceFq.patch(`/template/makeResolution`, {
              id: params.id,
              control: nazorat,
              deadlineStr: dateFormatSet(dateCutom),
              resolutionAddDto: {
                inExecutorResolution: inExecutorResolution,
                outExecutorResolution: results
              },
              workPlaceId: JSON.parse(localStorage.getItem('ids')),
              resolutionContent: document.querySelector('.rezTezkor')?.value,
              inExecutorResolution: inExecutorResolution,
              outExecutorResolution: results, //outExecutorResolution,
              deadline: sanaAsosiy.split('.')[2] + "-" + sanaAsosiy.split('.')[1] + "-" + sanaAsosiy.split('.')[0],
              orgId: JSON.parse(localStorage.getItem('oi'))
            });

            //barcha yangi qo'shilganlarni o'chirib tashlash
            let trashes = document.querySelectorAll('.col6');
            trashes.forEach((tr) => {
              tr.querySelector('button').click();
            })

            // barcha tashqi bajaruvchidagi checkbox larni unchecked qilish
            let row1CheckboxCopies = document.querySelectorAll('.row1Checkbox');
            row1CheckboxCopies.forEach((checkbox) => {
              if (checkbox.checked) {
                checkbox.setAttribute("defaultChecked", "false");
              }
            })
            Alert(setAlert, 'success', "Ma'lumot muvaffaqiyatli saqlandi");
            setTimeout(() => {
              history.push("/fuqaro/murojati/xomaki");
            }, 1500);
          } catch (error) {
            console.log(error);
            if (error?.response?.data === true) {
              Alert(setAlert, 'warning', "Hujjat imzolab bo`lingan");
              setTimeout(() => {
                history.push("/kiruvchi/resolution");
              }, 1500);
            } else {
              Alert(setAlert, 'warning', `${error?.response?.data}`);
            }
          }
        } else {
          Alert(setAlert, 'warning', "Bajaruvchi bo'limdagi xodim tanlanmagan");
        }
      } else {
        Alert(setAlert, 'warning', "Asosiy bo'limdagi sana tanlanmagan");
      }
    } else {
      Alert(setAlert, 'warning', "Hujjat turi kiritilmagan");
    }
  }

  return (
    <div className="content content-mobile" style={{ marginBottom: "130px", marginTop: '2rem' }}>
      <h1 style={{
        margin: "10px 0 0 20px",
        fontWeight: "bold",
        textTransform: "uppercase"
      }}>Ko'rish</h1>

      <div className="card-body card-body-mobile">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <NavbarFuqaroMurojat currentUser={currentUser} permission={permission} ranks={ranks}/>
          <li className="nav-item">
            <NavLink to={`/fuqaro/murojati/xomaki/${params.id}`} className="nav-link"
              activeClassName='NavLinkLi'>
              <i className="icon-eye2 mr-1" /> Ko'rish
            </NavLink>
          </li>
        </ul>

        <div className="card">
          <div className="row">
            {data?.files?.length > 0 ? (
              <div className="col-lg-5">
                <div className="card-body w-100 ccc">
                  {(data?.files?.length > 0 && data.files?.find((a) => a?.contentType?.split('/')[a?.contentType?.split('/').length - 1] === "pdf")) && (
                    <div className="borderPdf">
                      {data?.files?.map((file, index) => (
                        file?.contentType?.split('/')[file?.contentType?.split('/').length - 1] === "pdf" && (
                          <embed
                            src={urlFq + "/api/file/view/" + file?.id}
                            type="application/pdf"
                            width="100%"
                            height="1000px"
                            key={index}
                          />
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : <button
              className="col-lg-5 btn btn-icon"
              style={{
                marginTop: '5rem',
                color: 'crimson'
              }}
              disabled={true}
            >Fayl Mavjud emas!
            </button>}

            <div className={`col-lg-7`}>
              <div className="card-block mt-3">
                {/* asosiy */}

                <div className="card-box">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header bg-primary text-white header-elements-inline">
                        <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "uppercase" }}>Asosiy</h6>
                      </div>
                      <div className="card-body card-body-mobile">
                        <div className="row">
                          <div className="col-lg-5">
                            <div className="form-group form-group-floating row">
                              <div className="col-lg-12">
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="form-control daterange-single form-control-outline hujjatTuri"
                                    placeholder="Placeholder"
                                    value={data.applicationSort?.name}
                                    disabled
                                  />
                                  <label className="label-floating">Hujjat turi</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-5">
                            <div className="form-group form-group-floating row">
                              <div className="col-lg-12">
                                <div className={'changeBox'} style={{
                                  height: '100%',
                                  width: '100%',
                                  border: '1px solid lightgray',
                                  borderRadius: '5px',
                                  '&>input': {
                                    border: 'none !important',
                                    outline: 'none !important'
                                  },
                                  '&:hover': {
                                    border: 'none !important',
                                    outline: 'none !important'
                                  }
                                }}>
                                  <DatePicker
                                    className={'sanaAsosiy dateCustom'}
                                    id={'chiquvchiSana'}
                                    selected={startDate1}
                                    onChange={(date) => setStartDate1(date)}
                                    dateFormat={'dd.MM.yyyy'}
                                    isClearable
                                    placeholderText="Muddat/sana"
                                    showYearDropdown
                                    scrollableMonthYearDropdown
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="form-group form-group-floating row">
                              <div className="col-lg-12">
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="form-control daterange-single form-control-outline hujjatTuri"
                                    placeholder="Placeholder"
                                    value={data.journal?.beginNumber}
                                    disabled
                                  />
                                  <label className="label-floating">Jurnal nomer</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body p-0">
                          <table
                            className="table table-bordered table-striped table-hover Tab">
                            <tbody>
                              {data[0]?.files?.length > 0 && data[0]?.files?.map((hujjat, index) => (
                                hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pdf" ? (
                                  <tr key={index}>
                                    <th className="d-flex align-items-center cursor-pointer">
                                      <i className="far fa-file-pdf mr-2 fa-2x pdfIcon"
                                        style={{ fontSize: "20px" }} />
                                      {/* <a href={url + "/api/file/view/" + hujjat.id} target="_blank" rel="noreferrer noopener">PDF FILE</a> */}
                                      {hujjat?.originalName}
                                    </th>
                                  </tr>
                                ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "doc" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "docx") ? (
                                  <tr key={index}>
                                    <th className="d-flex align-items-center cursor-pointer">
                                      <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                        style={{ fontSize: "20px" }} />
                                      {hujjat?.originalName}
                                    </th>
                                  </tr>
                                ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xls" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "xlsx") ? (
                                  <tr key={index}>
                                    <th className="d-flex align-items-center cursor-pointer">
                                      <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                        style={{ fontSize: "20px" }} />
                                      {hujjat?.originalName}
                                    </th>
                                  </tr>
                                ) : (hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "ppt" || hujjat?.originalName.split('.')[hujjat?.originalName.split('.').length - 1] === "pptx") ? (
                                  <tr key={index}>
                                    <th className="d-flex align-items-center cursor-pointer">
                                      <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                        style={{ fontSize: "20px" }} />
                                      {hujjat?.originalName}
                                    </th>
                                  </tr>
                                ) : (
                                  <tr key={index}>
                                    <th className="d-flex align-items-center cursor-pointer">
                                      <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                        style={{ fontSize: "20px" }} />
                                      {hujjat?.originalName}
                                    </th>
                                  </tr>
                                )
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fuqaro Murojati */}
                <div className="card-box">
                  <div className="col-lg-12">
                    <div className="card">
                      <div
                        className="card-header bg-primary text-white header-elements-inline">
                        <h6 className="card-title"
                          style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                          Fuqaro Ma'lumotlari</h6>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="row">
                            {!data.legalPerson ? (
                              <>
                                <div className="col-lg-4">
                                  <div className="form-group form-group-floating  row">
                                    <div className="col-lg-12">
                                      <div className="position-relative">
                                        <input
                                          type="text"
                                          className="form-control form-control-outline InputCard"
                                          placeholder="Placeholder"
                                          value={data.customUser?.firstName}
                                          disabled
                                        />
                                        <label className="label-floating">Ism</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group form-group-floating  row">
                                    <div className="col-lg-12">
                                      <div className="position-relative">
                                        <input
                                          type="text"
                                          className="form-control form-control-outline InputCard"
                                          placeholder="Placeholder"
                                          value={data.customUser?.lastName}
                                          disabled
                                        />
                                        <label className="label-floating">Familiya</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-4">
                                  <div className="form-group form-group-floating  row">
                                    <div className="col-lg-12">
                                      <div className="position-relative">
                                        <input
                                          type="text"
                                          className="form-control form-control-outline InputCard"
                                          placeholder="Placeholder"
                                          value={data.customUser?.middleName}
                                          disabled
                                        />
                                        <label className="label-floating">Otasini issmi</label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="col-lg-4">
                                <div className="form-group form-group-floating  row">
                                  <div className="col-lg-12">
                                    <div className="position-relative">
                                      <input
                                        type="text"
                                        className="form-control form-control-outline InputCard"
                                        placeholder="Placeholder"
                                        value={data.legalUser?.head_NM}
                                        disabled
                                      />
                                      <label className="label-floating">To'liq ismi</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="col-lg-6">
                              <div className="form-group row">
                                <div className="col-lg-12">
                                  <Select
                                    value={viloyatData}
                                    options={vil}
                                    onChange={notParentsCardClickViloyat}
                                    placeholder="VILOYAT"
                                    className="cardTypeId"
                                    isClearable={true}
                                    required={true}

                                  />
                                  <div className="invalid-feedback">
                                    Maydonni tanlang
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group row">
                                <div className="col-lg-12">
                                  <Select
                                    value={tumanData}
                                    options={tuman}
                                    onChange={notParentsCardClickTuman}
                                    placeholder="TUMAN (SHAHAR)"
                                    className="cardTypeId tumanNot"
                                    isClearable={true}
                                    required={true}
                                  />
                                  <div className="invalid-feedback">
                                    Maydonni tanlang
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12" id={'watchSector'}
                              style={{ display: 'inline-block' }}>
                              <div className="form-group form-group-floating  row">
                                <div className="col-lg-6">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      disabled
                                      value={secMahDef?.sectorName}
                                      className="form-control form-control-outline InputGetSector"
                                      placeholder="Placeholder" />
                                    <label
                                      className="label-floating">Sector </label>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="position-relative">
                                    <Select
                                      value={mahallaData}
                                      options={mahalla}
                                      onChange={notParentsCardClickMahalla}
                                      // defaultValue ={secMahDef.length>0?  {
                                      //     value: `${secMahDef?.id}`,
                                      //     label: `${secMahDef?.name}`
                                      // }:{
                                      //     value:'',
                                      //     label:''
                                      // }}
                                      placeholder="Mahalla"
                                      className="cardTypeId InputGetMahallaJismoniy"
                                      isClearable={true}
                                      required={true}
                                    />
                                    <div className="invalid-feedback">
                                      Maydonni tanlang
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div className="col-lg-12">
                              <div className="form-group form-group-floating  row">
                                <div className="col-lg-12">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      required={true}
                                      id={'InputManzil'}
                                      className="form-control form-control-outline  InputManzilJismoniy"
                                      placeholder="Placeholder" />
                                    <label
                                      className="label-floating">MANZIL </label>
                                    <div className="invalid-feedback">
                                      Maydonni to'ldiring
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="form-group form-group-floating row">
                                <div className="col-lg-12">
                                  <div className="position-relative">
                                    <textarea
                                      className="form-control form-control-outline InputCard"
                                      disabled
                                      cols="10"
                                      rows="10"
                                      style={{ height: "90px" }}
                                      placeholder="Placeholder"
                                      value={data?.shortDescription}
                                    />
                                    <label className="label-floating">Murojaat mazmuni</label>
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

                {/* kiruvchi */}
                {data?.files?.length > 0 && (
                  <XKKurish
                    data={data}
                  />
                )}

                {/* tezkor rezolutsiya va rezolutsiya mazmuni va  */}
                <TezRezolutsiyaMazmuni
                  data={data}
                  currentUser={currentUser}
                  setAlert={setAlert}
                />

                {/* bajaruvchi */}
                <div className="card-box">
                  <div className="col-lg-12">
                    <div>
                      <div className="card-header bg-primary text-white header-elements-inline">
                        <h6 className="card-title" style={{
                          fontWeight: "bold",
                          textTransform: "uppercase"
                        }}>Bajaruvchi</h6>
                      </div>


                      {data.executorResolutions?.length > 0 && data.executorResolutions?.map((dat, index) => (
                        <div key={index}>
                          <form onSubmit={deleteFun1} className="bajaruvchiForm">
                            <div className="card-box">
                              <div className="card mb-3">
                                <div className="card-body" id="bajaruvchi">
                                  <div className="" style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                  }}>
                                    <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                                      <div className="checkbox chb mr-1"
                                        title="Nazorat"
                                        onClick={(e) => checkedDivNazorat(e.target, index)}>
                                        <strong className="checkedName">N</strong>
                                        <strong className="iconCheck text-white"
                                          style={{
                                            display: dat?.executorStatusName.toUpperCase() === "NAZORAT UCHUN" && "flex",
                                            backgroundColor: dat?.executorStatusName.toUpperCase() === "NAZORAT UCHUN" && "rgb(0, 86, 184)"
                                          }}>N</strong>
                                      </div>
                                      <div className="checkbox chb mr-1"
                                        title="Umumlashtirish"
                                        onClick={(e) => checkedDivUmum(e.target, index)}>
                                        <strong className="checkedName">U</strong>
                                        <strong className="iconCheck text-white"
                                          style={{
                                            display: dat?.executorStatusName.toUpperCase() === "UMUMLASHTIRUVCHI" && "flex",
                                            backgroundColor: dat?.executorStatusName.toUpperCase() === "UMUMLASHTIRUVCHI" && "rgb(0, 86, 184)"
                                          }}>U</strong>
                                      </div>
                                      <div className="checkbox chb mr-1" title="Ma'lumot uchun"
                                        onClick={(e) => checkedDivM(e.target, index)}>
                                        <strong className="checkedName">M</strong>
                                        <strong className="iconCheck text-white"
                                          style={{
                                            display: dat?.executorStatusName.toUpperCase() === "MA'LUMOT UCHUN" && "flex",
                                            backgroundColor: dat?.executorStatusName.toUpperCase() === "MA'LUMOT UCHUN" && "rgb(0, 86, 184)"
                                          }}>M</strong>
                                      </div>
                                    </div>
                                    <div className="col2 mb-1 mr-1"
                                      style={{ flex: "3" }}>
                                      <div className="form-group mb-0">
                                        <Select
                                          defaultValue={{
                                            value: `${(dat?.workPlace?.firstName && dat?.workPlace?.firstName?.length > 1) ? ((((dat?.workPlace?.firstName[0].toUpperCase() === "S" || dat?.workPlace?.firstName[0].toUpperCase() === "C") && dat?.workPlace?.firstName[1].toUpperCase() === "H")) ? dat?.workPlace?.firstName?.substring(0, 2) + ". " : dat?.workPlace?.firstName?.substring(0, 1) + ". ") : ""}${dat?.workPlace?.lastName}`,
                                            label: `${(dat?.workPlace?.firstName && dat?.workPlace?.firstName?.length > 1) ? ((((dat?.workPlace?.firstName[0].toUpperCase() === "S" || dat?.workPlace?.firstName[0].toUpperCase() === "C") && dat?.workPlace?.firstName[1].toUpperCase() === "H")) ? dat?.workPlace?.firstName?.substring(0, 2) + ". " : dat?.workPlace?.firstName?.substring(0, 1) + ". ") : ""}${dat?.workPlace?.lastName}`
                                          }}
                                          options={xodimlar}
                                          onChange={selectXodimFunc}
                                          placeholder="Xodim"
                                          className="XodimBajaruvchi"
                                        />
                                      </div>
                                    </div>
                                    <div className="col3 mb-1 mr-1" style={{ flex: "2" }}>
                                      <div className="form-group form-group-floating row mb-0">
                                        <div className="col-lg-12">
                                          <div className="position-relative">
                                            <textarea
                                              className="form-control form-control-outline izohCol1"
                                              style={{ height: "56px" }}
                                              placeholder="Placeholder"
                                              defaultValue={dat?.description}
                                            >
                                            </textarea>
                                            <label
                                              className="label-floating">Izoh</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col4 mb-1 mr-1"
                                      style={{ flex: "2" }}>
                                      <div
                                        className="form-group form-group-floating row mb-0">
                                        <div className="col-lg-12">
                                          <div className="position-relative">
                                            <input
                                              type="date"
                                              className="form-control sanaAsosiy daterange-single form-control-outline bajaruvchiSana"
                                              id="chiquvchiSana"
                                              placeholder="Placeholder"
                                              defaultValue={dat?.deadline}
                                              onChange={(e) => console.log(e.target.value)}
                                              style={{ border: "1px solid lightgray" }}
                                            />
                                            <label className="label-floating">Sana</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col6 mb-1" style={{ flex: "1" }}>
                                      <div style={{ height: "56px" }}>
                                        <div className="form-group mb-0">
                                          <button type="submit"
                                            className="btn btn-danger"
                                            style={{
                                              padding: "16px",
                                              width: "100%"
                                            }}><i
                                              className="icon-trash" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-1 mr-1 visibleBoshqa" style={{ width: "100%", display: "none" }}>
                                    <div className="form-group form-group-floating row mb-0">
                                      <div className="col-12">
                                        <div className="position-relative">
                                          <input
                                            type="number"
                                            className="form-control form-control-outline boshqa"
                                            style={{ height: "56px", }}
                                            placeholder="Placeholder"
                                          />
                                          <label
                                            className="label-floating">Boshqa</label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      ))}

                      {yangiQushish.map((yangi, index) => (
                        <div key={index}>
                          <form onSubmit={deleteFun} className="bajaruvchiForm">
                            <div className="card-box">
                              <div className="card mb-3">
                                <div className="card-body" id="bajaruvchi">
                                  <div className="" style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center"
                                  }}>
                                    <div className="d-flex col1 mb-1" style={{ flex: "1" }}>
                                      <div className="checkbox chb mr-1" title="Nazorat"
                                        onClick={(e) => checkedDivNazorat(e.target, index + rowLeinExecutorInformationListLength)}>
                                        <strong className="checkedName">N</strong>
                                        <strong className="iconCheck text-white">N</strong>
                                      </div>
                                      <div className="checkbox chb mr-1"
                                        title="Umumlashtirish"
                                        onClick={(e) => checkedDivUmum(e.target, index + rowLeinExecutorInformationListLength)}>
                                        <strong className="checkedName">U</strong>
                                        <strong className="iconCheck text-white">U</strong>
                                      </div>
                                      <div className="checkbox chb mr-1" title="M"
                                        onClick={(e) => checkedDivM(e.target, index + rowLeinExecutorInformationListLength)}>
                                        <strong className="checkedName">M</strong>
                                        <strong className="iconCheck text-white">M</strong>
                                      </div>
                                    </div>
                                    <div className="col2 mb-1 mr-1"
                                      style={{ flex: "3" }}>
                                      <div className="form-group mb-0">
                                        <Select
                                          // defaultValue={options[1]}
                                          options={xodimlar}
                                          onChange={selectXodimFunc}
                                          placeholder="Xodim"
                                          className="XodimBajaruvchi"
                                          styles={colourStyles}
                                        />
                                      </div>
                                    </div>
                                    <div className="col3 mb-1 mr-1"
                                      style={{ flex: "2" }}>
                                      <div
                                        className="form-group form-group-floating row mb-0">
                                        <div className="col-lg-12">
                                          <div className="position-relative">
                                            <textarea
                                              className="form-control form-control-outline izohCol1"
                                              style={{ height: "56px" }}
                                              placeholder="Placeholder"
                                            >
                                            </textarea>
                                            <label
                                              className="label-floating">Izoh</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col4 mb-1 mr-1"
                                      style={{ flex: "2" }}>
                                      <div className="form-group form-group-floating row mb-0">
                                        <div className="col-lg-12">
                                          <div className="position-relative">
                                            <input
                                              type="date"
                                              className="form-control sanaAsosiy daterange-single form-control-outline bajaruvchiSana"
                                              id="chiquvchiSana"
                                              placeholder="Placeholder"
                                              onChange={(e) => console.log(e)}
                                              style={{ border: "1px solid lightgray" }}
                                            />
                                            <label className="label-floating">Sana</label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col6 mb-1" style={{ flex: "1" }}>
                                      <div style={{ height: "56px" }}>
                                        <div className="form-group mb-0">
                                          <button
                                            type="submit"
                                            className="btn btn-danger"
                                            style={{
                                              padding: "16px",
                                              width: "60px"
                                            }}>
                                            <i className="icon-trash" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mb-1 mr-1 visibleBoshqa" style={{ width: "100%", display: "none" }}>
                                    <div className="form-group form-group-floating row mb-0">
                                      <div className="col-12">
                                        <div className="position-relative">
                                          <input
                                            type="number"
                                            className="form-control form-control-outline boshqa"
                                            style={{ height: "56px", }}
                                            placeholder="Placeholder"
                                          />
                                          <label className="label-floating">Boshqa</label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right mr-2 my-2">
                  <button type="button" className="btn btn-primary" onClick={newCreateBajaruvchi} id="myFormInput">
                    Yangi qo'shish
                  </button>
                </div>
              </div>

              {/* <!-- tashqi bajaruvchilar --> */}
              <div className="card-body px-0">
                <TashqiBajaruvchilarKurish
                  setResults={setResults}
                  results={results}
                  data={data}
                  setAlert={setAlert}
                  currentUser={currentUser}
                />

                {/* e imzo */}
                {/* <ElektronKalit
                                    setImzo={setImzo}
                                /> */}

                <div className="card-box mt-2">
                  <div className="col-lg-12 w-100 d-flex justify-content-between align-items-center">
                    <div className="form-check d-flex align-items-center"
                      onClick={() => setNazorat(!nazorat)}>
                      {nazorat ? <input className="form-check-input" type="checkbox"
                        id="flexCheckDefault"
                        style={{ width: "30px", height: "20px" }} checked />
                        : <input className="form-check-input" type="checkbox"
                          id="flexCheckDefault" style={{ width: "30px", height: "20px" }} />
                      }
                      <label className="form-check-label"
                        style={{ fontSize: "20px" }}>
                        Nazorat uchun
                      </label>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary ml-1"
                      onClick={saveAllData}
                    >
                      Saqlash
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* alert */}
            {alert.open && (
              <div
                className={`alert alert-${alert.color} alertNotice alert-styled-left alert-dismissible`}>
                <span className="font-weight-semibold">{alert.text}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}