import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../config";
// import { AuthContext } from "../../../context/AuthContext";
import './login.css';
import jwtDecode from "jwt-decode";
// import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "../../../context/AuthReducer";
import { logInFailure, logInSuccess } from "../../../redux/actions/actionSingInSingOut";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const history = useHistory();
  // const { dispatch, user: currentUser } = useContext(AuthContext);
  // const dispatch = useDispatch();
  // const { user: currentUser } = useSelector(state => state.user);
  const { user: currentUser } = useSelector(state => state.user.insta);


  useEffect(() => {
    let isMounted = true;
    // token ichidan rolni ajratib olish
    let role = "";
    if (currentUser && isMounted) {
      const token = jwtDecode(currentUser);
      role = JSON.parse(token?.supperAdmin).userRoles[0]?.systemName;
      if (role === "base_admin") {
        // history.push("/super_base_admin");
        // history.push("/super_base_admin_tashkilot-qushish");
        window.location.replace('/super_base_admin_tashkilot-qushish')
      }
    }

    return () => {
      isMounted = false;
    }
  }, [currentUser, history]);

  const submitHandler = async () => {
    if (username !== "" || password !== "") {
      // dispatch(LOGIN_START());

      try {
        const res = await axiosInstance.post("auth/login", {
          username: username,
          password: username
        })
        // dispatch(LOGIN_SUCCESS(res.data));
        logInSuccess(res.data)
        // dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
        // history.push("/super_base_admin");
        window.location.replace('/super_base_admin')
      } catch (error) {
        console.log(error?.response);
        if (error?.response?.status === 400) {
          // dispatch(LOGIN_FAILURE("Username (email) yoki parol xato kiritilgan"));
          logInFailure('Username (email) yoki parol xato kiritilgan')
          document.querySelector('.error').textContent = "Username (email) yoki parol xato kiritilgan";
          setTimeout(() => {
            document.querySelector('.error').textContent = "";
          }, 2000);
        }
      }
    } else {
      document.querySelector('.error').textContent = "Поле, обязательное для заполнения";
      setTimeout(() => {
        document.querySelector('.error').textContent = "";
      }, 2000);
    }
  }

  const keyDown = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  }

  return (
    <div className="login12">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fas fa-user ml-2"></i>
              <input
                type="text"
                className="login__input pl-4"
                placeholder="Имя пользователя/электронная почта"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={keyDown}
              />
            </div>
            <div className="login__field mb-4">
              <i className="login__icon fas fa-lock ml-2"></i>
              <input
                type="password"
                className="login__input pl-4"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPasword(e.target.value)}
                onKeyDown={keyDown}
              />
            </div>
            <span className="error"></span>
            <button type="button" className="button login__submit mt-0 loginBtn" onClick={submitHandler}>
              <span className="button__text">Войти сейчас</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  )
}