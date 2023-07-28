import React from 'react';
import '../../Select.css';

function Lists(props) {

    // all checked or no
    const checkedAllChangeHandler = (event) => {
        let select_checkboxes_input = document.querySelector(`.${props.parentClassname}`).querySelectorAll(`.select_checkboxes_input`);
        if (event.target.checked) {
            select_checkboxes_input.forEach(item => {
                item.checked = true;
            })
            document.querySelector(`.${props.parentClassname}`).querySelector(`.select_input`).value = `Barchasi tanlandi. ${select_checkboxes_input.length - 1}+`;
            props.chooseAllDataHandler(props.data);
        } else {
            select_checkboxes_input.forEach(item => {
                item.checked = false;
            })
            document.querySelector(`.${props.parentClassname}`).querySelector(`.select_input`).value = ``;
            props.chooseAllDataHandler([]);
        }
    }

    // checked item
    const checkedItemChangeHandler = (event, item) => {
        if (event.target.checked) {
            props.chooseDataHandler({ isChoose: true, data: item });
        } else {
            props.chooseDataHandler({ isChoose: false, data: item });
        }
    }

    return (
        <div className="select_options" style={{ display: "none" }}>
            <ul className="select_list">
                <li className="select_list_item" >
                    <label htmlFor={props.allClassName} >
                        <input
                            type="checkbox"
                            id={props.allClassName}
                            className="select_checkboxes_input"
                            onChange={checkedAllChangeHandler}
                        />
                        <span>Barchasini tanlash</span>
                    </label>
                </li>
                {props.data?.length > 0 && props.data.map(((item, index) => (
                    <li key={item.id} className="select_list_item" title={item.name}>
                        <label htmlFor={`select_checkbox_${item.id}`}>
                            <input
                                type="checkbox"
                                id={`select_checkbox_${item.id}`}
                                className="select_checkboxes_input"
                                onChange={(event) => checkedItemChangeHandler(event, item)}
                            />
                            <span>{item.name}</span>
                        </label>
                        <span
                            className="select_button"
                            onClick={() => props.setIsOrgModalUpdate({ open: true, obj: item })}
                        >
                            <i className='icon-pencil5'></i>
                        </span>
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default React.memo(Lists);