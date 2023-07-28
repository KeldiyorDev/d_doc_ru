import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import KadrlarNavbar from "../../kadrlarNavbar/KadrlarNavbar";
import Select from "react-select";
import { selsectOption } from "../../components/SelectOption";
import "../../kadrlar.css"
import DatePicker from "react-datepicker";

const MalumotiContent = ({ currentUser, permission, ranks }) => {
  const [editModal, setEditModal] = useState(false)
  const [startDate, setStartDate] = useState(false)
  const [newAddModal, setNewAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const muassasaOption = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <div className="card-body p-0 pt-3">
      <div className="card">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <KadrlarNavbar />
        </ul>

        <div className="tab-pane fade show active bg-white" id="colored-tab1">
          <div className="card-body card-body-mobile">
            <div className="d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ margin: "10px 0", fontWeight: "bold", textTransform: "uppercase" }}>Diplomlar</h3>
              <button onClick={() => setNewAddModal(true)} type="submit" className="btn btn-primary">
                <i className="icon-plus3 mr-1" style={{ fontSize: "18px" }}></i>Oliy ma'lumot qo'shish
              </button>
            </div>

            <div className="diplomlar">


              <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
                <thead>
                  <tr className="bg-dark text-white NavLink text-center">
                    <th id='tabRow' style={{ width: "5%" }} className="id">№</th>
                    <th style={{ width: "10%" }} className="qabul">daraja</th>
                    <th style={{ width: "15%" }} className="ariza">o'quv muassasasi nomi</th>
                    <th style={{ width: "10%" }} className="mur">mutaxasislik</th>
                    <th style={{ width: "7.5%" }} className="qisqacha">kirgan yili</th>
                    <th style={{ width: "7.5%" }} className="reg">tamomlagan yili</th>
                    <th style={{ width: "10%" }} className="ijrochi">diplom seriyasi va raqami</th>
                    <th style={{ width: "10%" }} className="ijrochi">diplom berilgan sana</th>
                    <th style={{ width: "15%" }} className="ijrochi">status</th>
                    <th style={{ width: "10%" }} className="ijrochi">amal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td className="text-center">Bakalavr</td>
                    <td className={'text-center'}>O'zbekiston davlat jahon tillari universiteti</td>
                    <td className="text-center"
                      style={{ wordWrap: "break-word" }}>Filologiya(ingliz tili)</td>
                    <td className="text-center"> 2005 </td>
                    <td className="text-center"> 2009 </td>
                    <td className="text-center"> B433832 </td>
                    <td className="text-center"> 22.07.2009 </td>
                    <td className="text-center">
                      <button type="button" style={{ fontWeight: "600" }} class="btn btn-link" data-dismiss="modal">Tasdiqlangan</button>
                    </td>
                    <td className="text-center">
                      <button onClick={() => setEditModal(true)} type="submit" title="O'zgartirish" className="btn btn-primary mr-1" style={{ padding: "4px 8px" }}>
                        <i className="icon-pencil5" style={{ fontSize: "18px" }}></i>
                      </button>
                      <button onClick={() => setDeleteModal(true)} type="submit" className="btn btn-danger ml-1" title="O'chirish" style={{ padding: "4px 8px" }}>
                        <i className="icon-bin" style={{ fontSize: "18px" }}></i>
                      </button>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sport">
              <h3 style={{ margin: "10px 0", fontWeight: "bold", textTransform: "uppercase" }}>sport sinovlari</h3>


              <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
                <thead>
                  <tr className="bg-dark text-white NavLink text-center">
                    <th id='tabRow' style={{ width: "10%" }} className="id">№</th>
                    <th style={{ width: "22.5%" }} className="qabul">sport sinovlari o'tkazilgan davr</th>
                    <th style={{ width: "22.5%" }} className="ariza">sertifikat raqami</th>
                    <th style={{ width: "22.5%" }} className="mur">xodimga berilgan ball</th>
                    <th style={{ width: "22.5%" }} className="qisqacha">sport sinovlari natijasi</th>
                  </tr>
                </thead>
              </table>
            </div>

            {editModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">Oliy ta'lim muassasasini tahrirlash</h5>
                    <button onClick={() => setEditModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                      &times;
                    </button>
                  </div>


                  <form action="/">
                    <div className="modal-body pb-0 px-2">
                      <div className="form-group">
                        <div className="row mb-2">
                          <div className="col-lg-12">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="O'quv muassasasi nomi"
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-lg-6">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Kirgan yili"
                            />
                          </div>

                          <div className="col-lg-6">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Tamomlagan yili"
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-lg-12">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Mutaxasislik"
                            />
                          </div>
                        </div>

                        <div className="row mb-2 form-group form-group-floating">
                          <div className="col-lg-4">
                            <div className="position-relative w-100">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard inputOption"
                                placeholder="Placeholder"
                                defaultValue={""}
                              />
                              <label
                                className="label-floating kadrInp">Diplom seriyasi va raqami:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="sm-mb-10">
                              <div className={'changeBox'} style={{
                                border: '1px solid lightgray',
                                borderRadius: '5px', '&>input': {
                                  border: 'none !important',
                                  outline: 'none !important'
                                }, '&:hover': {
                                  border: 'none !important',
                                  outline: 'none !important'
                                }

                              }}>
                                <DatePicker
                                  className={'seriaCapitalize dateInput'}
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  dateFormat={'dd.MM.yyyy'}
                                  isClearable
                                  placeholderText="Diplom sanasi"
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  name="dateruyxatSanaKadrlar"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Daraja"
                            />
                          </div>
                        </div>


                      </div>

                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Saqlash</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>}

            {newAddModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">Oliy ta'lim muassasasini tahrirlash</h5>
                    <button onClick={() => setNewAddModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                      &times;
                    </button>
                  </div>


                  <form action="/">
                    <div className="modal-body pb-0 px-2">
                      <div className="form-group">
                        <div className="row mb-2">
                          <div className="col-lg-12">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="O'quv muassasasi nomi"
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-lg-6">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Kirgan yili"
                            />
                          </div>

                          <div className="col-lg-6">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Tamomlagan yili"
                            />
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-lg-12">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Mutaxasislik"
                            />
                          </div>
                        </div>

                        <div className="row mb-2 form-group form-group-floating">
                          <div className="col-lg-4">
                            <div className="position-relative w-100">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard inputOption"
                                placeholder="Placeholder"
                                defaultValue={""}
                              />
                              <label
                                className="label-floating kadrInp">Diplom seriyasi va raqami:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="sm-mb-10">
                              <div className={'changeBox'} style={{
                                border: '1px solid lightgray',
                                borderRadius: '5px', '&>input': {
                                  border: 'none !important',
                                  outline: 'none !important'
                                }, '&:hover': {
                                  border: 'none !important',
                                  outline: 'none !important'
                                }

                              }}>
                                <DatePicker
                                  className={'seriaCapitalize dateInput'}
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  dateFormat={'dd.MM.yyyy'}
                                  isClearable
                                  placeholderText="Diplom sanasi"
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  name="dateruyxatSanaKadrlar"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <Select
                              styles={selsectOption}
                              options={muassasaOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Daraja"
                            />
                          </div>
                        </div>


                      </div>

                    </div>

                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">Saqlash</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>}

            {deleteModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">O'chirish</h5>
                    <button onClick={() => setDeleteModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                      &times;
                    </button>
                  </div>

                  <form action="#">
                    <div className="modal-body pb-0">
                      <div className="form-group">
                        <h5> Ushbu ma'lumotlarni
                          <span style={{ fontWeight: "600" }}> o'chirishni </span> tasdiqlaysizmi?
                        </h5>
                      </div>

                    </div>

                    <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                      <button onClick={() => setDeleteModal(false)} type="submit" className="btn btn-danger">Ha</button>
                      <button onClick={() => setDeleteModal(false)} type="submit" className="btn btn-primary">Yo'q</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MalumotiContent)