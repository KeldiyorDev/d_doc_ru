import {combineReducers} from "redux";
import documentsReducer from "./reducers";


const reducers = combineReducers({
    insta: documentsReducer
})

export default reducers