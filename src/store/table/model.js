import { action } from 'easy-peasy'

const tableModel = {
  data: {
    pl: [],
    ferien: []
  },

  updateData: action((state, payload) => {
    state.data.pl = payload
  }),

  updateFerienData: action((state, payload) => {
    state.data.ferien = payload
  })
}

export default tableModel
