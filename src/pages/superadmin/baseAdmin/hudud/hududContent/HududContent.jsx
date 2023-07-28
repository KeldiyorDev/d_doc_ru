import React, { useEffect, useRef, useState } from "react";
import HududNavbar from "../hududNavbar/HududNavbar";
import Select from 'react-select';
import { axiosInstanceFq } from "../../../../../config";
import AlertContent, { Alert } from "../../../../../component/alert/Alert";
import AllData from "./AllData";

const HududContent = ({ currentUser }) => {
  const [notParentsCard1, setNotParentsCard1] = useState([]);
  const [notParentsCard2, setNotParentsCard2] = useState([]);
  const [notParentsCard3, setNotParentsCard3] = useState([]);
  const [viloyatData, setViloyatData] = useState([]);
  const [sectorlar, setSectorlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const provinceRef = useRef();
  const cityRef = useRef();
  const sectorRef = useRef();
  const mahRef = useRef();

  //sector oqib olish
  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('sectors')
        setSectorlar(res.data.data)
        let arr = [];
        res.data?.data.forEach((item) => {
          arr.push({ value: item.code, label: item.name });
        })
        if (load) {
          setNotParentsCard3(arr);
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getData();

    return () => {
      load = false;
    }
  }, [currentUser])

  //viloyat oqib olish
  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('province/list')
        let arr = [];
        res.data?.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })

        if (load) {
          setViloyatData(res.data.data);
          setNotParentsCard1(arr);
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()

    return () => {
      load = false;
    }
  }, [currentUser]);

  // select uchun
  const notParentsCardClick1 = (e) => {
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get(`district/list/${e.value}`)
        let arr = [];
        res.data.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })
        setNotParentsCard2(arr);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()
  }

  //yangi malumot qushish
  const saveData = async () => {
    // let viloyat = provinceRef.current?.props?.value;
    let tuman = cityRef.current?.props?.value;
    let sector = sectorRef.current?.props?.value;
    let mahallaName = mahRef.current.value;

    if (tuman) {
      if (sector) {
        if (mahallaName?.length > 0) {
          try {
            await axiosInstanceFq.post('neighborhood/create', {
              name: mahallaName,
              districtId: tuman ? tuman.value : null,
              sectorCode: sector ? sector.value : -1
            })
            Alert(setAlert, 'success', `Информация успешно добавлена`)
            mahRef.current.value = "";
            cityRef.current?.props?.value && cityRef.current?.removeValue(cityRef.current.props?.value);
            provinceRef.current?.props?.value && provinceRef.current?.removeValue(provinceRef.current.props?.value);
            sector.current?.props?.value && sector.current?.removeValue(sector.current.props?.value);
          } catch (error) {
            console.log(error.response)
            Alert(setAlert, 'warning', `${error?.response?.data?.error?.message}`)
          }
        } else {
          Alert(setAlert, 'warning', `Название района не указано`);
        }
      } else {
        Alert(setAlert, 'warning', `Сектор не выбран`);
      }
    } else {
      Alert(setAlert, 'warning', `Район (Город) не выбран`);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Территория</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <HududNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px", paddingBottom: "5px" }}>
                <form>
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="form-group text-left">
                        <Select
                          options={notParentsCard1}
                          onChange={notParentsCardClick1}
                          placeholder="Провинция"
                          className="cardTypeId"
                          isClearable={true}
                          ref={provinceRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group text-left">
                        <Select
                          options={notParentsCard2}
                          placeholder="Район (Город)"
                          className="cardTypeId"
                          isClearable={true}
                          ref={cityRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group text-left">
                        <Select
                          options={notParentsCard3}
                          placeholder="Сектор"
                          className="cardTypeId"
                          isClearable={true}
                          ref={sectorRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group text-left">
                        <div className="position-relative">
                          <input
                            type="text"
                            style={{ height: '56px' }}
                            className="form-control form-control-outline mahallaName"
                            placeholder="Махалля"
                            ref={mahRef}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <button type="button" className="btn btn-primary w-100" style={{ padding: "1rem" }} onClick={() => saveData()}>
                        <i className="icon-floppy-disk mr-1"></i> Сохранять
                      </button>
                    </div>
                  </div>
                </form>

                {/* all data */}
                <AllData
                  setAlert={setAlert}
                  currentUser={currentUser}
                  sectorlar={sectorlar}
                  viloyatData={viloyatData}
                  notParentsCard1={notParentsCard1}
                  notParentsCard2={notParentsCard2}
                  notParentsCard3={notParentsCard3}
                  notParentsCardClick1={notParentsCardClick1}
                />
              </div>
            </div>
          </div>

          {/* alert content */}
          <AlertContent alert={alert} />

        </div>
      </div>
    </div>
  )
}

export default React.memo(HududContent);