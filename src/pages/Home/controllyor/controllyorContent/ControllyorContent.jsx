import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { axiosInstance, url } from "../../../../config";
import BajarilganNavbar from '../../homeContent/bajarilgan/bajarilganNavbar/BajarilganNavbar';
import BajarilmaganNavbar from '../../homeContent/bajarilmagan/bajarilmaganNavbar/BajarilmaganNavbar';
import VazifalarNavbar from '../../homeContent/vazifalarim/vazifalarNavbar/VazifalarNavbar';
import YaqinlashmoqdaNavbar from '../../homeContent/yaqinlashmoqda/yaqinlashmoqdaNavbar/YaqinlashmoqdaNavbar';
import HujjatAylanishYuli from "./hujjatAylanishYuli/HujjatAylanishYuli";
import KiruvchiCon from "./kiruvchiCon/KiruvchiCon";
import IchkiTopshiriqlar from "./ichkiTopshiriqlar/IchkiTopshiriqlar";
import TashqiTopshiriqlarCon from "./tashqiTopshiriqlarCon/TashqiTopshiriqlarCon";

const IjroContent = ({ currentUser }) => {
  const params = useParams();
  const [data, setData] = useState({});

  // berilgan id ga mos documentni olish
  useEffect(() => {
    let isMounted = true;
    // tooltip ni o'chirish
    document.querySelector('.tooltip')?.remove();

    const getData = async () => {
      try {
        const res = await axiosInstance.get(`mainPage/viewDocument/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`)

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  // sanani formatlash
  const dateFormat = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // ijrocontent yo'naltirganlar uchun commentni yashirish va ko'rsatish
  useEffect(() => {
    let isMounted = true;
    let trNumberRedirect = document.querySelectorAll('.trNumberRedirect');
    let IzohTashqiTopshiriqBlockY = document.querySelectorAll('.IzohTashqiTopshiriqBlockY');
    let IzohTashqiTopshiriqNoneY = document.querySelectorAll('.IzohTashqiTopshiriqNoneY');

    // ichki topshiriqning commentini yashirish yoki ko'rsatish
    if (isMounted) {
      trNumberRedirect?.forEach((d) => {
        d.querySelector('.IzohIchkiTopshiriqNoneY')?.addEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
        })
        d.querySelector('.IzohIchkiTopshiriqBlockY')?.addEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
        })
      })

      // tashqi topshiriqning commentini yashirish yoki ko'rsatish
      IzohTashqiTopshiriqBlockY.forEach((d, i) => {
        d.addEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "block";
          IzohTashqiTopshiriqBlockY[i].style.display = "none";
        })
      })
      IzohTashqiTopshiriqNoneY.forEach((d, i) => {
        d.addEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "none";
          IzohTashqiTopshiriqBlockY[i].style.display = "block";
        })
      })
    }

    return () => {
      trNumberRedirect?.forEach((d) => {
        d.querySelector('.IzohIchkiTopshiriqNoneY')?.removeAttribute('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
        })
        d.querySelector('.IzohIchkiTopshiriqBlockY')?.removeAttribute('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
        })
      })

      // tashqi topshiriqning commentini yashirish yoki ko'rsatish
      IzohTashqiTopshiriqBlockY.forEach((d, i) => {
        d.removeAttribute('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "block";
          IzohTashqiTopshiriqBlockY[i].style.display = "none";
        })
      })
      IzohTashqiTopshiriqNoneY.forEach((d, i) => {
        d.removeAttribute('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "none";
          IzohTashqiTopshiriqBlockY[i].style.display = "block";
        })
      })
      isMounted = false;
    }
  }, [data]);

  return (
    <div className="content" style={{ marginBottom: "130px" }}>
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "uppercase" }}>Вид</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px" }}>
          {params.name === "bajarilgan" ? (
            <BajarilganNavbar currentUser={currentUser} />
          ) : (
            params.name === "yaqinlashmoqda" ? (
              <YaqinlashmoqdaNavbar currentUser={currentUser} />
            ) : (
              params.name === "bajarilmagan" ? (
                <BajarilmaganNavbar currentUser={currentUser} />
              ) : (
                <VazifalarNavbar currentUser={currentUser} />
              )
            )
          )}
          <li className="nav-item">
            <NavLink to={`/bosh_sahifa_ko'rish/${params.id}/${params.name}`} className="nav-link" activeClassName="NavLinkLi">
              <i className="icon-eye2 mr-1"></i>Задания
            </NavLink>
          </li>
        </ul>
        <div className="card">
          <div className="row">
            <div className="col-lg-5">
              <div className="card-body">
                {/* fishka */}
                {data?.document?.files?.length > 0 && data?.document?.files?.map((file, ind) => (
                  (ind === 0) && (
                    <embed
                      key={ind}
                      src={url + "/api/file/view/" + file?.generatedName}
                      type="application/pdf"
                      width="100%"
                      height="1000px"
                    />
                  )
                ))}
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card-block mt-3">
                {/* hujjat aylanish yo'li */}
                <HujjatAylanishYuli
                  data={data}
                  dateFormat={dateFormat}
                />

                {/* kiruvchi */}
                <KiruvchiCon
                  data={data}
                  params={params}
                />

                {/* ichki topshiriqlar */}
                <IchkiTopshiriqlar
                  data={data}
                  dateFormat={dateFormat}
                />

                {/* tashqi topshiriqlar */}
                <TashqiTopshiriqlarCon
                  data={data}
                  dateFormat={dateFormat}
                />
              </div>
            </div >
          </div >
        </div >
      </div >
    </div >
  )
}

export default React.memo(IjroContent);