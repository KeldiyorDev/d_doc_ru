import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {axiosInstance, axiosInstanceFq} from "../../../../config";
import ChiquvchiContentNavbar from "../../chiquvchiContentNavbar/chiquvchiContentNavbar";
import Select from "react-select";
import ReactPaginate from "react-paginate";

const ChiquvchiMenuContent = ({currentUser,permission,ranks}) => {
    const params = useParams()
    console.log(params)
    const [tableData, setTableData] = useState([])
    const [getTableData, setGetTableData] = useState([
        {
            id: 1,
            applicationSort: {
                name: 'QQ',
            },
            applicationType: {
                name: 'SDFadsf',
            },
            applicationForm: {
                name: 'asdfdsfa',
            },
            outNumber: 23,
            registrationDate: '2022-07-27',
            shortDescription: 'fasfasfadsgresdfsadfkj asklfh skdnkf ank h',
            customUser: {
                firstName: 'Jovliyev',
                lastName: 'Quvonchbek',
                middleName: 'Botir o\'g\'li'
            }
        },
        {
            id: 2,
            applicationSort: {
                name: 'dfgsdg',
            },
            applicationType: {
                name: 'asdfsf',
            },
            applicationForm: {
                name: 'asfdsf',
            },
            outNumber: 27,
            registrationDate: '2022-07-07',
            shortDescription: 'fasfasfadsgresdfsadfkj asklfh skdnkf ank h',
            customUser: {
                firstName: 'Jomurodova',
                lastName: 'Charos',
                middleName: 'Faxriddin qizi'
            }
        },
    ])
    const [selected, setSelected] = useState(0);
    // const [openModal, setOpenModal] = useState({ open: false, obj: {} });

    // apidagi sanani formatlash
    const dateFormatGet = (date) => {
        return date?.slice(8, date?.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
    }

    // api ketadigan sanani formatlash
    const dateFormatSet = (date) => {
        return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
    }

    const colourStyles = {
        control: (styles) => ({...styles, backgroundColor: 'white', height: '44px'}),
        option: (styles, {isDisabled}) => {
            return {
                ...styles,
                textTransform: 'upperCase',
                fontWeight: isDisabled ? "bold" : " ",
                fontSize: isDisabled ? "16px" : '14px',
                color: isDisabled ? "blue" : "black",
                cursor: isDisabled ? "not-allowed" : "default",

            };
        }
    };


    // const sortNullishValues = (arr = []) => {
    //     const assignValue = val => {
    //         if (val === null) {
    //             return Infinity;
    //         } else {
    //             return val;
    //         }
    //     }
    //     const sorter = (a, b) => {
    //         return assignValue(a.orderNumber) - assignValue(b.orderNumber);
    //     };
    //     arr.sort(sorter);
    // }

    const All = async () => {
        // if (params.name === '') {
        //     try {
        //         await axiosInstance.post("", {
        //             correspondentName: '',
        //             shortDescription: '',
        //             out_number: '',
        //             out_date: '',
        //             page: 0
        //         }, {
        //             headers: {
        //                 Authorization: "Bearer " + currentUser
        //             }
        //         })
        //         // setData(res.data);
        //     } catch (error) {
        //         console.log(error.response);
        //     }
        // }

    }

    const SearchData = async () => {
        let sana = document.querySelector('.qisqacha2').value;
        let reg = document.querySelector('.qisqacha1').value;
        let korres = document.querySelector('#xujjat').value;
        let malumot = document.querySelector('#korrespondent2').value;

        // if (params.name === '') {
        //     try {
        //         await axiosInstance.post(`` + JSON.parse(localStorage.getItem('ids')), {
        //             correspondentName: korres,
        //             shortDescription: malumot,
        //             out_number: reg ? reg : '',
        //             out_date: sana ? dateFormatSet(sana) : '',
        //             page: 0
        //         }, {
        //             headers: {
        //                 Authorization: "Bearer " + currentUser
        //             }
        //         })
        //         // setData(res.data);
        //     } catch (error) {
        //         console.log(error.response);
        //     }
        // }
    }

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            // if (params.name === '') {
            //     try {
            //         const {data} = await axiosInstanceFq.get(`/template/showNew?orgId=${JSON.parse(localStorage.getItem('oi'))}`, {
            //             headers: {
            //                 Authorization: "Bearer " + currentUser
            //             }
            //         })
            //
            //         if (isMounted) {
            //             setTableData(data)
            //             setGetTableData(data.content)
            //         }
            //     } catch (err) {
            //         console.log(err);
            //     }
            // }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser])

    const handlePageClick = async (e) => {
        setSelected(e.selected);
        // if (params.name === '') {
        //     try {
        //         const res = await axiosInstanceFq.get(`/template/showNew?orgId=${JSON.parse(localStorage.getItem('oi'))}&page=${e.selected}`, {
        //             headers: {
        //                 Authorization: "Bearer " + currentUser
        //             }
        //         })
        //         setTableData(res.data);
        //         setGetTableData(res.data.content)
        //     } catch (error) {
        //         console.log(error.response);
        //     }
        // }
    }


    /*const deleteData = async (id) => {
        try {
            const res = await axiosInstanceFq.delete(`/template/${id}/${JSON.parse(localStorage.getItem('oi'))}`, {
                headers: {
                    Authorization: "Bearer " + currentUser
                }
            })
            console.log(res.data)
            let arr = [], arr1 = []
            arr = tableData
            arr.forEach((d) => {
                if (d.id !== id) {
                    arr1.push(d)
                }
            })
            // sortNullishValues(arr1)
            setTableData(arr1);
            setOpenModal({open: false, obj: {}})
        } catch (error) {
            console.log(error.response);
        }
    }*/

    const goToRes = async (dat) => {
        // try {
        //     const res = await axiosInstanceFq.post(`/template/giveResolution`, {
        //         id: dat.id,
        //         orgId: JSON.parse(localStorage.getItem('oi')),
        //         workPlaceId: JSON.parse(localStorage.getItem('ids'))
        //     }, {
        //         headers: {
        //             Authorization: "Bearer " + currentUser
        //         }
        //     })
        //     if (res.status === 200) {
        //         const res = getTableData.filter((d) => d.id !== dat.id)
        //         setGetTableData(res)
        //     }
        //
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div className="content mb-5 content-mobile">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase"}}>{params.name}</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
                    style={{paddingTop: "2px", minHeight: "52px"}}>
                    <ChiquvchiContentNavbar currentUser={currentUser} permission={permission} ranks={ranks}/>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile" style={{padding: "30px"}}>
                                <table className={'table-sm-full'}>
                                    <thead>
                                    <tr className={'direction-mobile'}>
                                        <th style={{width: '350px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <input type="text" className="form-control form-control-lg p-2"
                                                       style={{height: '44px'}}
                                                    // onChange={(e) => setMalumot(e.target.value)}
                                                       id="xujjat"
                                                       placeholder="Подписанты"/>
                                            </div>
                                        </th>
                                        <th style={{width: '350px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <Select
                                                    // options={tasnif3}
                                                    placeholder="Кореспондент"
                                                    isClearable={true}
                                                    className="Korrespondent"
                                                    styles={colourStyles}
                                                />
                                            </div>
                                        </th>
                                        <th style={{width: '350px'}} className={'mobile-table-none'}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                                                <input type="text" className="form-control form-control-lg p-2"
                                                       style={{height: '44px'}}
                                                       id="korrespondent2"
                                                    // onChange={(e) => setKorres(e.target.value)}
                                                       placeholder="Краткая информация"/>
                                            </div>
                                        </th>

                                        <th style={{width: '350px'}}>
                                            <div
                                                className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
                                                <button className="btn btn-primary mr-2 table-sm-full"
                                                        style={{height: '44px'}}
                                                        onClick={SearchData}>Поиск
                                                </button>
                                                <button className="btn btn-primary mr-2 mobile-table-none"
                                                        style={{height: '44px'}}
                                                        onClick={All}>Все
                                                </button>
                                                <button className="btn btn-primary mobile-table-none"
                                                        style={{height: '44px'}}
                                                        data-toggle="dropdown"><i className="icon-menu9"
                                                                                  style={{fontSize: "18px"}}/>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="id" value="Id"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="xujjat" value="Тип ддокумент"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="korres" value="Кореспондент"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="qiqacha" value="Краткая информация"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="chiquvchi" value="Исходящий номер/дата"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="reg" value="Рег № / дата"/>
                                                    <input type="submit"
                                                           className="btn btn-white dropdown-item  w-100 myBtn"
                                                           name="harakat" value="Действия"/>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                </table>
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead>
                                    <tr className="bg-dark text-white NavLink text-center">
                                        <th id='tabRow' style={{width: '5%'}} className="id">№</th>
                                        <th style={{width: '15%'}} className="qabul">Файл</th>
                                        <th style={{width: '15%'}} className="ariza">Отдел (Выдача)/th>
                                        <th style={{width: '15%'}} className="murojaat">Валидатор</th>
                                        <th style={{width: '15%'}} className="mur">Корреспондент</th>
                                        <th style={{width: '20%'}} className="qisqacha">Краткое содержание</th>
                                        {/*<th style={{width: '10 %'}} className="reg">Reg № / Sana</th>*/}
                                        {
                                            params.name==='yuborilgan'&&
                                            <>
                                                <th style={{width: '10%'}} className="reg">Рег № / Дата</th>
                                            </>
                                        }
                                        <th style={{width: '5%'}} className="text-center harakat">Действа</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {getTableData.map((data, key) => (
                                        <tr id="kor" key={key}
                                            // style={{backgroundColor: !data.forColor && '#ffffa6'}}
                                        >
                                            <td className="text-center id">{key + 1}</td>
                                            <td className="text-color qabul">{data?.applicationSort?.name}</td>
                                            <td style={{textAlign: 'justify'}}
                                                className="murojaat">{data?.applicationForm?.name}</td>
                                            <td className="text-center ariza">
                                                {data?.customUser?.firstName} {" "}
                                                {data?.customUser?.lastName} {" "}
                                                {data?.customUser?.middleName}
                                            </td>
                                            <td id="qs" data-maxlength="5" className="mur text-center">
                                                {data?.applicationType.name}
                                            </td>

                                            <td className="qisqacha text-center">
                                                {data?.shortDescription}
                                            </td>
                                            {
                                                params.name==='yuborilgan'&&
                                                <>
                                            <td className="text-center reg">
                                                <div className="badge badge-primary">№ {data?.outNumber}</div>
                                                <hr/>
                                                {dateFormatGet(data?.registrationDate)}
                                            </td>
                                        </>
                                    }
                                            <td className="harakat">
                                                <div>
                                                    {/*// <!-- <a href="./korish.html" class="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Ko'rish"><span><i class="icon-eye2 "/</span> </a> -->*/}
                                                    <div className="icon d-flex justify-content-center align-items-center w-100">
                                                        <Link
                                                            to={`/chiquvchi/ko'rish/${params.name}/${data?.id}`}
                                                            className="infoBtn bg-dark" data-popup="tooltip"
                                                            title="ko'rish"><i className="icon-eye2"/>

                                                        </Link>
                                                        {
                                                            params.name === 'xomaki' ? <>

                                                                <Link
                                                                    to={`/chiquvchi/xomaki/edit/${data?.id}`}
                                                                    // onClick={() => setOpenModal({ open: true, obj: { data } })}
                                                                    title="Yangilash"
                                                                    className={'infoBtn bg-dark'}
                                                                >
                                                                    <i className="icon-pencil5"/>
                                                                </Link>
                                                                <button type={'button'} className={'infoBtn bg-dark disableIfErr'}
                                                                        onClick={() => goToRes(data)}><i
                                                                    className="fa-solid fa-trash"/>
                                                                </button>
                                                            </>
                                                                : ''

                                                        }
                                                        {
                                                            params.name==='yuborilgan'?<>
                                                                <>
                                                                    <button type={'button'}
                                                                        // onClick={() => setOpenModal({open: true, obj: {data}})}
                                                                            title="Yangilash"
                                                                            className={'infoBtn bg-dark'}
                                                                    >
                                                                        <i className="fa-sharp fa-solid fa-paper-plane"></i>
                                                                    </button>
                                                                    <button type={'button'} className={'infoBtn bg-dark disableIfErr'}
                                                                        // onClick={() => goToRes(data)}
                                                                    >
                                                                        <i className="fa-solid fa-envelope"></i>
                                                                    </button>
                                                                </>
                                                            </>:''
                                                        }
                                                    </div>
                                                    {/*// <!-- <a href="" class="infoBtn bg-dark" data-popup="tooltip" title="O'chirish"><i class="icon-trash "/ </a> -->*/}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <ReactPaginate
                                    previousLabel="<<"
                                    nextLabel=">>"
                                    pageCount={tableData?.totalElements / 20}
                                    breakLabel="..."
                                    className="paginate"
                                    activeClassName="active"
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    forcePage={selected}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChiquvchiMenuContent);