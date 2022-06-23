export const state = () => ({
  promocode: '',
  promocodeApplied: false,
  promocodeLoading: false
})

export const mutations = {
  setPromocode (state, data) {
    state.promocode = data
  },
  setPromocodeApplied (state, data) {
    state.promocodeApplied = data
  },
  setPromocodeLoading (state, data) {
    state.promocodeLoading = data
  }
}
