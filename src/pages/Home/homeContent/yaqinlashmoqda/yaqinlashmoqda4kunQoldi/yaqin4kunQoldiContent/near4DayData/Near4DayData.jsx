import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { axiosInstance } from "../../../../../../../config";
import { status } from '../../../../../../../component/status/Status';
import ReactPagination from "../../../../../../../component/ReactPagination";
import AllFiles from "../../../../../../../component/AllFiles";

const Near4DayData = ({ data, setData, dateFormatSet, permission, currentUser, korresref, shortDescref, regNumref }) => {
  const [selected, setSelected] = useState(0);
  const history = useHistory();

  // sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // pagination
  const handlePageClick = async (e) => {
    let sana = document.querySelector('.qisqacha2').value;

    try {
      const res = await axiosInstance.post(`mainPage/remainMoreThanFourDay/${JSON.parse(localStorage.getItem('ids'))}`, {
        correspondentName: korresref.current.value,
        shortDescription: shortDescref.current.value,
        out_number: regNumref.current.value,
        out_date: sana ? dateFormatSet(sana) : '',
        page: e.selected
      })
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setSelected(e.selected);
  };

  return (
    <>
      {data?.content?.length > 0 && (
        <ReactPagination
          handlePageClick={handlePageClick}
          data={data}
          selected={selected}
        />
      )}
      <table className="table table-bordered my-1 table-striped table-hover Tab" id="myTable">
        <thead>
          <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
            <th style={{ width: "5%" }} className="id">№</th>
            <th style={{ width: "10%" }} className="xujjat mobile-table-none">Файл</th>
            <th style={{ width: "20%" }} className="korres">Корреспондент</th>
            <th style={{ width: "25%" }} className="qisqacha mobile-table-none">Краткая информация</th>
            <th style={{ width: "15%" }} className="reg">Рег № / Срок</th>
            <th style={{ width: "20%" }} className="ijrochi mobile-table-none">Исполнительный</th>
            <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((tableItem, index) => (
            <tr
              key={index}
              onClick={() => window.innerWidth <= 768 && history.push(permission ? `/bosh_sahifa_ko'rish/${tableItem?.id}/vazifalarim` : tableItem?.tabName === "SUPER_VISOR" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/nazorat` : tableItem?.tabName === "GENERALLER" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/umumlashtiruvchi` : tableItem?.tabName === "FOR_DOING" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarish` : tableItem?.tabName === "REJECTED" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/radEtilgan` : tableItem?.tabName === "NOT_DONE" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarilmagan` : `/kiruvchi_bajarish_ijro/${tableItem?.id}/malumot`)}
            >
              <td className="text-center id">{index + 1}</td>
              <td className="text-color xujjat Fayl mobile-table-none" style={{ wordWrap: "break-word" }}>
                {tableItem?.files?.length > 0 && tableItem?.files?.map((hujjat) => (
                  <p key={hujjat?.generatedName}>
                    <AllFiles
                      hujjat={hujjat}
                    />
                  </p>
                ))}
              </td>
              <td className="text-center korres" style={{ wordWrap: "break-word" }}>{tableItem?.correspondentName}</td>
              <td className="text-center qisqacha mobile-table-none" style={{ wordWrap: "break-word" }}>{tableItem?.shortDescription}</td>
              <td className="text-center reg">
                <span className={'badge badge-primary'}>№ {tableItem?.journalNumber}</span>
                <hr />
                <span>{dateFormatGet(tableItem?.deadline)}</span>
              </td>
              <td className="text-center ijrochi ijrochi1 mobile-table-none">
                {tableItem?.inExecutorShortInfoDtos?.length > 0 && tableItem?.inExecutorShortInfoDtos?.map((d, i) => (
                  !d?.isDirect && (
                    <p key={i} style={{
                      margin: "0",
                      borderColor: "#ddd",
                      height: "100%",
                      marginBottom: "5px",
                      textAlign: "left"
                    }}
                      className="d-flex align-items-center">
                      <span
                        style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                      <span className="badge ml-1 status text-white"
                        style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    </p>
                  )
                ))}
                {tableItem?.inExecutorShortInfoDtos?.find((d) => d?.isDirect) && (
                  <hr style={{ borderTop: "1px dashed #000" }} />
                )}
                {tableItem?.inExecutorShortInfoDtos?.length > 0 && tableItem?.inExecutorShortInfoDtos?.map((d, i) => (
                  d?.isDirect && (
                    <p key={i}
                      style={{
                        margin: "0",
                        borderColor: "#ddd",
                        height: "100%",
                        textAlign: "left",
                        marginBottom: "5px"
                      }}
                      className="d-flex align-items-center">
                      <span
                        style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                      <span className="badge ml-1 status text-white"
                        style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    </p>
                  )
                ))}
              </td>
              <td className="harakat mobile-table-none">
                <div className="icon d-flex justify-content-center align-items-center ">
                  <Link to={permission ? `/bosh_sahifa_ko'rish/${tableItem?.id}/yaqinlashmoqda` : tableItem?.tabName === "SUPER_VISOR" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/nazorat` : tableItem?.tabName === "GENERALLER" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/umumlashtiruvchi` : tableItem?.tabName === "FOR_DOING" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarish` : tableItem?.tabName === "FOR_INFO" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/malumot` : tableItem?.tabName === "NOT_DONE" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarilmagan` : `/kiruvchi_bajarish_ijro/${tableItem?.id}/radEtilgan`}
                    className="infoBtn bg-dark" title="Вид"
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top">
                    <span><i className="icon-eye2" /></span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.content?.length > 0 && (
        <ReactPagination
          handlePageClick={handlePageClick}
          data={data}
          selected={selected}
        />
      )}
    </>
  )
}

export default React.memo(Near4DayData);