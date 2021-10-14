import Vue from 'vue'

Vue.filter('priceFilter', string => {
  let str
  if (string) {
    str = string.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
  }
  if (!str) {
    str = 0
  }
  return str
})
