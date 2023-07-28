import React, { useEffect, useState } from "react";
import './kartochkaQushishContent.css';
import { axiosInstance } from "../../../../../config";
import AlertContent from '../../../../../component/alert/Alert';
import AddDirection from '../addDirection/AddDirection';
import AddCard from '../addCard/AddCard';
import DirectionData from "../directionData/DirectionData";

const KartochkaQushishContent = ({ currentUser }) => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateYunalish, setUpdateYunalish] = useState({ open: false, obj: {} });
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [change, setChange] = useState(false);

  // barcha ota onasi yo'q card typelarni ni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("cardType")
        let arr = [];
        if (res.data?.length > 0) {
          res.data.forEach((item) => {
            arr.push({ value: item.id, label: item.cardName });
          })
        }
        if (useEffectCount) {
          setYunalishlar(res.data);
          setNotParentsCard(arr);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser]);

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let useEffectCount = true;
    let orgNames = document.querySelectorAll('.cardAccordion');

    if (useEffectCount) {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').addEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
    }

    return () => {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').removeAttribute('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
      useEffectCount = false;
    }
  }, [yunalishlar, change]);

  const notParentsCardClick = async (e) => {
    try {
      const res = await axiosInstance.get("cardType/" + e.value)
      let arr = [];
      console.log(res.data);
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      console.log(arr);
      setCardsName(arr);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // barcha cardlar ni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("cardType")
        console.log(res.data);
        let arr = [];
        let arr1 = [];
        arr1 = res.data;
        // arr1.forEach((c, i) => {
        //   if (updateYunalish.obj.cardName === c.cardName) {
        //     arr1.splice(i, 1)
        //     arr1.forEach((item) => {
        //       arr.push({ value: item.id, label: item.cardName });
        //     })
        //   }
        // })

        arr1.forEach((item, i) => {
          arr.push({ value: item.id, label: item.cardName });
        })

        console.log(arr);

        if (useEffectCount)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [change, currentUser, updateYunalish?.obj?.cardName]);

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Добавить карту</h3>
      <div className="card-body p-0">
        <div className="card-body p-0">
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between">
            <li className="nav-item"><h5 style={{
              margin: "10px 0 0 20px",
              fontWeight: "bold",
              textTransform: "upperCase",
              color: "#fff",
              padding: "0 5px 5px 0"
            }}>Панель управления картами</h5></li>
            <li className="nav-item mr-3">
              <a href="#1" data-toggle="modal" data-target="#yonalish" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}>
                <i className="icon-plus2"></i> Добавить направление
              </a>
              <a href="#1" data-toggle="modal" className="ml-4" data-target="#modal_theme_primary" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}>
                <i className="icon-plus2"></i> Добавить карту
              </a>

              {/* add direction */}
              <AddDirection
                notParentsCard={notParentsCard}
                yunalishlar={yunalishlar}
                setYunalishlar={setYunalishlar}
                currentUser={currentUser}
                setAlert={setAlert}
              />

              {/* add card*/}
              <AddCard
                currentUser={currentUser}
                setAlert={setAlert}
                setChange={setChange}
                change={change}
                setBoshTashkilotlar={setBoshTashkilotlar}
                cardsName={cardsName}
                notParentsCardClick={notParentsCardClick}
                notParentsCard={notParentsCard}
              />
            </li>
          </ul>

          {/* direction data */}
          <DirectionData
            setAlert={setAlert}
            currentUser={currentUser}
            cardsName={cardsName}
            notParentsCard={notParentsCard}
            setBoshTashkilotlar={setBoshTashkilotlar}
            boshTashkilotlar={boshTashkilotlar}
            updateYunalish={updateYunalish}
            setUpdateYunalish={setUpdateYunalish}
            setChange={setChange}
            change={change}
            setYunalishlar={setYunalishlar}
            yunalishlar={yunalishlar}
            notParentsCardClick={notParentsCardClick}
            setNotParentsCard={setNotParentsCard}
          />
        </div>
      </div>

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(KartochkaQushishContent);