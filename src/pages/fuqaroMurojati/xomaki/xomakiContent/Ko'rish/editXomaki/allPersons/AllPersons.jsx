import React, {useEffect, useState} from "react";
import Select from "react-select";
import {axiosInstanceFq} from "../../../../../../../config";

const AllPersons = ({
                        setIsPerson,
                        isPerson,
                        orgNameRef,
                        objData,
                        currentUser,
                        colourStyles1,
                        personRef,
                        nameRef,
                        lastNameRef,
                        middleNameRef,
                        phoneRef,
                        ViloyatRef,
                        TumanRef,
                        SectorRef,
                        MahallaRef,
                        AddressRef
                    }) => {
    const [viloyat, setViloyat] = useState([]);
    const [tuman, setTuman] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [mahalla, setMahalla] = useState([]);
    const [legalUser, setLegalUser] = useState([]);


    // yuridik va jismoniy shaxsni select uchun olish
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            const res = await axiosInstanceFq.get("citizens");
            console.log(res?.data?.data)
            let arr = [];
            res?.data?.data.forEach((d) => {
                arr.push({value: d.id, label: d.name});
            })
            if (isMounted) {
                setLegalUser(arr);
            }
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
            console.log(res.data.data)
            let arr = [];
            res?.data?.data.forEach((d) => {
                arr.push({value: d.id, label: d.name});
            })
            if (isMounted)
                setViloyat(arr);
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    const notParentsCardClickViloyat = async (e) => {
        if (e) {
            const res = await axiosInstanceFq.get("district/list/" + e.value)
            let arr = [];
            res?.data?.data.forEach((d) => {
                arr.push({value: d.id, label: d.name});
            });
            setTuman(arr);
            setTimeout(() => {
                setMahalla([]);
            }, 1);
        }
    }

    const notParentsCardClickTuman = async (e) => {
        try {
            const res = await axiosInstanceFq.get("neighborhood/listWithID/" + e.value)
            let arr = [];
            res?.data?.data.forEach((d) => {
                arr.push({value: d.id, label: d.name});
            })
            setMahalla(arr);
        } catch (e) {
            console.log(e)
        }
    }

    const notParentsCardClickMahalla = async (e) => {
        if (e) {
            if (e) {
                try {
                    const res = await axiosInstanceFq.get("sectors/" + e.value)
                    setSectors(res.data);
                } catch (e) {
                    console.log(e.response)
                }
            }
        }
    }

    //yuridik yoki jismoniy shaxsni idsini olish
    const setLegalUserNumber = (e) => {
        setIsPerson(e.value)
    }

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            if (objData?.length > 0) {
                // oldin viloyat tanlangan bo'lsa, tumanni o'qib olish
                try {
                    const res = await axiosInstanceFq.get("district/list/" + objData[0]?.provinceID)
                    console.log(res.data.data)
                    let arr = [];
                    res?.data?.data?.forEach((d) => {
                        arr.push({value: d.id, label: d.name});
                    })
                    if (isMounted) {
                        setTuman(arr);
                        // tuman orqali mahallani o'qib olish
                        try {
                            const res = await axiosInstanceFq.get("neighborhood/listWithID/" + objData[0]?.districtID)
                            console.log(res.data.data)
                            let arr = [];
                            res.data.data.forEach((d) => {
                                arr.push({value: d.id, label: d.name});
                            })

                            setMahalla(arr);
                            // mahalla orqali sectorni o'qib olish
                            try {
                                const res = await axiosInstanceFq.get("sectors/" + objData[0]?.neighborhoodID)
                                setSectors(res?.data);
                            } catch (error) {
                                console.log(error);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (e) {
                    console.log(e.response)
                }
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, [currentUser, objData]);

    console.log(objData)

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-group row">
                        <div className="col-lg-12">
                            {legalUser.length > 0 && (
                                <Select
                                    defaultValue={[legalUser?.find((d) => d?.value === objData[0]?.citizenTypeCode)]}
                                    options={legalUser}
                                    onChange={(e) => setLegalUserNumber(e)}
                                    styles={colourStyles1}
                                    isClearable={true}
                                    ref={personRef}
                                />
                            )}
                            <div className="invalid-feedback">
                                Maydonni tanlang
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="row">
                    {
                        isPerson === 1 ? <>
                            <div className="col-lg-4">
                                <div className="form-group form-group-floating  row">
                                    <div className="col-lg-12">
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control form-control-outline InputCard lastNameJismoniy"
                                                placeholder="Placeholder"
                                                required={true}
                                                minLength={3}
                                                defaultValue={objData[0]?.lastName}
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
                                                placeholder="Placeholder"
                                                required
                                                minLength={4}
                                                defaultValue={objData[0]?.firstName}
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
                                                   placeholder="Placeholder"
                                                   required
                                                   minLength={5}
                                                   defaultValue={objData[0]?.middleName}
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
                                               placeholder="Placeholder"
                                               required
                                               minLength={5}
                                               defaultValue={objData[0]?.orgName}
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
                                        defaultValue={objData[0]?.phoneNumber}
                                        placeholder="Placeholder"
                                        ref={phoneRef}
                                    />
                                    <label className="label-floating">Telefon</label>
                                    <div className="invalid-feedback">Maydonni to'ldiring</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p style={{borderTop: '5px solid #00BCD4', width: '98%'}} className="ml-2 mb-3"></p>
                    <div className="col-lg-12 p-0 d-none">
                        <div className="form-group row p-0">
                            <div className="col-lg-6 p-0 text-center">
                                <div
                                    className="custom-control custom-control-right custom-checkbox custom-control-inline d-flex align-items-center">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        style={{height: '100px !important'}}
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
                                {viloyat?.length > 0 && (
                                    <Select
                                        defaultValue={[viloyat?.find((d) => d?.value === objData[0]?.provinceID)]}
                                        options={viloyat}
                                        onChange={notParentsCardClickViloyat}
                                        placeholder="VILOYAT"
                                        isClearable={true}
                                        ref={ViloyatRef}
                                    />
                                )}

                                <div className="invalid-feedback"> Maydonni tanlang</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group row">
                            <div className="col-lg-12">
                                {tuman?.length > 0 && (
                                    <Select
                                        defaultValue={[tuman?.find((d) => d?.value === objData[0]?.districtID)]}
                                        options={tuman}
                                        onChange={notParentsCardClickTuman}
                                        placeholder="TUMAN (SHAHAR)"
                                        isClearable={true}
                                        ref={TumanRef}
                                    />
                                )}
                                <div className="invalid-feedback">Maydonni tanlang</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12" id={'watchSector'} style={{display: 'inline-block'}}>
                        <div className="form-group form-group-floating  row">
                            <div className="col-lg-6">
                                <div className="position-relative">
                                    {/*{sectors?.length > 0 && (*/}
                                    {/*    // <Select*/}
                                    {/*    //   defaultValue={[sectors.find((d) => d.value === objData[0]?.sectorCode)]}*/}
                                    {/*    //   options={sectors}*/}
                                    {/*    //   placeholder="Sektor"*/}
                                    {/*    //   isClearable={true}*/}
                                    {/*    //   ref={SectorRef}*/}
                                    {/*    // />*/}
                                    {/*)}*/}
                                    <input
                                        type="text"
                                        disabled={true}
                                        defaultValue={sectors?.name}
                                        className="form-control form-control-outline"
                                        placeholder="Sector"/>
                                    <label className="label-floating">Sector </label>
                                    <div className="invalid-feedback">Maydonni tanlang</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="position-relative">
                                    {mahalla?.length > 0 &&
                                        <Select
                                            defaultValue={[mahalla?.find((d) => d?.value === objData[0]?.neighborhoodID)]}
                                            options={mahalla}
                                            onChange={notParentsCardClickMahalla}
                                            placeholder="Mahalla"
                                            className="cardTypeId InputGetMahallaJismoniy"
                                            isClearable={true}
                                            required={true}
                                            ref={MahallaRef}
                                        />
                                    }
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
                                        placeholder="Placeholder"
                                        ref={AddressRef}
                                        defaultValue={objData[0]?.address}
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

export default React.memo(AllPersons)