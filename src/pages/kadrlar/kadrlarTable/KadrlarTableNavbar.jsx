import React from "react";
import { NavLink } from "react-router-dom";
import "../kadrlar.css"

const KadrlarTableNavbar = ({ branchs, setUpdateBranchModal, activeBranchId, users }) => {
  return (
    <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingLeft: "20px" }}>
      {branchs?.length > 0 && branchs.map((item) => {
        console.log(item)
        return (
          // item.name === "KENG QIDIRISH" ?
          //   (<li key={Math.random()} className="nav-item kadr-nav" style={{ display: globalSearchBranch.users.length > 0 ? "flex" : "none", alignItems: "center", color: item.main ? "#DC143C !important" : "" }}>
          //     <div className="btn-group position-static">
          //       <NavLink to={`/kadrlar/${item.name}`} tabIndex={Math.random()} className="nav-link qidirish active">
          //           <i class="fa-sharp fa-solid fa-magnifying-glass mr-2"></i>
          //         {item.name}
          //       </NavLink>
          //     </div>
          //   </li>)
          //   : 
            (item.name === "DUBLIKATLAR") ? (<li key={Math.random()} className="nav-item kadr-nav" style={{ display: item?.count !== 0 ? "flex" : "none", alignItems: "center", color: item.main ? "#DC143C !important" : "" }}>
              <div className="btn-group position-static">
                <NavLink to={`/kadrlar/${item.name}`} tabIndex={Math.random()} className="nav-link dublikatlar">
                    <i class="fa-solid fa-clone mr-2"></i>  
                  {item.name}

                </NavLink>
              </div>
            </li>) : (
              <li key={Math.random()} className="nav-item kadr-nav" style={{ display: "flex", alignItems: "center", color: item.main ? "#DC143C !important" : "" }}>
                <div className="btn-group position-static">
                  <NavLink to={`/kadrlar/${item.name}`} tabIndex={Math.random()} className="nav-link">
                    {!item.main ? <i className="icon-stack2 mr-2"></i>
                      : <i class="fa-solid fa-house-user mr-2" style={{ color: "#25B372" }}></i>
                    }
                    {item.name}

                  </NavLink>
                  {console.log(activeBranchId)}
                  {(activeBranchId === item.id) && <button onClick={() => { setUpdateBranchModal({ isShow: true, branch: item, check: item.main }) }} type="button" className="btn btn-white" style={{ marginTop: "8px", borderRadius: "0", borderTopRightRadius: "10px" }}>
                    <i className="fa-solid fa-pen"></i>
                  </button>}
                </div>
              </li>
            ))
      })}

    </ul>
  )
}
export default KadrlarTableNavbar;
