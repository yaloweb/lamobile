<template>
  <Popup
    :show="callbackPopup"
    @close="closeCallbackPopup"
  >
    <FormCallback />
  </Popup>
</template>

<script>
export default {
  name: 'Callback',
  computed: {
    callbackPopup () {
      return this.$store.state.callback.callbackPopup
    }
  },
  methods: {
    closeCallbackPopup () {
      this.$store.commit('callback/closeCallbackPopup')
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
