export const data = () => ({
  name: '',
  phone: '',
  email: '',
  password: '',
  type: 0,
  basket: 0
})

export const mutations = {
  setUserData (state, data) {
    state.name = data.name
    state.phone = data.phone
    state.email = data.email
    state.password = data.password
    state.type = data.type
    state.basket = data.basket
  }
}

export const actions = {
  async getUserData ({ commit }) {
    const res = await this.$axios.get('/user.json')
    commit('setUserData', res.data)
  }
}
