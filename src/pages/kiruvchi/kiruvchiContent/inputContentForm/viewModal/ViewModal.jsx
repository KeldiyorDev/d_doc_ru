import React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const ViewModal = ({ setOpenModal, ids, jurnalref, cardNameref, taqdimFormaref, userref, korresref, outNumref, countPageref, shortDescref, cardTyperef, journalNumref, setStartDate1, setStartDate2 }) => {
  const history = useHistory();

  // rezolutsiyaga o'tish
  const goToResolution = useCallback(() => {
    history.push('/kiruvchi_resolution_kurish/' + ids);
    setOpenModal(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenModal]);

  const clearForm = useCallback(() => {
    jurnalref.current.removeValue(jurnalref.current.props.value);
    cardTyperef.current.removeValue(cardTyperef.current.props.value);
    cardNameref.current.removeValue(cardNameref.current.props.value);
    taqdimFormaref.current.removeValue(taqdimFormaref.current.props.value);
    userref.current.removeValue(userref.current.props.value);
    korresref.current.removeValue(korresref.current.props.value);
    setStartDate1(null);
    setStartDate2(null);
    outNumref.current.value = "";
    countPageref.current.value = "";
    shortDescref.current.value = "";
    journalNumref.current.value = "";
    setOpenModal(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOpenModal]);

  return (
    <div className={'adminWindow'}>
      <div className="modal-dialog modal-sm pt-5 ">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title ">Resolution</h5>
            <button className="close" onClick={() => setOpenModal(false)} data-dismiss="modal">&times;</button>
          </div>

          <div className="modal-body shadowKiruvchi text-center" style={{ padding: "10px", border: "1px solid lightgray", margin: "10px", backgroundColor: "lightgray" }}>
            <h3 className="font-weight-semibold py-1 px-1 " style={{ borderRadius: '5px', fontSize: "20px", color: "#000" }}>Yangi kiruvchi hujjat kiritildi</h3>
          </div>

          <div className="modal-footer d-flex justify-content-center">
            <button onClick={clearForm} className="btn btn-success" style={{ width: "150px" }}>Yangi</button>
            <button onClick={goToResolution} className="btn btn-success" style={{ width: "150px" }}>Resolutsiya</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ViewModal);