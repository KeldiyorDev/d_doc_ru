import React, { useCallback, useRef } from "react";
import ReactPaginate from "react-paginate";
import { axiosInstance } from "../../../../config";
import Loader from '../../../../component/loader/Loader';

const MonitoringKiruvchiTable = ({ data, selected, setData, setSelected, cardsName1, cardKor, departmentsIds, startDate, endDate, setDepartmentId, employeeData, setEmployeeData }) => {
    const loader = useRef();

    const handlePageClick = useCallback(async (e) => {
        setData({});
        loader.current.style.display = "flex";
        try {
            const res = await axiosInstance.post(`monitoring/income`, {
                cards: cardsName1 ? cardsName1 : [],
                correspondents: cardKor ? cardKor : [],
                endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
                startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
                page: e.selected,
                orgId: JSON.parse(localStorage.getItem('oi')),
                workPlaceId: localStorage.getItem('ids')
            })
            loader.current.style.display = "none";
            setData(res.data);
        } catch (error) {
            console.log(error.response);
        }
        setSelected(e.selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setSelected, setData]);

    // bo'limni bosganda malumotlarni olish
    const getEmployeeMonitoring = async (departmentId) => {
        setEmployeeData([]);
        if (!departmentsIds.includes(departmentId)) {
            try {
                const res = await axiosInstance.post("monitoring/income/department", {
                    departmentID: departmentId,
                    cards: cardsName1 ? cardsName1 : [],
                    correspondents: cardKor ? cardKor : [],
                    endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
                    startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
                    page: selected,
                    orgId: JSON.parse(localStorage.getItem('oi')),
                    workPlaceId: localStorage.getItem('ids')
                });
                departmentsIds[0] = departmentId;
                setEmployeeData(res.data);
                setDepartmentId(departmentId);
            } catch (error) {
                console.log(error);
            }
        } else {
            departmentsIds.pop();
            setDepartmentId(null);
        }
    };

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
                    className="paginationUL mt-2"
                    activeClassName="active"
                    forcePage={selected}
                />
            )}
            <div id="accordion-default" className="block">
                <div >
                    {data.content?.length > 0 && (
                        <table id="table-to-xls-no" className="table-bordered table-striped table-hover my-1 Tab w-100">
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
                                        <strong>В Прогресси</strong>
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

                            {data.content.map((items, index) => (
                                <>
                                    <tbody key={index} className="js-table-sections-header">
                                        <tr>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{index + 1}</td>
                                            <td height="35" style={{ textAlign: "left", border: "1px solid silver" }}>
                                                <strong data-toggle="collapse" href={`#route1${index}`} className="cursor-pointer monEmployee" onClick={() => getEmployeeMonitoring(items.departmentID)}>{items.departmentName}</strong>
                                            </td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }} colSpan="2">{items.allCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.doneCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.donePercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.oneDayDeferredDoneCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.oneDayDeferredDonePercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.twoThreeDayDeferredDoneCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.twoThreeDayDeferredDonePercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.moreThanFourDayDeferredDoneCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.moreThanFourDayDeferredDonePercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.notDoneCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.notDonePercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.inProcessCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.inProcessPercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainOneDayCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainOneDayPercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainTwoThreeDayCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainTwoThreeDayPercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainMoreThanFourDayCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.remainMoreThanFourDayPercentage}%</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.rejectedCount}</td>
                                            <td style={{ textAlign: "center", border: "1px solid silver" }}>{items.rejectedPercentage}%</td>
                                        </tr>
                                    </tbody>

                                    <tbody key={data.content?.length + index} id={`route1${index}`} className="collapse" data-parent={`#accordion-default`}>
                                        {employeeData?.length > 0 && employeeData.map((item, i) => (
                                            <tr key={Math.random() * 100000} className="table-color-inline">
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
                    )}
                </div>
            </div>
            {
                data.content?.length > 0 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={Math.ceil(data?.totalElements / 20)}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className="paginationUL mt-2"
                        activeClassName="active"
                        forcePage={selected}
                    />
                )
            }

            {/* loader */}
            <Loader loader={loader} />
        </>
    )
}

export default React.memo(MonitoringKiruvchiTable);