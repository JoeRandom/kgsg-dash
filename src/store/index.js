import { createStore } from "easy-peasy";
import tableModel from "./table/model";

const storeModel = {
  table: tableModel
};

const store = createStore(storeModel);

export default store;
