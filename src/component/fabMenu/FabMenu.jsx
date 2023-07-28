import React, { useEffect, useState } from "react";
import OpenModalFaq from "../allSidebarData/openModalFaq/OpenModalFaq";
import './fabMenu.css';
import $ from 'jquery';
import Chat from "./chat/Chat";

const FabMenu = () => {
  const [openModalFaq, setOpenModalFaq] = useState(false);
  const [openModalChat, setOpenModalChat] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // for FabMenu
    if (isMounted) {
      $(function () {
        $('.btn-group-fab').on('click', '.btn', function () {
          $('.btn-group-fab').toggleClass('active');
        });
        // $('has-tooltip').tooltip();
      });
    }

    return () => {
      isMounted = false
    }
  }, [openModalChat]);

  return (
    <>
      {!openModalChat && (
        <div className="btn-group-fab" role="group" aria-label="FAB Menu">
          <div>
            <button type="button" className="btn btn-main btn-primary has-tooltip" data-placement="left" title="Menu"> <i className="fa fa-bars"></i> </button>
            <button type="button" className="btn btn-sub btn-success has-tooltip" data-placement="left" title="Chat" onClick={() => setOpenModalChat(true)}><i className="icon-bubbles3"></i></button>
            <button type="button" className="btn btn-sub has-tooltip text-white" style={{ backgroundColor: "crimson" }} data-placement="left" title="FAQ" onClick={() => setOpenModalFaq(true)}><i className="material-icons">&#xe88e;</i></button>
            <button type="button" className="btn btn-sub btn-info has-tooltip" data-placement="left" title="Telegram"> <i className="fab fa-telegram" style={{ fontSize: "22px" }}></i> </button>
          </div>
        </div>
      )}

      {/* openModalFaq */}
      <OpenModalFaq
        setOpenModalFaq={setOpenModalFaq}
        openModalFaq={openModalFaq}
      />

      <Chat
        openModalChat={openModalChat}
        setOpenModalChat={setOpenModalChat}
      />
    </>
  )
}

export default React.memo(FabMenu);