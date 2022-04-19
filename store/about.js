export const state = () => ({
  title: '',
  banner: '',
  descr: '',
  advantages: [],
  blockquote: {}
})

export const mutations = {
  setAboutData (state, data) {
    state.title = data.title
    state.banner = data.banner
    state.descr = data.descr
    state.advantages = data.advantages
    state.blockquote = data.blockquote
  }
}

export const actions = {
  async getAboutData ({ commit }) {
    const res = await this.$axios.get('/legal/page/about')
    // const res = await this.$axios.get('/about')
    commit('setAboutData', res.data)
  }
}
