import React, { useEffect, useRef } from "react";
import { axiosInstanceFq } from "../../../../../config";
import Select from 'react-select';
import { Alert } from "../../../../../component/alert/Alert";

const UpdateModal = ({ updateModal, setUpdateModal, setMahallalar, mahallalar, currentUser, setAlert, notParentsCard1, notParentsCard2, notParentsCard3, notParentsCardClick1 }) => {
  const provinceref = useRef();
  const cityref = useRef();
  const sectorref = useRef();
  const mahref = useRef();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      updateModal.obj?.district?.province && provinceref.current.props.onChange({ value: updateModal.obj.district.province?.id, label: updateModal.obj.district.province?.name })
      updateModal.obj?.district && cityref.current.props.onChange({ value: updateModal.obj.district?.id, label: updateModal.obj.district?.name })
      updateModal.obj?.sector && sectorref.current.props.onChange({ value: updateModal.obj?.sector?.code, label: updateModal.obj?.sector?.name })
      mahref.current.value = updateModal.obj.name;
    }

    return () => {
      isMounted = false;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateModal.open]);

  //uzgartirish
  const updatedData = async (dat) => {
    // let viloyat = provinceref.current?.props?.value;
    let shahar = cityref.current?.props?.value;
    let sector = sectorref.current?.props?.value;

    try {
      const res = await axiosInstanceFq.patch(`neighborhood/update`, {
        id: dat.id,
        name: mahref.current.value,
        districtID: shahar ? shahar.value : dat?.district ? dat?.district?.id : null,
        sectorCode: sector ? sector.value : dat?.sector ? dat?.sector?.code : null
      })
      
      let arr = mahallalar.filter((d) => {
        if (d.id === res.data.data.id) {
          d.district = res.data.data.district;
          d.id = res.data.data.id;
          d.name = res.data.data.name;
          d.orderNumber = res.data.data.orderNumber;
          d.sector = res.data.data.sector;
        }
        return d;
      })
      Alert(setAlert, "success", "Информация успешно изменена");
      setUpdateModal({ open: false, obj: {} })
      setMahallalar(arr);
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", error.response?.data?.error?.message);
      setUpdateModal({ open: false, obj: {} });
    }
  }

  return (
    <div className="adminWindow">
      <div className="updateDataWindowWrapper">
        <form style={{ width: "1200px" }}>
          <div className="updateDataWindowTop">
            <h5>O'zgartirish oynasi</h5>
            <span onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</span>
          </div>
          <div className="updateDataWindowCenter">
            <div className="row">
              <div className="col-lg-3">
                <div className="form-group text-left">
                  <Select
                    options={notParentsCard1}
                    onChange={notParentsCardClick1}
                    placeholder="Провинция"
                    className="cardTypeId Viloyat"
                    isClearable={true}
                    ref={provinceref}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group text-left">
                  <Select
                    options={notParentsCard2}
                    placeholder="Район (Город)"
                    className="cardTypeId Tuman"
                    isClearable={true}
                    ref={cityref}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group text-left">
                  <Select
                    options={notParentsCard3}
                    placeholder="Сектор"
                    className="cardTypeId Sector"
                    isClearable={true}
                    ref={sectorref}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group text-left">
                  <div className="position-relative">
                    <input
                      type="text"
                      style={{ height: '56px', margin: '0' }}
                      ref={mahref}
                      className="form-control form-control-outline mahalla"
                      placeholder="Махалля"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="updateDataWindowBottom">
            <button type={'button'} className="btn btn-primary" onClick={() => updatedData(updateModal.obj)}>Изменять</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default React.memo(UpdateModal);