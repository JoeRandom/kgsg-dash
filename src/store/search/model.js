import { action } from 'easy-peasy'

const searchModel = {
  data: {
    tasks: [],
    werkstatt: '',
    option1: false,
    option2: false,
    dates: undefined,
    date: undefined,
    start: undefined,
    end: undefined
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
    state.data.start = payload[0][0]
    state.data.end = payload[0][1]
  }),

  resetDates: action((state, payload) => {
    state.data.dates = undefined
    state.data.start = undefined
    state.data.end = undefined
    state.data.werkstatt = ''
  })
}

export default searchModel
