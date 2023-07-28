import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import AlertContent, { Alert } from '../../../component/alert/Alert';
import { axiosInstance, axiosInstanceKadr } from '../../../config';
import BirthDate from './birthDate/BirthDate';
import Calendar from './calendar/Calendar';
// import TableContent from './TableContent';
import './homeContent.css';

const HomeContent = ({ currentUser, ranks }) => {
  const [count1, setCount1] = useState({
    bajarilgan: 0,
    bajarilmagan: 0,
    bajarishUchun: 0,
    malumotUchun: 0,
    nazoratda: 0,
    nazoratdanOlish: 0,
    radEtilgan: 0,
    rezalutsiya: 0,
    umumlashtiruvchi: 0,
    yangi: 0
  });
  const [count, setCount] = useState({});
  const [maxsusNazoratCount, setMaxsusNazoratCount] = useState(0)
  const [maxsusNazoratdanOlishCount, setMaxsusNazoratdanOlishCount] = useState(0)
  const [kadr, setKadr] = useState([])

  const [alert, setAlert] = useState({ open: false, text: "", color: "" });


  // state
  const location = useLocation()

  useEffect(() => {
    if (location?.state?.data === "not_found") {
      Alert(setAlert, 'warning', "Sizda hali hujjat mavjud emas!");
    }
  }, [location])

  // count
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("monitoring/personal/" + JSON.parse(localStorage.getItem('ids')))
        // console.log(res.data);
        if (isMounted)
          setCount1(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // Maxsus nazorat count
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("superVisor/getCount/" + JSON.parse(localStorage.getItem('ids')))
        // console.log(res.data);
        if (isMounted)
          setMaxsusNazoratCount(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // Nazoratdan olish count
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("superVisor/getCountInProcess/" + JSON.parse(localStorage.getItem('ids')))
        // console.log(res.data);
        if (isMounted)
          setMaxsusNazoratdanOlishCount(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // main page
  useEffect(() => {
    let isMounted = true;

    try {
      const getData = async () => {
        const res = await axiosInstance.get("/mainPage/taskCount/" + Number(localStorage.getItem('ids')))
        // console.log(res.data)
        if (isMounted)
          setCount(res.data);
      }
      getData();
    } catch (error) {
      console.log(error.response);
    }

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // tug'ilgan kunlarni o'qib olish
  useEffect(() => {
    let isMounted = true;

    try {
      const getData = async () => {
        const res = await axiosInstanceKadr.get("birthDate/" + Number(localStorage.getItem('oi')))
        console.log(res.data)
        if (isMounted)
          setKadr(res.data);
      }
      getData();
    } catch (error) {
      console.log(error.response);
    }

    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <div className="content content-mobile mb-5 mainPage">
      {(ranks.includes(1) || ranks.includes(2) || ranks.includes(3)) && (
        <div className="row pt-3 px-0 mb-2">
          {count1.rezalutsiya !== 0 && (
            <div className='col-lg-2 mb-2'>
              <NavLink to="/kiruvchi/resolution" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-user-plus mr-1 sx-none"></i>Резолюция
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.rezalutsiya}</span>
            </div>
          )}

          {maxsusNazoratCount !== 0 && (
            <div className='col-lg-2 mb-2'>
              <NavLink to="/kiruvchi/maxsusNazorat" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-laptop mr-1 sx-none"></i> Специальный контроль
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{maxsusNazoratCount}</span>
            </div>
          )}

          {count1.nazoratdanOlish !== 0 && (
            <div className='col-lg-2 mb-2'>
              <NavLink to="/kiruvchi/nazoratdan-olish" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-check mr-1 sx-none"></i> Взять под контроль
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.nazoratdanOlish}</span>
            </div>
          )}

          {count1.bajarishUchun !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/bajarish" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-pen mr-1 sx-none"></i> Для выполнения
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.bajarishUchun}</span>
            </div>
          )}

          {count1.umumlashtiruvchi !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/umumlashtiruvchi" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-laptop mr-1 sx-none"></i> Генерализатор
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.umumlashtiruvchi}</span>
            </div>
          )}

          {count1.malumotUchun !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/ma'lumot-uchun" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-laptop mr-1 sx-none"></i> Для справки
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.malumotUchun}</span>
            </div>
          )}

          {count1.bajarilmagan !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/kechiktirilgan" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-calendar mr-1 sx-none"></i> Не выполнено
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.bajarilmagan}</span>
            </div>
          )}

          {count1.radEtilgan !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/radetilgan" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-stack-cancel mr-1 sx-none"></i> Отклоненный
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.radEtilgan}</span>
            </div>
          )}

          {count1.bajarilgan !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/bajarilgan" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-check mr-1 sx-none"></i> Сделанный
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{count1.bajarilgan}</span>
            </div>
          )}

          {maxsusNazoratdanOlishCount !== 0 && (
            <div className="col-lg-2 mb-2">
              <NavLink to="/kiruvchi/maxsusNazoratdanOlish" className="nav-link btn btn-primary" activeClassName='NavLinkLi'>
                <i className="icon-check mr-1 sx-none"></i> Специальная инспекция
              </NavLink>
              <span className="badge1 px-1" style={{ right: "13px", top: "-5px" }}>{maxsusNazoratdanOlishCount}</span>
            </div>
          )}
        </div>
      )}

      {/* <h3 className='px-2 pb-2' style={{ fontWeight: "bold", textTransform: "upperCase" }}>Korxona bo‘yich barcha hujjatlar statistikasi</h3> */}

      <div className="row p-0 px-1 mt-2">
        <div className="col-lg-3 px-1"  >
          <div className="card cardHome">
            <div className="card-header header-elements-inline bg-primary">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">Мои задачи</h4>
            </div>
            <div className="card-body card-body-mobile">
              <table className="table table-bordered table-striped table-hover table-responsive">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/vazifalar_barchasi">
                      Все
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.allMyTask}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/vazifalar_yangi">
                      Новый
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.newTaskCount}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/vazifalar_jarayonda">
                      В Процесси
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.inProcessTaskCount}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/vazifalar_nazoratda">
                      Под контролем
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.inControlTaskCount}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-3 px-1">
          <div className="card cardHome">
            <div className="card-header header-elements-inline bg-primary">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              Приближается</h4>
            </div>

            <div className="card-body card-body-mobile">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/yaqinlashmoqda_barchasi">
                      Все
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.allNear}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/yaqinlashmoqda_1kun-qoldi">
                      Остался 1 день
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.remainOneDayTask}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/yaqinlashmoqda_2-3kun-qoldi">
                      Осталось 2-3 дня
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.remainTwoThreeDayTask}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/yaqinlashmoqda_4~kun-qoldi">
                      Осталось 4 (~) дня
                      </Link>
                    </th>
                    <th className="TableLink"
                      style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.remainMoreThanFourTask}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-3 px-1">
          <div className="card cardHome">
            <div className="card-header header-elements-inline bg-primary">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              Не выполнено</h4>
            </div>

            <div className="card-body card-body-mobile">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilmagan_barchasi">
                      Все
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.allLate}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilmagan_1kun-kechikkan">
                      Опоздание на 1 день
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.lateOneDayTask}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilmagan_2-3kun-kechikkan">
                      Опоздание на 2-3 дня
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.lateTwoThreeDayTask}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilmagan_4~kun-kechikkan">
                      Опоздание на 4 (~) дня
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.lateMoreThanFourDayTask}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-lg-3 px-1">
          <div className="card cardHome">
            <div className="card-header header-elements-inline bg-primary">
              <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">
              Сделанный</h4>
            </div>

            <div className="card-body card-body-mobile">
              <table className="table table-bordered table-striped table-hover Tab">
                <tbody className='border-0'>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilgan_barchasi">
                      Все
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.allDone}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilgan_bajarilganlar">
                      Сделанный
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.doneCount}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink" style={{ width: "98%" }}>
                      <Link to="/bajarilgan_kechiktirib-berilgan">
                      Отправлено с опозданием
                      </Link>
                    </th>
                    <th className="TableLink" style={{ width: "2%", textAlign: "center", fontSize: "15px" }}>
                      {count?.defferedDone}
                    </th>
                  </tr>
                  <tr>
                    <th className="TableLink">&nbsp;</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* {ranks.includes(1) && (
      <TableContent />
      )} */}

      <div className="row p-0 px-1 mt-2">
        <div className={`${kadr.length === 5 ? "col-lg-9" : "col-lg-12"} p-0`} style={{ minHeight: "615px", width: "100%" }}>
          {/* calendar */}
          <Calendar currentUser={currentUser} />
        </div>

        {kadr.length === 5 && (
          <BirthDate kadr={kadr} />
        )}
      </div>


      {/* alert */}
      <AlertContent alert={alert} />

    </div>
  )
}

export default React.memo(HomeContent);