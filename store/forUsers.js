export const state = () => ({
  guarantee: {
    defect: {},
    term: {},
    nonWarrantyCases: {}
  },
  paymentAndDelivery: {
    descr: '',
    cities: [],
    info: []
  },
  termsOfSale: {
    content: ''
  },
  exchange: {
    content: ''
  },
  contacts: []
})

export const mutations = {
  setInfoForUsers (state, data) {
    state.guarantee = data.guarantee
    state.paymentAndDelivery = data.paymentAndDelivery
    state.termsOfSale = data.termsOfSale
    state.exchange = data.exchange
    state.contacts = data.contacts.content
  }
}

export const actions = {
  async getInfoForUsers ({ commit }) {
    // const res = await this.$axios.get('/for-users')
    const res = await this.$axios.get('/legal/page/for_user')
    commit('setInfoForUsers', res.data)
  }
}
