import { createStore, combineReducers } from "redux";
import btnSave from "./btnReducer";

const myReducer = combineReducers({btnSave});
const myStore = createStore(myReducer);


export default myStore;