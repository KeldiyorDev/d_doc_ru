import { dispatch } from "../store";
import { CLICK_DATA, OPEN_MODAL, PAG_ID } from "../types";

// for calendar
export const openModalCalendar = (data) => {
    dispatch({ type: OPEN_MODAL, payload: data });
};
export const clickDataCalendar = (data) => {
    dispatch({ type: CLICK_DATA, payload: data });
};
export const pageIdCalendar = (data) => {
    dispatch({ type: PAG_ID, payload: data });
};