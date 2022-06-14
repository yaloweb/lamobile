import moment from 'moment'

const weekDay = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье'
}

export const state = () => ({
  cities: [],
  dates: [],
  times: []
})

export const getters = {
  getCities (state) {
    return state.cities.map(item => {
      item.value = item.name
      return item
    })
  },
  getTimes (state) {
    return state.times.map(item => {
      item.value = item.name
      return item
    })
  },
  getDates (state) {
    return state.dates
  }
}

export const mutations = {
  setDeliveryData (state, data) {
    state.cities = data.cities
    state.dates = data.dates
    state.dates.forEach(date => {
      const dateMoment = moment(date.name).locale('ru')
      date.value = `${weekDay[dateMoment.isoWeekday()]}, ${dateMoment.format('DD MMMM')}`
    })
    state.times = data.times
  }
}

export const actions = {
  async getDeliveryData ({ commit }) {
    const res = await this.$axios.$get('/natural/delivery')
    commit('setDeliveryData', res)
  }
}
