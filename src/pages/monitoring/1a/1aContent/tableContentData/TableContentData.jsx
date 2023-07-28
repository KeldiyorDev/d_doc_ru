import React, { useEffect, useState, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { axiosInstance } from "../../../../../config";

const TableContentData = ({ data, setSelected, setData, inlineDoc, setInlineDoc, selected, startDate, endDate, Direct, CardType, DocumentType }) => {
  let [countColumn, setCountColumn] = useState(0);

  // tableni keladigan malumotga qarab yasash
  useEffect(() => {
    let isMounted = true;

    if (data.cardTypeIncludesCardsDTOs?.length > 0) {
      let c = 0;
      data.cardTypeIncludesCardsDTOs.forEach((d) => {
        c += d.cardShortInfoDTOs?.length;
      })

      if (isMounted)
        setCountColumn(c);
    }

    return () => {
      isMounted = false;
    }
  }, [data]);

  // kartochkani tanlaganda keladigan barcha ma'lumotlari
  const getInlineCardTypeData = useCallback(async (departmentId) => {
    setInlineDoc([]);
    try {
      const res = await axiosInstance.post("monitoring/higher-organization/employee", {
        cardTypeID: CardType.current.props.value?.value,
        departmentID: departmentId,
        cardTypes: Direct.current.value?.length > 0 ? Direct.current.value : [],
        cards: DocumentType.current.value ? DocumentType.current.value : [],
        endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
        startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
        page: 0,
        orgId: JSON.parse(localStorage.getItem('oi')),
        workPlaceId: localStorage.getItem('ids')
      });
      setInlineDoc(res.data);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInlineDoc]);

  const handlePageClick = useCallback(async (e) => {
    try {
      const res = await axiosInstance.post(`monitoring/higher-organization`, {
        cardTypeID: CardType.current.props.value?.value,
        cardTypes: Direct.current.value?.length > 0 ? Direct.current.value : [],
        cards: DocumentType.current.value ? DocumentType.current.value : [],
        correspondents: [],
        endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
        startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
        page: e.selected,
        orgId: JSON.parse(localStorage.getItem('oi')),
        workPlaceId: localStorage.getItem('ids')
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setSelected(e.selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData, setSelected]);

  return (
    <>
      {/* data.cards?.length < 12 ? "1800px" : "2600px" width: "150%"*/}
      <table id="myTable1" className="table-bordered table-striped table-hover Tab my-1" style={{ width: data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 <= 18 ? "100%" : (data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 > 18 && data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 <= 30) ? "100%" : (data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 > 30 && data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 <= 50) ? "3000px" : (data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 > 50 && data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2 <= 82) ? "4700px" : "5000px" }}>
        <thead className="myTableHead">
          <tr className="bg-dark tableHeader ">
            <th rowSpan={5} style={{ width: "3%" }}>№</th>
            <th rowSpan={5} style={{ width: "25%" }}>Kotibiyatlar</th>
            <th rowSpan={3} style={{ width: "8%" }}>Jami kelgan hujjatlar</th>
            <th colSpan={data.cardTypeIncludesCardsDTOs?.length * 2 + countColumn * 2}>SHUNDAN</th>
          </tr>
          <tr className="bg-dark tableHeader">
            {data.cardTypeIncludesCardsDTOs?.length > 0 && data.cardTypeIncludesCardsDTOs.map((dat, index) => (
              <>
                <th key={index} rowSpan={2} style={{ width: "8%" }}>{dat.cardTypeName}</th>
                <th rowSpan={2} style={{ width: "8%" }}>Jamiga nisbatan % hisobidan</th>
                {/* <th colSpan={countColumn * 2}>Shu jumladan</th> */}
                {dat.cardShortInfoDTOs?.length > 0 && dat.cardShortInfoDTOs.map((d) => (
                  <th key={Math.random() * 10000} className="rotateTd" colSpan={2} style={{ writingMode: "vertical-lr", padding: "15px", height: "350px", wordBreak: "break-word" }}>{d.cardName}</th>
                ))}
              </>
            ))}
          </tr>

          <tr className="bg-dark tableHeader">
            {data.cardTypeIncludesCardsDTOs?.length > 0 && data.cardTypeIncludesCardsDTOs.map((dat) => (
              dat.cardShortInfoDTOs?.length > 0 && dat.cardShortInfoDTOs.map((d, i) => (
                <th key={Math.random() * 10000} colSpan={2}>{i + 1}</th>
              ))
            ))}
          </tr>

          <tr className="bg-dark tableHeader">
            <th rowSpan={2}>Soni</th>
            {data.cardTypeIncludesCardsDTOs?.length > 0 && data.cardTypeIncludesCardsDTOs.map((dat) => (
              <>
                <th key={Math.random() * 10000} rowSpan={2}>Soni</th>
                <th key={Math.random() * 10000} rowSpan={2}>%</th>
                {dat.cardShortInfoDTOs?.length > 0 && dat.cardShortInfoDTOs.map((d, i) => (
                  <>
                    <th key={Math.random() * 10000} rowSpan={2}>Soni</th>
                    <th key={Math.random() * 10000} rowSpan={2}>%</th>
                  </>
                ))}
              </>
            ))}
          </tr>
        </thead>

        {data.responsePage2?.content?.length > 0 && data.responsePage2.content.map((dat, index) => (
          <>
            <tbody key={Math.random() * 100000 + index} className="js-table-sections-header " >
              <tr style={{ fontSize: "13px" }}>
                <td style={{ width: "3%", textAlign: "center" }}>{index + 1}</td>
                <td style={{ cursor: "pointer" }} data-toggle="collapse" href={`#route1${index}`} onClick={() => getInlineCardTypeData(dat.departmentID)}>{dat.departmentName}</td>
                <td style={{ textAlign: "center" }}>{dat.allCount}</td>
                {dat.cardTypesMonitoring?.length > 0 && dat.cardTypesMonitoring.map((d) => (
                  <>
                    <td style={{ textAlign: "center" }}>{d.documentCountByCardType}</td>
                    <td style={{ textAlign: "center" }}>{d.documentCountByCardTypePercentage}%</td>
                    {d.cardsMonitoring?.length > 0 && d.cardsMonitoring.map((k) => (
                      <>
                        <td style={{ textAlign: "center" }} key={Math.random() * 100000}>{k.count}</td>
                        <td style={{ textAlign: "center" }} key={Math.random() * 100000}>{k.percentage}%</td>
                      </>
                    ))}
                  </>
                ))}
              </tr>
            </tbody>

            <tbody id={`route1${index}`} className="collapse" data-parent={`#accordion-default`}>
              {inlineDoc?.length > 0 && inlineDoc.map((d, i) => (
                <tr key={Math.random() * 100000 + i} style={{ fontSize: "13px" }} className="table-color-inline">
                  <td style={{ width: "3%", textAlign: "center" }}>{i + 1}</td>
                  <td style={{ cursor: "pointer" }}>{d.firstName} {d.lastName} {d.middleName}</td>
                  <td style={{ textAlign: "center" }}>{d.allCount}</td>
                  {d.cardTypesMonitoring?.length > 0 && d.cardTypesMonitoring.map((f) => (
                    <>
                      <td key={Math.random() * 100000} style={{ textAlign: "center" }}>{f.documentCountByCardType}</td>
                      <td key={Math.random() * 100000} style={{ textAlign: "center" }}>{f.documentCountByCardTypePercentage}%</td>
                      {f.cardsMonitoring?.length > 0 && f.cardsMonitoring.map((m) => (
                        <>
                          <td key={Math.random() * 100000 + i} style={{ textAlign: "center" }}>{m.count}</td>
                          <td key={Math.random() * 100000 + i} style={{ textAlign: "center" }}>{m.percentage}%</td>
                        </>
                      ))}
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        ))}
      </table>
      {(data && data.responsePage2?.content?.length > 0) && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(data.responsePage2?.totalElements / 10)}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          className="paginationUL mt-2 "
          activeClassName="active"
          forcePage={selected}
        />
      )}
    </>
  )
}

export default React.memo(TableContentData);