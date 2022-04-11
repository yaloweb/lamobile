let closeTimeout = null

export const state = () => ({
  text: '',
  opened: false
})

export const mutations = {
  setOpenAlert (state) {
    state.opened = true
  },
  closeAlert (state) {
    clearTimeout(closeTimeout)
    state.opened = false
  },
  setAlertText (state, text) {
    state.text = text
  }
}

export const actions = {
  openAlert ({ commit }, text) {
    clearTimeout(closeTimeout)
    commit('setAlertText', text)
    commit('setOpenAlert')
    closeTimeout = setTimeout(() => {
      commit('closeAlert')
    }, 3000)
  }
}
