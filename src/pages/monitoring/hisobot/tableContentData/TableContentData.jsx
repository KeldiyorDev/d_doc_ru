import React, { useEffect, useState } from "react";

const TableContentData = ({ data }) => {
  const [countColumn, setCountColumn] = useState(0);

  // tableni keladigan malumotga qarab yasash
  useEffect(() => {
    let isMounted = true;

    if (data.bodies?.length > 0) {
      let c = 0;
      for (let i = 0; i < data.bodies.length; i++) {
        for (let j = 0; j < data.bodies[i].cardDocumentCount.length; j++) {
          c += data.bodies[i].cardDocumentCount[j].departmentDocumentCount.length;
          break;
        }
        break;
      }
      if (isMounted)
        setCountColumn(c);
    }

    return () => {
      isMounted = false;
    }
  }, [data]);

  return (
    <table id="myTable1" className="table-bordered table-striped table-hover Tab mb-2 w-100" style={{ width: countColumn <= 28 ? "130%" : (countColumn > 28 && countColumn <= 40) ? "160%" : (countColumn > 40 && countColumn <= 52) ? "190%" : (countColumn > 52 && countColumn <= 70) ? "220%" : "250%" }} >
      <thead className="myTableHead theadSticky">
        <tr className="bg-dark tableHeader">
          <th style={{ width: "40px" }} rowSpan={3}>№</th>
          <th rowSpan={3}>Hujjat turi</th>
          <th>{data.header?.orgName}</th>
          {data.header?.departments?.length > 0 && data.header.departments.map((dat, index) => (
            <th key={index} className="rotateTd" style={{ writingMode: "vertical-lr", padding: "15px", height: "350px", wordBreak: "break-word" }}>{dat.name}</th>
          ))}
        </tr>
        <tr className="bg-dark tableHeader">
          <th>1</th>
          {data.header?.departments?.length > 0 && data.header.departments.map((dat, index) => (
            <th key={index}>{index + 2}</th>
          ))}
        </tr>
        <tr className="bg-dark tableHeader ">
          <th>Soni</th>
          {data.header?.departments?.length > 0 && data.header.departments.map((dat, index) => (
            <th key={index}>Soni</th>
          ))}
        </tr>
      </thead>

      {data.bodies?.length > 0 && data.bodies.map((dat, index) => (
        <>
          <tbody key={Math.random() * 100000 + index}  >
            <tr className="table-color-inline">
              <td style={{ textAlign: "center" }} colSpan={2}>Nazorat kartochkasi {dat.parentCardTypeName} | <strong>Jami:</strong></td>
              {dat.departmentDocumentCounts?.length > 0 && dat.departmentDocumentCounts.map((s) => (
                <td style={{ textAlign: "center" }}>{s.count}</td>
              ))}
            </tr>
          </tbody>
          {dat.cardDocumentCount?.length > 0 && dat.cardDocumentCount.map((d, i) => (
            <tbody key={Math.random() * 100000 + index} className="js-table-sections-header">
              <tr>
                <td>{i + 1}</td>
                <td>{d.cardName}</td>
                <td style={{ textAlign: 'center' }}>{d.orgDocumentCount}</td>
                {d.departmentDocumentCount?.length > 0 && d.departmentDocumentCount.map((f) => (
                  <td key={Math.random() * 100000 + index} style={{ textAlign: 'center' }}>{f.count}</td>
                ))}
              </tr>
            </tbody>
          ))
          }
        </>
      ))}
    </table>
  )
}

export default React.memo(TableContentData);