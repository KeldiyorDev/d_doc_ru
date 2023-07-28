import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../../../config";

const TezRezolutsiyaMazIjro = ({ data, ranks, params, visibleIconIjro, currentUser }) => {
  const [tezkorRezolutsiya, setTezkorRezolutsiya] = useState([]);

  // tezkor rezolutsiyani o'qib olish
  useEffect(() => {
    let isMounted = true;
    // tooltip ni o'chirish
    document.querySelector('.tooltip')?.remove();

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

  //tezkor rezolutsiya
  useEffect(() => {
    let isMounted = true;
    let rows1 = document.querySelectorAll('.tezkorRezolutsiyaRow');
    if (rows1.length > 0 && isMounted) {
      rows1.forEach((row) => {
        row.querySelector('.selectCheckbox').addEventListener('click', () => {
          if (row.querySelector('.selectCheckbox').checked) {
            document.querySelector('.izoh').value += row.querySelector('.rezName').textContent + ", "
          } else {
            rows1.forEach((row) => {
              if (!row.querySelector('.selectCheckbox').checked) {
                document.querySelector('.izoh').value = document.querySelector('.izoh').value.split(row.querySelector(".rezName").textContent + ", ").join("")
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
              document.querySelector('.izoh').value += row.querySelector('.rezName').textContent + ", "
            } else {
              rows1.forEach((row) => {
                if (!row.querySelector('.selectCheckbox').checked) {
                  document.querySelector('.izoh').value = document.querySelector('.izoh').value.split(row.querySelector(".rezName").textContent + ", ").join("")
                }
              })
            }
          })
        })
      }
      isMounted = false;
    }
  }, [tezkorRezolutsiya]);

  return (
    <>
      {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && !visibleIconIjro && params.name !== "nazoratdanOlish") && (
        <div className="card-box" style={{ display: ((params.name === "bajarish" || params.name === "umumlashtiruvchi" || params.name === "bajarilmagan" || params.name === "radEtilgan" || params.name === "nazorat") && (data?.hasPermissionForDirect)) ? "block" : "none" }}>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header bg-primary text-white header-elements-inline">
                <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Содержание резолюции</h6>
              </div>
              <div className="form-group form-group-floating row my-2 mx-2">
                <div className="col-lg-12">
                  <div className="position-relative">
                    <textarea
                      className="form-control form-control-outline izoh"
                      placeholder="Placeholder "
                      style={{ height: "100px" }}
                      maxLength="300"
                    // defaultValue={data?.document?.resolutionContent}
                    >
                    </textarea>
                    <label className="label-floating">Комментарий</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* tezkor rezolutsiya */}
      {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && !visibleIconIjro && params.name !== "nazoratdanOlish") && (
        <div className="card-box" style={{ display: ((params.name === "bajarish" || params.name === "umumlashtiruvchi" || params.name === "bajarilmagan" || params.name === "radEtilgan" || params.name === "nazorat") && (data?.hasPermissionForDirect)) ? "block" : "none" }}>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header bg-primary text-white header-elements-inline">
                <h6 className="card-title"
                  style={{ fontWeight: "bold", textTransform: "upperCase" }}>Быстрое резолюция</h6>
              </div>
              <div className="card-body">
                <table className="table table-bordered datatable-select-single table-striped table-hover Tab">
                  <tbody>
                    {tezkorRezolutsiya.length > 0 && tezkorRezolutsiya.map((dat, index) => (
                      <tr key={index} className="tezkorRezolutsiyaRow">
                        <td style={{ width: "5%" }}>
                          <input type="checkbox" style={{ width: "30px", height: "20px" }} className="selectCheckbox" />
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
      )}
    </>
  )
}

export default React.memo(TezRezolutsiyaMazIjro);