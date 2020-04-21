import { action } from 'easy-peasy'

const searchModel = {
  data: {
    werkstatt: '',
    option1: false,
    option2: false,
    dates: undefined,
    date: undefined
  },

  updateSearchField: action((state, payload) => {
    state.data.werkstatt = payload
  }),

  updateCheckbox: action((state, payload) => {
    state.data[payload.name] = payload.checked
  }),

  updateDate: action((state, payload) => {
    state.data.date = payload
    state.data.dates = undefined
  }),

  updateDates: action((state, payload) => {
    state.data.date = undefined
    state.data.dates = payload
  })
}

export default searchModel
