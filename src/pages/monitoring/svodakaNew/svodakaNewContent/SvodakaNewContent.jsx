import React from "react";
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";

const SvodakaNewContent = () => {

  const exportF = (e) => {
    console.log("salom");
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Новая сводка</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label className="from-control">Дата начала</label>
                    <input className="form-control" type="date" name="date" />
                  </div>
                  <div className="col-lg-6">
                    <label className="from-control">Oxirgi sana</label>
                    <input className="form-control" type="date" name="date" />
                  </div>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <button type="submit" className="btn btn-primary">Yaratish</button>
                  <div className="btn-group justify-content-center mx-2">
                    <span className="btn btn-indigo dropdown-toggle" data-toggle="dropdown">Export</span>
                    <div className="dropdown-menu">
                      <span className="dropdown-item">PDF</span>
                      <span id="downloadLink" onClick={() => exportF(this)} className="dropdown-item">EXCEL</span>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginLeft: "37%", width: "100%" }}>
                    <select className="form-control select-search">
                      <optgroup label="Nazorat Kartochkasi">
                        <option value="AZ">Все</option>
                        <option value="AZ">1a контрольная карта </option>
                        <option value="CO">1b контрольная карта</option>
                        <option value="ID">2a контрольная карта</option>
                        <option value="WY">2b контрольная карта</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                  <table style={{ borderCollapse: "collapse" }} className="table table-bordered table-striped table-hover Tab">
                    <tr>
                      <td width="47" rowspan="5" className="b-color" style={{ textAlign: "center" }}>№ 1 </td>
                      <td width="480" rowspan="5" className="b-color" style={{ textAlign: "center" }}>Секретариаты</td>
                      <td width="135" rowspan="3" className="b-color" style={{ textAlign: "center" }}>Всего входящих документов </td>
                      <td width="1796" colspan="24" bgcolor="white" style={{ textAlign: "center", fontWeight: "700" }}>Из этого</td>
                    </tr>
                    <tr>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>Документы от ведущих организаций</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>В % от общего </td>
                      <td width="580" colspan="10" bgcolor="white" style={{ textAlign: "center", fontWeight: "700" }}>Включая</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>Документы от других организаций</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>В % от общего </td>
                      <td width="580" colspan="10" bgcolor="white" style={{ textAlign: "center", fontWeight: "700" }}>Включая</td>
                    </tr>
                    <tr>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Документы, полученные Президентом Республики Узбекистан</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Документы Кабинета Министров Республики Узбекистан</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Документы Сената Олий Мажлиса Республики Узбекистан</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Документы Законодательной палаты Олий Мажлиса Республики Узбекистан</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Ўзбекистон Республикаси Вазирлар Маҳкамаси ҳужжатлари</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Республиканские организации</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Региональные организации</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Районные (городские) администрации</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Документы, поступающие из-за границы</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>Другие</td>
                    </tr>
                    <tr>
                      <td width="135" rowspan="2" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>1</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>2</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>3</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>4</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>5</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="159" rowspan="2" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>1</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>2</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>3</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>4</td>
                      <td width="116" colspan="2" className="b-color" style={{ textAlign: "center" }}>5</td>
                    </tr>
                    <tr>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>Число</td>
                      <td width="58" className="b-color" style={{ textAlign: "center" }}>%</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SvodakaNewContent);