export const state = () => ({
  categories: [],
  sliderProducts: []
})

export const mutations = {
  setCategories (state, data) {
    let row = [[], [], []]
    let i = 1
    data.forEach(item => {
      row[i - 1].push(item)
      i === 3 ? i = 1 : i++
    })
    state.categories = row
  },
  setSliderProducts (state, array) {
    state.sliderProducts = array
  }
}

export const actions = {
  async getCategories ({ commit }) {
    const res = await this.$axios.get('/categories.json')
    commit('setCategories', res.data)
  },
  async getSliderProducts ({ commit }) {
    const res = await this.$axios.get('/product-slider-list.json')
    commit('setSliderProducts', res.data)
  }
}
