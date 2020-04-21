import { createStore } from 'easy-peasy'
import tableModel from './table/model'
import searchModel from './search/model'

const storeModel = {
  search: searchModel,
  table: tableModel

}

const store = createStore(storeModel)

export default store
