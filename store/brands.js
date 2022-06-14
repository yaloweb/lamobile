export const state = () => ({
  brands: []
})

export const mutations = {
  setBrands (state, array) {
    state.brands = array
  }
}

export const actions = {
  async getBrands ({ commit }) {
    const res = await this.$axios.$get('/natural/catalog/brand')
    commit('setBrands', res)
  }
}
