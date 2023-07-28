import React, {useState, useEffect, useRef} from "react";
import NavbarFuqaroMurojat from "../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import {axiosInstanceFq} from "../../../../config";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const FuqaroResolutionContent = ({currentUser, permission, ranks}) => {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(0);
    const [qabulTuri, setQabulTuri] = useState([]);
    const [murojaatTuri, setMurojaatTuri] = useState([]);
    const ReceptionTypeRef = useRef();
    const ApplicantNameRef = useRef();
    const AppealTypeRef = useRef();

    // qabul qilish turlarini o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getReception = async () => {
            try {
                const res = await axiosInstanceFq.get("reception-type");
                let arr = [];
                res.data.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })
                if (isMounted)
                    setQabulTuri(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getReception();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // murojaat turlarini o'qib olish
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("appeal-types");
                let arr = [];
                res.data.data.forEach((d) => {
                    arr.push({value: d.id, label: d.name});
                })
                if (isMounted)
                    setMurojaatTuri(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    // apidagi sanani formatlash
    const dateFormatGet = (date) => {
        return date?.slice(8, date?.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
    }

    // barcha malumotni o'qib olish
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceFq.post(`appeal/resolution/${JSON.parse(localStorage.getItem('oi'))}`, {
                    receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
                    appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
                    name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
                    page: 0,
                    workPlaceID: JSON.parse(localStorage.getItem('ids')),
                })
                // console.log(res.data.data)
                if (isMounted)
                    setData(res.data.data);
            } catch (err) {
                setData([])
                console.log(err);
            }
        }
        getData()

        return () => {
            isMounted = false;
        }
    }, [currentUser])

    const All = async () => {
        try {
            const res = await axiosInstanceFq.post(`appeal/resolution/${JSON.parse(localStorage.getItem('oi'))}`, {
                receptionTypeID: '%%',
                appealTypeID: '%%',
                name: '%%',
                page: 0,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
            })
            setSelected(0);
            setData(res.data.data);
        } catch (error) {
            setData([])
            console.log(error.response);
        }
    }

    const SearchData = async () => {
        try {
            const res = await axiosInstanceFq.post(`appeal/resolution/${JSON.parse(localStorage.getItem('oi'))}`, {
                receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
                appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
                name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
                page: 0,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
            })
            setData(res.data.data);
        } catch (error) {
            console.log(error.response);
            setData([])
        }
    }

    const handlePageClick = async (e) => {
        try {
            const res = await axiosInstanceFq.post(`appeal/resolution/${JSON.parse(localStorage.getItem('oi'))}`, {
                receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
                appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
                name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
                page: e.selected,
                workPlaceID: JSON.parse(localStorage.getItem('ids')),
            })
            setData(res.data.data);
        } catch (error) {
            console.log(error);
            setData([])
        }
        setSelected(e.selected);
    }

    // ijrocontent yo'naltirganlar uchun commentni yashirish va ko'rsatish
    useEffect(() => {
        let isMounted = true;
        let trNumberRedirect = document.querySelectorAll('.trNumberRedirect');
        let IzohTashqiTopshiriqBlockY = document.querySelectorAll('.IzohTashqiTopshiriqBlockY');
        let IzohTashqiTopshiriqNoneY = document.querySelectorAll('.IzohTashqiTopshiriqNoneY');

        // ichki topshiriqning commentini yashirish yoki ko'rsatish
        if (isMounted) {
            trNumberRedirect?.forEach((d) => {
                d.querySelector('.IzohIchkiTopshiriqNoneY')?.addEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
                })
                d.querySelector('.IzohIchkiTopshiriqBlockY')?.addEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
                })
            })

            // tashqi topshiriqning commentini yashirish yoki ko'rsatish
            IzohTashqiTopshiriqBlockY.forEach((d, i) => {
                d.addEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "block";
                    IzohTashqiTopshiriqBlockY[i].style.display = "none";
                })
            })
            IzohTashqiTopshiriqNoneY.forEach((d, i) => {
                d.addEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "none";
                    IzohTashqiTopshiriqBlockY[i].style.display = "block";
                })
            })
        }

        return () => {
            trNumberRedirect?.forEach((d) => {
                d.querySelector('.IzohIchkiTopshiriqNoneY')?.removeEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
                })
                d.querySelector('.IzohIchkiTopshiriqBlockY')?.removeEventListener('click', () => {
                    d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
                    d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
                })
            })

            IzohTashqiTopshiriqBlockY.forEach((d, i) => {
                d.removeEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "block";
                    IzohTashqiTopshiriqBlockY[i].style.display = "none";
                })
            })
            IzohTashqiTopshiriqNoneY.forEach((d, i) => {
                d.removeEventListener('click', () => {
                    IzohTashqiTopshiriqNoneY[i].style.display = "none";
                    IzohTashqiTopshiriqBlockY[i].style.display = "block";
                })
            })
            isMounted = false;
        }
    }, [data]);

    return (
        <div className="content content-mobile mb-5">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase"}}>Rezolutsiya</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <NavbarFuqaroMurojat currentUser={currentUser} permission={permission} ranks={ranks}/>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile" style={{padding: "20px 20px"}}>
                                <table className={'table-sm-full'}>
                                    <thead>
                                    <tr className={'direction-mobile fMurojaati'}>
                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <Select
                                                    options={qabulTuri}
                                                    isClearable={true}
                                                    ref={ReceptionTypeRef}
                                                    placeholder="Qabul qilish turi"
                                                />
                                                <div className="invalid-feedback">
                                                    Maydonni tanlang
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <Select
                                                    options={murojaatTuri}
                                                    placeholder="Murojaat turi"
                                                    isClearable={true}
                                                    ref={AppealTypeRef}
                                                />
                                                <div className="invalid-feedback">
                                                    Maydonni tanlang
                                                </div>
                                            </div>
                                        </th>
                                        <th style={{width: '300px'}} className={'mobile-table-none'}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder="Ariza beruvchi"
                                                    ref={ApplicantNameRef}
                                                />
                                                <div className="form-control-feedback form-control-feedback-lg">
                                                    <i className="icon-search4"/>
                                                </div>
                                            </div>
                                        </th>

                                        <th style={{width: '300px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
                                                <button className="btn btn-primary mr-2 table-sm-full"
                                                        onClick={SearchData}>Search
                                                </button>
                                                <button className="btn btn-primary mr-2 mobile-table-none"
                                                        onClick={All}>Barchasi
                                                </button>
                                                <button className="btn btn-primary mobile-table-none"
                                                        data-toggle="dropdown"><i className="icon-menu9"
                                                                                  style={{fontSize: "18px"}}/></button>

                                                <div className="dropdown-menu">
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="id" value="Id"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="qabul" value="Qabul qilish turi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="murTuri" value="Murojaat turi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="ariza" value="Ariza beruvchi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="murYun" value="Murojaat yo'nalishi"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="qisqacha" value="Qisqacha mazmuni"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="reg" value="Reg № / Sana"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="harakat" value="Harakatlar"/>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>

                                {data?.content?.length > 0 && (
                                    <ReactPaginate
                                        previousLabel="<<"
                                        nextLabel=">>"
                                        pageCount={Math.ceil(data?.totalElements / 20)}
                                        breakLabel="..."
                                        className="paginate"
                                        activeClassName="active"
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        forcePage={selected}
                                    />
                                )}
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead>
                                    <tr className="bg-dark text-white NavLink text-center">
                                        <th id='tabRow' style={{width: '5%'}} className="id">№</th>
                                        <th style={{width: '10%'}} className="qabul">Qabul Qilish Turi</th>
                                        <th style={{width: '15%'}} className="murTuri">Murojaat Turi</th>
                                        <th style={{width: '20%'}} className="ariza">Ariza Beruvchi</th>
                                        <th style={{width: '20%'}} className="murYun">Murojaat shakli</th>
                                        <th style={{width: '15%'}} className="qisqacha">Qisqacha mazmuni</th>
                                        <th style={{width: '10%'}} className="reg">Reg № / MUDDATI</th>
                                        <th style={{width: '5%'}} className="text-center harakat">Harakatlar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.content?.length > 0 && data.content?.map((dat, index) => (
                                        <tr id="kor" key={index} className={'trNumberRedirect'}>
                                            <td className="text-center id">{index + 1}</td>
                                            <td className="text-center text-primary qabul">{dat?.receptionTypeName}</td>
                                            <td className="text-center murTuri">{dat?.appealTypeName}</td>
                                            <td className="text-center ariza">
                                                {dat?.applicantFirstName} {dat?.applicantLastName}
                                            </td>
                                            <td id="qs" data-maxlength="5" className="murYun text-center">
                                                {dat?.appealFormName}
                                            </td>
                                            <td className="qisqacha" style={{width: '200px'}}>
                                                {
                                                    dat?.problemsShortDescriptions?.map((data, index1) => {
                                                        return (
                                                            <>
                                 <span className="mb-1 d-flex" key={index1}>
                                  {/*<span style={{fontWeight: "600"}}> {index1 + 1}.</span>*/}
                                     {/* <strong>Izoh:&nbsp;</strong> */}
                                     <span style={{fontWeight: "400"}}>
                                    <span
                                        style={{display: "none"}}
                                        className="cursor-pointer IzohIchkiTopshiriqNoneY">
                                      <strong></strong>&nbsp; {data}<span
                                        style={{
                                            color: "blue",
                                            fontSize: "11px"
                                        }}>&nbsp; yashirish</span>
                                    </span>
                                    <span
                                        style={{display: "block"}}
                                        className="cursor-pointer IzohIchkiTopshiriqBlockY">
                                      <strong></strong>&nbsp; {data?.substring(0, 20)}
                                        {data?.length > 20 ? (
                                            <span style={{
                                                color: "blue",
                                                fontSize: "11px"
                                            }}>&nbsp;... davomi</span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </span>
                                  </span>
                                </span>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className="text-center reg">
                                                <div className="badge badge-primary">№ {dat?.regNumber}</div>
                                                <hr/>
                                                {dateFormatGet(dat?.deadline)}
                                            </td>
                                            <td className="harakat">
                                                <div className="d-flex justify-content-center">
                                                    <Link
                                                        to={`/fuqaro/murojati/rezalutsiya/${dat?.id}`}
                                                        className="infoBtn bg-dark" data-popup="tooltip"
                                                        title="ko'rish"><i className="icon-eye2"/>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {data?.content?.length > 0 && (
                                    <ReactPaginate
                                        previousLabel="<<"
                                        nextLabel=">>"
                                        pageCount={Math.ceil(data?.totalElements / 20)}
                                        breakLabel="..."
                                        className="paginate"
                                        activeClassName="active"
                                        pageRangeDisplayed={3}
                                        onPageChange={handlePageClick}
                                        forcePage={selected}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FuqaroResolutionContent)