import React from "react";
import { useHistory } from "react-router-dom";
import { status } from '../../../../../component/status/Status';
import AllFiles from "../../../../../component/AllFiles";
import { ShortUser } from "../../../../../component/ShortUser";
import { DateFormatGet } from "../../../../../component/DateFormat";

const DelayAllData = ({ data, linkFunc }) => {
  const history = useHistory();

  return (
    <table className="table table-bordered my-1 table-striped table-hover Tab" id="myTable" >
      <thead className="theadSticky">
        <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
          <th style={{ width: "5%" }} className="id">№</th>
          <th style={{ width: "10%" }} className="Fayl xujjat mobile-table-none">Файл</th>
          <th style={{ width: "20%" }} className="korres">Корреспондент</th>
          <th style={{ width: "25%" }} className="qisqacha mobile-table-none">Краткая информация</th>
          <th style={{ width: "15%" }} className="reg">Рег № / Срок</th>
          <th style={{ width: "20%" }} className="ijrochi mobile-table-none">Исполнительный</th>
          <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Дейтвия</th>
        </tr>
      </thead>
      <tbody>
        {data.content?.length > 0 && data.content.map((dat, index) => (
          <tr key={dat.id} onClick={() => window.innerWidth <= 768 && history.push(`/kiruvchi_bajarish_ijro/${dat?.id}/bajarilmagan`)}>
            <td className="text-center id">{index + 1}</td>
            <td className="text-color xujjat Fayl mobile-table-none" style={{ wordWrap: "break-word" }} >
              {dat?.files?.length > 0 && dat.files.map((hujjat, index1) => (
                (index1 !== 0) && (
                  <div key={hujjat.id + index1}>
                    <AllFiles
                      hujjat={hujjat}
                    />
                  </div>
                )
              ))}
            </td>
            <td className="korres" style={{ wordWrap: "break-word" }}>{dat?.correspondentName}</td>
            {/* <!-- so'zlar 200ta chiqadi --> */}
            <td style={{ textAlign: "justify", wordWrap: "break-word" }} className="qisqacha mobile-table-none">
              {dat?.shortDescription}
            </td>
            <td className="text-center chiquvchi reg">
              <div className="badge badge-primary">№ {dat?.journalNumber}</div>
              <hr />
              {DateFormatGet(dat?.deadline)}
            </td>
            <td className="text-center ijrochi ijrochi1 mobile-table-none">
              {dat?.inExecutorShortInfoDtos?.length > 0 && dat.inExecutorShortInfoDtos.map((d, i) => (
                !d.isDirect && (
                  <p key={i} style={{ margin: "0", borderColor: "#ddd", height: "100%", marginBottom: "5px", textAlign: "left" }}
                    className="d-flex align-items-center">
                    <span style={{ fontSize: "14px" }}>
                      {ShortUser(d?.firstName.trim(), d?.lastName.trim()).toUpperCase()}
                    </span>
                    <span className="badge ml-1 status text-white"
                      style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    {/* {d.isResponsible && (
                        <span className="badge ml-1 status text-white bg-success"><i className="fas fa-check"></i></span>
                      )} */}
                  </p>
                )
              ))}
              {dat?.inExecutorShortInfoDtos?.find((d) => d?.isDirect) && (
                <hr style={{ borderTop: "1px dashed #000" }} />
              )}
              {dat?.inExecutorShortInfoDtos?.length > 0 && dat.inExecutorShortInfoDtos.map((d, i) => (
                d?.isDirect && (
                  <p key={i} style={{ margin: "0", borderColor: "#ddd", height: "100%", textAlign: "left", marginBottom: "5px" }}
                    className="d-flex align-items-center">
                    <span style={{ fontSize: "14px" }}>
                      {ShortUser(d?.firstName.trim(), d?.lastName.trim()).toUpperCase()}
                    </span>
                    <span className="badge ml-1 status text-white"
                      style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    {/* {d.isResponsible && (
                        <span className="badge ml-1 status text-white bg-success"><i className="fas fa-check"></i></span>
                      )} */}
                  </p>
                )
              ))}
            </td>
            <td className="harakat mobile-table-none">
              <div className="icon d-flex justify-content-center align-items-center ">
                <span className="infoBtn bg-dark cursor-pointer" title="Ko'rish" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" onClick={() => linkFunc(dat?.id)}>
                  <span><i className="icon-eye2"></i></span>
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default React.memo(DelayAllData);