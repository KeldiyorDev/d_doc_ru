import React, { useState, useEffect, useRef } from 'react';
import NavbarFuqaroMurojat from '../../navbarFuqaroMurojat/NavbarFuqaroMurojat';
import { axiosInstance, axiosInstanceFq } from "../../../../config";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Select from "react-select";

const FuqaroMurojatYangiContent = ({currentUser, permission1, ranks}) => {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(0);
    const [qabulTuri, setQabulTuri] = useState([]);
    const [murojaatTuri, setMurojaatTuri] = useState([]);
    const ReceptionTypeRef = useRef();
    const AppealTypeRef = useRef();
    const ApplicantNameRef = useRef();


  // apidagi sanani formatlash
  const dateFormatGet = (date) => {
    return date?.slice(8, date?.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // qabul qilish turlarini o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getReception = async () => {
      try {
        const res = await axiosInstanceFq.get("reception-type");
        let arr = [];
        res.data.data.forEach((d) => {
          arr.push({ value: d.id, label: d.name });
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
          arr.push({ value: d.id, label: d.name });
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

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.post("outExecutor/getNewList", {
          receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
          appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
          name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
          page: 0,
          workPlaceID: JSON.parse(localStorage.getItem('ids')),
          orgID: JSON.parse(localStorage.getItem('oi'))
        });
        console.log(res.data.data)
        if (isMounted)
          setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // api ketadigan sanani formatlash
  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  const All = async () => {
    try {
      await axiosInstanceFq.post("outExecutor/getNewList" + JSON.parse(localStorage.getItem('ids')), {
        receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
        appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
        name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
        page: 0,
        workPlaceID: JSON.parse(localStorage.getItem('ids')),
        orgID: JSON.parse(localStorage.getItem('oi'))
      })
      // setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  const SearchData = async () => {

    try {
      await axiosInstanceFq.post(`outExecutor/getNewList` + JSON.parse(localStorage.getItem('ids')), {
        receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
        appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
        name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
        page: 0,
        workPlaceID: JSON.parse(localStorage.getItem('ids')),
        orgID: JSON.parse(localStorage.getItem('oi'))
      })
      // setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  const handlePageClick = async (e) => {
    setSelected(e.selected);
    try {
      await axiosInstanceFq.post(`outExecutor/getNewList` + JSON.parse(localStorage.getItem('ids')), {
        receptionTypeID: ReceptionTypeRef?.current?.props?.value?.value ? ReceptionTypeRef?.current?.props?.value?.value : '%%',
        appealTypeID: AppealTypeRef?.current?.props?.value?.value ? AppealTypeRef?.current?.props?.value?.value : '%%',
        name: ApplicantNameRef?.current?.value ? ApplicantNameRef?.current?.value : '%%',
        page: e?.selected,
        workPlaceID: JSON.parse(localStorage.getItem('ids')),
        orgID: JSON.parse(localStorage.getItem('oi'))
      })
      // setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

    return (
        <div className="content content-mobile mb-5">
            <h3 style={{margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase"}}>Yangi</h3>
            <div className="card-body card-body-mobile pt-2">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <NavbarFuqaroMurojat currentUser={currentUser} permission1={permission1} ranks={ranks}/>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body card-body-mobile" style={{padding: "20px"}}>
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

                                        <th style={{width: '350px'}}>
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
                                                                                  style={{fontSize: "18px"}}></i>
                                                </button>

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
                                <table id="myTable" className="table table-bordered table-striped table-hover Tab">
                                    <thead>
                                    <tr className="bg-dark text-white NavLink text-center">
                                        <th id='tabRow' style={{width: '5%'}} className="id">№</th>
                                        <th style={{width: '10%'}} className="qabul">Qabul Qilish Turi</th>
                                        <th style={{width: '15%'}} className="murTuri">Murojaat Turi</th>
                                        <th style={{width: '20%'}} className="ariza">Ariza Beruvchi</th>
                                        <th style={{width: '20%'}} className="murYun">Murojaat shakli</th>
                                        <th style={{width: '15%'}} className="qisqacha">Qisqacha mazmuni</th>
                                        <th style={{width: '10%'}} className="reg">Reg № / sana</th>
                                        <th style={{width: '5%'}} className="text-center harakat">Harakatlar</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data?.content?.length > 0 && data?.content?.map((dat, index) => (
                                        <tr id="kor" key={index} className={'trNumberRedirect'}>
                                            <td className="text-center id">{index + 1}</td>
                                            <td className="text-center text-primary qabul">{dat?.receptionName}</td>
                                            <td className="text-center murTuri">{dat?.appealTypeName}</td>
                                            <td className="text-center ariza">
                                                {dat?.applicantFirstName} {dat?.applicantLastName}
                                            </td>
                                            <td id="qs" data-maxlength="5" className="murYun text-center">
                                                {dat?.appealFormName}
                                            </td>
                                            <td id="qs" data-maxlength="5" className="murYun text-center">
                                                {dat?.problemShortDescription}
                                            </td>
                                            <td className="text-center reg">
                                                <div className="badge badge-primary">№ {dat?.regNumber}</div>
                                                <hr/>
                                                {dateFormatGet(dat?.regDate)}
                                            </td>
                                            <td className="harakat">
                                                <div className="d-flex justify-content-center">
                                                    <Link
                                                        to={`/fuqaro/murojati/yangi/${dat?.problemID}`}
                                                        className="infoBtn bg-dark" data-popup="tooltip"
                                                        title="ko'rish"><i className="icon-pencil5"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FuqaroMurojatYangiContent)