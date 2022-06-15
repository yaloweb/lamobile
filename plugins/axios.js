export default function ({ $axios, store }) {
  $axios.onError(() => {
    store.commit('error/setErrorDefault')
    store.commit('error/openErrorModal')
  })
  $axios.onResponse(response => {
    if (response.data.result === 'error') {
      if (response.data.code === -1) {
        if (response.data.message && response.data.message.length) {
          store.commit('error/setErrorText', response.data.message)
        } else {
          store.commit('error/setErrorDefault')
        }
      } else {
        store.commit('error/setErrorText', response.data.message)
      }
      store.commit('error/openErrorModal')
    }
  })
}
