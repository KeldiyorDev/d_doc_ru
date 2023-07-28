import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../../config";

export default function TashqiBajaruvchilarF({ yunalishlar, setYunalishlar, objData, results, setAlert, setResults, currentUser, allexecutorsData, openBajaruvchi }) {
  const [openModal, setOpenModal] = useState(false);

  // barcha yo'nalishlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/getPassive/" + JSON.parse(localStorage.getItem('oi')));
        if (isMounted)
          setYunalishlar(res.data);
      } catch (err) {
        console.log(err);
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
    let inlineContent = tashqiBajUlInline.querySelectorAll('.inlineContent');
    inlineContent.forEach((d) => {
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

  // saqlashdan keyin, tashqi bajaruvchilar oldin tanlangan bo'lsa, checked qilish
  // useEffect(() => {
  //   let isMounted = true;
  //   let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');

  //   if (isMounted) {
  //     tashqiBajUlInline.forEach((d) => {
  //       let idsDiv = d.querySelectorAll('.idsDiv');
  //       idsDiv?.forEach((r) => {
  //         objData[0]?.problems[openBajaruvchi.index]?.outExecutors?.forEach((h) => {
  //           if (h.ids?.includes(r.getAttribute('ids'))) {
  //             r.checked = true;
  //           } else {
  //             r.checked = false;
  //           }
  //         })
  //       })
  //     });
  //   }
  //   return () => {
  //     isMounted = false;
  //   }
  // }, [objData, openBajaruvchi.index]);

  // hammasini saqlamasdan oldin, tashqi bajaruvchilar tanlangan bo'lsa, checked qilish
  // useEffect(() => {
  //   let isMounted = true;

  //   let timer = setTimeout(() => {
  //     let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');

  //     if (isMounted) {
  //       tashqiBajUlInline.forEach((d) => {
  //         let idsDiv = d.querySelectorAll('.idsDiv');
  //         idsDiv.forEach((r) => {
  //           allexecutorsData.forEach((h) => {
  //             h.tashqiBajaruvchilar.forEach((u) => {
  //               if (u.ids.includes(parseInt(r.getAttribute('ids')))) {
  //                 r.checked = true;
  //               } else {
  //                 r.checked = false;
  //               }
  //             })
  //           })
  //         })
  //       });
  //     }
  //   }, 1);

  //   return () => {
  //     isMounted = false;
  //     clearTimeout(timer);
  //   }
  // }, [objData, allexecutorsData, openBajaruvchi.index]);

  // tashqi bajaruvchilar uchun
  useEffect(() => {
    let isMounted = true;
    let tashqiBaj = document.querySelector('.tashqiBaj');
    let tashqiBajUlInline = document.querySelectorAll('.tashqiBajUlInline');
    let li1 = tashqiBaj?.querySelectorAll('.tashqiBajLi1');
    let inlineContent = tashqiBaj?.querySelectorAll('.inlineContent');

    // bosganda plus minusni taxlash
    if (isMounted) {
      li1?.forEach((li, i) => {
        li?.addEventListener('click', () => {
          if (tashqiBajUlInline[i].style.display === "block") {
            tashqiBajUlInline[i].style.display = "none";
            li.querySelector('.iconMinus').style.display = "none";
            li.querySelector('.iconPlus').style.display = "block";
          } else {
            tashqiBajUlInline[i].style.display = "block";
            tashqiBajUlInline[i].querySelector('.inputTashqiTash').focus();
            li.querySelector('.iconMinus').style.display = "block";
            li.querySelector('.iconPlus').style.display = "none";

          }
        })
      })

      // barchasini tanlash uchun
      tashqiBajUlInline?.forEach((t) => {
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
      inlineContent?.forEach((y, ind) => {
        y.querySelector('div').addEventListener('click', () => {
          if (document.getElementsByClassName('inlineContent2')[ind].style.display === "block") {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "none";
          } else {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "block";
          }
        })
      })

      tashqiBajUlInline?.forEach((t) => {
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
      tashqiBajUlInline?.forEach((d) => {
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
        inlineContent2?.forEach((w) => {
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
    }

    return () => {
      // bosganda plus minusni taxlash
      li1?.forEach((li, i) => {
        li?.removeEventListener('click', () => {
          if (tashqiBajUlInline[i].style.display === "block") {
            tashqiBajUlInline[i].style.display = "none";
            li.querySelector('.iconMinus').style.display = "none";
            li.querySelector('.iconPlus').style.display = "block";

          } else {
            tashqiBajUlInline[i].style.display = "block";
            li.querySelector('.iconMinus').style.display = "block";
            li.querySelector('.iconPlus').style.display = "none";

          }
        })
      })
      // barchasini tanlash uchun
      tashqiBajUlInline?.forEach((t) => {
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
      inlineContent?.forEach((y, ind) => {
        y.querySelector('div').removeEventListener('click', () => {
          if (document.getElementsByClassName('inlineContent2')[ind].style.display === "block") {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "none";
          } else {
            document.getElementsByClassName('inlineContent2')[ind].style.display = "block";
          }
        })
      })
      tashqiBajUlInline?.forEach((t) => {
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
      tashqiBajUlInline?.forEach((d) => {
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
        inlineContent2?.forEach((w) => {
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
  }, [openModal]);

  // tashqi bajaruvchilarni saqlash
  const saveAllSelectOrganizations = () => {
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
            Alert(setAlert, "warning", "Yo'nalish ichidagi barcha tashkilot tanlangan holatda, qisqacha tavsif kiritilishi majburiy, aks holda tashkilotlar tanlanmagan holatda yuboriladi");
          } else {
            result.push({ id: d.getAttribute('idredirect'), ids: arr, value: d.querySelector('.inputTashqiTash').value });
          }
        }
      } else {
        d.querySelectorAll('.idsDiv').forEach((r) => {
          if (r.checked) {
            arr.push(r.getAttribute('ids'));
          }
        });
        if (arr.length > 0) {
          result.push({ id: d.getAttribute('idredirect'), ids: arr, value: null });
        }
      }
    })
    setResults(result);
    setOpenModal(false);
  }

  return (
    <>
      <div className="col-lg-12">
        <button className="btn btn-dark col-lg-12 " onClick={() => setOpenModal(true)} ><i className="icon-plus2"></i>
          <span style={{ position: "relative" }}>
            Tashqi Bajaruvchilar
            {(results?.length > 0) && (
              <span className="badge2">{results?.length}</span>
            )}
            {(allexecutorsData.filter((d) => d.index === openBajaruvchi.index)[0]?.tashqiBajaruvchilar?.length > 0) && (
              <span className="badge2">{allexecutorsData.filter((d) => d.index === openBajaruvchi.index)[0]?.tashqiBajaruvchilar?.length}</span>
            )}
          </span>
        </button>
      </div>

      <div className={'adminWindow pt-5'} style={{ display: openModal ? "block" : "none" }}>
        <div className="kurishModalBajaruvchi">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Tashqi bajaruvchilar</h5>
              <button type="button" className="close" onClick={() => setOpenModal(false)}>&times;</button>
            </div>
            <div className="modal-body bodyModal" style={{ display: "flex", justifyContent: "center", alignItems: "start", gap: "10px" }}>
              {/* yangisi */}
              <ul className="tashqiBaj" style={{ flex: 5 }}>
                {yunalishlar.map((dt, index) => (
                  <div key={index} className="yunalishlar">
                    {/*  id={dt?.id} */}
                    <li className="tashqiBajLi1 d-flex justify-content-between"  >
                      <div className="d-flex align-items-center">
                        <i className="fas fa-minus mr-2 iconMinus" style={{ display: "none", fontSize: "13px" }}></i>
                        <i className="fas fa-plus mr-2 iconPlus" style={{ fontSize: "13px" }}></i>
                        <div className="position-relative mr-3" style={{ fontSize: "13px" }}>
                          {dt?.orgTypeName}
                        </div>
                      </div>
                      <div className={"text-white fw-bold px-1"} style={{ fontSize: '14px', borderRadius: '5px', backgroundColor: "crimson" }}>
                        {dt?.organizations?.length}
                      </div>
                    </li>
                    <div className="tashqiBajUlInline text-left" style={{ display: "none" }} idredirect={dt.id}>
                      <span className="allChecked mr-2">Barchasini tanlash</span>
                      <input type="text" className="inputTashqiTash" placeholder="Qisqacha tavsif..." defaultValue="Shahar va tuman hokimliklariga" autoFocus />
                      <br />
                      <input
                        type="text"
                        className="form-control inputChange1"
                        placeholder="Qidiruv..."
                        onChange={(e) => changeInputChange1(e.target.value, index)}
                      />
                      {dt?.organizations?.map((d, index1) => (
                        <div key={index1}>
                          <div className="inlineContent" >
                            <input
                              type="checkbox"
                              ids={d?.id}
                              className="idsDiv idsDiv1"
                            />
                            <div style={{ fontSize: "13px" }}>{d?.orgName}</div>
                          </div>
                          <div className="inlineContent2" style={{ display: "none" }}>
                            <span className="allChecked1">Barchasini tanlash</span> <br />
                            <input type="text" className="form-control inputChange2" placeholder="Qidiruv..." onChange={(e) => changeInputChange2(e.target.value, index)} />
                            {d?.organizations?.map((d1, index2) => (
                              <div key={index2} className="inlineContent3">
                                <input
                                  type="checkbox"
                                  ids={d1?.id}
                                  className="idsDiv idsDiv2"
                                />
                                <div >{d1?.orgName}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ul>
              <div className="d-flex justify-content-end" style={{ position: "sticky", top: "0px" }}>
                <button type="button" className="btn btn-primary" onClick={saveAllSelectOrganizations}>
                  <i className="fas fa-save mr-2"></i>Saqlash
                  {/* <span className='rew'>{results.length}</span> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}