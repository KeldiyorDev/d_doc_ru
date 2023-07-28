import React from "react";
import { Link, useHistory } from "react-router-dom";
import AllFiles from "../../../../../component/AllFiles";
import { DateFormatGet } from "../../../../../component/DateFormat";

const ResolutionAllData = ({ data, ranks, linkFunc }) => {
  const history = useHistory();

  console.log(data);
  return (
    <table id="myTable" data-paging="true" data-toggle="table" data-search="true" className="table table-bordered table-hover Tab my-1" style={{ width: "100%" }}>
      <thead className="theadSticky">
        <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
          <th style={{ width: "5%" }} className="id">№</th>
          <th style={{ width: "10%" }} className="xujjat mobile-table-none">Файл</th>
          <th style={{ width: "20%" }} className="korres">Корреспондент</th>
          <th style={{ width: "30%" }} className="qiqacha mobile-table-none">Краткая информация</th>
          <th style={{ width: "15%" }} className="chiquvchi mobile-table-none">Исходяший № / Дата</th>
          <th style={{ width: "15%" }} className="reg">РЕГ № / Дата</th>
          <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.content?.length > 0 && data.content.map((dat, index) => (
          <tr
            key={dat.id}
            id="kor"
            style={{
              backgroundColor: dat.receptionId ? "rgba(33, 150, 243, 0.2)" : dat.gaveResolution ? "" : "rgb(248, 248, 183)"
            }}
            onClick={() => window.innerWidth <= 768 && history.push(`/kiruvchi_resolution_kurish/${dat?.id}`)}>
            <td className="text-center id">{index + 1}</td>
            <td className="text-color xujjat mobile-table-none" id='xujjat'
              style={{ cursor: "pointer", wordWrap: "break-word" }}>
              {dat?.files?.length > 0 && dat.files.map((hujjat, index1) => (
                <div key={hujjat.id + index1}>
                  <AllFiles
                    hujjat={hujjat}
                  />
                </div>
              ))}
            </td>
            <td style={{ wordWrap: "break-word" }} className="korres" id='td'>
              {dat?.correspondentName}
            </td>
            <td id="qs" data-maxlength="5" className="qiqacha mobile-table-none"
              style={{ wordWrap: "break-word" }}>
              {dat?.shortDescription}
            </td>
            <td className="text-center chiquvchi mobile-table-none" style={{ wordWrap: "break-word" }}>
              <div className="badge badge-primary">№ {dat?.outNumber}</div>
              <hr />
              {DateFormatGet(dat?.outDate)}
            </td>
            <td className="text-center reg" style={{ wordWrap: "break-word" }}>
              <div className="badge badge-primary">№{dat?.journalNumber}</div>
              <hr />
              {DateFormatGet(dat?.registratedAt)}
            </td>
            <td className="harakat mobile-table-none">
              <div className="icon d-flex justify-content-center align-items-center">
                <div
                  className="icon d-flex justify-content-center align-items-center">
                  <span
                    className="infoBtn bg-dark cursor-pointer"
                    title="Ko'rish"
                    data-bs-toggle="tooltip"
                    data-popup="tooltip"
                    data-bs-placement="top"
                    onClick={() => linkFunc(dat?.id)}
                  >
                    <span><i className="icon-eye2"></i></span>
                  </span>

                  {(ranks.length > 0 && ranks.includes(8)) && (
                    <Link
                      to={`/kiruvchi/sozlash/${dat?.id}/resolution`}
                      className="infoBtn bg-dark cursor-pointer"
                      data-popup="tooltip"
                      title="O'zgartirish"
                    >
                      <i className="icon-pencil5"></i>
                    </Link>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default React.memo(ResolutionAllData);