import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../../../../config";
import TashkilotKurishNavbar from "../../tashkilotKurishNavbar/TashkilotKurishNavbar";

const CardSozlamaContent = ({ currentUser }) => {
  const params = useParams();
  const [data, setData] = useState([]);
  // const [dataIs, setDataIs] = useState([]);
  const [openModal, setOpenModal] = useState({ open: false, color: "", text: "", obj: {} });

  // barcha modullarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("card/getAllParentCards/" + params.id)
        if (useEffectCount)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [data.isVisible, openModal.obj, currentUser, params.id]);

  const checked = async (dat, visible) => {
    try {
      const res = await axiosInstance.post("card/makeVisible", {
        orgId: params.id,
        cartTypeId: dat.id,
      })
      console.log(res.data);
      // setDataIs(res.data);
      if (!visible) {
        setOpenModal({ open: true, color: "green", text: "Вы хотите включить этот модуль?", obj: dat });
      } else {
        setOpenModal({ open: true, color: "crimson", text: "Вы хотите выключать этот модуль?", obj: dat });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const accept = (dat) => {
    setOpenModal({ open: false, color: "", text: "", obj: {} });
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Настройки модуля</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <TashkilotKurishNavbar params={params.id} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px" }}>
                <table className="table table-bordered table-striped table-hover Tab table-responsive" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "45%" }}>Документь</th>
                      <th style={{ width: "40%" }}>Положение дел</th>
                      <th style={{ width: "5%" }}>Настройки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "15px" }}>
                        <td className="text-center">
                          {dat.orderNumber}
                          {/* <NumericInput
                                                        value={dat?.orderNumber}
                                                        onKeyDown={(e) => changeInputNumber(e, dat.id)}
                                                        onChange={(e) => inputChangeHandler(e, dat.id)}
                                                        className="adminSozlamaInput"
                                                    /> */}
                        </td>
                        <td className="text-left">{dat?.name}</td>
                        <td id="context" className="text-center">
                          {dat?.isVisible ? (
                            <p className="text-success">Включено</p>
                          ) : (
                            <p className="text-danger">Выключенный</p>
                          )}
                        </td>
                        <td >
                          <input type="checkbox" defaultChecked={dat.isVisible ? true : false} id="kiruvchi" onClick={() => checked(dat, dat.isVisible)} className="checkboxInput cursor-pointer" style={{ width: "100%", height: "25px", padding: "20px" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/*<ReactPaginate*/}
                {/*    previousLabel="<<"*/}
                {/*    nextLabel=">>"*/}
                {/*    pageCount={data?.totalElements / 10}*/}
                {/*    breakLabel="..."*/}
                {/*    className="paginate"*/}
                {/*    activeClassName="active"*/}
                {/*    pageRangeDisplayed={3}*/}
                {/*    onPageChange={handlePageClick}*/}
                {/*    // forcePage={selected}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </div>

        {/* alert */}
        {openModal.open && (
          <div className="adminWindow">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h6 className="modal-title">Окно управления модулем</h6>
                </div>
                <div className="modal-body text-center">
                  <h5 style={{ color: openModal.color }}>{openModal.text}</h5>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => accept(openModal.obj)}>Да</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default React.memo(CardSozlamaContent);