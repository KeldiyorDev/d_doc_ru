import React from "react";
import DatePicker from "react-datepicker";
import MainAllFiles from "./MainAllFiles";
import "react-datepicker/dist/react-datepicker.css";

const Asosiy = ({ data, startDate1, setStartDate1 }) => {
  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Основной</h6>
          </div>
          <div className="card-body px-2 pb-0">
            <div className="row px-0">
              <div className="col-lg-5 px-0">
                <div className="form-group form-group-floating row">
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control daterange-single form-control-outline hujjatTuri"
                        placeholder="Placeholder"
                        defaultValue={data[0]?.document?.card?.cardName}
                        disabled
                      />
                      <label className="label-floating">Тип документа</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 px-0">
                <div className="form-group form-group-floating row">
                  <div className="col-lg-12">
                    <div className={'changeBox'} style={{
                      height: '100%',
                      width: '100%',
                      border: '1px solid lightgray',
                      borderRadius: '5px',
                      '&>input': {
                        border: 'none !important',
                        outline: 'none !important'
                      },
                      '&:hover': {
                        border: 'none !important',
                        outline: 'none !important'
                      }
                    }}>
                      <DatePicker
                        className={'sanaAsosiy'}
                        id={'chiquvchiSana'}
                        selected={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        dateFormat={'dd.MM.yyyy'}
                        isClearable
                        placeholderText="Срок/дата"
                        showYearDropdown
                        scrollableMonthYearDropdown
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 px-0">
                <div className="form-group form-group-floating row">
                  <div className="col-lg-12">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control daterange-single form-control-outline hujjatTuri"
                        placeholder="Placeholder"
                        defaultValue={data[0]?.document?.journalNumber}
                        disabled
                      />
                      <label className="label-floating">Номер журнал</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <table
                className="table table-bordered table-striped table-hover Tab">
                <tbody>
                  {data[0]?.files?.length > 0 && data[0]?.files?.map((hujjat, index) => (
                    <MainAllFiles
                      hujjat={hujjat}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Asosiy);