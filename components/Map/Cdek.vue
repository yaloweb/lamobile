<template>
  <div class="ordering-form">

    <div class="h4">Выберите пункт СДЭК</div>

    <div class="cdek-map-wrapper">

      <div id="forpvz" class="cdek-map"/>

      <div
        class="ordering-form-select-popup"
        :class="{'opened': selectedPopup}"
      >
        <div class="ordering-form-select-popup-block">

          <div
            class="popup-close"
            @click.prevent="selectedPopup = false"
          />

          <div
            v-if="selectedPoint"
            class="ordering-form-select-popup-content"
          >
            <div class="h5">Выбран пункт выдачи заказа:</div>
            <p>№ {{ selectedPoint.id }} в городе {{ selectedPoint.cityName }}</p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MapCdek',
  props: {
    load: Boolean,
    cities: Array
  },
  watch: {
    load (val) {
      if (val && !this.isLoad) {
        this.initWidget()
      }
    }
  },
  data: () => ({
    isLoad: false,
    widget: null,
    selectedPopup: false,
    selectedPoint: null
  }),
  methods: {
    initWidget () {
      if (window.ISDEKWidjet) {
        this.isLoad = true
        this.widget = window.ISDEKWidjet({
          defaultCity: 'Казань',
          cityFrom: 'Москва',
          country: 'Россия',
          link: 'forpvz',
          choose: true,
          hidedress: true,
          bymapcoord: false,
          hidecash: false,
          hidedelt: true,
          detailAddress: true,
          onChoose: this.onChoose
        })
      }
    },
    onChoose (event) {
      const currentCity = this.cities.filter(item => item.name === event.cityName)[0]
      if (currentCity) {
        this.selectedPoint = event
        this.selectedPopup = true
        this.$emit('select', {
          id: event.id,
          code: currentCity.code
        })
      } else {
        const errorText = `Пожалуйста выберите город из списка доступных: <br>${this.cities.map(city => city.name).join(', ')}.`
        this.$store.commit('error/setErrorText', errorText)
        this.$store.commit('error/openErrorModal')
      }
    }
  }
}
</script>
