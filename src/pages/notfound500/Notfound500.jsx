import React from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const NotFound500 = () => {
  const history = useHistory();

  const backHome = () => {
    let decoded = jwtDecode(JSON.parse(localStorage.getItem("user")));
    let role = JSON.parse(decoded.supperAdmin)?.userRoles[0]?.systemName;
    if (role !== "base_admin") {
      history.push("/");
    } else {
      history.push("/darico777");
    }
  }

  return (
    <div className="content d-flex justify-content-center align-items-center" style={{
      height: "100vh",
      width: '100vw',
      position: 'fixed',
      inset: 0,
      zIndex: 999999
    }}>
      <div className="flex-fill">
        <div className="text-center mb-4">
          <img src="https://demo.interface.club/limitless/demo/Template/global_assets/images/error_bg.svg" className="img-fluid mb-3" height="230" alt="" />
          <h1 className="display-2 font-weight-bold line-height-1 mb-2">500</h1>
          <h6 className="w-md-25 mx-md-auto">Произошла ошибка.<br />
          Сервер обнаружил внутреннюю ошибку и не смог обработать ваш запрос.
          </h6>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={backHome}>
            <i className="icon-home4 mr-2"></i>
            Вернуться на главную страница
          </button>
        </div>
      </div>
    </div>
  )
}


export default React.memo(NotFound500);