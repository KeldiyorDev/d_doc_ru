import { dispatch } from "../store";
import { ALL_SEARCH_DATA, SEND_DATA, BACK_PAGE_ID } from "../types";

// for extensive search
export const extensiveSearchAllData = (data) => {
  dispatch({ type: ALL_SEARCH_DATA, payload: data });
};
export const extensiveSearchSendData = (data) => {
  dispatch({ type: SEND_DATA, payload: data });
};
export const extensiveSearchBackPageId = (data) => {
  dispatch({ type: BACK_PAGE_ID, payload: data });
};