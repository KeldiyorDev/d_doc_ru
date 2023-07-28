import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  UPLOADED,
  EXIT,
  ALL_SEARCH_DATA,
  SEND_DATA,
  BACK_PAGE_ID,
  OPEN_MODAL,
  CLICK_DATA,
  PAG_ID,
  // PAG_ID,
  DESCRIPTION1,
  DESCRIPTION2,
  DESCRIPTION3
} from '../types'

const initialState = {
  name: "user_data",
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
  maxsusNazoratPageId: 0,
  // kiruvchi ijro


  // for calendar
  open_modal: false,
  date: null,
  pageId: 0,

  // fuqaro murojaati (yangi qo'shish)
  tasnif1: [],
  tasnif2: [],
  tasnif3: [],
};

const documentsReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {

    // login va logout
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload)) //save
      return { ...state, user: action.payload }

    case LOGIN_FAILURE:
      return { ...state, error: action.payload }

    case UPLOADED:
      localStorage.setItem('user', JSON.stringify(action.payload)) //save
      return { ...state, user: action.payload }

    case EXIT:
      return { ...state, user: action.payload }


    // KENG QIDIRISH UCHUN
    case ALL_SEARCH_DATA:
      return { ...state, data: action.payload }

    case SEND_DATA:
      return { ...state, inputData: action.payload }

    case BACK_PAGE_ID:
      return { ...state, [action.payload.pageName]: action.payload.selected }

    // calendar uchun
    case OPEN_MODAL:
      return { ...state, open_modal: action.payload }

    case CLICK_DATA:
      return { ...state, date: action.payload }

    case PAG_ID:
      return { ...state, pageId: action.payload }

    // fuqaro murojaati (tasnif1, tasnif2, tasnif3)
    case DESCRIPTION1:
      return { ...state, tasnif1: action.payload };

    case DESCRIPTION2:
      return { ...state, tasnif2: action.payload };

    case DESCRIPTION3:
      return { ...state, tasnif3: action.payload };
    default:
      return state

  }

};


export default documentsReducer;