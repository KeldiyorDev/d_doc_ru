import React from 'react';
import { status } from '../../../component/status/Status';
import { Link, useHistory } from 'react-router-dom';
import AllFiles from './AllFiles';
import ReactPagination from '../../../component/ReactPagination';

const FoundData = ({ data, selected, handlePageClick }) => {
  const history = useHistory();

  // sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  return (
    <div className="tab-content" style={{ marginBottom: "80px" }}>
      <div className="tab-pane fade show active" id="colored-tab1">
        <div className="card">
          <div className="card-body card-body-mobile">
            {data?.content?.length > 0 && (
              <ReactPagination
                data={data}
                handlePageClick={handlePageClick}
                selected={selected}
              />
            )}
            <table className="table table-bordered my-1 table-striped table-hover Tab" >
              <thead>
                <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
                  <th style={{ width: "5%" }} className="id">№</th>
                  <th style={{ width: "10%" }} className="Fayl mobile-table-none">Файл</th>
                  <th style={{ width: "20%" }} className="korres">Корреспондент</th>
                  <th style={{ width: "25%" }} className="qisqacha mobile-table-none">краткая Информация </th>
                  <th style={{ width: "15%" }} className="reg">Рег № / Срок</th>
                  <th style={{ width: "20%" }} className="ijrochi mobile-table-none">Исполнительный</th>
                  <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Действия </th>
                </tr>
              </thead>
              <tbody>
                {data.content?.length > 0 && data.content?.map((dat, index) => (
                  <tr key={index} onClick={() => window.innerWidth <= 768 && history.push(`/kiruvchi_bajarish_ijro/${dat?.id}/bajarilgan`)} >
                    <td className="text-center id">{index + 1}</td>
                    <td className="text-color Fayl mobile-table-none"
                      style={{ wordWrap: "break-word" }}>
                      {dat?.files?.length > 0 && dat?.files?.map((hujjat, index1) => (
                        (index1 !== 0) && (
                          <div key={data.content?.length + index1}>
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
                      <div className="badge badge-primary"> № {dat?.journalNumber}</div>
                      <hr />
                      {dateFormatGet(dat?.deadline)}
                    </td>
                    <td className="text-center ijrochi ijrochi1 mobile-table-none">
                      {dat?.inExecutorShortInfoDtos?.length > 0 && dat?.inExecutorShortInfoDtos?.map((d, i) => (
                        !d.isDirect && (
                          <p key={data.content?.length + i} style={{
                            margin: "0",
                            borderColor: "#ddd",
                            height: "100%",
                            marginBottom: "5px",
                            textAlign: "left"
                          }}
                            className="d-flex align-items-center">
                            <span style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                            <span className="badge ml-1 status text-white" style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                          </p>
                        )
                      ))}
                      {dat?.inExecutorShortInfoDtos?.find((d) => d.isDirect) && (
                        <hr style={{ borderTop: "1px dashed #000" }} />
                      )}
                      {dat?.inExecutorShortInfoDtos?.length > 0 && dat?.inExecutorShortInfoDtos?.map((d, i) => (
                        d?.isDirect && (
                          <p key={data.content?.length + dat?.inExecutorShortInfoDtos?.length + i} style={{
                            margin: "0",
                            borderColor: "#ddd",
                            height: "100%",
                            textAlign: "left",
                            marginBottom: "5px"
                          }}
                            className="d-flex align-items-center">
                            <span
                              style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                            <span className="badge ml-1 status text-white"
                              style={{ backgroundColor: status.filter((s,) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                          </p>
                        )
                      ))}
                    </td>
                    <td className="harakat mobile-table-none">
                      <div className="icon d-flex justify-content-center align-items-center ">
                        <Link to={`/bosh_sahifa_ko'rish/${dat?.id}/bajarilgan`}
                          className="infoBtn bg-dark" title="Ko'rish"
                          data-bs-toggle="tooltip" data-popup="tooltip"
                          data-bs-placement="top">
                          <span><i className="icon-eye2"></i></span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data?.content?.length > 0 && (
              <ReactPagination
                data={data}
                handlePageClick={handlePageClick}
                selected={selected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FoundData);