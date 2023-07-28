import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Select from "react-select";
import { axiosInstance, axiosInstanceOut } from '../../../config';
import { colourStyles } from './additionFunctions';

const TableSearch = ({ imzolovchilarRef, korrespondentRef, qisqachaMalumotRef, size, tab, setData, selected, setTotalElements }) => {

    const [imzolovchilar, setImzolovchilar] = useState([])
    const [korrespondent, setKorrespondent] = useState([])

    //Imzolovchilar
    useEffect(() => {
        let isMounted = true;

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
                    setImzolovchilar(arr)
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, []);

    // korrespondentlar
    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstance.get("organization/allCorrespondent/" + JSON.parse(localStorage.getItem('oi')));
                console.log(res.data)
                let arr = [];
                res.data.forEach((d) => {
                    arr.push({ value: d.id, label: d.name })
                })

                if (isMounted)
                    setKorrespondent(arr);
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, []);

    //close all options
    const closeOptions = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
        input_checkbox_items.forEach((d, i) => {
            d.style.display = "none";
        })
    }

    //allData
    const allData = async () => {
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: null,
                correspondent: null,
                shortInfo: null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                size: size,
                page: 0,
                tab: tab,
            })
            console.log(res.data);
            setData(res.data?.content)
            setTotalElements(res.data?.totalElements)
        } catch (error) {
            console.log(error.response);
        }
    }

    //searchData
    const searchData = async () => {
        try {
            const res = await axiosInstanceOut.post(`missive/list`, {
                confirmativeWorkPlace: imzolovchilarRef?.current?.props ? imzolovchilarRef?.current?.props?.value?.value : null,
                correspondent: korrespondentRef?.current?.props ? korrespondentRef?.current?.props?.value?.value : null,
                shortInfo: qisqachaMalumotRef?.current?.value ? qisqachaMalumotRef?.current?.value : null,
                workPlace: JSON.parse(localStorage.getItem('ids')),
                size: size,
                page: selected,
                tab: tab,
            })
            console.log(res.data)
            setData(res.data?.content)
            setTotalElements(res.data?.totalElements)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="col-lg-2 col-md-6 mb-2">
                <Select
                    options={imzolovchilar}
                    placeholder="Imzolovchi"
                    ref={imzolovchilarRef}
                    onMenuOpen={closeOptions}
                    className="Tasdiqlovchilar"
                    styles={colourStyles}
                    isClearable={true}
                />
            </div>

            <div className="col-lg-2 col-md-6 mb-2">
                <Select
                    options={korrespondent}
                    placeholder="Korrespondent"
                    isClearable={true}
                    ref={korrespondentRef}
                    className="Korrespondent"
                    styles={colourStyles}
                />
            </div>

            <div className="col-lg-2 col-md-6 mb-2">
                <input type="text" className="form-control form-control-lg p-2"
                    style={{ height: '44px' }}
                    id="korrespondent2"
                    ref={qisqachaMalumotRef}
                    placeholder="Краткая информация" />
            </div>

            <div className="col-lg-2 col-md-6 mb-2">
                <button className="btn btn-primary table-sm-full w-100"
                    style={{ height: '44px' }}
                    onClick={() => searchData()}>
                    Поиск
                </button>
            </div>
            <div className="col-lg-2 col-md-6 mb-2">
                <button className="btn btn-primary mobile-table-none w-100"
                    style={{ height: '44px' }}
                    onClick={() => allData()}>
                    Все
                </button>
            </div>
        </>
    )
}

export default React.memo(TableSearch)