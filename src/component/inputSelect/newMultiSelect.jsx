import React, { memo, useRef } from 'react';

const NewMultiSelect = ({ selectData,
  placeholder,
  inputRef,
  isDisabled,
  setIchkiTashkilotlarQiymat,
  setTashqiTashkilotlarQiymat,
  index,
  orgClass }) => {

  console.log(selectData)
  const myDropdownref = useRef();

  const myFunction = (event) => {
    console.log(!event.target.matches('.dropbtn'))
    document.getElementById("myDropdown").classList.toggle("show");
  }

  window.addEventListener('click', (event) => {
    if (!event.target.matches('.dropbtn')) {
      if (myDropdownref.current?.classList?.contains('show')) {
        myDropdownref.current?.classList.remove('show')
      }
    }
  })
  return (
    <>
      <ul className="dropdown">
        <input onClick={myFunction} className="dropbtn form-control" />
        <div id="myDropdown" ref={myDropdownref}>
          <li className={'input_checkbox_item'}> <span className='checked_input'>
            <input
              type="checkbox"
              className={`checked_input_checkbox ${orgClass}`}
            // onChange={(e) => changeHandlerOtherCheckbox(e, item)}
            // defaultChecked={orgNames.find(con => con.name === item.name)}
            // classes={orgClass}
            />
            {/*<span>{item.name}</span>*/}
          </span>Домашняя страница</li>
          <li className={'input_checkbox_item'}> <span className='checked_input'>
            <input
              type="checkbox"
              className={`checked_input_checkbox ${orgClass}`}
            // onChange={(e) => changeHandlerOtherCheckbox(e, item)}
            // defaultChecked={orgNames.find(con => con.name === item.name)}
            // classes={orgClass}
            />
            {/*<span>{item.name}</span>*/}
          </span>О нас</li>
          <li className={'input_checkbox_item'}> <span className='checked_input'>
            <input
              type="checkbox"
              className={`checked_input_checkbox ${orgClass}`}
            // onChange={(e) => changeHandlerOtherCheckbox(e, item)}
            // defaultChecked={orgNames.find(con => con.name === item.name)}
            // classes={orgClass}
            />
            {/*<span>{item.name}</span>*/}
          </span>Контакт</li>
        </div>
      </ul>
    </>
  );
};

export default memo(NewMultiSelect);