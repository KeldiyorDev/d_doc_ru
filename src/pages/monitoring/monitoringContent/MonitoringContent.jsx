import React from "react";
import NavbarContentMonitoring from "../navbarContentMonitoring/NavbarContentMonitoring";

const MonitoringContent = ({ currentUser }) => {

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Отчеты</h3>
      <div className="card-body pt-1">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <table className="table table-bordered  table-striped table-hover Tab">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "20%" }}>Отделение</th>
                      <th style={{ width: "25%" }}>Все</th>
                      <th style={{ width: "30%" }}>Входящий</th>
                      <th style={{ width: "15%" }}>Исходящий</th>
                      <th style={{ width: "5%" }} className="text-center">Команда</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>1</td>
                      <td>
                      «Центр развития информационно-коммуникационных технологий» при Правительстве Бухарской области
                      </td>
                      <td>8</td>
                      <td>7</td>
                      <td>1</td>
                      <td>8</td>
                    </tr>
                    <tr className="text-center">
                      <td>2</td>
                      <td>
                      «Центр развития информационно-коммуникационных технологий» при Правительстве Бухарской области
                      </td>
                      <td>8</td>
                      <td>7</td>
                      <td>1</td>
                      <td>8</td>
                    </tr>
                    <tr className="text-center">
                      <td>3</td>
                      <td>
                      «Центр развития информационно-коммуникационных технологий» при Правительстве Бухарской области
                      </td>
                      <td>8</td>
                      <td>7</td>
                      <td>1</td>
                      <td>8</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MonitoringContent);