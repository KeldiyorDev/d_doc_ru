import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const TashqiBajaruvchilarKurish = ({
  setResults,
  results,
  data,
  setAlert,
  currentUser,
  setYunalishlar,
  yunalishlar
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [outExecutorInformationList, setOutExecutorInformationList] = useState([]);
  const [change, setChange] = useState(false);

  // barcha yo'nalishlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/getPassive/" + JSON.parse(localStorage.getItem('oi')));
        if (isMounted){
          console.log(res.data);
          setYunalishlar(res.data);}
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

  // umumiy tashqi bajaruvchilar
  // search tashqi bajaruvchilar
  const changeInputChange1 = (value, index) => {
    let tashqiBajUlInline = document.getElementsByClassName('tashqiBajUlInline')[index];
    let inlineContent = tashqiBajUlInline?.querySelectorAll('.inlineContent');
    inlineContent?.forEach((d) => {
      let v = d.querySelector('div').textContent.toUpperCase();
      if (v.indexOf(value.toUpperCase(), 0) > -1) {
        d.style.display = "flex";
      } else {
        d.style.display = "none";
      }
    })
  }

  // search tashqi bajaruvchilar ichki qismi
  const changeInputChange2 = (value, index) => {
    let tashqiBajUlInline = document.getElementsByClassName('tashqiBajUlInline')[index];
    let inlineContent2 = tashqiBajUlInline?.querySelectorAll('.inlineContent2');
    inlineContent2.forEach((d) => {
      let inlineContent3 = d.querySelectorAll('.inlineContent3');
      inlineContent3.forEach((s) => {
        let v = s.querySelector('div').textContent.toUpperCase();
        if (v.indexOf(value.toUpperCase(), 0) > -1) {
          s.style.display = "flex";
        } else {
          s.style.display = "none";
        }
      })
    })
  }

  // tashqi bajaruvchilar uchun
  useEffect(() => {
    let isMounted = true;
    let tashqiBaj = document.querySelector('.tashqiBaj');
    let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');
    let li1 = tashqiBaj?.querySelectorAll('.tashqiBajLi1');
    let inlineContent = tashqiBaj?.querySelectorAll('.inlineContent');

    if (isMounted) {
      // bosganda plus minusni taxlash
      li1.forEach((li, i) => {
        li?.addEventListener('click', () => {
          if (tashqiBajUlInline[i].style.display === "block") {
            tashqiBajUlInline[i].style.display = "none";
            li.querySelector('.iconMinus').style.display = "none";
            li.querySelector('.iconPlus').style.display = "block";
            tashqiBajUlInline[i].querySelector('.inputTashqiTash').focus();
            tashqiBajUlInline[i].querySelector('.inputTashqiTash').style.border = "2px solid blue";
          } else {
            tashqiBajUlInline[i].style.display = "block";
            li.querySelector('.iconMinus').style.display = "block";
            li.querySelector('.iconPlus').style.display = "none";
            tashqiBajUlInline[i].querySelector('.inputTashqiTash').focus();
            tashqiBajUlInline[i].querySelector('.inputTashqiTash').style.border = "2px solid blue";
          }
        })
      })

      // barchasini tanlash uchun
      tashqiBajUlInline.forEach((t) => {
        t.querySelector('.allChecked').addEventListener('click', () => {
          if (t.querySelector('.allChecked').textContent === "Barchasini tanlash") {
            t.querySelectorAll('.inlineContent').forEach((k) => {
              k.querySelector('input').checked = true;
            });
            t.querySelector('.allChecked').textContent = "Barchasini o'chirish";
            t.querySelector('.allChecked').style.backgroundColor = "crimson";
          } else {
            t.querySelectorAll('.inlineContent').forEach((k) => {
              k.querySelector('input').checked = false;
            });
            t.querySelector('.allChecked').textContent = "Barchasini tanlash";
            t.querySelector('.allChecked').style.backgroundColor = "#0056B8";
          }
        })
      })

      // ichki qismi uchun
      inlineContent.forEach((y, ind) => {
        y.querySelector('div').addEventListener('click', () => {
          if (document.getElementsByClassName('inlineContent2')[ind].style.display === "block") {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "none";
          } else {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "block";
          }
        })
      })
      tashqiBajUlInline.forEach((t) => {
        t.querySelector('.allChecked1')?.addEventListener('click', () => {
          if (t.querySelector('.allChecked1').textContent === "Barchasini tanlash") {
            t.querySelectorAll('.inlineContent3').forEach((k) => {
              k.querySelector('input').checked = true;
            });
            t.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
            t.querySelector('.allChecked1').style.backgroundColor = "crimson";
          } else {
            t.querySelectorAll('.inlineContent3').forEach((k) => {
              k.querySelector('input').checked = false;
            });
            t.querySelector('.allChecked1').textContent = "Barchasini tanlash";
            t.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
          }
        })
      })

      // bittasi unchecked bo'lsa button ni o'zgartirish
      tashqiBajUlInline.forEach((d) => {
        let idsDiv1 = d.querySelectorAll('.idsDiv1');
        let inlineContent2 = document.querySelectorAll('.inlineContent2');
        // tashqi qismi uchun
        idsDiv1.forEach((r) => {
          r.addEventListener('click', () => {
            let bool = true;
            if (r.checked) {
              idsDiv1.forEach((t) => {
                if (!t.checked) {
                  bool = false;
                }
              })
              if (bool) {
                d.querySelector('.allChecked').textContent = "Barchasini o'chirish";
                d.querySelector('.allChecked').style.backgroundColor = "crimson";
              } else {
                d.querySelector('.allChecked').textContent = "Barchasini tanlash";
                d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
              }
            } else {
              idsDiv1.forEach((t) => {
                if (!t.checked) {
                  bool = false;
                }
              })
              if (bool) {
                d.querySelector('.allChecked').textContent = "Barchasini o'chirish";
                d.querySelector('.allChecked').style.backgroundColor = "crimson";
              } else {
                d.querySelector('.allChecked').textContent = "Barchasini tanlash";
                d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
              }
            }
          })
        })
        // ichki qismi
        inlineContent2.forEach((w) => {
          let idsDiv2 = w.querySelectorAll('.idsDiv2');
          idsDiv2.forEach((r) => {
            r.addEventListener('click', () => {
              let bool = true;
              if (r.checked) {
                idsDiv2.forEach((t) => {
                  if (!t.checked) {
                    bool = false;
                  }
                })
                if (bool) {
                  w.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
                  w.querySelector('.allChecked1').style.backgroundColor = "crimson";
                } else {
                  w.querySelector('.allChecked1').textContent = "Barchasini tanlash";
                  w.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
                }
              } else {
                idsDiv2.forEach((t) => {
                  if (!t.checked) {
                    bool = false;
                  }
                })
                if (bool) {
                  w.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
                  w.querySelector('.allChecked1').style.backgroundColor = "crimson";
                } else {
                  w.querySelector('.allChecked1').textContent = "Barchasini tanlash";
                  w.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
                }
              }
            })
          })
        })
      })

      return () => {
        // bosganda plus minusni taxlash
        li1.forEach((li, i) => {
          li?.removeEventListener('click', () => {
            if (tashqiBajUlInline[i].style.display === "block") {
              tashqiBajUlInline[i].style.display = "none";
              li.querySelector('.iconMinus').style.display = "none";
              li.querySelector('.iconPlus').style.display = "block";
              tashqiBajUlInline[i].querySelector('.inputTashqiTash').focus();
            } else {
              tashqiBajUlInline[i].style.display = "block";
              li.querySelector('.iconMinus').style.display = "block";
              li.querySelector('.iconPlus').style.display = "none";
              tashqiBajUlInline[i].querySelector('.inputTashqiTash').focus();
            }
          })
        })

        // barchasini tanlash uchun
        tashqiBajUlInline.forEach((t) => {
          t.querySelector('.allChecked').removeEventListener('click', () => {
            if (t.querySelector('.allChecked').textContent === "Barchasini tanlash") {
              t.querySelectorAll('.inlineContent').forEach((k) => {
                k.querySelector('input').checked = true;
              });
              t.querySelector('.allChecked').textContent = "Barchasini o'chirish";
              t.querySelector('.allChecked').style.backgroundColor = "crimson";
            } else {
              t.querySelectorAll('.inlineContent').forEach((k) => {
                k.querySelector('input').checked = false;
              });
              t.querySelector('.allChecked').textContent = "Barchasini tanlash";
              t.querySelector('.allChecked').style.backgroundColor = "#0056B8";
            }
          })
        })

        // ichki qismi uchun
        inlineContent.forEach((y, ind) => {
          y.querySelector('div').removeEventListener('click', () => {
            if (document.getElementsByClassName('inlineContent2')[ind].style.display === "block") {
              document.getElementsByClassName('inlineContent2')[ind].style.display = "none";
            } else {
              document.getElementsByClassName('inlineContent2')[ind].style.display = "block";
            }
          })
        })
        tashqiBajUlInline.forEach((t) => {
          t.querySelector('.allChecked1')?.removeEventListener('click', () => {
            if (t.querySelector('.allChecked1').textContent === "Barchasini tanlash") {
              t.querySelectorAll('.inlineContent3').forEach((k) => {
                k.querySelector('input').checked = true;
              });
              t.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
              t.querySelector('.allChecked1').style.backgroundColor = "crimson";
            } else {
              t.querySelectorAll('.inlineContent3').forEach((k) => {
                k.querySelector('input').checked = false;
              });
              t.querySelector('.allChecked1').textContent = "Barchasini tanlash";
              t.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
            }
          })
        })

        // bittasi unchecked bo'lsa button ni o'zgartirish
        tashqiBajUlInline.forEach((d) => {
          let idsDiv1 = d.querySelectorAll('.idsDiv1');
          let inlineContent2 = document.querySelectorAll('.inlineContent2');
          // tashqi qismi uchun
          idsDiv1.forEach((r) => {
            r.removeEventListener('click', () => {
              let bool = true;
              if (r.checked) {
                idsDiv1.forEach((t) => {
                  if (!t.checked) {
                    bool = false;
                  }
                })
                if (bool) {
                  d.querySelector('.allChecked').textContent = "Barchasini o'chirish";
                  d.querySelector('.allChecked').style.backgroundColor = "crimson";
                } else {
                  d.querySelector('.allChecked').textContent = "Barchasini tanlash";
                  d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
                }
              } else {
                idsDiv1.forEach((t) => {
                  if (!t.checked) {
                    bool = false;
                  }
                })
                if (bool) {
                  d.querySelector('.allChecked').textContent = "Barchasini o'chirish";
                  d.querySelector('.allChecked').style.backgroundColor = "crimson";
                } else {
                  d.querySelector('.allChecked').textContent = "Barchasini tanlash";
                  d.querySelector('.allChecked').style.backgroundColor = "#0056B8";
                }
              }
            })
          })
          // ichki qismi
          inlineContent2.forEach((w) => {
            let idsDiv2 = w.querySelectorAll('.idsDiv2');
            idsDiv2.forEach((r) => {
              r.removeEventListener('click', () => {
                let bool = true;
                if (r.checked) {
                  idsDiv2.forEach((t) => {
                    if (!t.checked) {
                      bool = false;
                    }
                  })
                  if (bool) {
                    w.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
                    w.querySelector('.allChecked1').style.backgroundColor = "crimson";
                  } else {
                    w.querySelector('.allChecked1').textContent = "Barchasini tanlash";
                    w.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
                  }
                } else {
                  idsDiv2.forEach((t) => {
                    if (!t.checked) {
                      bool = false;
                    }
                  })
                  if (bool) {
                    w.querySelector('.allChecked1').textContent = "Barchasini o'chirish";
                    w.querySelector('.allChecked1').style.backgroundColor = "crimson";
                  } else {
                    w.querySelector('.allChecked1').textContent = "Barchasini tanlash";
                    w.querySelector('.allChecked1').style.backgroundColor = "#0056B8";
                  }
                }
              })
            })
          })
        })
        isMounted = false;
      }
    }
  }, [openModal]);

  // tashqi bajaruvchilar oldin tanlangan bo'lsa, checked qilish
  useEffect(() => {
    let isMounted = true;
    let timer = setTimeout(() => {
      let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');
      tashqiBajUlInline.forEach((d) => {
        let idsDiv = d.querySelectorAll('.idsDiv');
        if (results?.length === 0) {
          idsDiv.forEach((r) => {
            if (outExecutorInformationList?.includes(parseInt(r.getAttribute('ids')))) {
              r.checked = true;
            }
          })
        }
      });
      if (isMounted)
        setChange(!change);
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outExecutorInformationList, data]);

  // oldin belgilangan tashqi bajaruvchilarni berilgan mos formatga to'g'rilash
  useEffect(() => {
    let isMounted = true;
    let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');
    let result = [];


    tashqiBajUlInline?.forEach((d) => {
      let idsDiv1 = d.querySelectorAll('.idsDiv1');
      // console.log(idsDiv1);
      let bool = true, arr = [];
      idsDiv1.forEach((r) => {
        if (!r.checked) {
          bool = false;
        }
      })
      if (bool) {
        d.querySelectorAll('.idsDiv').forEach((r) => {
          if (r.checked) {
            arr.push(r.getAttribute('ids'));
          }
        });
        // yunalish ichidagi barcha tashkilotlar belgilangan bo'lsa, input dagi qiymatni chiqarish
        if (data[0]?.outExecutorInformationList?.length > 0) {
          data[0]?.outExecutorInformationList?.forEach((k) => {
            if (parseInt(d.getElementsByClassName('idsDiv')[0]?.getAttribute('ids')) === parseInt(k?.orgId)) {
              d.querySelector('.inputTashqiTash').value = k?.orgTypeGeneralName
            }
          })
        }
        if (arr.length > 0)
          result.push({ id: d.getAttribute('idorg'), ids: arr, value: d.querySelector('.inputTashqiTash').value });
      } else {
        d.querySelectorAll('.idsDiv').forEach((r) => {
          if (r.checked) {
            arr.push(r.getAttribute('ids'));
          }
        });
        if (arr.length > 0) {
          result.push({ id: d.getAttribute('idorg'), ids: arr, value: null });
        }
      }
    });
    if (isMounted) {
      setResults(result);
    }

    return () => {
      isMounted = false;
    }
  }, [change, data, setResults]);

  // tashqi bajaruvchilarni saqlash
  useEffect(() => {
    let isMounted = true;
    let arr = [];
    data[0]?.outExecutorInformationList?.forEach((f) => {
      arr.push(f.orgId);
    })

    if (isMounted)
      setOutExecutorInformationList(arr);

    return () => {
      isMounted = false;
    }
  }, [data]);

  // save data
  const saveAllSelectOrganizations = useCallback(() => {
    let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');
    let result = [];
    tashqiBajUlInline?.forEach((d, index) => {
      let idsDiv1 = d.querySelectorAll('.idsDiv1');
      let bool = true, arr = [];
      idsDiv1.forEach((r) => {
        if (!r.checked) {
          bool = false;
        }
      })
      if (bool) {
        d.querySelectorAll('.idsDiv').forEach((r) => {
          if (r.checked) {
            arr.push(r.getAttribute('ids'));
          }
        });
        if (arr.length > 0) {
          if (d.querySelector('.inputTashqiTash').value === "") {
            Alert(setAlert, "warning", "Все организации в маршруте должны быть выбраны, необходимо ввести краткое описание, иначе организации будут отправлены не выбранными");
          } else {
            result.push({
              id: index,
              orgType: d.getAttribute('idorg'),
              ids: arr,
              value: d.querySelector('.inputTashqiTash').value
            });
          }
        }
      } else {
        d.querySelectorAll('.idsDiv').forEach((r) => {
          if (r.checked) {
            arr.push(r.getAttribute('ids'));
          }
        });
        if (arr.length > 0) {
          result.push({ id: index, orgType: d.getAttribute('idorg'), ids: arr, value: null });
        }
      }
    })
    setResults(result);
    setOpenModal(false);
  }, [setAlert, setResults]);

  return (
    <>
      <div className="card-box ">
        <div className="col-lg-12">
          <button className="btn btn-dark w-100" onClick={() => setOpenModal(true)}>
            <i className="icon-plus2"></i>
            <span style={{ position: "relative" }}>
            Внешние исполнители
              {(results?.length > 0) && (
                <span className="badge2">{results.length}</span>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className={'adminWindow pt-5'} style={{ display: openModal ? "block" : "none" }}>
        <div className="kurishModalBajaruvchi">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Внешние исполнители</h5>
              <button type="button" className="close" onClick={() => setOpenModal(false)}>&times;</button>
            </div>
            <div className="modal-body bodyModal"
              style={{ display: "flex", justifyContent: "center", alignItems: "start", gap: "10px" }}>
              {/* yangisi */}
              <form className="formReset" style={{ flex: 5 }}>
                <ul className="tashqiBaj">
                  {yunalishlar?.length > 0 && yunalishlar.map((dt, index) => (
                    <div key={index} className="yunalishlar">
                      <li className={`tashqiBajLi1 d-flex justify-content-between ${results.find(item => item.id === dt.id) ? 'isTrue' : "isFalse"}`} id={dt?.id}>
                        <div className="d-flex align-items-center ">
                          <i className="fas fa-minus mr-2 iconMinus"
                            style={{ display: "none", fontSize: "13px" }}></i>
                          <i className="fas fa-plus mr-2 iconPlus"
                            style={{ fontSize: "13px" }}></i>
                          <div className="position-relative mr-3" style={{ fontSize: "13px" }}>
                            {dt?.orgTypeName}
                          </div>
                        </div>
                        <div
                          className={"text-white fw-bold px-1 mr-5"}
                          style={{
                            fontSize: '18px',
                            borderRadius: '5px',
                            backgroundColor: "crimson",
                            position: 'relative',
                            marginLeft: '-15px'
                          }}>
                          {dt?.organizations?.length}
                          <b style={{
                            backgroundColor: '#0056B8',
                            position: 'absolute',
                            borderRadius: 5,
                            padding: '0 4px',
                            right: '-30px',
                            bottom: 0,
                            display: 'none',
                            textAlign: 'center'
                          }}
                          />
                        </div>
                      </li>
                      <div className="tashqiBajUlInline" style={{ display: "none" }} idorg={dt?.id}>
                        <span className="allChecked mr-2">Выбрать все</span>
                        <input
                          type="text"
                          className="inputTashqiTash"
                          placeholder="Краткое описание"
                          required
                          minLength={10}
                          defaultValue="В районные и городские администрации"
                        />
                        <br />
                        <input
                          type="text"
                          className="form-control inputChange1"
                          placeholder="Поиск..."
                          onChange={(e) => changeInputChange1(e.target.value, index)}
                        />
                        {dt?.organizations?.length > 0 && dt.organizations.map((d, index1) => (
                          <div key={index1}>
                            <div className="inlineContent">
                              <input
                                type="checkbox"
                                /*ids muhim narsa birontang tegsang uldiraman*/
                                ids={d?.id}
                                className="idsDiv idsDiv1"
                              />
                              <div style={{ fontSize: "13px" }}>{d?.orgName}</div>
                            </div>
                            <div className="inlineContent2" style={{ display: "none" }}>
                              <span className="allChecked1">Выбрать все</span>
                              <br />
                              <input type="text" className="form-control inputChange2"
                                placeholder="Поиск..."
                                onChange={(e) => changeInputChange2(e.target.value, index)} />
                              {d?.organizations?.length > 0 && d.organizations.map((d1, index2) => (
                                <div key={index2} className="inlineContent3">
                                  <input
                                    type="checkbox"
                                    ids={d1?.id}
                                    className="idsDiv idsDiv2"
                                  />
                                  <div>{d1?.orgName}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </ul>
              </form>
              <div className="d-flex justify-content-end" style={{ position: "sticky", top: "0px" }}>
                <button type="button" className="btn btn-primary" onClick={saveAllSelectOrganizations}>
                  <i className="fas fa-save mr-2"></i>Сохранять
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(TashqiBajaruvchilarKurish);