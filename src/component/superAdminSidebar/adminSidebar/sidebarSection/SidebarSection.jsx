import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { HiOutlineDocumentDuplicate, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { BsPerson, BsFilePerson } from 'react-icons/bs';
import { FiPackage } from 'react-icons/fi';
import { SlOrganization } from 'react-icons/sl';
import { CiMonitor } from 'react-icons/ci';
import { RiFileSettingsLine, RiOrganizationChart } from 'react-icons/ri';
import { GoPackage } from 'react-icons/go';
import { TfiBookmarkAlt, TfiSettings } from 'react-icons/tfi';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { axiosInstanceKadr } from "../../../../config";

const SidebarSection = () => {
  const [kadrlarBranch, setKadrlarBranch] = useState([]);

  const openFM = (name) => {
    if (document.querySelector(`.${name}`).querySelector('ul').style.display === "none") {
      document.querySelector(`.${name}`).querySelector('ul').style.display = "block";
    } else {
      document.querySelector(`.${name}`).querySelector('ul').style.display = "none";
    }
  }

  // Kadrlar
  useEffect(() => {
    let useEffectCount = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceKadr.get(`branch/getAll/${localStorage.getItem("oi")}`)
        if (useEffectCount) {
          setKadrlarBranch(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, []);

  return (
    <div className="sidebar-section sidebarSection">
      <ul className="nav nav-sidebar" data-nav-type="accordion">
        {/* bosh sahifa */}
        <li className="nav-item">
          <Link to="/super_admin" className="nav-link d-flex align-items-center liHover">
            <AiOutlineHome className="text-primary" />
            <span className="ml-3">Домашняя страница</span>
          </Link>
        </li>

        {/* hujjatlar */}
        <li className="nav-item nav-item-submenu hujjatlar">
          <div className="nav-link d-flex align-items-center" onClick={() => openFM('hujjatlar')}>
            <HiOutlineDocumentDuplicate className="text-primary" />
            <span className="ml-3">Документы</span>
          </div>

          <ul className="nav-item-ul " style={{ display: "none" }}>
            <li className="nav-item">
              <Link to="/super_admin_elektron-kitob" className="nav-link liHover d-flex align-items-center">
                <TfiBookmarkAlt className="text-primary" />
                <span className="ml-3">Электронная книга</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/super_admin_sozlamalar" className="nav-link liHover d-flex align-items-center">
                <TfiSettings className="text-primary" />
                <span className="ml-3">Настройки</span>
              </Link>
            </li>
            <li className="nav-item nav-item-submenu monitoring" onClick={() => openFM('monitoring')}>
              <div className="nav-link d-flex align-items-center ml-3">
                <TbHeartRateMonitor className="text-primary" />
                <span className="ml-3">Мониторинг</span>
              </div>
              <ul className="nav-item-ul pl-3" style={{ display: "none" }}>
                <li className="nav-item">
                  <Link to="/monitoring_kiruvchi" className="nav-link liHover d-flex align-items-center">
                    <CiMonitor className="text-primary" />
                    <span className="ml-2">Мониторинг</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/monitoring_kiruvchi_2" className="nav-link liHover d-flex align-items-center">
                    <CiMonitor className="text-primary" />
                    <span className="ml-2">Мониторинг 2</span>
                  </Link>
                </li>
              </ul >
            </li>
          </ul>
        </li>

        {/* fuqaro murojaatlari */}
        <li className="nav-item nav-item-submenu fuqaroMurojaati">
          <div className="nav-link  d-flex align-items-center" onClick={() => openFM('fuqaroMurojaati')}>
            <BsPerson className="text-primary" />
            <span className="ml-3">Гражданские апелляции</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            {/*<li className="nav-item">*/}
            {/*    <Link to="/fuqaro/murojati" className="nav-link liHover" style={{ fontSize: '18px' }}>*/}
            {/*        <i className="icon-magazine" style={{ color: "#0056B8" }} />*/}
            {/*        <span>Yangi</span>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li className="nav-item">
              <Link to="/fuqaro/murojati/elektron-kitob" className="nav-link liHover d-flex align-items-center">
                <RiFileSettingsLine className="text-primary" />
                <span className="ml-3">Настройки журнала</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* chiquvchi */}
        <li className="nav-item nav-item-submenu chiquvchi">
          <div className="nav-link d-flex align-items-center" onClick={() => openFM('chiquvchi')}>
            <HiOutlineSwitchHorizontal className="text-primary" />
            <span className="ml-3">Исходящий</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            {/*<li className="nav-item">*/}
            {/*    <Link to="/fuqaro/murojati" className="nav-link liHover" style={{ fontSize: '18px' }}>*/}
            {/*        <i className="icon-magazine" style={{ color: "#0056B8" }} />*/}
            {/*        <span>Yangi</span>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li className="nav-item">
              <Link to="/chiquvchi/elektron-kitob" className="nav-link liHover d-flex align-items-center">
                <RiFileSettingsLine className="text-primary" />
                <span className="ml-3">Настройки журнала</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/chiquvchi/super_admin_fishka" className="nav-link liHover d-flex align-items-center">
                <TfiSettings className="text-primary" />
                <span className="ml-3">Настройки</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* kadrlar */}
        <li className="nav-item">
          <Link to={kadrlarBranch.length > 0 ? `/kadrlar/${kadrlarBranch[0].name}` : "/kadrlar/Asosiy"} className="nav-link liHover">
            {/* <i className="icon-users" style={{ color: "#0056B8" }} /> */}
            <BsFilePerson className="text-primary" />
            <span className="ml-3">Кадры</span>
          </Link>
        </li>

        {/* paketlar */}
        <li className="nav-item nav-item-submenu paketlar">
          <div className="nav-link d-flex align-items-center" onClick={() => openFM('paketlar')}>
            <FiPackage className="text-primary" />
            <span className="ml-3">Пакеты</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            <li className="nav-item">
              <Link to="/super_admin/umumiy/paketlar" className="nav-link liHover d-flex align-items-center">
                <GoPackage className="text-primary" />
                <span className="ml-3">Общий пакет</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/super_admin/mavjud/paketlar" className="nav-link liHover d-flex align-items-center">
                <GoPackage className="text-primary" />
                <span className="ml-3">Доступные пакеты</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* tashkilotlar */}
        <li className="nav-item nav-item-submenu tashkilotlar">
          <div className="nav-link d-flex align-items-center" onClick={() => openFM('tashkilotlar')}>
            <SlOrganization className="text-primary" />
            <span className="ml-3">Организации</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            <li className="nav-item">
              {/* /super_admin/umumiy/tashkilotlar */}
              <Link to="/office_manager/umumiy/tashkilotlar" className="nav-link liHover d-flex align-items-center">
                <RiOrganizationChart className="text-primary" />
                <span className="ml-3">Общие организации</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/super_admin/mavjud/tashkilotlar" className="nav-link liHover d-flex align-items-center">
                <RiOrganizationChart className="text-primary" />
                <span className="ml-3">Существующие организации</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default React.memo(SidebarSection);