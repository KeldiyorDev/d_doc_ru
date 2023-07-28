import React from "react";

const BaseAdminContent = () => {
  return (
    <div className="content mb-5">
      <div className="row" style={{ margin: "5px 5px" }}>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
          <div className="card cardHome h-100 ">
            <div className="card-header header-elements-inline bg-primary h-25">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">Мои 
              обязанности</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped table-hover table-responsive">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Barchasi</a> */}
                      Все
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      125</th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Yangi</a> */}
                      Новый
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      20</th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Jarayonda</a> */}
                      В прогресси
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      20</th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Nazoratda</a> */}
                      Под контролем
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      10</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
          <div className="card cardHome h-100 ">
            <div className="card-header header-elements-inline bg-primary h-25">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              приближается</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Barchasi</a> */}
                      Все
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">1 kun qoldi</a> */}
                       Остался 1 день
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">2-3 kun qoldi</a> */}
                      Осталось 2-3 дня
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                    Осталось 4 (~) дня
                      {/* <a href="#">4 (~) kun qoldi</a> */}
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
          <div className="card cardHome h-100 ">
            <div className="card-header header-elements-inline bg-primary h-25">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              Не выполнено</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Barchasi</a> */}
                      Все
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>7
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">1 kun kechikkan</a> */}
                      опоздание на 1 день
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">2-3 kun kechikkan</a> */}
                      Опоздание на 2-3 дня
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>0
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">4 (~) kun kechikkan</a> */}
                      Опоздание на 4 (~) дня
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>7
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mb-3">
          <div className="card cardHome h-100 ">
            <div className="card-header header-elements-inline bg-primary h-25">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              Сделанный</h4>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Barchasi</a> */}
                      Все
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>4
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Bajarilgan</a> */}
                      Сделанный
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>4
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Kechiktirib berilgan</a> */}
                      Отправлено с опозданием
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>4
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      {/* <a href="#">Bajarilmagan</a> */}
                      Не выполнено
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>4
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- head card end -->
        <!-- header tabs --> */}

      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title" style={{ margin: "10px", fontWeight: "bold", textTransform: "uppercase" }}>
            Статистика рабочего процесса</h6>
          </div>

          <div className="card-body">
            <ul className="nav nav-pills nav-pills-bordered  nav-pills-toolbar nav-justified">
              <li className="nav-item"><a href="#solid-justified-tab1" className="nav-link active"
                data-toggle="tab">3b Контрольная карта</a></li>
              <li className="nav-item"><a href="#solid-justified-tab2" className="nav-link"
                data-toggle="tab">Стандартная простая карта</a></li>
              <li className="nav-item"><a href="#solid-justified-tab3" className="nav-link"
                data-toggle="tab">1a Контрольная карта</a></li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="solid-justified-tab1">
                <table className="table table-bordered datatable-select-single table-striped table-hover Tab mt-4">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ borderRadius: "10px 0 0 0" }}>Тип документа</th>
                      <th>поздно</th>
                      <th>Входящий</th>
                      <th>В процесси</th>
                      <th>Истекший</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>Задачи губернатора области</td>
                      <td></td>
                      <td>0</td>
                      <td>4</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div className="tab-pane fade" id="solid-justified-tab2">
                <table className="table table-bordered datatable-select-single table-striped table-hover Tab mt-4">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ borderRadius: "10px 0 0 0" }}>Xujjat Turi</th>
                      <th>Поздно</th>
                      <th>Входящий</th>
                      <th>В процесси</th>
                      <th>Истекший</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>Республиканские организации</td>
                      <td></td>
                      <td>0</td>
                      <td>4</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="tab-pane fade" id="solid-justified-tab3">
                <table className="table table-bordered datatable-select-single table-striped table-hover Tab mt-4">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ borderRadius: "10px 0 0 0" }}>тип документа</th>
                      <th>Поздно</th>
                      <th>Входящий</th>
                      <th>В процесси</th>
                      <th>Истекший</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>Постановление Президента Республики Узбекистан</td>
                      <td></td>
                      <td>0</td>
                      <td>4</td>
                      <td>0</td>
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

export default React.memo(BaseAdminContent);