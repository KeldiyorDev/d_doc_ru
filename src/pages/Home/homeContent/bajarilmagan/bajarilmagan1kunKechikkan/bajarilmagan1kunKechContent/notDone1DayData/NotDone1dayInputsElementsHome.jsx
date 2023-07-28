import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { axiosInstance } from "../../../../../../../config";

const NotDone1dayInputsElementsHome = ({ setData, currentUser, dateFormatSet, korresref, shortDescref, regNumref }) => {
  const [startDate, setStartDate] = useState();

  // search
  const SearchData = async () => {
    let sana = document.querySelector('.qisqacha2').value;

    try {
      const res = await axiosInstance.post(`mainPage/lateOneDay/` + JSON.parse(localStorage.getItem('ids')), {
        correspondentName: korresref.current.value,
        shortDescription: shortDescref.current.value,
        out_number: regNumref.current.value,
        out_date: sana ? dateFormatSet(sana) : '',
        page: 0
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  // all data
  const All = async () => {
    try {
      const res = await axiosInstance.post(`mainPage/lateOneDay/${localStorage.getItem('ids')}`, {
        correspondentName: "",
        shortDescription: "",
        out_number: "",
        out_date: '',
        page: 0
      })
      korresref.current.value = "";
      shortDescref.current.value = "";
      regNumref.current.value = "";
      document.querySelector('.qisqacha2').value = "";
      setData(res.data)
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <table className={'table-sm-full'}>
      <thead>
        <tr className={'direction-mobile'}>
          <th style={{ width: '350px' }}>
            <div
              className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
              <input
                type="text"
                className="form-control form-control-lg"
                id="xujjat"
                placeholder="Корреспондент"
                ref={korresref}
              />
              <div className="form-control-feedback form-control-feedback-lg">
                <i className="icon-search4"></i>
              </div>
            </div>
          </th>
          <th style={{ width: '350px' }} className={'mobile-table-none'}>
            <div
              className="form-group form-group-feedback form-group-feedback-left inp-sm-none inp">
              <input
                type="text"
                className="form-control form-control-lg"
                id="korrespondent2"
                placeholder="Краткая информация"
                ref={shortDescref}
              />
              <div className="form-control-feedback form-control-feedback-lg">
                <i className="icon-search4"></i>
              </div>
            </div>
          </th>
          <th style={{ width: '350px' }}>
            <div
              className="form-group form-group-feedback form-group-feedback-left inp hmmm inp-sm-none">
              <div className="inputBox d-flex align-items-center justify-content-end input-border" style={{ height: "44px" }}>
                <input
                  type="text"
                  className="first qisqacha1"
                  placeholder="Рег №"
                  id="qisqacha1"
                  ref={regNumref}
                />
                <span style={{
                  margin: '0 10px',
                  fontSize: '20px',
                  color: 'grey',
                  backgroundColor: 'white'
                }}>/</span>
                <div className='changeBox' style={{ width: '200px' }}>
                  <DatePicker
                    width="100"
                    className={'qisqacha2'}
                    id={'qisqacha2'}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat={'dd.MM.yyyy'}
                    isClearable
                    showYearDropdown
                    scrollableMonthYearDropdown
                    placeholderText="Дата"
                    name="date"
                  />
                </div>
              </div>
              <div className="form-control-feedback form-control-feedback-lg">
                <i className="icon-search4"></i>
              </div>

            </div>
          </th>
          <th style={{ width: '350px' }}>
            <div className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
              <button className="btn btn-primary mr-2 table-sm-full"
                onClick={SearchData}>Поиск
              </button>
              <button className="btn btn-primary mr-2 table-sm-full"
                onClick={All}>Все
              </button>
              <button className="btn btn-primary mobile-table-none"
                data-toggle="dropdown"><i className="icon-menu9"
                  style={{ fontSize: "18px" }}></i>
              </button>
              <div className="dropdown-menu">
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="id" value="Id" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="Xujjat" value="Тип документа" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="korres" value="Корреспондент" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="qisqacha" value="Краткая информация" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="Reg" value="Исходящий № / Дата" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="Ijrochi" value="Исполнительный" />
                <input type="submit"
                  className="btn btn-white dropdown-item  w-100 myBtn"
                  name="Harakatlar" value="Действия" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  )
}

export default React.memo(NotDone1dayInputsElementsHome);