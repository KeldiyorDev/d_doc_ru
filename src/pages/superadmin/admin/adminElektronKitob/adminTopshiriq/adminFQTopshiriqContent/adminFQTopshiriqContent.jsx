import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { axiosInstanceFq } from "../../../../../../config";
import FuqaroElektronKitobNavbar
  from "../../../../../fuqaroMurojati/journalSozlamalar/adminFuqaroElektronKitobNavbar/AdminFuqaroElektronKitobNavbar";

const AdminFQTopshiriqlarContent = ({ currentUser }) => {
  const params = useParams();
  const [data, setData] = useState([]);

  // id bo'yicha ma'lumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get("journal/logs/" + params.id)
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
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Задания</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <FuqaroElektronKitobNavbar />
          <li className="nav-item">
            <NavLink to={`/fuqaro/murojati/elektron-kitob-topshiriqlar/${params.id}`} className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
              <i className="icon-stack2 mr-1"></i> Задания
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <table className="table table-bordered  table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "20%" }}>Ф.И.О</th>
                      <th style={{ width: "20%" }}>IP-адрес и MAC-адрес</th>
                      <th style={{ width: "20%" }}>Устройство</th>
                      <th style={{ width: "20%" }}>Браузер</th>
                      <th style={{ width: "15%" }}>Время</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dat, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{dat?.firstName} {dat?.lastName} {dat?.middleName}</td>
                        <td>
                          {dat?.createdIpAddress}
                          <hr />
                          {/* MAC: B8-CA-ZA-90-30 */}
                        </td>
                        <td>{dat?.createdDevice}</td>
                        <td>{dat?.createdBrowser}</td>
                        <td>{dat?.createdAt.substr(0, 10)}</td>
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

export default React.memo(AdminFQTopshiriqlarContent);