import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../../config";
import AlertContent from "../../../../../../component/alert/Alert";
import UpdateDirection from "../updateDirection/UpdateDirection";
import ViewCard from "../viewCard/ViewCard";
import Directions from "../directions/Directions";

const UmumiyPaketlarContent = ({ currentUser }) => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateYunalish, setUpdateYunalish] = useState({});
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardKurish, setCardKurish] = useState({ open: false, obj: {} });

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/visibleCardTypes/" + JSON.parse(localStorage.getItem('oi')))
        console.log(res.data);
        if (isMounted)
          setYunalishlar(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // barcha cardlar ni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("cardType")
        
        let arr = [];
        res.data.forEach((c) => {
          arr.push({ value: c.id, label: c.cardName });
        })

        if (isMounted)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [yunalishlar, currentUser]);

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let isMounted = true;
    let orgNames = document.querySelectorAll('.cardAccordion');
    if (isMounted) {
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
        org.querySelector('.orgname').removeEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
      isMounted = false;
    }
  }, [yunalishlar]);

  return (
    <div className="content mb-5 ">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Общие пакеты</h3>
      <div className="">
        <div className="card-body p-0" >
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between">
            <li className="nav-item"><h5 style={{
              margin: "10px 0 0 20px",
              fontWeight: "bold",
              textTransform: "upperCase",
              color: "#fff",
              padding: "0 5px 5px 0"
            }}>Панель управления картами</h5></li>
          </ul>

          {/* directions */}
          <Directions
            yunalishlar={yunalishlar}
            currentUser={currentUser}
            boshTashkilotlar={boshTashkilotlar}
            setBoshTashkilotlar={setBoshTashkilotlar}
          />
        </div>
      </div>

      {updateYunalish.open && (
        <UpdateDirection
          updateYunalish={updateYunalish}
          setUpdateYunalish={setUpdateYunalish}
          currentUser={currentUser}
          setAlert={setAlert}
          setYunalishlar={setYunalishlar}
          yunalishlar={yunalishlar}
          notParentsCard={notParentsCard}
        />
      )}

      {cardKurish.open && (
        <ViewCard
          cardKurish={cardKurish}
          setCardKurish={setCardKurish}
          setBoshTashkilotlar={setBoshTashkilotlar}
          boshTashkilotlar={boshTashkilotlar}
          notParentsCard={notParentsCard}
        />
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(UmumiyPaketlarContent);