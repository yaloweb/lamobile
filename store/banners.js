export const state = () => ({
  banners: []
})

export const mutations = {
  setBanners (state, array) {
    state.banners = array
  }
}

export const actions = {
  async getBanners ({ commit }) {
    const res = await this.$axios.get('/legal/banner/main')
    commit('setBanners', res.data)
  }
}
