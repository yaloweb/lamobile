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
    const res = await this.$axios.get('/brands.json')
    commit('setBrands', res.data)
  }
}
