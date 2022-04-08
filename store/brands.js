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
    const res = await this.$axios.$get('https://lamobile-api.bikstart.ru/api/catalog/brand')
    commit('setBrands', res)
  }
}
