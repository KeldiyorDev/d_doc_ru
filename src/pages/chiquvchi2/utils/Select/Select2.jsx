import React, { useState } from 'react';
import InfoModal from './components/infoModal/InfoModal';
import Lists from './components/list/Lists';
import './Select.css';

function Select2(props) {
    const [isOrgModalUpdate, setIsOrgModalUpdate] = useState({ open: false, obj: {} })

    window.onclick = (event) => {
        console.log(event);
        let select_options = document.querySelector(`.${props.className}`).querySelector('.select_options');
        let select_options2 = document.querySelector(`.${props.className2}`).querySelector('.select_options');
        console.log(event.target.querySelector(`.${props.className}`));
        if (event.target.querySelector(`.${props.className}`)) {
            select_options.style.display = "none";
            select_options2.style.display = "none";
        }
        if (event.target.querySelector(`.${props.className2}`)) {
            select_options2.style.display = "none";
            select_options.style.display = "none";
        }
        console.log(event.target.classList.contains(props.className));
        if (event.target.matches(props.className)) {
            select_options.style.display = "none";
            select_options2.style.display = "none";
        }
    }

    //full version
    // document.querySelector('.tabContent')?.addEventListener('click', (event) => {
    //     let select_options = document.querySelector(`.${props.className}`).querySelector('.select_options');
    //     let select_options2 = document.querySelector(`.${props.className2}`).querySelector('.select_options');
    //     console.log(event.target.matches(`.select_options`));
    //     if (!event.target.matches(`select_options`)) {
    //         select_options.style.display = "none";
    //         select_options2.style.display = "none";
    //     }
    //     if (!event.target.matches(`select_options`)) {
    //         select_options2.style.display = "none";
    //         select_options.style.display = "none";
    //     }
    // })


    // change name of input
    const changeHandler = () => {
        let select_options = document.querySelector(`.${props.className}`).querySelector('.select_options');
        let select_options2 = document.querySelector(`.${props.className2}`).querySelector('.select_options');
        if (select_options.style.display === "none") {
            select_options.style.display = "block";
            select_options2.style.display = "none";
        }
        else {
            select_options.style.display = "none";
            select_options2.style.display = "none";
        }
    }

    return (
        <div className={`${props.className}`}>
            <input
                type="text"
                style={{ textTransform: "uppercase !important" }}
                placeholder="Bo'limni tanlang"
                readOnly
                className="select_input"
                onClick={changeHandler}
            />

            <Lists
                data={props.data}
                allClassName={props.allClassName}
                parentClassname={props.className}
                setIsOrgModalUpdate={setIsOrgModalUpdate}
                chooseDataHandler={props.chooseDataHandler}
                chooseAllDataHandler={props.chooseAllDataHandler}
            />

            {isOrgModalUpdate.open && (
                <InfoModal
                    isOrgModalUpdate={isOrgModalUpdate}
                    setIsOrgModalUpdate={setIsOrgModalUpdate}
                    tashqiTashkilotlar={props.tashqiTashkilotlar}
                    setTashqiTashkilotlar={props.setTashqiTashkilotlar}
                />
            )}
        </div>
    )
}

export default React.memo(Select2);