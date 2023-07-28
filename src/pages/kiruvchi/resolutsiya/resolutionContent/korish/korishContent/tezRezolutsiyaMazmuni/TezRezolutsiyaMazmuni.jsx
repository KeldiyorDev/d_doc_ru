import React, { useEffect, useState } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const TezRezolutsiyaMazmuni = ({ data, currentUser, setAlert }) => {
  const [tezkorRezolutsiya, setTezkorRezolutsiya] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("fastResolution/orgAll/" + JSON.parse(localStorage.getItem('oi')))
        if (isMounted)
          setTezkorRezolutsiya(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  useEffect(() => {
    let isMounted = true;
    let rows1 = document.querySelectorAll('.tezkorRezolutsiyaRow');
    if (rows1.length > 0 && isMounted) {
      rows1.forEach((row) => {
        row.querySelector('.selectCheckbox').addEventListener('click', () => {
          if (row.querySelector('.selectCheckbox').checked) {
            if ((document.querySelector('.rezTezkor').value + row.querySelector('.rezName').textContent).length < 800) {
              document.querySelector('.rezTezkor').value += row.querySelector('.rezName').textContent + ", "
            } else {
              Alert(setAlert, "warning", "Ma`lumot 800 tadan oshib ketdi!")
            }
          } else {
            rows1.forEach((row) => {
              if (!row.querySelector('.selectCheckbox').checked) {
                document.querySelector('.rezTezkor').value = document.querySelector('.rezTezkor').value.split(row.querySelector(".rezName").textContent + ", ").join("")
              }
            })
          }
        })
      })
    }

    return () => {
      if (rows1.length > 0) {
        rows1.forEach((row) => {
          row.querySelector('.selectCheckbox').removeEventListener('click', () => {
            if (row.querySelector('.selectCheckbox').checked) {
              if ((document.querySelector('.rezTezkor').value + row.querySelector('.rezName').textContent).length < 800) {
                document.querySelector('.rezTezkor').value += row.querySelector('.rezName').textContent + ", "
              } else {
                Alert(setAlert, "warning", "Ma`lumot 800 tadan oshib ketdi!")
              }
            } else {
              rows1.forEach((row) => {
                if (!row.querySelector('.selectCheckbox').checked) {
                  document.querySelector('.rezTezkor').value = document.querySelector('.rezTezkor').value.split(row.querySelector(".rezName").textContent + ", ").join("")
                }
              })
            }
          })
        })
      }
      isMounted = false;
    }
  }, [setAlert, tezkorRezolutsiya]);

  return (
    <>
      {/* rezolutsiya mazmuni */}
      <div className="card-box">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-primary text-white header-elements-inline">
              <h6 className="card-title"
                style={{ fontWeight: "bold", textTransform: "uppercase" }}>Содержание резолюции</h6>
            </div>
            <div className="form-group form-group-floating row my-2 mx-2">
              <div className="col-lg-12">
                <div className="position-relative">
                  <textarea
                    className="form-control form-control-outline izoh rezTezkor mb-1"
                    placeholder="Placeholder "
                    style={{ height: "100px" }}
                    maxLength="800"
                    defaultValue={data[0]?.document?.resolutionContent}
                  // disabled={(e) => e.target.length > 250}
                  >
                  </textarea>
                  <label className="label-floating">Комментарий</label>
                </div>
                <span className={'text-muted'} style={{
                  fontSize: "12px",
                  color: "lightgrey",
                }}>Количество символов не должно превышать 800</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tezkor rezolutsiya */}
      <div className="card-box">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-primary text-white header-elements-inline">
              <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Быстрый
                Резолюция</h6>
            </div>
            <div className="card-body">
              <table
                className="table table-bordered datatable-select-single table-striped table-hover Tab">
                <tbody>
                  {tezkorRezolutsiya?.length > 0 && tezkorRezolutsiya?.map((dat, index) => (
                    <tr key={index} className="tezkorRezolutsiyaRow">
                      <td style={{ width: "5%" }}>
                        <input type="checkbox"
                          style={{ width: "30px", height: "20px" }}
                          className="selectCheckbox"
                          defaultChecked={data?.resolutionContent?.includes(dat?.name)}
                        />
                      </td>
                      <td style={{ width: "95%" }} className="rezName">{dat?.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(TezRezolutsiyaMazmuni);