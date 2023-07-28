import React from "react";
import { useRef } from "react";
import { axiosInstance } from "../config";

const UpdateOrganizationModal = ({ setIsOrgModalUpdate, isOrgModalUpdate, tashqiTashkilotlar, setTashqiTashkilotlar }) => {
  console.log(isOrgModalUpdate)
  console.log(tashqiTashkilotlar);
  const emailRef = useRef()
  const exatRef = useRef()


  const PatchFunc = () => {
    console.log({
      id: isOrgModalUpdate.obj.value,
      name: isOrgModalUpdate.obj.name,
      email: emailRef.current.value,
      exat: exatRef.current.value
    });
    axiosInstance.patch(`/organization/editOrgMails`, {
      id: isOrgModalUpdate.obj.id,
      name: isOrgModalUpdate.obj.name,
      email: emailRef.current.value,
      exat: exatRef.current.value
    }).then((res) => {
      console.log(res.data);
      const newArr = tashqiTashkilotlar.filter((item) => {
        if (item.id === isOrgModalUpdate.obj.id) {
          item.email = emailRef.current.value
          item.exat = exatRef.current.value
        }

        return item
      })

      setTashqiTashkilotlar(newArr)
      setIsOrgModalUpdate({ open: false, obj: {} })
    })
  }

  return (
    <div className="openOrgModal_container">
      <div className="openOrgModal_wrapper">
        <div className="openOrgModal_top">
          <span className='orgName'>Изменить организацию</span>
          <i className="material-icons closeIcon" onClick={() => setIsOrgModalUpdate({ open: false, obj: {} })}>&#xe5cd;</i>
        </div>
        <div className="openOrgModal_bottom">
          <form className="formUpdateData">
            <div className='formUpdateDataPosition'>
              <input
                type="text"
                placeholder='OrgName'
                className='ibput_data_update'
                value={isOrgModalUpdate.obj.name}
              />
            </div>
            <div className='formUpdateDataPosition formUpdateDataPositionB'>
              <input
                type="email"
                placeholder='Email'
                className='ibput_data_update'
                defaultValue={isOrgModalUpdate.obj.email}
                ref={emailRef}
              />
              <input
                type="text"
                placeholder='Eхaт'
                className='ibput_data_update'
                defaultValue={isOrgModalUpdate.obj.exat}
                ref={exatRef}
              />
              {/*<input*/}
              {/*    type="text"*/}
              {/*    placeholder='Exat'*/}
              {/*    className='ibput_data_update'*/}
              {/*/>*/}
            </div>
          </form>
          <button type='button' className='btn_save'
            onClick={() => PatchFunc()}
          ><i className='fas-fa save'></i> Сохранять</button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UpdateOrganizationModal);