import React, { useState } from "react";
import { axiosInstance, url } from "../../../../../config";

const Directions = ({ d, currentUser }) => {
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [quyiTashkilotlar, setQuyiTashkilotlar] = useState([]);
  const [tashkilotlar, setTashkilotlar] = useState([]);

  const getTashBoshTashkilot = async (id) => {
    try {
      await axiosInstance.get("organization/mainOrganization/" + id)
      try {
        const res = await axiosInstance.get("organization/by/" + id)
        setBoshTashkilotlar(res.data);
      } catch (error) {
        console.log(error.response);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const getTashQuyiTashkilot = async (id) => {
    try {
      const res = await axiosInstance.get('organization/childOrganization/' + id)
      setQuyiTashkilotlar(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  // id bo'yicha tashkilotlarni o'qib olish
  const getTashkilot = async (id) => {
    try {
      const res = await axiosInstance.get(`organization/showCorrespondent/byOrgType/${id}/${JSON.parse(localStorage.getItem('oi'))}`)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="card cardAccordion mb-0 mt-2 w-100">
      <div className="card-header orgname" style={{ height: "40px" }}
        onClick={() => getTashkilot(d.id)}>
        <h6 className="card-title d-flex justify-content-between align-items-center">
          <a className="text-body NavLink "
            style={{ color: "#0056B8 !important" }}
            href={`#1`}>{d?.name}</a>
        </h6>
      </div>

      <div className="openTash" style={{ display: "none" }}>
        {tashkilotlar?.map((tash, index) => (
          <div key={index}>
            {tash?.orgType?.name === d?.name && (
              <div key={index} className="">
                <div className="card-body pb-1 pt-0">
                  <div className="card mb-1">
                    <div
                      className="card-header d-flex align-items-center"
                      style={{ height: "40px" }}>
                      <h6 className="card-title">
                        <a className="collapsed text-body NavLink"
                          data-toggle="collapse"
                          href={`#vHokimlik${index}`}>{tash.orgName}</a>
                      </h6>
                    </div>

                    <div id={`vHokimlik${index}`}
                      className="card-body collapse"
                      data-parent={`#accordion-default`}>
                      <div id="accordion-child2">
                        <div className="card">
                          <div
                            className="card-header bg-dark"
                            onClick={() => getTashBoshTashkilot(tash.id)}>

                            <h6 className="card-title">
                              <a data-toggle="collapse"
                                className="text-white"
                                href={`#bTashkilot${index}`}>Основная 
                                организация </a>
                            </h6>
                          </div>
                          <div
                            id={`bTashkilot${index}`}
                            className="collapse"
                            data-parent={`#bTashkilot${index}`}>
                            <div className="card-body">
                              <table
                                className="table datatable-row-full table-bordered table-striped table-hover Tab"
                                id="myTable">
                                <thead>
                                  <tr className="bg-dark text-white NavLink text-center">
                                    <th style={{ width: "3%" }}>№</th>
                                    <th style={{ width: "15%" }}>Лого</th>
                                    <th style={{ width: "20%" }}>Район (город) 
                                    </th>
                                    <th style={{ width: "25%" }}>Короткое имя 
                                    </th>
                                    <th style={{ width: "25%" }}>Директор</th>
                                  </tr>
                                </thead>
                                <tbody
                                  id="viloyat">
                                  {boshTashkilotlar?.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                    <tr key={tashkilotlar?.length + index} className="text-center">
                                      <td>{index + 1}</td>
                                      <td>
                                        <img
                                          src={dat?.logo ? `${url}/api/file/view/${dat.logo.id}` : "assets/user.png"}
                                          style={{
                                            width: "120px",
                                            height: "120px"
                                          }}
                                          alt="" />
                                      </td>
                                      <td>{dat?.orgDistrict}</td>
                                      <td>{dat?.orgName}</td>
                                      <td>{dat?.leaderName}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="card mb-0">
                          <div
                            className="card-header bg-dark"
                            onClick={() => getTashQuyiTashkilot(tash.id)}>
                            <h6 className="card-title">
                              <a className="collapsed text-white"
                                data-toggle="collapse"
                                href={`#qTashkilot${index}`}>Низшие организации </a>
                            </h6>
                          </div>
                          <div
                            id={`qTashkilot${index}`}
                            className="collapse"
                            data-parent={`#qTashkilot${index}`}>
                            <div
                              className="card-body">
                              <table
                                className="table datatable-row-full table-bordered table-striped table-hover Tab"
                                id="myTable">
                                <thead>
                                  <tr className="bg-dark text-white NavLink text-center">
                                    <th style={{ width: "3%" }}>№</th>
                                    <th style={{ width: "15%" }}>Лого </th>
                                    <th style={{ width: "20%" }}>Район (город)
                                    </th>
                                    <th style={{ width: "25%" }}>Короткое имя
                                    </th>
                                    <th style={{ width: "25%" }}>Директор</th>
                                  </tr>
                                </thead>
                                <tbody
                                  id="viloyat">
                                  {quyiTashkilotlar?.length > 0 && quyiTashkilotlar.map((dat, index2) => (
                                    <tr key={boshTashkilotlar?.length + boshTashkilotlar?.length + index2}
                                      className="text-center">
                                      <td>{index2 + 1}</td>
                                      <td>
                                        <img
                                          src={dat?.logo?.id ? `${url}/api/file/view/${dat.logo.id}` : "/assets/user.png"}
                                          style={{
                                            width: "120px",
                                            height: "120px"
                                          }}
                                          alt="" />
                                      </td>
                                      <td>{dat?.orgDistrict}</td>
                                      <td>{dat?.orgName}</td>
                                      <td>{dat?.leaderName}</td>
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
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Directions);