import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AlertContent from '../../../component/alert/Alert';
import KengQidirishKiruvchi from '../kengQidirishKiruvchi/KengQidirishKiruvchi';

const ContentKengQidirish = ({ currentUser }) => {
  // const { user } = useSelector(state => state); //redux ga saqlangan ma'lumotlar
  const { insta: user } = useSelector(state => state.user);
  const [selected, setSelected] = useState(user.inputData.page >= 0 ? user.inputData.page : 0);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  return (
    <div className="content content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Многовенное поиск</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <li className="nav-item" style={{ marginLeft: "20px" }}>
            <NavLink to="/qidirish" activeClassName='NavLinkLi' className="nav-link">
              <i className="icon-stack2 mr-1"></i>Поиск
            </NavLink>
          </li>
        </ul>

        {/* kiruvchi */}
        <KengQidirishKiruvchi
          user={user}
          setAlert={setAlert}
          selected={selected}
          currentUser={currentUser}
          setSelected={setSelected}
        />
      </div>
      {/* alert */}
      <AlertContent alert={alert} />
    </div >
  )
}


export default React.memo(ContentKengQidirish);