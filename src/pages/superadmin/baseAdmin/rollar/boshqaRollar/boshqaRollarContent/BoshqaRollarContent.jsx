import React from "react";
import RollarNavbar from "../../rollarNavbar/RollarNavbar";

const BoshqaRollarContent = ({ currentUser }) => {
  const myfun = () => {
    let chk = document.getElementById('Входящий')
    let txt = document.getElementById('context')
    if (chk.checked) {
      alert("Вы хотите включить эту функцию?")
      txt.innerHTML = "<p>Включено</p>"
    } else {
      alert("Вы хотите отключить эту функцию?")
      txt.innerHTML = "<p style='color:red'>Выключенный</p>"
    }
  }

  const myfun2 = () => {
    let chk = document.getElementById('исходящий')
    let txt = document.getElementById('исходящий')
    if (chk.checked) {
      alert("Вы хотите включить эту функцию?")
      txt.innerHTML = "<p>Включено</p>"
    } else {
      alert("Вы хотите отключить эту функцию?") 
      txt.innerHTML = "<p style='color:red'>Выключенный</p>"
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Роли</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <RollarNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <table className="table mt-2 table-bordered table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%", borderRadius: "10px 0 0 0" }}>№</th>
                      <th style={{ width: "45%" }}>Документ</th>
                      <th style={{ width: "40%" }}>Положение</th>
                      <th style={{ width: "5%" }}>Настройки</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="1" />
                      </td>
                      <td>Входящий документ</td>
                      <td id="context" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun} id="kiruvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="kiruvchi"></label>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="2" />
                      </td>
                      <td>Исходящий документ</td>
                      <td id="chiquvchi" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="chiquvchi"></label>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="3" />
                      </td>
                      <td>Обращение граждан</td>
                      <td id="chiquvchi" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="chiquvchi"></label>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="4" />
                      </td>
                      <td>Решение</td>
                      <td id="chiquvchi" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="chiquvchi"></label>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="5" />
                      </td>
                      <td>Заказ</td>
                      <td id="chiquvchi" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="chiquvchi"></label>
                        </div>
                      </td>
                    </tr>
                    <tr style={{ fontSize: "15px" }}>
                      <td>
                        <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} defaultValue="6" />
                      </td>
                      <td>Команда</td>
                      <td id="chiquvchi" className="text-center"><p>Включено</p></td>
                      <td>
                        <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                          <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                          <label className="custom-control-label" htmlFor="chiquvchi"></label>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- end admins --> */}
                {/* <!-- <button className="btn btn-primary mt-2"><i className="icon-plus2"></i> Saqlash</button> --> */}
              </div>
            </div>
            {/* <!-- end Table Components --> */}
          </div>
        </div>

      </div>
    </div >
  )
}

export default React.memo(BoshqaRollarContent);