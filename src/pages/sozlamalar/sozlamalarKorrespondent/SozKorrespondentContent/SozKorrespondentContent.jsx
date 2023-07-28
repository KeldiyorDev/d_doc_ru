import React, { useEffect, useState } from "react";
import { axiosInstance, url } from "../../../../config";
import ContentNavbarSozlamalar from "../../contentNavbarSozlamalar/ContentNavbarSozlamalar";
import './sozKorrespondentContent.css';
import is from 'is_js';
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";
import FormElements from "./formElements/FormElements";
import SearchData from "./searchData/SearchData";
import Directions from "./directions/Directions";

const SozlamalarKorrespondentContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [stirData, setStirData] = useState({});
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [yunalishQidirishHajmi, setYunalishQidirishHajmi] = useState([]);
  const [yunalishlar, setYunalishlar] = useState([]);
  const [orgNameId, setOrgNameId] = useState('');
  const [pageId, setPageId] = useState(0);
  const params = useParams()

  useEffect(() => {
    let isMounted = true;
    if (params.stir && isMounted) {
      document.querySelector('.atAuto').click();
      document.querySelector('.putStir').value = params.stir.substring(0, 3) + "-" + params.stir.substring(3, 6) + "-" + params.stir.substring(6, 9);
      document.querySelector('.buttonStir').click();
    }

    return () => {
      isMounted = false;
    }
  }, [params.stir])

  // barcha yo'nalishlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/checkOrgType/" + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setYunalishlar(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData()

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let isMounted = true;
    let orgNames = document.querySelectorAll('.cardAccordion');

    if (isMounted) {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').addEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
    }

    return () => {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').removeEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
      isMounted = false;
    }
  }, [yunalishlar]);

  // barcha korrespondentlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/orgCorrespondent/" + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const Uzgartirish = async (dat) => {
    let tashNomi = document.querySelector('.tashkilotNomiUzgartirish').value;
    let manzil = document.querySelector('.manzilUzgartirish').value;
    let telefon = document.querySelector('.telefonUzgartirish').value;
    let pochta = document.querySelector('.emailUzgartirish').value;
    let exat = document.querySelector('.exatUzgartirish').value;

    if (tashNomi) {
      if (manzil) {
        if (telefon.length === 9) {
          if (is.email(pochta)) {
            if (is.email(pochta)) {
              // to do server

              try {
                const res = await axiosInstance.patch("organization/correspondent", {
                  id: dat.id,
                  name: tashNomi,
                  address: manzil,
                  phoneNumber: telefon,
                  email: pochta,
                  exat: exat
                })

                let arr = data.filter((d) => {
                  if (d.id === res.data.id) {
                    d.id = res.data.id;
                    d.orgName = res.data.orgName;
                    d.address = res.data.address;
                    d.mobileNumber = res.data.mobileNumber;
                    d.orgEmail = res.data.orgEmail;
                    d.orgExat = res.data.orgExat;
                  }
                  return d;
                })
                Alert(setAlert, "success", "Информация успешно изменена");
                setData(arr);
                setUpdateModal({ open: false, obj: {} });
              } catch (error) {
                console.log(error.response);
                Alert(setAlert, "warning", error.response.data);
              }
            } else {
              Alert(setAlert, "warning", "Электронная почта была введена неправильно");
            }
          } else {
            Alert(setAlert, "warning", "Электронная почта была введена неправильно");
          }
        } else {
          Alert(setAlert, "warning", "Номер телефона был введен неверно");
        }
      } else {
        Alert(setAlert, "warning", "Адрес не введен");
      }
    } else {
      Alert(setAlert, "warning", "Не введено название организации");
    }
  }

  const handlePageClick = async (e) => {
    setPageId(e.selected)
    try {
      const res = await axiosInstance.post(`organization/search`, {
        orgName: orgNameId,
        page: e.selected,
      })
      setYunalishQidirishHajmi(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="content content-mobile mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Корреспондент</h3>
      <div className="card-body-mobile">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <ContentNavbarSozlamalar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "20px 20px 0 20px" }}>
                {/* search data */}
                <SearchData
                  currentUser={currentUser}
                  setAlert={setAlert}
                  setStirData={setStirData}
                  setOrgNameId={setOrgNameId}
                  pageId={pageId}
                  setYunalishQidirishHajmi={setYunalishQidirishHajmi}
                />

                <hr style={{ margin: "0" }} />
                {/* forms elements */}
                <FormElements
                  setAlert={setAlert}
                  currentUser={currentUser}
                  stirData={stirData}
                  setData={setData}
                />

                {/* delete modal */}
                {deleteModal.open && (
                  <DeleteModal
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    currentUser={currentUser}
                    data={data}
                    setData={setData}
                  />
                )}
                {/* update modal */}
                {updateModal.open && (
                  <UpdateModal
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    Uzgartirish={Uzgartirish}
                  />
                )}
              </div>

              {yunalishQidirishHajmi?.length === 0 ? (
                <div className="card-body pt-2">
                  <div id="accordion-default">
                    {/* yunalishlar */}
                    {yunalishlar.map((dat, index1) => (
                      <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
                        <Directions
                          d={dat}
                          currentUser={currentUser}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <table className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab" id="myTable">
                    <thead>
                      <tr className="bg-dark text-white NavLink text-center">
                        <th style={{ width: "3%" }}>№</th>
                        <th style={{ width: "15%" }}>логотип</th>
                        <th style={{ width: "20%" }}>Район
                          (shahar)
                        </th>
                        <th style={{ width: "25%" }}>Название 
                        организации
                        </th>
                        <th style={{ width: "25%" }}>Директор</th>
                        <td style={{ width: "8%" }}>СТИР</td>
                      </tr>
                    </thead>
                    <tbody
                      id="viloyat">
                      {yunalishQidirishHajmi?.content.map((dat, index) => (
                        <tr key={index}
                          className="text-center">
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={dat?.logo ? `${url}/api/file/view/${dat.logo.id}` : "assets/user.png"}
                              style={{
                                width: "80px",
                                height: "80px"
                              }}
                              alt="" />
                          </td>
                          <td>{dat?.orgDistrict}</td>
                          <td>{dat?.orgName}</td>
                          <td>{dat?.leaderName}</td>
                          <td>{dat?.stir}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {yunalishQidirishHajmi?.content?.length > 0 && (
                    <div className="mt-2">
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={yunalishQidirishHajmi?.totalElements / 10}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className="paginationUL"
                        activeClassName="active"
                      // forcePage={selected}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(SozlamalarKorrespondentContent);