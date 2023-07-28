import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useHistory } from "react-router-dom";
import { status } from "../../../../../component/status/Status";
import { axiosInstance } from "../../../../../config";

export default function FuqaroCompleteAllData({ data, setData, currentUser, dateFormatSet, AppealTypeRef, ApplicantNameRef, RegNumberRef, startDate }) {
  const [selected, setSelected] = useState(0);
  const history = useHistory();

  // sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4);
  }

  // pagination click---------------------------------------------------------------------------
  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post(`search/forDoing`, {
        appealTypeID: AppealTypeRef.current.props.value?.value,
        applicantName: ApplicantNameRef.current?.value,
        date: startDate,
        reg_number: RegNumberRef.current?.value,
        page: e.selected,
        workPlaceID: JSON.parse(localStorage.getItem('ids')),
      })
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
    setSelected(e.selected);
  };

  return (
    <>
      {data?.content?.length > 0 && (
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
      <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab" >
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th id='tabRow' style={{ width: "3%" }} className="id">№</th>
            <th style={{ width: "10%" }} className="qabul">QABUL QILISH TURI</th>
            <th style={{ width: "10%" }} className="ariza">ARIZA BERUVCHI</th>
            <th style={{ width: "10%" }} className="mur">MUROJAAT YO'NALISHI</th>
            <th style={{ width: "30%" }} className="qisqacha">QISQACHA MAZMUNI</th>
            <th style={{ width: "7%" }} className="reg">REG № / SANA</th>
            <th style={{ width: "15%" }} className="ijrochi">IJROCHI</th>
            <th className="text-center harakat">HARAKATLAR</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.length > 0 && data?.content?.map((dat, index) => (
            <tr key={index} onClick={() => window.innerWidth <= 768 && history.push(`/fuqaro/murojati/bajarish_ijro/${dat?.id}/bajarish`)}>
              <td className="text-center id">{index + 1}</td>
              <td className={'text-center qabul'}>{dat.User.firstName} {dat.User.lastName}</td>
              <td className={'text-center ariza'}>{dat?.murojatUser}</td>
              <td className="mur text-center" style={{ wordWrap: "break-word" }}>{dat?.correspondentName}</td>
              <td style={{ textAlign: "justify", wordWrap: "break-word" }} className="qisqacha mobile-table-none text-center">
                {dat?.shortDescription}
              </td>
              <td className="text-center chiquvchi reg">
                <div className="badge badge-primary">№ {dat?.journalNumber}</div>
                <hr />
                {dateFormatGet(dat?.deadline)}
              </td>
              <td className="text-center ijrochi mobile-table-none">
                {dat?.inExecutorShortInfoDtos?.length > 0 && dat?.inExecutorShortInfoDtos?.map((d, i) => (
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
                        style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                      <span className="badge ml-1 status text-white"
                        style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    </p>
                  )
                ))}
                {dat?.inExecutorShortInfoDtos?.find((d) => d?.isDirect) && (
                  <hr style={{ borderTop: "1px dashed #000" }} />
                )}
                {dat?.inExecutorShortInfoDtos?.length > 0 && dat?.inExecutorShortInfoDtos?.map((d, i) => (
                  d?.isDirect && (
                    <p key={i} style={{
                      margin: "0",
                      borderColor: "#ddd",
                      height: "100%",
                      textAlign: "left",
                      marginBottom: "5px"
                    }}
                      className="d-flex align-items-center">
                      <span style={{ fontSize: "14px" }}>{(d?.firstName && d?.firstName.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""} {d?.lastName}</span>
                      <span className="badge ml-1 status text-white" style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                    </p>
                  )
                ))}
              </td>
              <td className="harakat mobile-table-none">
                <div className="icon d-flex justify-content-center align-items-center ">
                  <Link to={`/fuqaro/murojati/bajarish_ijro/${dat?.id}`}
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