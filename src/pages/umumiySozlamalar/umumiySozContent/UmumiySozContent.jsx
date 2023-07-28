import React from "react";
import { Link } from "react-router-dom";

export default function UmumiySozContent({ currentUser }) {
    return (
        <div className="content">
            <div className="card-body">
                <div className="tab-content">
                    <div id="accordion-styled">
                        <div className="card">
                            <div className="card-header  bg-primary">
                                <h1 className="card-title text-light ">
                                общие настройки
                                </h1>
                            </div>
                            <div className="card-body">
                                <div id="accordion-default">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                <a className="collapsed text-body" data-toggle="collapse"
                                                    href="#accordion-item-default2">общие настройки</a>
                                            </h4>
                                        </div>

                                        <div id="accordion-item-default2" className="collapse"
                                            data-parent="#accordion-default">
                                            <div className="card-body">
                                                <br />
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-qrcode icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <Link to="/umumiySozlamalar_tashkiliy-tuzilma" className="btn btn-primary">
                                                                    Организационная структура
                                                                    </Link>
                                                                    {/* <a href="./tashkiliytuzilma.html"
                                                                        className="btn btn-primary">Tashkiliy Tuzilma
                                                                    </a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack2 icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Настройки администратора</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <Link to="/umumiySozlamalar_modul-sozlamalari" className="btn btn-primary">Настройки модуля</Link>
                                                                    {/* <a href="./modulSozlamalari.html" className="btn btn-primary">Modul Sozlamalar</a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i
                                                                        className="icon-user icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <Link to="/umumiySozlamalar_foydalanuvchi-sozlamalari" className="btn btn-primary">Пользовательские настройки</Link>
                                                                    {/* <a href="./foydlanuvchiBirktirish.html" className="btn btn-primary">Foydalauvchi Sozlamalar</a> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-qrcode icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Организационная структура</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack2 icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Настройки администратора</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Настройки модуля</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-user icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Пользовательские настройки</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- end card --> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                <a className="collapsed text-body" data-toggle="collapse"
                                                    href="#accordion-item-default3">Настройки базы данных
                                                </a>
                                            </h4>
                                        </div>

                                        <div id="accordion-item-default3" className="collapse"
                                            data-parent="#accordion-default">
                                            <div className="card-body">
                                                <div className="col-lg-12">
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-qrcode icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Организационная структура</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack2 icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Настройки администратора</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-stack icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Настройки модуля</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <div className="card card-body justify-content-end text-center"
                                                                style={{ minHeight: "100px" }}>
                                                                <div className="d-flex align-items-center justify-content-center">
                                                                    <i className="icon-user icon-2x text-primary border-primary border-3 rounded-pill p-3 mr-2"></i>
                                                                    {/* <h5 className="card-title"></h5> */}
                                                                    <button className="btn btn-primary">Пользовательские настройки </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card body --> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- end collapse --> */}
                </div>
            </div>
        </div>
    )
}