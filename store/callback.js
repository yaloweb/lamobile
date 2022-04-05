export const state = () => ({
  callbackPopup: false
})

export const mutations = {
  openCallbackPopup (state) {
    state.callbackPopup = true
  },
  closeCallbackPopup (state) {
    state.callbackPopup = false
  }
}

export const actions = {
  async sendCallbackData (ctx, data) {
    await this.$axios.$get('/catalog')
  }
}
