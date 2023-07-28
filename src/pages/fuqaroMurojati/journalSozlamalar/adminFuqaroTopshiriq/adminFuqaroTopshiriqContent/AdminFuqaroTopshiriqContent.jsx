import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import FuqaroElektronKitobNavbar from "../../adminFuqaroElektronKitobNavbar/AdminFuqaroElektronKitobNavbar";
import { axiosInstance } from "../../../../../config";

export default function AdminTopshiriqlarContent({ currentUser }) {
  const params = useParams();
  const [data, setData] = useState([]);

  // id bo'yicha ma'lumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();
    const getData = async () => {
      try {
        const res = await axiosInstance.get("journal/logs/" + params.id)
        let arr = [];
        arr.push(res.data);

        if (isMounted)
          setData(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Topshiriqlar</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <FuqaroElektronKitobNavbar />
          <li className="nav-item">
            <NavLink to={`/super_admin_elektron-kitob-topshiriqlar/${params.id}`} className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
              <i className="icon-stack2 mr-1"></i> Topshiriqlar
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <table className="table table-bordered  table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "20%" }}>F.I.O</th>
                      <th style={{ width: "20%" }}>Ip manzili va MAC</th>
                      <th style={{ width: "20%" }}>Qurilmasi</th>
                      <th style={{ width: "20%" }}>Browser</th>
                      <th style={{ width: "15%" }}>Vaqt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dat, index) => (
                      <tr className="text-center">
                        <td>{index + 1}</td>
                        <td>{dat?.firstName} {dat?.lastName} {dat?.middleName}</td>
                        <td>
                          {dat?.createdIpAddress}
                          <hr />
                          {/* MAC: B8-CA-ZA-90-30 */}
                        </td>
                        <td>{dat?.createdDevice}</td>
                        <td>{dat?.createdBrowser}</td>
                        <td>{Date(Date.now(dat?.createdAt))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}