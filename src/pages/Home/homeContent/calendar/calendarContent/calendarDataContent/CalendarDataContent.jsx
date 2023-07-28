import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { status, statusTabName } from "../../../../../../component/status/Status";
import { url } from "../../../../../../config";
import { OPEN_MODAL } from "../../../../../../context/AuthReducer";

const CalendarDataContent = ({ data, permission, handlePageClick, selected }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  return (
    <>
      {data.content?.length > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(data?.totalElements / 20)}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          className="paginationUL"
          activeClassName="active"
          forcePage={selected}
        />
      )}
      <table className="table table-bordered my-1 table-striped table-hover Tab" id="myTable">
        <thead>
          <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
            <th style={{ width: "5%" }} className="id">№</th>
            <th style={{ width: "10%" }} className="xujjat mobile-table-none">Fayl</th>
            <th style={{ width: "20%" }} className="korres">Korrespondent</th>
            <th style={{ width: "25%" }} className="qisqacha mobile-table-none">Qisqacha Ma'lumot</th>
            <th style={{ width: "15%" }} className="reg">Reg № / Muddati</th>
            <th style={{ width: "20%" }} className="ijrochi mobile-table-none">Ijrochi</th>
            <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Harakatlar</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((tableItem, index) => (
            <tr
              key={index}
              onClick={() => window.innerWidth <= 768 && history.push(permission ? `/bosh_sahifa_ko'rish/${tableItem?.id}/vazifalarim` : tableItem?.tabName === "SUPER_VISOR" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/nazorat` : tableItem?.tabName === "GENERALLER" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/umumlashtiruvchi` : tableItem?.tabName === "FOR_DOING" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarish` : tableItem?.tabName === "REJECTED" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/radEtilgan` : tableItem?.tabName === "NOT_DONE" ? `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarilmagan` : `/kiruvchi_bajarish_ijro/${tableItem?.id}/malumot`)}
            >
              <td className="text-center id">{index + 1}</td>
              <td className="text-color xujjat Fayl mobile-table-none" style={{ wordBreak: "break-all" }}>
                {tableItem?.files?.length > 0 && tableItem?.files?.map((hujjat, index) => (
                  <p key={index}>
                    {hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                      <span
                        className="d-flex align-items-center cursor-pointer mb-1">
                        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon"
                          style={{ fontSize: "20px" }} />
                        <a className="pt-1"
                          href={url + "/api/file/view/" + hujjat?.generatedName}
                          target="_blank" rel="noopener noreferrer">PDF FILE</a>
                      </span>
                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                      <span
                        className="d-flex align-items-center cursor-pointer mb-1">
                        <i className="far fa-file-word mr-1 fa-2x wordIcon"
                          style={{ fontSize: "20px" }} />
                        <a className="pt-1"
                          href={url + "/api/file/view/" + hujjat?.generatedName}
                          target="_blank" rel="noopener noreferrer">WORD FILE</a>
                      </span>
                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                      <span
                        className="d-flex align-items-center cursor-pointer mb-1">
                        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                          style={{ fontSize: "20px" }} />
                        <a className="pt-1"
                          href={url + "/api/file/view/" + hujjat?.generatedName}
                          target="_blank" rel="noopener noreferrer">EXCEL FILE</a>
                      </span>
                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                      <span
                        className="d-flex align-items-center cursor-pointer mb-1">
                        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                          style={{ fontSize: "20px" }} />
                        <a className="pt-1"
                          href={url + "/api/file/view/" + hujjat?.generatedName}
                          target="_blank" rel="noopener noreferrer">POWERPOINT FILE</a>
                      </span>
                    ) : (
                      <span
                        className="d-flex align-items-center cursor-pointer mb-1">
                        <i className="far fa-file-archive mr-1 fa-2x rarIcon"
                          style={{ fontSize: "20px" }}></i>
                        <a className="pt-1"
                          href={url + "/api/file/view/" + hujjat?.generatedName}
                          target="_blank" rel="noopener noreferrer">ZIP, RAR FILE</a>
                      </span>
                    )}
                  </p>
                ))}
              </td>
              <td className="text-center korres" style={{ wordBreak: "break-all" }}>{tableItem?.correspondentName}</td>
              <td className="text-center qisqacha mobile-table-none" style={{ wordBreak: "break-all" }}>{tableItem?.shortDescription}</td>
              <td className="text-center reg">
                <span className={'badge badge-primary'}>№ {tableItem?.journalNumber}</span>
                <hr />
                <span>{dateFormatGet(tableItem?.deadline)}</span>
              </td>

              <td className="text-center ijrochi ijrochi1 mobile-table-none">
                {tableItem?.inExecutorShortInfoDtos?.length > 0 && tableItem?.inExecutorShortInfoDtos?.map((d, i) => (
                  !d.isDirect && (
                    <p key={i}
                      style={{
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
                        style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                      <span className="badge ml-1 status text-white"
                        style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    </p>
                  )
                ))}
              </td>
              <td className="harakat mobile-table-none">
                <div className="icon d-flex justify-content-center align-items-center ">
                  {/* <Link to={permission ? `/bosh_sahifa_ko'rish/${tableItem?.id}/bajarilgan` : `/kiruvchi_bajarish_ijro/${tableItem?.id}/bajarilgan`} */}
                  <Link onClick={() => dispatch(OPEN_MODAL(true))} to={`/kiruvchi_bajarish_ijro/${tableItem?.id}/${statusTabName.find((s) => s.englishName === tableItem.tabName).LatinName}`}
                    className="infoBtn bg-dark" title="Ko'rish"
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top"
                  >
                    <span><i className="icon-eye2" /></span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.content?.length > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(data?.totalElements / 20)}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          className="paginationUL"
          activeClassName="active"
          forcePage={selected}
        />
      )}
    </>
  )
}

export default React.memo(CalendarDataContent);