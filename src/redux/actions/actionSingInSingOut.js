import { dispatch } from "../store";
import { EXIT, LOGIN_FAILURE, LOGIN_SUCCESS, UPLOADED } from "../types";

export const logInSuccess = (data) => {
    dispatch({ type: LOGIN_SUCCESS, payload: data });
};
export const logInFailure = (data) => {
    dispatch({ type: LOGIN_FAILURE, payload: data });
};
export const uploaded = (data) => {
    dispatch({ type: UPLOADED, payload: data });
};
export const logOut = (data) => {
    dispatch({ type: EXIT, payload: data });
};