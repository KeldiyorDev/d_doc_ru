import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { axiosInstance } from "../../../../config";

const TableDataContent = ({ allCard, data, setSelected, setData, selected, startDate, endDate, itemsPerPage, Direct, DocumentType, Correspondent }) => {
    const [count, setCount] = useState(0);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });

    // pagination
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data?.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    // kartochkani tanlaganda keladigan barcha ma'lumotlari
    const getInlineCardTypeData = async (id) => {
        setData([]);
        try {
            const res = await axiosInstance.post("monitoring/control-card-info", {
                cardTypeID: id,
                cardTypes: Direct.current.value,
                cards: DocumentType.current.value ? DocumentType.current.value : [],
                correspondents: Correspondent.current.value ? Correspondent.current.value : [],
                endDate: endDate ? new Date(endDate).toLocaleDateString() : null,
                startDate: startDate ? new Date(startDate).toLocaleDateString() : null,
                page: 0,
                orgId: JSON.parse(localStorage.getItem('oi')),
                workPlaceId: localStorage.getItem('ids')
            });
            let arr = [];
            if (res.data?.length > 0) {
                res.data.forEach((d) => {
                    arr.push(d.count);
                })
                let sum = arr.reduce((a, b) => a + b);
                setCount(sum);
                setSelected(0);
                setData(res.data);
            } else {
                Alert(setAlert, "warning", "Информация отсутствует");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePageClick = async (e) => {
        const newOffset = (e.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
        setSelected(e.selected);
    };

    return (
        <>
            <table id="myTable" className="table-bordered table-striped table-hover Tab mt-0" >
                <thead>
                    <tr className="bg-dark text-white text-center tableHeader w-100">
                        <th style={{ width: "5%" }}>№ </th>
                        <th style={{ width: "45%", textAlign: 'left' }}>Тип документа</th>
                        <th style={{ width: "50%" }}>Количество входящих документов</th>
                    </tr>
                </thead>

                {allCard?.length > 0 && allCard.map((name, index) => (
                    <>
                        <tbody key={index} className="js-table-sections-header" >
                            <tr style={{ textAlign: "center", cursor: "pointer" }} data-toggle="collapse" href={`#route1${index}`} onClick={() => getInlineCardTypeData(name.value)}>
                                <td colSpan={3} className="text-color p-2">{name.label}</td>
                            </tr>
                        </tbody>

                        {/* ichki ma'lumotlar */}
                        <tbody id={`route1${index}`} className="js-table-sections-header collapse" data-parent={`#myTable`}>
                            {currentItems?.length > 0 && currentItems.map((dat, i) => (
                                <tr key={dat?.getJournalNumber} style={{ textAlign: "center" }}>
                                    <td style={{ width: "5%" }}>{i + 1}</td>
                                    <td style={{ textAlign: "left" }}>{dat.name}</td>
                                    <td >{dat.count}</td>
                                </tr>
                            ))}
                            {currentItems?.length > 0 && (
                                <>
                                    <tr className="text-center">
                                        <td style={{ width: "5%" }}></td>
                                        <td>Jami</td>
                                        <td>{count}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}>
                                            <span className="text-center">
                                                {data?.length > 20 && (
                                                    <ReactPaginate
                                                        breakLabel="..."
                                                        nextLabel=">>"
                                                        onPageChange={handlePageClick}
                                                        pageRangeDisplayed={3}
                                                        pageCount={pageCount}
                                                        previousLabel="<<"
                                                        renderOnZeroPageCount={null}
                                                        className="paginationUL paginationULMon mt-2 "
                                                        activeClassName="active"
                                                        forcePage={selected}
                                                    />
                                                )}
                                            </span>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </>
                ))}
            </table >

            {/* alert */}
            <AlertContent alert={alert} />
        </>
    )
}

export default React.memo(TableDataContent);