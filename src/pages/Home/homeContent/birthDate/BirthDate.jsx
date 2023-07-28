import React from 'react';
import { urlKadr } from '../../../../config';

const BirthDate = ({ kadr }) => {
  const month = [
    "yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul",
    "avgust", "sentyabr", "oktyabr", "noyabr", "dekabr"
  ]

  return (
    <div className="col-lg-3 px-1 mt-1">
      <div className="card cardHome">
        <div className="card-header header-elements-inline bg-primary">
          <h4 className="card-title text-white text-center fw-bold w-100 text-uppercase">Tug'ilgan kunlar</h4>
        </div>
        <div className="card-body card-body-mobile px-3 pt-3 pb-1">
          <div className="row px-0">
            {kadr.map((item) => {
              return (
                <div key={item.id} className="col-lg-12 p-0">
                  <div className="d-flex" style={{ minHeight: "80px", gap: "12px" }}>
                    <div className="d-flex" style={{width: "105px", height: "80px", background: "#fff", justifyContent: "center", alignItems: "center"}}>
                    <img src={item?.avatarPath ? `${urlKadr}file/view/${item?.id}` : "https://www.w3schools.com/howto/img_avatar.png"} alt="avatar" height={80} />
                    </div>
                    <div className="card w-100 h-100 px-2 bg-primary-100" style={{ display: "flex", justifyContent: "center", minHeight: "80px" }}>
                      <h3>{item.lastName} {item.firstName}</h3>
                      <p style={{ fontSize: "18px", fontWeight: "700" }}>
                        {item.birthDate.split("-")[2]} - {month[Number(item.birthDate.split("-")[1]) - 1]} {" "}
                        (<span className='text-primary'> {new Date().getUTCFullYear() - item.birthDate.split("-")[0]} yosh </span>)
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(BirthDate);
