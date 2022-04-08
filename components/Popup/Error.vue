<template>
  <div class="error-popup">

    <Popup
      :show="errorModal"
      @close="closeErrorModal"
    >
      <div class="error-content">

        <div class="error-img">
          <img src="/img/logo-lion.svg" alt="">
        </div>

        <div class="error-modal-title">Ошибка!</div>

        <div class="error-modal-text">
          {{ errorText }}
        </div>

      </div>

    </Popup>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PopupError',
  computed: {
    ...mapState({
      errorModal: state => state.error.errorModal,
      errorText: state => state.error.errorText
    })
  },
  methods: {
    closeErrorModal () {
      this.$store.commit('error/closeErrorModal')
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
