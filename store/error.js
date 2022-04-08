export const state = () => ({
  errorModal: false,
  errorText: 'Ошибка сервера, попробуйте позднее.'
})

export const mutations = {
  openErrorModal (state) {
    state.errorModal = true
  },
  closeErrorModal (state) {
    state.errorModal = false
  },
  setErrorText (state, text) {
    state.errorText = text
  },
  setErrorDefault (state) {
    state.errorText = 'Ошибка сервера, попробуйте позднее.'
  }
}
