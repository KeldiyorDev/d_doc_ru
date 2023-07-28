import React from "react";

export default function ModulSozlamalariContent({ currentUser }) {

    const myfun = () => {
        let chk = document.getElementById('kiruvchi')
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
        let chk = document.getElementById('chiquvchi')
        let txt = document.getElementById('chiquvchii')
        if (chk.checked) {
            alert("Вы хотите включить эту функцию?")
            txt.innerHTML = "<p>Включено</p>"
        } else {
            alert("Вы хотите отключить эту функцию?")
            txt.innerHTML = "<p style='color:red'>O'chirilgan</p>"
        }
    }

    return (
        <div className="content">
            <h1 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase;" }}>Настройки модуля</h1>
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <li className="nav-item"><a href="./deteilHokimlik.html" className="nav-link  ml-2" ><i className="icon-office"></i> Структура организации</a></li>
                    <li className="nav-item"><a href="./adminstartor.html" className="nav-link"><i className="icon-user-tie"></i> Администратор</a></li>
                    <li className="nav-item"><a href="./modulSozlamalari.html" className="nav-link NavLinkLi"><i className="icon-stack2"></i> Настройка модулей</a></li>
                    <li className="nav-item"><span className="nav-link "><i className="icon-newspaper"></i> Входные данные</span></li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{ padding: "30px;" }}>
                                <table className="table mt-2 table-bordered table-striped table-hover Tab" >
                                    <thead>
                                        <tr className="bg-dark text-white NavLink text-center">
                                            <th style={{ width: "5%;", borderRadius: "10px 0 0 0" }}>№</th>
                                            <th style={{ width: "45%" }}>Документ</th>
                                            <th style={{ width: "40%" }}>Положение</th>
                                            <th style={{ width: "5%" }}>Настройки</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="1" />
                                            </td>
                                            <td>Входящий документ</td>
                                            <td id="context" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun} id="kiruvchi" defaultChecked />
                                                    <label className="custom-control-label" for="kiruvchi"></label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="2" />
                                            </td>
                                            <td>Исходящий документ</td>
                                            <td id="chiquvchii" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                                                    <label className="custom-control-label" for="chiquvchi"></label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="3" />

                                            </td>
                                            <td>Обращение граждан</td>
                                            <td id="chiquvchii" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                                                    <label className="custom-control-label" for="chiquvchi"></label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="4" />
                                            </td>
                                            <td>Решение</td>
                                            <td id="chiquvchii" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                                                    <label className="custom-control-label" for="chiquvchi"></label>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="5" />
                                            </td>
                                            <td>Заказ</td>
                                            <td id="chiquvchii" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                                                    <label className="custom-control-label" for="chiquvchi"></label>
                                                </div>
                                            </td>

                                        </tr>
                                        <tr style={{ fontSize: "15px;" }}>
                                            <td>
                                                <input type="number" style={{ border: "none", backgroundColor: "transparent", outline: "none", width: "60%" }} value="6" />
                                            </td>
                                            <td>Команда</td>
                                            <td id="chiquvchii" className="text-center"><p>Включено</p></td>
                                            <td>
                                                <div style={{ height: "40px" }} className="custom-control d-flex align-items-center  justify-content-center custom-switch custom-control-inline">
                                                    <input type="checkbox" className="custom-control-input" onClick={myfun2} id="chiquvchi" defaultChecked />
                                                    <label className="custom-control-label" for="chiquvchi"></label>
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