import React from "react";

const ForExcelTable = ({ forExcelData }) => {
    return (
        <table id="table-to-xls" className="table-bordered table-striped table-hover my-1 Tab w-100" style={{ display: "none" }}>
            <thead className="theadSticky">
                <tr style={{ textAlign: "center" }}>
                    <td width="64" rowSpan="3" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>№</strong>
                    </td>
                    <td width="600" rowSpan="3" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Название раздела</strong>
                    </td>
                    <td width="192" colSpan="2" rowSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Все</strong>
                    </td>
                    <td width="192" colSpan="2" rowSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Сделанный</strong>
                    </td>
                    <td width="576" height="25" colSpan="6" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Сделано поздно</strong>
                    </td>
                    <td width="192" colSpan="2" rowSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Не выполнено</strong>
                    </td>
                    <td width="192" colSpan="2" rowSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>в Процесси</strong>
                    </td>
                    <td width="576" colSpan="6" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Есть крайний срок</strong>
                    </td>
                    <td width="192" colSpan="2" rowSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Отклоненный</strong>
                    </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                    <td height="25" colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>1 день</strong>
                    </td>
                    <td colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>2-3 день</strong>
                    </td>
                    <td colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>4 (~)</strong>
                    </td>
                    <td colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>1 день</strong>
                    </td>
                    <td colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>2-3 день</strong>
                    </td>
                    <td colSpan="2" bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>4 (~)</strong>
                    </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                    <td height="25" bgcolor="#363A41" colSpan="2" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>Число</strong>
                    </td>
                    <td bgcolor="#363A41" style={{ color: "#fff", border: "1px solid silver", textAlign: "center" }}>
                        <strong>%</strong>
                    </td>
                </tr>
            </thead>

            {forExcelData?.length > 0 && forExcelData.map((items, index) => (
                <>
                    <tbody key={index} className="js-table-sections-header">
                        <tr>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{index + 1}</td>
                            <td height="35" style={{ textAlign: "left", border: "1px solid silver", height: "50px" }}>
                                <strong data-toggle="collapse" style={{ padding: "5px 0" }} href={`#route1${index}`} className="cursor-pointer monEmployee">{items.content.departmentName}</strong>
                            </td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }} colSpan="2">{items.content.allCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.doneCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.donePercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.oneDayDeferredDoneCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.oneDayDeferredDonePercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.twoThreeDayDeferredDoneCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.twoThreeDayDeferredDonePercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.moreThanFourDayDeferredDoneCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.moreThanFourDayDeferredDonePercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.notDoneCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.notDonePercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.inProcessCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.inProcessPercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainOneDayCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainOneDayPercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainTwoThreeDayCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainTwoThreeDayPercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainMoreThanFourDayCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.remainMoreThanFourDayPercentage}%</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.rejectedCount}</td>
                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.content.rejectedPercentage}%</td>
                        </tr>
                    </tbody>

                    <tbody key={forExcelData?.length + index}>
                        {items.contentList?.length > 0 && items.contentList.map((item, i) => (
                            <tr key={forExcelData?.length + index + i} className="table-color-inline">
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{i + 1}</td>
                                <td style={{ backgroundColor: "lightyellow" }}>{item?.firstName} {item?.lastName} {item?.middleName}</td>
                                <td colSpan="2" style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    <a href="https://d-doc.uz/documents/search?doc_type=1&amp;executor=RFEHA100011"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {item?.allCount}
                                    </a>
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    <a href="https://d-doc.uz/documents/search?doc_type=1&amp;executor=RFEHA100011&amp;status%5B0%5D=5"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {item?.doneCount}
                                    </a>
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.donePercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.oneDayDeferredDoneCount} </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}> {item?.oneDayDeferredDonePercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}> {item?.twoThreeDayDeferredDoneCount}</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}> {item?.twoThreeDayDeferredDonePercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.moreThanFourDayDeferredDoneCount} </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}> {item?.moreThanFourDayDeferredDonePercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    <a href="https://d-doc.uz/documents/search?doc_type=1&amp;executor=RFEHA100011&amp;status%5B0%5D=4"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {item?.notDoneCount}
                                    </a>
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.notDonePercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    <a href="https://d-doc.uz/documents/search?doc_type=1&amp;executor=RFEHA100011&amp;status%5B0%5D=0&amp;status%5B1%5D=1"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {item?.inProcessCount}
                                    </a>
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.inProcessPercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.remainOneDayCount}</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.remainOneDayPercentage}%</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.remainTwoThreeDayCount}</td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.remainTwoThreeDayPercentage}%
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    {item?.remainMoreThanFourDayCount}
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.remainMoreThanFourDayPercentage}%
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>
                                    <a href="https://d-doc.uz/documents/search?doc_type=1&amp;executor=RFEHA100011&amp;status%5B0%5D=99"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {item?.rejectedCount}
                                    </a>
                                </td>
                                <td style={{ textAlign: "center", border: "1px solid silver", backgroundColor: "lightyellow" }}>{item?.rejectedPercentage}%</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            ))}
        </table>
    )
}

export default React.memo(ForExcelTable);