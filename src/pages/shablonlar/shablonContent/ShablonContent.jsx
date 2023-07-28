import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ShablonContent() {
    const [data, setData] = useState([
        {
            id: 1,
            nomlanishi: " Bildirishnoma (Shablon)",
            fileName: "/style/images/d.png"
        }
    ]);
    const [file, setFile] = useState(null);
    const [file1, setFile1] = useState(null);

    const uzgartirish = (ind) => {
        let nomlanishi = document.querySelector('.nomlanishi').value;
        let arr = data.filter((d, i) => {
            if (i === ind) {
                d.nomlanishi = nomlanishi;
                // d.fileName = nomlanishi;
            }
            return d;
        })
        setData(arr);
        document.querySelector('.close2').click();
    }

    const Uchirish = (ind) => {
        let arr = data.filter((d, i) => {
            return i !== ind;
        });
        setData(arr);
        document.querySelector('.close1').click();
    }

    return (
        <div className="content mb-5">
            <h1 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Шаблоны действий</h1>

            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                    <li className="nav-item" style={{ marginLeft: "30px" }}>
                        <NavLink to="/shablonlar" activeClassName='NavLinkLi' className="nav-link d-flex align-items-center" >
                            <i className="icon-file-text mr-1"></i>Письма, Шаблоны
                        </NavLink>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="colored-tab1">
                        <div className="card">
                            <div className="card-body" style={{ padding: "20px 30px" }}>
                                <h3>Вставить новый шаблон </h3>
                                <div className="form-group">
                                    <div className="form-group form-group-floating row">
                                        <div className="col-lg-12">
                                            <label htmlFor=""></label>
                                            <div className="position-relative">
                                                <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                                <label className="label-floating">Именование</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- editor --> */}
                                <div className="card">
                                    <div id="toolbar-container" ></div>
                                    <div id="editor" style={{ height: "500px" }}>
                                        <p>Это начальный контент редактора.</p>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            // accept='.doc, .xls, .xlsx'
                                            onClick={(e) => e.target.value = null}
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                        <span className="custom-file-label">
                                            {file ? file.name : "Fayl yuklash"}
                                        </span>
                                    </label>
                                    <span className="form-text text-muted">Формат файла: .doc, .xls</span>
                                </div>
                                {/* <!-- table --> */}
                                <table className="table table-bordered datatable-select-single table-striped table-hover Tab" >
                                    <thead>
                                        <tr className="bg-dark text-white NavLink text-center">
                                            <th style={{ width: "5%" }}>№</th>
                                            <th style={{ width: "20%" }}>Фото</th>
                                            <th style={{ width: "65%" }}>Именование</th>
                                            <th style={{ width: "10%" }}>действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((dat, index) => (
                                            <>
                                                <tr className="text-center">
                                                    <td>{dat.id}</td>
                                                    <td className="text-color">
                                                        <img src={dat.fileName} style={{ width: "50%", height: "auto", objectFit: "cover" }} alt="" />
                                                    </td>
                                                    <td>{dat.nomlanishi}</td>
                                                    <td className=''>
                                                        {/* <i className="icon-pencil5 infoBtn bg-dark" title="O'zgartirish"></i> */}
                                                        {/* <a href="#1" data-toggle="modal" data-target="#yangilash" className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="O'zgartirish"><span><i className="icon-pencil5"></i></span> </a> */}
                                                        <div className='d-flex align-items-center justify-content-center'>
                                                            <a href="#1" className="infoBtn bg-dark" data-toggle="modal" data-target="#yangilash" data-popup="tooltip" title="O'zgartirish"><i className="icon-pencil5" ></i> </a>
                                                            <a href="#1" className="infoBtn bg-dark" data-toggle="modal" data-target="#modal_theme_primaryDelete" data-popup="tooltip" title="O'chirish"><i className="icon-trash"></i> </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* update */}
                                                <div className="icon d-flex justify-content-center align-items-center ">
                                                    <div id="yangilash" className="modal fade" tabIndex="-1">
                                                        <div className="modal-dialog modal-xl">
                                                            <div className="modal-content">
                                                                <div className="modal-header bg-primary text-white">
                                                                    <h6 className="modal-title">Изменять</h6>
                                                                    <button type="button" className="close close2" data-dismiss="modal">&times;</button>
                                                                </div>

                                                                <div className="modal-body">
                                                                    <form >
                                                                        <div className="col-lg-12">
                                                                            <div className="row m-0">
                                                                                <div className="col-lg-12 px-0">
                                                                                    <div className="form-group form-group-floating row">
                                                                                        <div className="col-lg-12">
                                                                                            <div className="position-relative">
                                                                                                <input
                                                                                                    type="text"
                                                                                                    style={{ textTransform: "capitalize" }}
                                                                                                    className="form-control form-control-outline nomlanishi"
                                                                                                    placeholder="Placeholder"
                                                                                                    defaultValue={dat.nomlanishi}
                                                                                                />
                                                                                                <label className="label-floating">Именование</label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12">
                                                                            <div className="row m-0">
                                                                                <div className="col-lg-12 px-0">
                                                                                    <div className="form-group mb-2">
                                                                                        <label className="custom-file ">
                                                                                            <input
                                                                                                type="file"
                                                                                                className="custom-file-input w-100"
                                                                                                // accept='.doc, .xls, .xlsx'
                                                                                                onClick={(e) => e.target.value = null}
                                                                                                onChange={(e) => setFile1(e.target.files[0])}
                                                                                            />
                                                                                            <span className="custom-file-label">
                                                                                                {file1 ? file1.name : "Fayl yuklash"}
                                                                                            </span>
                                                                                        </label>
                                                                                        <span className="form-text text-muted mt-0">Формат файла: .doc, .xls</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr style={{ margin: "0" }} />
                                                                        <div className="col-lg-12 mt-3">
                                                                            <div className="form-group form-group-floating row mb-0">
                                                                                <div className="col-lg-12">
                                                                                    <div className="position-relative">
                                                                                        <button type="button" onClick={() => uzgartirish(index)} className="btn btn-primary form-control form-control-outline">
                                                                                            <i className="fas fa-plus mr-1"></i>Добавлять
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* delete */}
                                                    <div id="modal_theme_primaryDelete" className="modal fade show" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "none" }}>
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header bg-primary text-white">
                                                                    <h6 className="modal-title">Удалить окно</h6>
                                                                    <button type="button" className="close close1" data-dismiss="modal">×</button>
                                                                </div>
                                                                <div className="modal-body ">
                                                                    <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
                                                                    <h5>Ushbu ma'lumotni o'chirmoqchimisiz?</h5>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-link bekorQilish" data-dismiss="modal">Отмена</button>
                                                                    <button type="button" className="btn btn-primary" onClick={() => Uchirish(index)}>Выключать</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
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