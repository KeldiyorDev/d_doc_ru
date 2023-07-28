import React from "react";

export default function TashkiliyTuzilmaContent({ currentUser }) {
    return (
        <div className="content">
            <h1 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase;" }} >Панель управления организациями</h1>
            <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between">
                    <li className="nav-item"><h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase", color: "#fff", padding: "0 5px 5px 0" }}>Панель управления организациями</h3></li>
                    <li className="nav-item mr-3">
                        <a href="#1" data-toggle="modal" data-target="#yonalish" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}><i className="icon-plus2"></i> Добавить направление</a>
                        <a href="#1" data-toggle="modal" className="ml-2" data-target="#modal_theme_primary" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}><i className="icon-plus2"></i> Добавить организацию</a>
                        <div id="yonalish" className="modal fade" tabIndex="-1">
                            <div className="modal-dialog modal-lg ">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h1 className="modal-title">Добавить направление</h1>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div className="modal-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Направление</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <button className="btn btn-primary">Сохранять</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- end Modal -->
                        <!-- Modal --> */}
                        <div id="modal_theme_primary" className="modal fade" tabIndex="-1">
                            <div className="modal-dialog modal-lg ">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h1 className="modal-title">Добавить организацию</h1>
                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div className="modal-body">
                                        {/* <!-- card1 --> */}
                                        <form >
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" data-mask="999-999-999" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Организация СТИР</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <button type="button" className="btn btn-primary form-control form-control-outline">Получать</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </form>
                                        <hr />
                                        <form >
                                            <div className="row mt-4">
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Название компании</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Короткое имя</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <select data-placeholder="Viloyat" className="form-control select-search  form-control-outlin select">
                                                                <option></option>
                                                                <optgroup label="Viloyat">
                                                                    <option value="AZ">Бухара</option>
                                                                    <option value="CO">Навои</option>
                                                                    <option value="ID">Самарканд</option>
                                                                </optgroup>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <select data-placeholder="Tuman(Shahar)" className="form-control select-search  form-control-outlin select" >
                                                                <option></option>
                                                                <optgroup label="Tuman(Shahar)">
                                                                    <option value="AZ">г. Бухара</option>
                                                                    <option value="CO">Бухарский район</option>
                                                                    <option value="ID">Жондор Туман</option>
                                                                </optgroup>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Адрес</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" data-mask="999-999-999" className="form-control InputCard form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">СТИР</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div className="form-group form-group-floating row InputCard">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" className="form-control form-control-outline" placeholder="placeholder" />
                                                                <label className="label-floating">Ф.И.О</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating  row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="text" data-mask="+998(99) 999-99-99" className="form-control form-control-outline InputCard" placeholder="Placeholder" />
                                                                <label className="label-floating">Телефон </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="email" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">Email</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating  row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <input type="email" className="form-control form-control-outline" placeholder="Placeholder" />
                                                                <label className="label-floating">E-xaт</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <select data-placeholder="Yo'nalish" className="form-control select-search  form-control-outlin select" >
                                                                    <option></option>
                                                                    <optgroup label="Yo'nalish">
                                                                        <option value="AZ">Бухара</option>
                                                                        <option value="CO">Навои</option>
                                                                        <option value="ID">Ташкент</option>
                                                                        <option value="WY">Андижан</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <select data-placeholder="Asosiy bosh tashkilot" className="form-control select-search  form-control-outlin select">
                                                                    <option></option>
                                                                    <optgroup label="Bosh tashkilot">
                                                                    <option value="AZ">Бухара</option>
                                                                        <option value="CO">Навои</option>
                                                                        <option value="ID">Ташкент</option>
                                                                        <option value="WY">Андижан</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <select data-placeholder="Qo'shimcha bosh tashkilot" className="form-control select-search form-control-outlin select">
                                                                    <option></option>
                                                                    <optgroup label="Bosh tashkilot">
                                                                    <option value="AZ">Бухара</option>
                                                                        <option value="CO">Навои</option>
                                                                        <option value="ID">Ташкент</option>
                                                                        <option value="WY">Андижан</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="custom-control custom-checkbox mb-2">
                                                        <input type="checkbox" className="custom-control-input" id="qTash" />
                                                        <label className="custom-control-label" for="qTash">Добавить дочернюю организацию</label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-3" id="passposrtMalumotlari" style={{ display: "none;" }}>
                                                    <div className="form-group form-group-floating row">
                                                        <div className="col-lg-12">
                                                            <div className="position-relative">
                                                                <select data-placeholder="Tuman tashkilot" className="form-control select-search  form-control-outlin select">
                                                                    <option></option>
                                                                    <optgroup label="Tuman tashkilot">
                                                                    <option value="AZ">Бухара</option>
                                                                        <option value="CO">Навои</option>
                                                                        <option value="ID">Ташкент</option>
                                                                        <option value="WY">Андижан</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end card1 --> */}
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <button type="submit" className="btn btn-primary"><i className="icon-floppy-disk"></i> Сохранять</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* <!-- end Modal --> */}
                    </li>
                </ul>

                <div className="tab-content">
                    <div className="card">
                        <div className="card-body" >
                            <div id="accordion-parent">
                                {/* <!-- hokimliklar --> */}
                                <div className="card">
                                    <div className="card-header" style={{ height: "60px;" }}>
                                        <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                            <a className="collapsed text-body NavLink ml-2" style={{ color: "#0056B8 !important;" }} data-toggle="collapse" href="#hokimlik">Власти</a>
                                        </h6>
                                    </div>

                                    <div id="hokimlik" className="collapse" data-parent="#hokimlik">
                                        <div className="card-body">
                                            {/* <!-- boshqarna --> */}
                                            <div className="card">
                                                <div className="card-header" style={{ height: "60px;" }}>
                                                    <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                                        <a className="collapsed text-body NavLink ml-2" data-toggle="collapse" href="#vHokimlik">Провинциальная администрация</a>
                                                    </h6>
                                                </div>

                                                <div id="vHokimlik" className="collapse" data-parent="#vHokimlik">
                                                    <div className="card-body">
                                                        {/* <!-- Child level --> */}
                                                        <div id="accordion-child2">
                                                            {/* <!-- bosh tashkilot --> */}
                                                            <div className="card">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a data-toggle="collapse" className="text-white" href="#bTashkilot">Основная организация</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="bTashkilot" className="collapse " data-parent="#bTashkilot">
                                                                    <div className="card-body">
                                                                        {/* <!-- table --> */}
                                                                        {/* <!-- <button type="button" onclick="sortTable()">OK</button> --> */}
                                                                        <table className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab" id="myTable">
                                                                            <thead>
                                                                                <tr className="bg-dark text-white NavLink text-center">
                                                                                    <th style={{ width: "5%" }}>№</th>
                                                                                    {/* <!-- 58.73X60--> */}
                                                                                    <th style={{ width: " 20%;" }}>Лого</th>
                                                                                    <th style={{ width: " 20%;" }}>Район (город)</th>
                                                                                    <th style={{ width: " 25%;" }}>Короткое имя</th>
                                                                                    <th style={{ width: " 25%;" }}>Директор</th>
                                                                                    <td style={{ width: " 5%;" }}>действия</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="viloyat">
                                                                            </tbody>
                                                                        </table>
                                                                        {/* <!-- end table --> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end bosh tashkilot --> */}
                                                            {/* <!-- quyi tashkilotlar --> */}
                                                            <div className="card mb-0">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a className="collapsed text-white" data-toggle="collapse" href="#qTashkilot">Низшие организации</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="qTashkilot" className="collapse" data-parent="#qTashkilot">
                                                                    <div className="card-body">
                                                                        Тon cupidatat skateboard dolor brunch. Тesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end quyi tashkilot --> */}
                                                        </div>
                                                        {/* <!-- /child level --> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end boshqarma -->
                                            <!-- 1 --> */}
                                            <div className="card">
                                                <div className="card-header" style={{ height: "60px;" }}>
                                                    <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                                        <a className="collapsed text-body NavLink ml-2" data-toggle="collapse" href="#ab">Родительская гармошка №2</a>
                                                    </h6>
                                                </div>

                                                <div id="ab" className="collapse" data-parent="#ab">
                                                    <div className="card-body">
                                                        {/* <!-- Child level --> */}
                                                        <div id="accordion-child2">
                                                            <div className="card">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a data-toggle="collapse" className="text-white" href="#accordion-item-nested-child3">Детский аккордеон №1</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="accordion-item-nested-child3" className="collapse " data-parent="#accordion-child2">
                                                                    <div className="card-body">
                                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card mb-0">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a className="collapsed text-white" data-toggle="collapse" href="#accordion-item-nested-child4">Детский аккордеон №2</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="accordion-item-nested-child4" className="collapse" data-parent="#accordion-child2">
                                                                    <div className="card-body">
                                                                        Тon cupidatat skateboard dolor brunch. Тesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <!-- /child level --> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end1 --> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end hokimliklar --> */}
                                {/* <!-- iqtisodiyot --> */}
                                <div className="card">
                                    <div className="card-header" style={{ height: "60px;" }}>
                                        <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                            <a className="collapsed text-body NavLink" style={{ color: "#0056B8 !important;" }} data-toggle="collapse" href="#iqtisodiyot">Эконом</a>
                                        </h6>
                                    </div>

                                    <div id="iqtisodiyot" className="collapse" data-parent="#iqtisodiyot">
                                        <div className="card-body">
                                            {/* <!-- boshqarna --> */}
                                            <div className="card">
                                                <div className="card-header" style={{ height: "60px;" }}>
                                                    <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                                        <a className="collapsed text-body NavLink ml-2" data-toggle="collapse" href="#vHokimlik">Провинциальная администрация</a>
                                                    </h6>
                                                </div>

                                                <div id="vHokimlik" className="collapse" data-parent="#vHokimlik">
                                                    <div className="card-body">
                                                        {/* <!-- Child level --> */}
                                                        <div id="accordion-child2">
                                                            {/* <!-- bosh tashkilot --> */}
                                                            <div className="card">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a data-toggle="collapse" className="text-white" href="#bTashkilot">Региональная организация</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="bTashkilot" className="collapse " data-parent="#bTashkilot">
                                                                    <div className="card-body">
                                                                        {/* <!-- table --> */}
                                                                        {/* <!-- <button type="button" onclick="sortTable()">OK</button> --> */}
                                                                        <table className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab" id="myTable">
                                                                            <thead>
                                                                                <tr className="bg-dark text-white NavLink text-center">
                                                                                    <th style={{ width: "5%" }}>№</th>
                                                                                    {/* <!-- 58.73X60--> */}
                                                                                    <th style={{ width: "15%;" }}>Лого</th>
                                                                                    <th style={{ width: "15%;" }}>Район (город)</th>
                                                                                    <th style={{ width: "15%;" }}>Короткое имя</th>
                                                                                    <th style={{ width: "15%;" }}>Имя</th>
                                                                                    <td style={{ width: "5%;" }} >действия</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="viloyat">
                                                                            </tbody>
                                                                        </table>
                                                                        {/* <!-- end table --> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end bosh tashkilot --> */}
                                                            {/* 
                                                            <!-- dsdsd -->
                                                            <!-- bosh tashkilot --> */}
                                                            <div className="card">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a data-toggle="collapse" className="text-white" href="#bTashkilot">Районная (городская) организация</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="bTashkilot" className="collapse " data-parent="#bTashkilot">
                                                                    <div className="card-body">
                                                                        {/* <!-- table --> */}
                                                                        {/* <!-- <button type="button" onclick="sortTable()">OK</button> --> */}
                                                                        <table className="table datatable-row-full mt-3 table-bordered table-striped table-hover Tab" id="myTable">
                                                                            <thead>
                                                                                <tr className="bg-dark text-white NavLink text-center">
                                                                                    <th style={{ width: "5%" }}>№</th>
                                                                                    {/* <!-- 58.73X60--> */}
                                                                                    <th style={{ width: "15%;" }}>Лого</th>
                                                                                    <th style={{ width: "15%;" }}>Название организации</th>
                                                                                    <th style={{ width: "15%;" }}>Короткое имя</th>
                                                                                    <th style={{ width: "15%;" }}>Это весело</th>
                                                                                    <th style={{ width: "15%;" }}>Позиция</th>
                                                                                    <th style={{ width: "15%;" }}>Имя</th>
                                                                                    <td style={{ width: "5%;" }}>Действия</td>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody id="viloyat">
                                                                            </tbody>
                                                                        </table>
                                                                        {/* <!-- end table --> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end bosh tashkilot -->
                                                            <!-- end --> */}
                                                            {/* <!-- quyi tashkilotlar --> */}
                                                            <div className="card mb-0">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a className="collapsed text-white" data-toggle="collapse" href="#qTashkilot">Подорганизация</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="qTashkilot" className="collapse" data-parent="#qTashkilot">
                                                                    <div className="card-body">
                                                                        Тon cupidatat skateboard dolor brunch. Тesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <!-- end quyi tashkilot --> */}
                                                        </div>
                                                        {/* <!-- /child level --> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end boshqarma -->
                                            <!-- 1 --> */}
                                            <div className="card">
                                                <div className="card-header" style={{ height: "60px;" }}>
                                                    <h6 className="card-title" style={{ paddingTop: "10px;" }}>
                                                        <a className="collapsed text-body" data-toggle="collapse" href="#ab">Родительская гармошка №2</a>
                                                    </h6>
                                                </div>

                                                <div id="ab" className="collapse" data-parent="#ab">
                                                    <div className="card-body">

                                                        {/* <!-- Child level --> */}
                                                        <div id="accordion-child2">
                                                            <div className="card">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a data-toggle="collapse" className="text-white" href="#accordion-item-nested-child3">Детский аккордеон №1</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="accordion-item-nested-child3" className="collapse " data-parent="#accordion-child2">
                                                                    <div className="card-body">
                                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card mb-0">
                                                                <div className="card-header bg-dark">
                                                                    <h6 className="card-title">
                                                                        <a className="collapsed text-white" data-toggle="collapse" href="#accordion-item-nested-child4">Детский аккордеон №2</a>
                                                                    </h6>
                                                                </div>

                                                                <div id="accordion-item-nested-child4" className="collapse" data-parent="#accordion-child2">
                                                                    <div className="card-body">
                                                                        Тon cupidatat skateboard dolor brunch. Тesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <!-- /child level --> */}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- end1 --> */}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end iqtisodiyot --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}