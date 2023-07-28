import React, { useState } from "react";

const TableContent = () => {
  const [tab, setTab] = useState(1);

  return (
    <div className="col-lg-12 sx-none px-0" style={{ display: "block" }}>
      <div className="card-body px-2" style={{ borderRadius: "10px !important" }}>
        <ul className="d-flex justify-content-between nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ textAlign: 'right', borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}>
          <span className={'text-light customTabLink d-flex align-items-center nav-link'}>Ish oqimimi sintaktikasi</span>
          <div className={'d-flex'}>
            <li className="nav-item">
              <div
                onClick={() => setTab(1)}
                className={`${tab === 1 && 'customTabLinkBg'} customTabLink item1 d-flex align-items-center nav-link cursor-pointer`}>
                1A kartochkasi
              </div>
            </li>
            <li className="nav-item">
              <div
                onClick={() => setTab(2)}
                className={`${tab === 2 && 'customTabLinkBg'} customTabLink item1 d-flex align-items-center nav-link cursor-pointer`}>
                2A kartochkasi
              </div>
            </li>
            <li className="nav-item">
              <div
                onClick={() => setTab(3)}
                className={`${tab === 3 && 'customTabLinkBg'} customTabLink item1 d-flex align-items-center nav-link cursor-pointer`}>
                3A kartochkasi
              </div>
            </li>
            <li className="nav-item">
              <div
                onClick={() => setTab(4)}
                className={`${tab === 4 && 'customTabLinkBg'} customTabLink item1 d-flex align-items-center nav-link`}>
                Standard Kartochkasi
              </div>
            </li>
          </div>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card mb-0" style={{ borderWidth: "0px", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}>

              <div className="table-scrollbar card-body p-3">
                {tab === 1 ? (
                  <table className="table table-bordered table-hover">
                    <thead className={"bg-dark text-light w-full"}>
                      <tr>
                        <th style={{ width: '38%', wordWrap: 'break-word' }} scope="col" >1A Nazorat kartochkasi</th>
                        <th style={{ width: '12%' }} scope="col">Jami</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilmagan</th>
                        <th style={{ width: '12%' }} scope="col">Muddati bor</th>
                        <th style={{ width: '12%' }} scope="col">Jarayonda</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilgan</th>
                      </tr>
                    </thead>
                    <tbody className={'noBorder'}>
                      <tr className={'table-info'}>
                        <th>O'zbekiston Respublikasidan kelgan hujjatlar</th>
                        <th>376</th>
                        <th>{Math.floor(Math.random() * 100)}</th>
                        <th>{Math.floor(Math.random() * 100)}</th>
                        <th>{Math.floor(Math.random() * 100)}</th>
                        <th>{Math.floor(Math.random() * 100)}</th>
                      </tr>
                      <tr>
                        <td>O'zbekiston Respublikasi Prezidenti farmonlari</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                      </tr>
                      <tr>
                        <td>O'zbekiston Respublikasi Prezidenti qarorlari</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                      </tr>
                      <tr>
                        <td>O'zbekiston Respublikasi prezidenti farmoyishlari</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                        <td>{Math.floor(Math.random() * 80)}</td>
                      </tr>
                    </tbody>
                  </table>
                ) : tab === 2 ? (
                  <table className="table table-bordered table-hover">
                    <thead className={"bg-dark text-light w-full"}>
                      <tr>
                        <th style={{ width: '38%', wordWrap: "break-word" }} scope="col">2A Nazorat kartochkasi</th>
                        <th style={{ width: '12%' }} scope="col">Jami</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilmagan</th>
                        <th style={{ width: '12%' }} scope="col">Muddati bor</th>
                        <th style={{ width: '12%' }} scope="col">Jarayonda</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilgan</th>
                      </tr>
                    </thead>
                    <tbody className={'noBorder'}>
                    <tr className={'table-info'}>
                      <th>O'zbekiston Respublikasidan kelgan hujjatlar</th>
                      <th>376</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti farmonlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti qarorlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi prezidenti farmoyishlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    </tbody>
                  </table>
                ) : tab === 3 ? (
                  <table className="table table-bordered table-hover">
                    <thead className={"bg-dark text-light w-full"}>
                      <tr>
                        <th style={{ width: '38%', wordWrap: "break-word" }} scope="col">3A Nazorat kartochkasi</th>
                        <th style={{ width: '12%' }} scope="col">Jami</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilmagan</th>
                        <th style={{ width: '12%' }} scope="col">Muddati bor</th>
                        <th style={{ width: '12%' }} scope="col">Jarayonda</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilgan</th>
                      </tr>
                    </thead>
                    <tbody className={'noBorder'}>
                    <tr className={'table-info'}>
                      <th>O'zbekiston Respublikasidan kelgan hujjatlar</th>
                      <th>376</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti farmonlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti qarorlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi prezidenti farmoyishlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="table table-bordered table-hover">
                    <thead className={"bg-dark text-light w-full"}>
                      <tr>
                        <th style={{ width: '38%', wordWrap: "break-word" }} scope="col">4A Nazorat kartochkasi</th>
                        <th style={{ width: '12%' }} scope="col">Jami</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilmagan</th>
                        <th style={{ width: '12%' }} scope="col">Muddati bor</th>
                        <th style={{ width: '12%' }} scope="col">Jarayonda</th>
                        <th style={{ width: '12%' }} scope="col">Bajarilgan</th>
                      </tr>
                    </thead>
                    <tbody className={'noBorder'}>
                    <tr className={'table-info'}>
                      <th>O'zbekiston Respublikasidan kelgan hujjatlar</th>
                      <th>376</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                      <th>{Math.floor(Math.random() * 100)}</th>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti farmonlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi Prezidenti qarorlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    <tr>
                      <td>O'zbekiston Respublikasi prezidenti farmoyishlari</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                      <td>{Math.floor(Math.random() * 80)}</td>
                    </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TableContent);