import { dispatch } from "../store";
import { DESCRIPTION1, DESCRIPTION2, DESCRIPTION3 } from "../types";

// for citizem appeal
export const description1CitizemAppeal = (data) => {
    dispatch({ type: DESCRIPTION1, payload: data });
};
export const description2CitizemAppeal = (data) => {
    dispatch({ type: DESCRIPTION2, payload: data });
};
export const description3CitizemAppeal = (data) => {
    dispatch({ type: DESCRIPTION3, payload: data });
};