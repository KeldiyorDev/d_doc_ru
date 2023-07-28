import React, { useEffect, useState } from "react";
import Select from "react-select";
import { axiosInstanceFq } from "../../../../../config";

export default function AllPersons({
  currentUser,
  colourStyles1,
  personRef,
  nameRef,
  lastNameRef,
  middleNameRef,
  phoneRef,
  ViloyatRef,
  TumanRef,
  MahallaRef,
  AddressRef,
  orgNameRef
}) {
  const [viloyat, setViloyat] = useState([]);
  const [tuman, setTuman] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [mahalla, setMahalla] = useState([]);
  const [legalUser, setLegalUser] = useState([]);
  const [isPerson, setIsPerson] = useState(1);


  // yuridik va jismoniy shaxsni select uchun olish
  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      const res = await axiosInstanceFq.get("citizens");
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })

      if (isMounted)
        setLegalUser(arr);
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // viloyatlarni olish
  useEffect(() => {
    let isMounted = true;

    let getData = async () => {
      const res = await axiosInstanceFq.get("province/list")
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })
      if (isMounted)
        setViloyat(arr);
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  //shaxsni tanlash da inputlar uzgarishi uchun
  useEffect(() => {
    let isMounted = true;
    if (isMounted)
      setIsPerson(personRef?.current?.props?.value?.value)
    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // viloyatlarni tanlash orqali tuman yoki shaharni o'qib olish
  const notParentsCardClickViloyat = async (e) => {
    if (e) {
      const res = await axiosInstanceFq.get("district/list/" + e.value)
      let arr = [];
      res.data.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      });
      if (TumanRef.current.props.value)
        TumanRef.current.removeValue(TumanRef.current.props.value);
      if (MahallaRef.current.props.value)
        MahallaRef.current.removeValue(MahallaRef.current.props.value);
      setTuman(arr);
      setTimeout(() => {
        setMahalla([]);
      }, 1);
    }
  }

  //tuman yoki shaharni tanlash orqali mahallalarni olish
  const notParentsCardClickTuman = async (e) => {
    const res = await axiosInstanceFq.get("neighborhood/listWithID/" + e.value)
    let arr = [];
    res?.data?.data.forEach((d) => {
      arr.push({ value: d.id, label: d.name });
    })
    if (MahallaRef.current.props.value)
      MahallaRef.current.removeValue(MahallaRef.current.props.value);
    setMahalla(arr);
  }

  //mahalla tanlash orqali sectorni o'qib olish
  const notParentsCardClickMahalla = async (e) => {
    if (e) {
      try {
        const res = await axiosInstanceFq.get("sectors/" + e.value)
        setSectors(res.data);
      } catch (e) {
        console.log(e.response)
      }
    }
  }

  //yuridik yoki jismoniy shaxsni idsini olish
  const setLegalUserNumber = (e) => {
    setIsPerson(e?.value)
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group row">
            <div className="col-lg-12">
              {/*shaxsni tanlash*/}
              <Select
                defaultValue={{ value: 1, label: "Jismoniy shaxs" }}
                options={legalUser}
                onChange={(e) => setLegalUserNumber(e)}
                styles={colourStyles1}
                placeholder="Shaxsni tanlang"
                isClearable={true}
                required
                ref={personRef}
              />
              <div className="invalid-feedback">
                Maydonni tanlang
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          {/*jismoniy shaxs uchun*/}
          {
            isPerson === 1 ? <>
              <div className="col-lg-4">
                <div className="form-group form-group-floating  row">
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline InputCard lastNameJismoniy"
                        required={true}
                        minLength={3}
                        ref={lastNameRef}
                      />
                      <label className="label-floating">FAMILIYASI</label>
                      <div className="invalid-feedback">Maydonni to'ldiring</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating  row">
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline InputCard firstNameJismoniy"
                        required
                        minLength={4}
                        ref={nameRef}
                      />
                      <label className="label-floating">ISMI</label>
                      <div className="invalid-feedback">Maydonni to'ldiring</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating  row">
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <input type="text"
                        className="form-control form-control-outline InputCard middleNameJismoniy"
                        required
                        minLength={5}
                        ref={middleNameRef}
                      />
                      <label className="label-floating">OTASINI ISMI</label>
                      <div className="invalid-feedback">Maydonni to'ldiring</div>
                    </div>
                  </div>
                </div>
              </div>
            </> : <div className="col-lg-12">
              <div className="form-group form-group-floating  row">
                <div className="col-lg-12">
                  <div className="position-relative">
                    <input type="text"
                      className="form-control form-control-outline InputCard middleNameJismoniy"
                      required
                      minLength={5}
                      ref={orgNameRef}
                    />
                    <label className="label-floating">Organizatsiya nomi</label>
                    <div className="invalid-feedback">Maydonni to'ldiring</div>
                  </div>
                </div>
              </div>
            </div>
          }

          <div className="col-lg-12">
            <div className="form-group form-group-floating  row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard phoneJismoniy"
                    data-mask="99-999-99-99"
                    required={true}
                    maxLength={9}
                    ref={phoneRef}
                  />
                  <label className="label-floating">Telefon</label>
                  <div className="invalid-feedback">Maydonni to'ldiring</div>
                </div>
              </div>
            </div>
          </div>

          <p style={{ borderTop: '5px solid #00BCD4', width: '98%' }} className="ml-2 mb-3"></p>
          <div className="col-lg-12 p-0 d-none">
            <div className="form-group row p-0">
              <div className="col-lg-6 p-0 text-center">
                <div
                  className="custom-control custom-control-right custom-checkbox custom-control-inline d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    style={{ height: '100px !important' }}
                    id="myCheckboxMahalla"
                  />
                  <label className="custom-control-label" htmlFor="myCheckboxMahalla"></label>
                  <span className={'ml-2'}> Yangi mahalla qushish</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="form-group row">
              <div className="col-lg-12">
                <Select
                  options={viloyat}
                  onChange={notParentsCardClickViloyat}
                  placeholder="VILOYAT"
                  className=""
                  isClearable={true}
                  required={true}
                  ref={ViloyatRef}
                />
                <div className="invalid-feedback"> Maydonni tanlang</div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group row">
              <div className="col-lg-12">
                <Select
                  defaultValue={null}
                  options={tuman}
                  onChange={notParentsCardClickTuman}
                  placeholder="TUMAN (SHAHAR)"
                  className=""
                  isClearable={true}
                  required={true}
                  ref={TumanRef}
                />
                <div className="invalid-feedback">Maydonni tanlang</div>
              </div>
            </div>
          </div>
          <div className="col-lg-12" id={'watchSector'}
            style={{ display: 'inline-block' }}>
            <div className="form-group form-group-floating  row">
              <div className="col-lg-6">
                <div className="position-relative">
                  {/*<Select*/}
                  {/*    options={sectors}*/}
                  {/*    // onChange={notParentsCardClickSectors}*/}
                  {/*    placeholder="Sektor"*/}
                  {/*    className="sektors"*/}
                  {/*    isClearable={true}*/}
                  {/*    required={true}*/}
                  {/*    ref={SectorRef}*/}
                  {/*/>*/}
                  <input
                    type="text"
                    disabled={true}
                    defaultValue={sectors?.name}
                    className="form-control form-control-outline"
                    placeholder="Sector" />
                  <label className="label-floating">Sector </label>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <Select
                    options={mahalla}
                    placeholder="Mahalla"
                    onChange={notParentsCardClickMahalla}
                    className="cardTypeId InputGetMahallaJismoniy"
                    isClearable={true}
                    required={true}
                    ref={MahallaRef}
                  />
                  <div className="invalid-feedback">Maydonni tanlang</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group form-group-floating  row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <input
                    type="text"
                    required={true}
                    minLength={6}
                    className="form-control form-control-outline"
                    ref={AddressRef}
                  />
                  <label className="label-floating">MANZIL </label>
                  <div className="invalid-feedback">Maydonni to'ldiring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}