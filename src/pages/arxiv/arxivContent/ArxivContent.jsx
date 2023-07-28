import React from 'react';
import './arxivContent.css';
import { NavLink } from 'react-router-dom';
import Select from 'react-select'

export default function ArxivContent({ currentUser }) {
  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Kiruvchi</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <li className="nav-item" style={{ marginLeft: "30px" }}>
            <NavLink exact to="/arxiv" activeClassName="NavLinkLi" className="nav-link">
              <i className="icon-folder-download"></i> Kiruvchi
            </NavLink>
          </li>
          <li className="nav-item">
            <a href="#1" className="nav-link ml-2 d-flex align-items-center justify-content-center">
              <i className="icon-folder-upload mr-1"></i> Chiquvchi
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <form className="">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="form-group">
                        <Select
                          // defaultValue={options[1]}
                          options={[
                            { value: "Korrespondent", label: "Korrespondent", isDisabled: true },
                            { value: "O'zbekiston Respublikasi Vazirlar Mahkamasi", label: "O'zbekiston Respublikasi Vazirlar Mahkamasi" },
                            { value: "Xalq Deputatlari Buxoro Tuman Kengashi deputat so'rovi", label: "Xalq Deputatlari Buxoro Tuman Kengashi deputat so'rovi" }
                          ]}
                          // onChange={logChange}
                          placeholder="Korrespondent"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Qisqacha ma'lumot</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                            <label className="label-floating">Reg №</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1">
                      <button type="button" className="btn btn-primary" style={{ width: "120px", height: "70%" }}>Izlash</button>
                    </div>
                    <div className="col-lg-1">
                      <button type="button" className="btn btn-primary" style={{ width: "120px", height: "70%" }}>Barchasi</button>
                    </div>
                    <div className="col-lg-1">
                      <div className="d-flex justify-content-start align-items-center" style={{ height: "70%" }}>
                        <div className="btn-group" style={{ height: "100%" }}>
                          <button className="btn btn-indigo dropdown-toggle d-flex align-items-center justify-content-center" style={{ width: "120px", height: "100%" }} data-toggle="dropdown">Export</button>
                          <div className="dropdown-menu">
                            <span className="dropdown-item">PDF</span>
                            <span className="dropdown-item">Excel</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <table className="table table-bordered  table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "20%" }}>Korrespondent</th>
                      <th style={{ width: "25%" }}>Qisqacha Ma'lumot</th>
                      <th style={{ width: "30%" }}>reg№/sana</th>
                      <th style={{ width: "15%" }}>Ijrochi</th>
                      <th style={{ width: "5%" }} className="text-center">Xarakatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Ibrohim</td>
                      <td>Nimadir</td>
                      <td>Bilmadim</td>
                      <td>Qo'shni</td>
                      <td className='d-flex justify-content-center'>
                        <a href="#1" className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="O'zgartirish"><span><i className="icon-pencil5"></i></span> </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
