import React, { useEffect, useRef, useState } from 'react';
import UpdateOrganizationModal from "../UpdateOrganizationModal";
import './multiSelect.css'

const MultiSelect = ({
    selectData, placeholder, inputRef, index, defaultData, orgClass, setIchkiTashkilotlarQiymat,
    setTashqiTashkilotlarQiymat, isDisabled, tashqiTashkilotlar, setTashqiTashkilotlar
}) => {
    const mainCheckboxref = useRef();
    const borderColorChange = useRef();
    const [isOrgModalUpdate, setIsOrgModalUpdate] = useState({ open: false, obj: {} });
    const [orgNames, setOrgNames] = useState([]);
    const [openOption, setOpenOption] = useState(false);

    const changeHandler = (e) => {
        // console.log(!event.target.matches('.dropbtn'))
        // document.getElementById("myDropdown").classList.toggle("show");
        let checked_input_checkbox = document.querySelectorAll(`.${orgClass}`);
        if (e.target.checked) {
            checked_input_checkbox.forEach(item => {
                item.checked = true;
            })
            setOrgNames(selectData);
        } else {
            checked_input_checkbox.forEach(item => {
                item.checked = false;
            })
            setOrgNames([]);
        }
    }

    //full version
    document.querySelector('.tabContent')?.addEventListener('click', (event) => {
        if (!event.target?._wrapperState || !event.target?._wrapperState?.initialValue === "Ichki tashkilotlar" || !event.target?._wrapperState?.initialValue === "Tashqi tashkilotlar") {
            let input_checkbox_items = document.querySelectorAll('.input_checkbox_items');
            input_checkbox_items.forEach((d, i) => {
                if (d.classList?.contains('showMultiOptionsVisible')) {
                    d.classList?.remove('showMultiOptionsVisible');
                    d.style.display = "none";
                }
                setOpenOption(false);
            })
        }
    })

    useEffect(() => {
        let isMounted = true;
        let arr = [];
        selectData?.forEach((d) => {
            defaultData?.forEach((c) => {
                if (d?.value === c?.correspondentID) {
                    arr.push(d)
                }
            })
        })
        if (isMounted) {
            setOrgNames(arr)
        }

        return () => isMounted = false;
    }, [defaultData])

    const changeHandlerOtherCheckbox = (e, item) => {
        console.log(e, item)
        if (orgNames.find(con => con.name === item.name)) {
            let arr = orgNames.filter(orgName => {
                return orgName.name !== item.name
            })
            mainCheckboxref.current.checked = false;
            console.log(arr)
            setOrgNames(arr);
            orgClass === 'internalOrg' ? setIchkiTashkilotlarQiymat(arr) : setTashqiTashkilotlarQiymat(arr)
        } else {
            [...orgNames, item].length === selectData.length ? mainCheckboxref.current.checked = true : mainCheckboxref.current.checked = false;
            setOrgNames([...orgNames, item]);
            orgClass === 'internalOrg' ? setIchkiTashkilotlarQiymat([...orgNames, item]) : setTashqiTashkilotlarQiymat([...orgNames, item])
        }
    }
    console.log(orgNames)
    //bir nechta bo'lsa birini bosganda qolganlari yopiladi
    const openFuncOption = () => {
        let input_checkbox_items = document.querySelectorAll('.input_checkbox_items')
        input_checkbox_items.forEach((d, i) => {
            if (i !== index) {
                d.style.display = "none";
                d.classList.remove('showMultiOptionsVisible');
            } else {
                d.style.display = "block";
                openOption ? d.classList.remove('showMultiOptionsVisible') : d.classList.add('showMultiOptionsVisible');
            }
        })
        setOpenOption(prev => !prev);
    }

    return (
        <>
            <div className="input_checkbox_container">
                <div className="input_checkbox_wrapper">
                    <div className="input_checkbox_wrapper_flex">
                        <input
                            type="text"
                            className='main_input_data'
                            placeholder={placeholder}
                            disabled={isDisabled}
                            ref={inputRef}
                            onClick={openFuncOption}
                            value={orgNames.length === 0 ? placeholder : orgNames.length + " выбрана организация"}
                        />
                        {openOption ? (
                            <i className="material-icons downIcon closeIconMultiSelect">&#xe5cd;</i>
                        ) : (
                            <i className="material-icons downIcon">&#xe313;</i>
                        )}
                    </div>

                    {/* all org name */}
                    <ul className={`input_checkbox_items`} style={{ display: openOption ? 'block' : 'none' }}>
                        <div className='all_checked_data' ref={borderColorChange}
                            style={{ borderBottom: selectData?.length === orgNames?.length ? "1px solid crimson" : "1px solid lightgray" }}>
                            <input
                                type="checkbox"
                                className='checked_input_checkbox_all'
                                ref={mainCheckboxref}
                                onClick={(e) => changeHandler(e)}

                            />
                            <span>Выбрать все</span>
                        </div>
                        {selectData.map((item, index) => (
                            <li key={index} className='input_checkbox_item'
                                onDoubleClick={() => setIsOrgModalUpdate({ open: true, obj: item })}>
                                <span className='checked_input'>
                                    <input
                                        id={`check${index}`}
                                        type="checkbox"
                                        className={`checked_input_checkbox ${orgClass}`}
                                        onClick={(e) => changeHandlerOtherCheckbox(e, item)}
                                        defaultChecked={orgNames.find(con => con.name === item.name)}
                                    />
                                    <label className={"allChooseData"} htmlFor={`check${index}`}> {item.name}</label>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {isOrgModalUpdate.open && (
                <UpdateOrganizationModal
                    setIsOrgModalUpdate={setIsOrgModalUpdate}
                    isOrgModalUpdate={isOrgModalUpdate}
                    tashqiTashkilotlar={tashqiTashkilotlar}
                    setTashqiTashkilotlar={setTashqiTashkilotlar}
                />
            )}
        </>
    );
}

export default React.memo(MultiSelect);
