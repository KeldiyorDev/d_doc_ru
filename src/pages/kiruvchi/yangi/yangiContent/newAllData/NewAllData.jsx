import React from "react";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import ReactPagination from "../../../../../component/ReactPagination";
import { axiosInstance } from "../../../../../config";
import { extensiveSearchBackPageId } from "../../../../../redux/actions/actionExtensiveSearch";

const NewAllData = ({ data, setData, dateFormatSet, selected, setSelected }) => {
  const history = useHistory()

  // sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // pagination click---------------------------------------------------------------------------
  const handlePageClick = async (e) => {
    let sana = document.querySelector('.qisqacha2').value;
    let reg = document.querySelector('.qisqacha1').value;
    let korres = document.querySelector('#xujjat').value;
    let malumot = document.querySelector('#korrespondent2').value;

    try {
      const res = await axiosInstance.post(`search/new`, {
        correspondentName: korres,
        shortDescription: malumot,
        out_number: reg ? reg : '',
        out_date: sana ? dateFormatSet(sana) : '',
        page: e.selected,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setSelected(e.selected);
  };

  const linkFunc = (id, newDocId) => {
    history.push(`/kiruvchi/y/sozlash/${id}/yangi/${newDocId}`);
    extensiveSearchBackPageId({ selected: selected, pageName: "yangiPageId" })
  }

  const linkFunc2 = (missiveId) => {
    history.push(`/kiruvchi/y/sozlash/${missiveId}`);
    extensiveSearchBackPageId({ selected: selected, pageName: "yangiPageId" })
  }

  return (
    <>
      {/* {data.content?.length > 0 && (
        <ReactPaginate
          previousLabel="<<"
          nextLabel=">>"
          pageCount={data.totalElements / 20}
          breakLabel="..."
          className="paginate"
          activeClassName="active"
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={selected}
        />
      )} */}
      <table id="myTable" className="table table-bordered table-striped table-hover Tab my-1" >
        <thead className="theadSticky">
          <tr className="bg-dark text-white NavLink text-center" style={{ height: "45px" }}>
            <th style={{ width: "5%" }} className="id">№</th>
            <th style={{ width: "20%" }} className="xujjat mobile-table-none">тип документа</th>
            <th style={{ width: "25%" }} className="korres">Корреспондент</th>
            <th style={{ width: "30%" }} className="qisqacha mobile-table-none">Краткая информация</th>
            <th style={{ width: "15%" }} className="chiquvchi">Исходящий № / Дата</th>
            <th style={{ width: "5%" }} className="text-center harakat mobile-table-none">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.map((dat, index) => (
            <tr
              key={index}
              id="kor"
              onClick={() => window.innerWidth <= 768 && history.push(`/kiruvchi_bajarish_ijro/${dat?.id}/yangi`)}
            >
              <td className="text-center id">{index + 1}</td>
              <td className="text-color xujjat mobile-table-none" id='xujjat' style={{ cursor: "pointer", wordWrap: "break-word" }}>
                {dat?.card?.cardName}
              </td>
              <td style={{ textAlign: "justify", wordWrap: "break-word" }} className="korres" id='td'>
                {dat?.correspondentName}
              </td>
              <td id="qs" className="qisqacha mobile-table-none" style={{ wordWrap: "break-word" }}>
                {dat?.shortDescription}
              </td>
              <td className="text-center chiquvchi">
                <div className="badge badge-primary">№ {dat?.journalNumber}</div>
                <hr />
                {dateFormatGet(dat?.outDate)}
              </td>
              <td className="harakat mobile-table-none">
                <div className="icon d-flex justify-content-center align-items-center">
                  <span
                    className="infoBtn bg-dark cursor-pointer"
                    data-popup="tooltip"
                    title="O'zgartirish"
                    onClick={() => {dat?.id ? linkFunc(dat?.id, dat?.newDocId) : linkFunc2(dat?.missiveId)}}
                  >
                    <i className="icon-pencil5"></i>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {data.content?.length > 0 && (
        <ReactPaginate
          previousLabel="<<"
          nextLabel=">>"
          pageCount={data.totalElements / 20}
          breakLabel="..."
          className="paginate"
          activeClassName="active"
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={selected}
        />
      )} */}
    </>
  )
}

export default React.memo(NewAllData);