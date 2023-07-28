import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { axiosInstance } from "../../../../../../../config";
import AlertContent, { Alert } from "../../../../../../../component/alert/Alert";
import AdminElektronKitobNavbar from "../../../adminElektronKitobNavbar/AdminElektronKitobNavbar";
let data = [
  {
    id: 1,
    hujjatTuri: "CHIQUVCHI1",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 2,
    hujjatTuri: "CHIQUVCHI2",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 3,
    hujjatTuri: "CHIQUVCHI3",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 4,
    hujjatTuri: "CHIQUVCHI4",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 5,
    hujjatTuri: "CHIQUVCHI5",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 6,
    hujjatTuri: "CHIQUVCHI6",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 7,
    hujjatTuri: "CHIQUVCHI7",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 8,
    hujjatTuri: "CHIQUVCHI8",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022"
  },
  {
    id: 9,
    hujjatTuri: "CHIQUVCHI9",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022",
    harakatlar: ""
  },
  {
    id: 10,
    hujjatTuri: "CHIQUVCHI10",
    korrespondent: "O'zbekiston Respublikasi Prezidenti",
    malumot: "'Ўзбекистон Республикаси Адлия вазирлигининг хатида (2021 йил 28 июнь № 8/5-1/3239-сонли) илова илинган Ўзбекистон Республикаси Президенти Фармони ва қарори лойиҳалари комплекслар бўлинмаларида муҳокама қилинсин ҳамда кенг жамоатчиликка етказилиши таъминлансин. Б.Норбоевга Ташкиллаштириш ва назорат учун.'",
    date: "7.05.2022"
  }
];
const AdminArxivKurishContent = ({ currentUser }) => {
  const params = useParams();
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const history = useHistory();

  // pagination
  useEffect(() => {
    let isMounted = true;
    document.querySelector('.tooltip')?.remove();
    if (isMounted) {
      // setCurrentItems(data.slice(itemOffset, endOffset));
      // setPageCount(Math.ceil(data.length / itemsPerPage));
    }

    return () => {
      isMounted = false;
    }
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    // const newOffset = (event.selected * itemsPerPage) % data.length;
    // setItemOffset(newOffset);
  };

  // id orqali jurnalni o'qib olish
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await axiosInstance.get("journal/" + params.id)
        if (isMounted) {
          document.querySelector('.uzbekchaNomi').textContent = res.data?.uzName;
          document.querySelector('.ruschaNomi').textContent = res.data?.ruName;
          document.querySelector('.tasnif').textContent = res.data?.shortDescription;
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  const openArchive = async () => {
    try {
      await axiosInstance.patch("journal/unArchive/" + params.id, {})
      Alert(setAlert, "success", "Jurnal arxivdan chiqarildi");
      history.push("/super_admin_elektron-kitob-faollar");
    } catch (error) {
      Alert(setAlert, "warning", error?.response?.data);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminElektronKitobNavbar />

          <li className="nav-item">
            <NavLink to={`/super_admin_elektron-kitob-arxiv-ko'rish/${params.id}`} className="nav-link align-items-center" activeClassName="NavLinkLi">
              <i className="icon-eye2 mr-1"></i> Видеть
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <div className="col-lg-12 px-0">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-title bg-dark text-light text-center px-0 mb-0">
                          <h1>Информация</h1>
                        </div>
                        <div className="card-body">
                          <table className="table mt-2 table-bordered table-striped table-hover Tab" >
                            <tbody>
                              <tr style={{ height: "66px" }}>
                                <td>Узбекское имя:</td>
                                <td className="uzbekchaNomi">Обращение граждан</td>
                              </tr>
                              <tr style={{ height: "66px" }}>
                                <td>русское имя:</td>
                                <td className="ruschaNomi">Заявление гражданина</td>
                              </tr>
                              <tr style={{ height: "66px" }}>
                                <td>Краткая классификация:</td>
                                <td className="tasnif">Гражданские апелляции</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card">
                        <div className="card-title bg-dark text-light text-center px-0 mb-0">
                          <h1>Управление журналом</h1>
                        </div>
                        <div className="card-body">
                          <table className="table mt-2 table-bordered table-striped table-hover Tab" >
                            <tbody>
                              <tr className="text-center">
                                <td style={{ height: "67px" }}>
                                  &nbsp;
                                </td>
                              </tr>
                              <tr className="text-center">
                                <td>
                                  <button className="btn btn-primary" onClick={openArchive}>Разархивировать</button>
                                </td>
                              </tr>
                              <tr className="text-center">
                                <td>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">Экспорт</button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <span className="dropdown-item"><i className="icon-menu7"></i> EXCEL</span>
                                      <span className="dropdown-item"><i className="icon-screen-full"></i> PDF</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* pagination */}
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={1}
                  previousLabel="<<"
                  renderOnZeroPageCount={null}
                  className="paginationUL"
                  activeClassName="active"
                // forcePage={selected}
                />
                <table className="table table-bordered table-striped table-hover Tab mt-2" data-paging="true" id="myTable">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "10%" }}>Файл</th>
                      <th style={{ width: "20%" }}>Корреспондент</th>
                      <th style={{ width: "25%" }}>Краткая информация</th>
                      <th style={{ width: "15%" }}>Рег. № / Срок</th>
                      <th style={{ width: "20%" }}>Исполнительный</th>
                      <th style={{ width: "5%" }} className="text-center">Действия</th>
                    </tr>
                  </thead>
                  <tbody id="data">
                    <>
                      {data?.length > 0 && data.map((dat, index) => (
                        <tr key={index}>
                          <td className="text-center id">{dat.id}</td>
                          <td className="text-color Fayl">{dat.hujjatTuri}</td>
                          <td className="korres">Президент Республики Узбекистан</td>
                          {/* <!-- so'zlar 200ta chiqadi --> */}
                          <td style={{ textAlign: "justify" }} className="qisqacha">
                            {dat.malumot}
                          </td>
                          <td className="text-center chiquvchi reg">
                            <div className="badge badge-primary">№ 25</div>
                            <hr />
                            {dat.date}
                          </td>
                          <td className="text-center ijrochi">
                            <p style={{ margin: "0", borderBottomStyle: "dashed", borderColor: "#ddd", paddingBottom: "20px" }}>Д. Содиков
                              <span className="badge badge-danger ml-1">Не выполнено</span>
                            </p>
                            <p style={{ margin: "0", paddingTop: "20px" }}>Д. Содиков
                              <span className="badge badge-primary ml-1">Сделанный</span>
                            </p>
                          </td>
                          <td className="harakat">
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
                <ul id="pagin">
                </ul>
              </div>
            </div>

            {/* alert content */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div >
  )
}

export default React.memo(AdminArxivKurishContent);