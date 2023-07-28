import React, {useEffect, useRef, useState} from 'react';
import ChiquvchiContentNavbar from "../../chiquvchiContentNavbar/chiquvchiContentNavbar";
import {axiosInstance, axiosInstanceOut} from "../../../../config";
import Select from "react-select";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import File from "../../file";
import {status, statusCodeOutGoing} from "../../../../component/status/Status";

const ChiquvchiJarayondaContent=({ currentUser, permission, ranks })=> {
  const [tableData, setTableData] = useState([])
  const [getTableData, setGetTableData] = useState([])
  const [selected, setSelected] = useState(0);
  const [rahbariyat, setRahbariyat] = useState([]);
  const [korrespondent, setKorrespondent] = useState([]);
  // const [openModal, setOpenModal] = useState({ open: false, obj: {} });

  const tasdiqlovchiRef=useRef()
  const qisqachaMalumotRef=useRef()
  const korrespondentRef=useRef()

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', height: '44px' }),
    option: (styles, { isDisabled }) => {
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

  // // barcha rahbariyatdagilarni o'qib olish
  // useEffect(() => {
  //   let isMounted = true;

  //   if (currentUser) {
  //     const getData = async () => {
  //       try {
  //         const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')));
  //         let arr = [];
  //         res.data.forEach((d) => {
  //           let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
  //           arr.push({value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}`})
  //         });

  //         if (isMounted)
  //           setRahbariyat(arr);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getData();
  //   }

  //   return () => {
  //     isMounted = false;
  //   }
  // }, [currentUser]);

   //tastiqlovchilar
   useEffect(() => {
    let isMounted = true;

    if (currentUser) {
        const getData = async () => {
            try {
                const res = await axiosInstance.get(`workplace/all/` + JSON.parse(localStorage.getItem('ids')));
                console.log(res.data)
                let arr = [];
                res.data.forEach((dat) => {
                    if (dat.users?.length > 0) {
                        dat.users.forEach((d) => {
                            let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
                            if (JSON.parse(localStorage.getItem('ids')) !== d.workPlaceId) {
                                arr.push({
                                    value: d?.workPlaceId,
                                    label: firstname + d.lastName,
                                    deparmentName: dat?.deparmentName
                                });
                            }
                        })
                    }
                })

                if (isMounted)
                    setRahbariyat(arr)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }

    return () => {
        isMounted = false;
    }
}, [currentUser]);

  // barcha korrespondentlar o'qib olish
  useEffect(() => {
    let isMounted = true;

    if (currentUser) {
      const getData = async () => {
        try {
          const res = await axiosInstance.get("organization/allCorrespondent/" + JSON.parse(localStorage.getItem('oi')));
          console.log(res.data)
          let arr = [];
          res.data.forEach((d) => {
            arr.push({value: d.id, label: d.name})
          })


          if (isMounted)
            setKorrespondent(arr);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // malumotlarni uqib olish
  useEffect(()=>{
    let isMounted = true;

    if (currentUser) {
      const getData = async () => {
        try {
          const res = await axiosInstanceOut.post("missive/list",{
            confirmativeWorkPlace: null,
            correspondent: null,
            shortInfo: null,
            workPlace: JSON.parse(localStorage.getItem('ids')),
            size: 20,
            page:0,
            tab: 2,
          });
          console.log(res.data)

          if (isMounted) {
            setTableData(res.data)
            setGetTableData(res.data.content)
          }
        } catch (error) {
          console.log(error);
        }
      }
      getData()
    }

    return () => {
      isMounted = false;
    }
  },[currentUser])

  const All = async () => {
    try {
      const res = await axiosInstanceOut.post("missive/list",{
        confirmativeWorkPlace: null,
        correspondent: null,
        shortInfo: null,
        workPlace: JSON.parse(localStorage.getItem('ids')),
        size: 20,
        page:0,
        tab: 2,
      });
      console.log(res.data)

      // if (isMounted) {
      //   setTableData(res.data)
      //   setGetTableData(res.data.content)
      // }
    } catch (error) {
      console.log(error);
    }
  }

  const SearchData = async () => {
    try {
      const res = await axiosInstanceOut.post("missive/list",{
        confirmativeWorkPlace: tasdiqlovchiRef?.current?.props?tasdiqlovchiRef?.current?.props?.value?.value:null,
        correspondent: korrespondentRef?.current?.props?korrespondentRef?.current?.props?.value?.value:null,
        shortInfo: qisqachaMalumotRef?.current?.value?qisqachaMalumotRef?.current?.value:null,
        workPlace: JSON.parse(localStorage.getItem('ids')),
        size: 20,
        page:selected,
        tab: 2,
      });
      console.log(res.data)

      // if (isMounted) {
      //   setTableData(res.data)
      //   setGetTableData(res.data.content)
      // }
    } catch (error) {
      console.log(error);
    }
  }

  //close all options
  const closeOptions = () => {
    let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
    input_checkbox_items.forEach((d, i) => {
      d.style.display = "none";
    })
  }

  const handlePageClick = async (e) => {
    setSelected(e.selected);
    try {
      const res=await axiosInstanceOut.post(`missive/list`, {
        confirmativeWorkPlace: tasdiqlovchiRef?.current?.props?tasdiqlovchiRef?.current?.props?.value?.value:null,
        correspondent: korrespondentRef?.current?.props?korrespondentRef?.current?.props?.value?.value:null,
        shortInfo: qisqachaMalumotRef?.current?qisqachaMalumotRef?.current?.value:null,
        workPlace: JSON.parse(localStorage.getItem('ids')),
        page: e.selected,
        size: 20,
        tab: 2,
      })
      // setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }


  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>В програси</h3>
      <div className="card-body card-body-mobile pt-2">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ChiquvchiContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "30px" }}>
                <table className={'table-sm-full'}>
                  <thead>
                  <tr className={'direction-mobile'}>
                    <th style={{width: '350px'}}>
                      <div
                          className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                        <Select
                            options={rahbariyat}
                            placeholder="Подписанты"
                            ref={tasdiqlovchiRef}
                            onMenuOpen={closeOptions}
                            className="Tasdiqlovchilar"
                            styles={colourStyles}
                            isClearable={true}
                        />
                      </div>
                    </th>
                    <th style={{width: '350px'}}>
                      <div
                          className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                        <Select
                            options={korrespondent}
                            placeholder="Кореспондент"
                            isClearable={true}
                            ref={korrespondentRef}
                            className="Korrespondent"
                            styles={colourStyles}
                        />
                      </div>
                    </th>
                    <th style={{width: '350px'}}>
                      <div
                          className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                        <input type="text" className="form-control form-control-lg p-2"
                               style={{height: '44px'}}
                               id="korrespondent2"
                               ref={qisqachaMalumotRef}
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
                                 name="qabul" value="Файл"/>
                          <input type="submit"
                                 className="btn btn-white dropdown-item  w-100 myBtn"
                                 name="ariza" value="Отделение"/>
                          <input type="submit"
                                 className="btn btn-white dropdown-item  w-100 myBtn"
                                 name="murojaat" value="Подписант"/>
                          <input type="submit"
                                 className="btn btn-white dropdown-item  w-100 myBtn"
                                 name="mur" value="Кореспондент"/>
                          <input type="submit"
                                 className="btn btn-white dropdown-item  w-100 myBtn"
                                 name="qisqacha" value="кратко"/>
                          <input type="submit"
                                 className="btn btn-white dropdown-item  w-100 myBtn"
                                 name="harakat" value="действия"/>
                        </div>
                      </div>
                    </th>
                  </tr>
                  </thead>
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
                <table id="myTable" className="table table-bordered table-striped table-hover Tab mt-2">
                  <thead>
                  <tr className="bg-dark text-white NavLink text-center">
                    <th id='tabRow' style={{width: '5%'}} className="id">№</th>
                    <th id='tabRow' style={{width: '15%'}} className="qabul">Файл</th>
                    <th id='tabRow' style={{width: '15%'}} className="ariza">Отдел (Выдача)</th>
                    <th id='tabRow' style={{width: '20%'}} className="murojaat">Валидатор</th>
                    <th id='tabRow' style={{width: '20%'}} className="mur">Кореспондент</th>
                    <th id='tabRow' style={{width: '20%'}} className="qisqacha">Краткое содержание 
                    </th>
                    {/*<th style={{width: '10 %'}} className="reg">Reg № / Sana</th>*/}
                    <th id='tabRow' style={{width: '5%'}}
                        className="text-center harakat">Действия
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                    {getTableData.map((data, key) => (
                      <tr id="kor" key={key}
                      // style={{backgroundColor: !data.forColor && '#ffffa6'}}
                      >
                        <td className="text-center id">{key + 1}</td>
                        <td className="text-color qabul mobile-table-none" id='qabul'
                            style={{cursor: "pointer", wordWrap: "break-word"}}>
                          {data?.baseFiles?.length > 0 && data?.baseFiles?.map((hujjat, index1) => (
                              <div key={index1}>
                                <File hujjat={hujjat}/>
                              </div>
                          ))}
                        </td>
                        <td className=" ariza"  style={{textAlign: 'center'}}><span
                            className={'text-color'}>{data?.departmentName}</span>
                          <hr/>
                          {data?.senderFirstName + ' ' + data?.senderLastName}
                        </td>
                        <td
                            className="murojaat text-center">{
                          data?.confirmatives?.map((d,i) => (
                              <div className={'my-1'} key={i}>
                                                        <span className="badge ml-1 status text-white mr-1"
                                                              style={{backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.color}}>{statusCodeOutGoing.filter((s) => s.englishName === d?.status)[0]?.LatinName}</span>
                                {(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "" }{ d.lastName ? d.lastName : ''}<br/>
                              </div>
                          ))
                        }</td>

                        <td id="qs" data-maxlength="5" className="mur text-center">
                          {data?.correspondent?.map((item,index)=>(
                              <div style={{textAlign: "center"}}>
                                <span className={'mb-1'}><span style={{fontWeight:'bold'}}>{index+1}.</span>{item}</span><br/>
                              </div>
                          ))}
                        </td>

                        <td className="qisqacha text-center">
                          {data?.shortInfo}
                        </td>
                        <td className="harakat">
                          <div>
                            {/*// <!-- <a href="./korish.html" class="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Ko'rish"><span><i class="icon-eye2 "/</span> </a> -->*/}
                            <div
                              className="icon d-flex justify-content-center align-items-center w-100">
                              <Link
                                to={`/chiquvchi/ko'rish/jarayonda/${data?.id}`}
                                className="infoBtn bg-dark" data-popup="tooltip"
                                title="ko'rish"><i className="icon-eye2" />
                              </Link>
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
}

export default React.memo(ChiquvchiJarayondaContent);