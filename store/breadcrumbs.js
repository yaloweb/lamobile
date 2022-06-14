export const state = () => ({
  list: []
})

export const mutations = {
  setBreadcrumbs (state, data) {
    state.list = data
  }
}
