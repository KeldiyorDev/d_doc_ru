// export const AuthReducer = (state, action) => {
//     switch (action.type) {
//         case "LOGIN_START":
//             return {
//                 user: null,
//                 isFetching: true,
//                 error: false
//             }
//         case "LOGIN_SUCCESS":
//             return {
//                 user: action.payload,
//                 isFetching: false,
//                 error: false
//             }
//         case "LOGIN_FAILURE":
//             return {
//                 user: null,
//                 isFetching: false,
//                 error: action.payload
//             }
//         case "EXIT":
//             return {
//                 user: null,
//                 isFetching: false,
//                 error: false
//             }
//         case "UPLOADED":
//             return {
//                 user: action.payload,
//                 isFetching: false,
//                 error: false
//             }
//         default:
//             return state;
//     }
// }


import { createSlice } from '@reduxjs/toolkit';
// import { Compressed } from './Compressed';

const slice = createSlice({
  name: "user_data",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false,
    // keng qidirish uchun
    data: [],
    inputData: {},
    // kiruvchi
    nazoratdanOlishPageId: 0,
    bajarilganPageId: 0,
    bajarilmaganPageId: 0,
    nazoratdaPageId: 0,
    malumotPageId: 0,
    rezolutsiyaPageId: 0,
    umumlashtiruvchiPageId: 0,
    yangiPageId: 0,
    redEtilganPageId: 0,
    bajarishPageId: 0,

    // for calendar 
    open_modal: false,
    date: null,
    pageId: 0,

    // fuqaro murojaati (yangi qo'shish)
    tasnif1: [],
    tasnif2: [],
    tasnif3: [],
  },
  reducers: {
    LOGIN_START: (state) => {
      state.user = null
      state.isFetching = true;
      state.error = false
    },
    LOGIN_SUCCESS: (state, action) => {
      state.user = action.payload
      state.isFetching = false;
      state.error = false
      localStorage.setItem('user', JSON.stringify(action.payload)) //save localstorage
    },
    LOGIN_FAILURE: (state, action) => {
      state.user = null
      state.isFetching = false;
      state.error = action.payload
    },
    UPLOADED: (state, action) => {
      state.user = action.payload
      state.isFetching = false;
      state.error = false
      localStorage.setItem('user', JSON.stringify(action.payload)) //save localstorage
    },
    EXIT: (state) => {
      state.user = null
      state.isFetching = false;
      state.error = false
    },

    // KENG QIDIRISH UCHUN
    ALL_SEARCH_DATA: (state, action) => {
      state.data = action.payload
    },
    SEND_DATA: (state, action) => {
      state.inputData = action.payload
    },
    BACK_PAGE_ID: (state, action) => {
      state[action.payload.pageName] = action.payload.selected
    },

    // calendar uchun
    OPEN_MODAL: (state, action) => {
      state.open_modal = action.payload;
    },
    CLICK_DATA: (state, action) => {
      state.date = action.payload;
    },
    PAG_ID: (state, action) => {
      state.pageId = action.payload;
    },

    // fuqaro murojaati (tasnif1, tasnif2, tasnif3)
    DESCRIPTION1: (state, action) => {
      state.tasnif1 = action.payload
    },
    DESCRIPTION2: (state, action) => {
      state.tasnif2 = action.payload
    },
    DESCRIPTION3: (state, action) => {
      state.tasnif3 = action.payload
    },
  }
});

export const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, UPLOADED, EXIT, ALL_SEARCH_DATA, SEND_DATA, BACK_PAGE_ID, DELETE_PAGE_ID, OPEN_MODAL, CLICK_DATA, PAG_ID, DESCRIPTION1, DESCRIPTION2, DESCRIPTION3 } = slice.actions;
export default slice.reducer