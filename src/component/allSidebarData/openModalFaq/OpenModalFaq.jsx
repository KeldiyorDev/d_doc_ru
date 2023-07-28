import React from "react";

const OpenModalFaq = ({ setOpenModalFaq, openModalFaq }) => {
  return (
    openModalFaq && (
      <div className="mt-5 adminWindow" tabIndex="-1">
        <div className="modal-dialog modal-full mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">FAQ</h5>
              <button type="button" className="close"
                onClick={() => setOpenModalFaq(false)}>&times;</button>
            </div>
            <div className="modal-body" style={{ maxHeight: "65vh", overflowY: 'auto' }}>
              <div className="card-group-control card-group-control-right">
                <div className="card mb-2">
                  <div className="card-header">
                    <h6 className="card-title">
                      <a className="text-body collapsed" data-toggle="collapse"
                        href="#question1">
                        <i className="icon-help mr-2 text-secondary"></i> A
                        without walking some objective?
                      </a>
                    </h6>
                  </div>
                  <div id="question1" className="collapse">
                    <div className="card-body">
                      She exposed painted fifteen are noisier mistake led waiting.
                      Surprise not wandered speedily husbands although yet end.
                      Are court tiled cease young built fat one man taken. We
                      highest ye friends is exposed equally in. Ignorant had too
                      strictly followed. Astonished as travelling assistance or
                      unreserved oh pianoforte ye. Five with seen put need tore
                      add neat.
                    </div>
                    <div
                      className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                      <span className="text-muted">Latest update: May 25, 2015</span>
                      <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                        <li className="list-inline-item"><a href="#1"
                          className="text-primary mr-2"><i
                            className="icon-thumbs-up2"></i></a> 320
                        </li>
                        <li className="list-inline-item"><a href="#1"
                          className="text-muted mr-2"><i
                            className="icon-thumbs-down2"></i></a> 14
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-header">
                    <h6 className="card-title">
                      <a className="text-body collapsed" data-toggle="collapse"
                        href="#question2">
                        <i className="icon-help mr-2 text-secondary"></i> She
                        exposed painted fifteen are noisier?
                      </a>
                    </h6>
                  </div>
                  <div id="question2" className="collapse">
                    <div className="card-body">
                      There worse by an of miles civil. Manner before lively
                      wholly am mr indeed expect. Among every merry his yet has
                      her. You mistress get dashwood children off. Met whose marry
                      under the merit. In it do continual consulted no listening.
                      Devonshire sir sex motionless travelling six themselves. So
                      colonel as greatly shewing herself observe ashamed.
                    </div>
                    <div
                      className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                      <span className="text-muted">Latest update: May 22, 2015</span>
                      <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                        <li className="list-inline-item"><a href="#1"
                          className="text-primary mr-2"><i
                            className="icon-thumbs-up2"></i></a> 278
                        </li>
                        <li className="list-inline-item"><a href="#1"
                          className="text-muted mr-2"><i
                            className="icon-thumbs-down2"></i></a> 25
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-header">
                    <h6 className="card-title">
                      <a className="text-body collapsed" data-toggle="collapse"
                        href="#question3">
                        <i className="icon-help mr-2 text-secondary"></i> Surprise
                        not wandered speedily?
                      </a>
                    </h6>
                  </div>
                  <div id="question3" className="collapse">
                    <div className="card-body">
                      Do ashamed assured on related offence at equally totally.
                      Use mile her whom they its. Kept hold an want as he bred of.
                      Was dashwood landlord cheerful husbands two. Estate why
                      theirs indeed him polite old settle though she. In as at
                      regard easily narrow roused adieus. Parlors visited noisier
                      how explain pleased his see suppose. He oppose at thrown
                      desire.
                    </div>
                    <div
                      className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                      <span className="text-muted">Latest update: May 12, 2015</span>
                      <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                        <li className="list-inline-item"><a href="#1"
                          className="text-primary mr-2"><i
                            className="icon-thumbs-up2"></i></a> 438
                        </li>
                        <li className="list-inline-item"><a href="#1"
                          className="text-muted mr-2"><i
                            className="icon-thumbs-down2"></i></a> 16
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-header">
                    <h6 className="card-title">
                      <a className="text-body collapsed" data-toggle="collapse"
                        href="#question4">
                        <i className="icon-help mr-2 text-secondary"></i> Are
                        court tiled cease young built fat?
                      </a>
                    </h6>
                  </div>
                  <div id="question4" className="collapse">
                    <div className="card-body">
                      Additions in conveying or collected objection in. Suffer few
                      desire wonder her object hardly nearer. Abroad no chatty
                      others my silent an. Fat way appear denote who wholly narrow
                      gay settle. Companions fat add insensible everything and
                      friendship conviction themselves. Theirs months ten had add
                      narrow own. By spite about do of do allow blush before
                      lively wholly.
                    </div>
                    <div
                      className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                      <span
                        className="text-muted">Latest update: May 9, 2015</span>

                      <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                        <li className="list-inline-item"><a href="#1"
                          className="text-primary mr-2"><i
                            className="icon-thumbs-up2"></i></a> 583
                        </li>
                        <li className="list-inline-item"><a href="#1"
                          className="text-muted mr-2"><i
                            className="icon-thumbs-down2"></i></a> 21
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card mb-2">
                  <div className="card-header">
                    <h6 className="card-title">
                      <a className="text-body collapsed" data-toggle="collapse"
                        href="#question5">
                        <i className="icon-help mr-2 text-secondary"></i> Announcing
                        of invitation principles in?
                      </a>
                    </h6>
                  </div>
                  <div id="question5" className="collapse">
                    <div className="card-body">
                      Wished he entire esteem mr oh by. Possible bed you pleasure
                      civility boy elegance ham. He prevent request by if in
                      pleased. Picture too and concern has was comfort. Ten
                      difficult resembled eagerness nor. Same park bore on be.
                      Warmth his law design say are person. Pronounce suspected in
                      belonging conveying ye repulsive. Whole every miles as tiled
                      at seven concern.
                    </div>
                    <div
                      className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                      <span className="text-muted">Latest update: May 6, 2015</span>

                      <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                        <li className="list-inline-item"><a href="#1"
                          className="text-primary mr-2"><i
                            className="icon-thumbs-up2"></i></a> 642
                        </li>
                        <li className="list-inline-item"><a href="#1"
                          className="text-muted mr-2"><i
                            className="icon-thumbs-down2"></i></a> 26
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-link"
                onClick={() => setOpenModalFaq(false)}>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(OpenModalFaq);