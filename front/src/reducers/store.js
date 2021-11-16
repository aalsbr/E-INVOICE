import { createStore, combineReducers } from "redux";
import btnSave from "./btnReducer";
import editList from "./editReducer";

const myReducer = combineReducers({ btnSave, editList });
const myStore = createStore(myReducer);

export default myStore;
