import React from "react";
import './testContent.css';
import NavbarContentMonitoring from "../../navbarContentMonitoring/NavbarContentMonitoring";

export default function TestContent() {
  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Test</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarContentMonitoring />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <div className="content" style={{ overflow: "auto" }}>
                  <table border="1" className="table table-bordered table-striped table-hover Tab mb-2 table-responsive" style={{ borderCollapse: "collapse" }}>
                    <thead className="text-center">
                      <tr style={{ backgroundColor: "#DDEBF7" }}>
                        <th width="2%" rowSpan={5}>№</th>
                        <th width="20%" rowSpan={5}>Котибиятлар</th>
                        <th width="6%" rowSpan={3}>Жами тушган ҳужжатлар</th>
                        <th colSpan={24}>SHUNDAN</th>
                      </tr>
                      <tr style={{ backgroundColor: "#DDEBF7" }}>
                        <th width="7%" rowSpan={2}>Юқори ташкилотлардан келган хужжатлар</th>
                        <th width="5%" rowSpan={2}>Жамига нисбатан % ҳисобида</th>
                        <th width="35%" colSpan={10}>Шу жумладар</th>
                        <th width="7%" rowSpan={2}>Бошқа ташкилотлардан келган хужжатлар</th>
                        <th width="5%" rowSpan={2}>Жамига нисбатан % ҳисобида</th>
                        <th colSpan={10}>Шу жумладар</th>
                      </tr>
                      <tr style={{ backgroundColor: "#DDEBF7" }}>
                        <th colSpan={2} width="7%">Ўзбекистон Республикаси Президенти</th>
                        <th colSpan={2} width="7%">Ўзбекистон Республикаси Олий Мажлисининг қўшма топшириқлари</th>
                        <th colSpan={2} width="7%">Ўзбекистон Республикаси Олий Мажлис Сенати Сенаторининг топшириқлари</th>
                        <th colSpan={2} width="7%">Ўзбекистон Республикаси Олий мажлис Қонунчилик Палатасининг топшириқлари</th>
                        <th colSpan={2} width="7%">Ўзбекистон Республикаси Вазирлар Маҳкамасининг топшириқлари</th>
                        <th colSpan={2} width="7%">Республика ташкилотлари</th>
                        <th colSpan={2} width="7%">Вилоят ташкилотлари</th>
                        <th colSpan={2} width="7%">Туман (шаҳар) ҳокимликлари</th>
                        <th colSpan={2} width="7%">Чет эллардан келадиган хужжатлар</th>
                        <th colSpan={2} width="7%">Бошқалар</th>
                      </tr>
                      <tr style={{ backgroundColor: "#DDEBF7" }}>
                        <th rowSpan={2} >Сони</th>
                        <th rowSpan={2}>Сони</th>
                        <th rowSpan={2}>%</th>
                        <th colSpan={2}>1</th>
                        <th colSpan={2} >9</th>
                        <th colSpan={2}>25</th>
                        <th colSpan={2}>26</th>
                        <th colSpan={2}>37</th>
                        <th rowSpan={2}>Сони</th>
                        <th rowSpan={2}>%</th>
                        <th colSpan={2}>55</th>
                        <th colSpan={2}>56</th>
                        <th colSpan={2}>57</th>
                        <th colSpan={2}>58</th>
                        <th colSpan={2}>60</th>
                      </tr>
                      <tr style={{ backgroundColor: "#DDEBF7" }}>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                        <th>Сони</th>
                        <th>%</th>
                      </tr>
                    </thead>
                    <tbody className="js-table-sections-header">
                      <tr style={{ textAlign: "center" }}>
                        <td style={{ textAlign: "center" }}>1</td>
                        <td ><strong>Бухоро вилоят ҳокимлиги ҳузуридаги
                          &quot;Ахборот-коммуникация технологияларини
                          ривожлантириш маркази&quot; ДУК</strong></td>
                        <td>1</td>
                        <td>0</td>
                        <td>0%</td>
                        <td>0</td>
                        <td>0%</td>
                        <td>0</td>
                        <td>0%</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>2</td>
                        <td width="480"><strong>Ахборот тизимлари ва ресурсларини жорий
                          этиш ва ривожлантириш бўлими</strong></td>
                        <td width="159">8</td>
                        <td width="159">3</td>
                        <td width="159">37%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>3</td>
                        <td width="480"><strong>Электрон ҳамкорликни ривожлантириш
                          бўлими</strong></td>
                        <td width="159">11</td>
                        <td width="159">3</td>
                        <td width="159">27%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>4</td>
                        <td width="480"><strong>Ахборот хавфсизлигини таъминлаш
                          бўлими</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>6</td>
                        <td width="480"><strong>Ўқув бўлими</strong></td>
                        <td width="159">8</td>
                        <td width="159">5</td>
                        <td width="159">62%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>7</td>
                        <td width="480"><strong>Маҳаллий бўлинма</strong></td>
                        <td width="159">1</td>
                        <td width="159">1</td>
                        <td width="159">100%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>5</td>
                        <td width="480"><strong>Техник кузатув бўлими</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>8</td>
                        <td width="480"><strong>Молия-иқтисодиёт ва камбағалликни
                          қисқартириш масалалари бўйича</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>9</td>
                        <td width="480"><strong>Молия­иқтисодиёт ва камбағалликни
                          қисқартириш масалалари бўйича</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>10</td>
                        <td width="480"><strong>Инвестициялар ва ташқи савдо масалалари
                          бўйича</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td width="15" style={{ textAlign: "center" }}>11</td>
                        <td width="480"><strong>Ўқув бўлими</strong></td>
                        <td width="159">0</td>
                        <td width="159">0</td>
                        <td width="159">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">0</td>
                        <td width="58">0%</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="159">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                        <td width="58">&nbsp;</td>
                      </tr>
                    </tbody>
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