import React from "react";
import { useRef } from "react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { axiosInstanceKadr } from "../../../../config";
import KadrlarNavbar from "../../kadrlarNavbar/KadrlarNavbar";
import Select from "react-select";
import InputMask from "react-input-mask";
import is from 'is_js';
import { useDispatch, useSelector } from "react-redux";
import { editCv } from "../../../../redux/reducers/kadr";

const CvContent = ({ currentUser, permission, ranks }) => {
  const [edit, setEdit] = useState(false)
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const dispatch = useDispatch()

  const languagesOption = [
    { value: "0", label: "Uzb" },
    { value: "1", label: "Ru" },
    { value: "2", label: "Eng" },
  ]

  const academicDegreeRef = useRef()
  const academicTitleRef = useRef()
  const deputyRef = useRef()
  const emailRef = useRef()
  const higherEducationRef = useRef()
  const languagesRef = useRef()
  const levelRef = useRef()
  const numberRef = useRef()
  const partyRef = useRef()
  const placeOfResidenceRef = useRef()
  const professionRef = useRef()
  const stateAwardRef = useRef()
  const graduatedRef = useRef()
  const militaryRankRef = useRef()

  const { id } = useParams()

  const data = useSelector((state) => state.kadr.cvData)
  const userData = useSelector((state) => state.kadr.userInfo)

  console.log(data);

  const editFunc = () => {
    const lan = languagesRef?.current?.props?.value?.map((item) => {
      return item?.value
    })

    if (is.email(emailRef.current.value) || (emailRef.current.value.trim() === "")) {
      console.log(1);
      const info = {
        kadrId: id,
        graduated: graduatedRef.current.value,
        militaryRank: militaryRankRef.current.value,
        academicDegree: academicDegreeRef.current.value,
        academicTitle: academicTitleRef.current.value,
        deputy: deputyRef.current.value,
        email: emailRef.current.value,
        higherEducation: higherEducationRef.current.value,
        languages: lan,
        level: levelRef.current.value,
        number: numberRef.current.value,
        party: partyRef.current.value,
        placeOfResidence: placeOfResidenceRef.current.value,
        profession: professionRef.current.value,
        stateAward: stateAwardRef.current.value,
      }
  
      console.log(info)
      axiosInstanceKadr.put(`CV/update`, info).then(res => {
        console.log(res.data);
        Alert(setAlert, "success", "Muvofaqqiyatli o`zgartirildi!");
        dispatch(editCv(info));
        setEdit(false);
      })
    } 

  }

  const NumberMask = () => {
    return (
      <InputMask mask="+\9\9\8\(99)-999-99-99" style={{ textTransform: "uppercase" }} defaultValue={data?.number ? data?.number : ""}>
        {(inputProps) => <div className="form-group form-group-floating mb-0">
          <div className="position-relative">
            <input
              {...inputProps}
              disabled={edit ? false : true}
              ref={numberRef}
              type="text"
              className="form-control form-control-outline"
            />
            <label
              className="label-floating kadrInp">Telefon raqami:</label>
          </div>
        </div>}
      </InputMask>
    )
  }

  const LanguagesSelect = () => {
    const lan = data?.languages?.map((item) => {
      return languagesOption[Number(item)]
    })
    
    return (
      <Select
        ref={languagesRef}
        defaultValue={lan}
        isMulti
        isDisabled={edit ? false : true}
        placeholder="Tilni tanlang:"
        name="colors"
        options={languagesOption}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(e) => console.log(e)}
      />
    )
  }

  return (
    <div className="card-body p-0 pt-3">
      <div className="card">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <KadrlarNavbar />
        </ul>

        <div className="tab-pane fade show active bg-white" id="colored-tab1">
          <div className="card-body card-body-mobile p-2 pt-4">
          
            <div className="row form-group form-group-floating">
              {/* <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={userData?.docGivePlace}
                  />
                  <label
                    className="label-floating">Tug'ilgan joyi:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={userData?.birthDate?.split("-")?.reverse()?.join(".")}
                  />
                  <label
                    className="label-floating">Tug'ilgan yili:</label>
                </div>
              </div>    
              
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={userData?.nationality?.split("/")[0]}
                  />
                  <label
                    className="label-floating">Millati:</label>
                </div>
              </div> */}

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.placeOfResidence}
                    disabled={edit ? false : true}
                    ref={placeOfResidenceRef}
                  />
                  <label
                    className="label-floating">Yashash joy manzili:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.higherEducation}
                    disabled={edit ? false : true}
                    ref={higherEducationRef}
                  />
                  <label
                    className="label-floating">Ma'lumoti:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.graduated}
                    disabled={edit ? false : true}
                    ref={graduatedRef}
                  />
                  <label
                    className="label-floating">Tamomlagan:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.party}
                    disabled={edit ? false : true}
                    ref={partyRef}
                  />
                  <label
                    className="label-floating">Partiyaviylik:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.profession}
                    disabled={edit ? false : true}
                    ref={professionRef}
                  />
                  <label
                    className="label-floating">Mutaxasisligi:</label>
                </div>
              </div>
          
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.academicDegree}
                    disabled={edit ? false : true}
                    ref={academicDegreeRef}
                  />
                  <label
                    className="label-floating">Ilmiy darajasi:</label>
                </div>

              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.academicTitle}
                    disabled={edit ? false : true}
                    ref={academicTitleRef}
                  />
                  <label
                    className="label-floating">Ilmiy unvoni:</label>
                </div>

              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.level}
                    disabled={edit ? false : true}
                    ref={levelRef}
                  />
                  <label
                    className="label-floating">Malaka darajasi:</label>
                </div>
              </div>
            
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.stateAward}
                    disabled={edit ? false : true}
                    ref={stateAwardRef}
                  />
                  <label
                    className="label-floating">Davlat mukofotlari:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.militaryRank}
                    disabled={edit ? false : true}
                    ref={militaryRankRef}
                  />
                  <label
                    className="label-floating">Harbiy unvoni:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.deputy}
                    disabled={edit ? false : true}
                    ref={deputyRef}
                  />
                  <label
                    className="label-floating">Deputatligi:</label>
                </div>

              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <NumberMask />
              </div>
           
              <div className="col-lg-4 col-md-6 mb-3">
                <LanguagesSelect />
                {/* <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.languagesRef}
                    disabled={edit ? false : true}
                    ref={languagesRef}
                  />
                  <label
                    className="label-floating">Tillarni bilishi:</label>
                </div> */}
              </div>

              <div className="col-lg-4 col-md-6 mb-3">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline InputCard"
                    placeholder="Placeholder"
                    defaultValue={data?.email}
                    disabled={edit ? false : true}
                    ref={emailRef}
                  />
                  <label
                    className="label-floating">Email:</label>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 mb-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                {!edit ? <button onClick={() => setEdit(true)} className="btn btn-primary"><i className="icon-pencil5 mr-1"></i> Tahrirlash</button>
                  : <button onClick={() => { editFunc() }} className="btn btn-success"><i className="fa-solid fa-floppy-disk mr-1"></i> Saqlash</button>
                }
              </div>
            </div>
          </div>

          {/* alert */}
          <AlertContent alert={alert} />
        </div>
      </div>
    </div>

  )
}

export default React.memo(CvContent)