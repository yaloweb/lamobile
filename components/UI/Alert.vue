<template>

  <div
    class="alert-block"
    :class="{'opened': alert.opened}">
    <div class="alert-block-content">
      {{ alert.text }}
    </div>
    <div
      class="alert-block-close"
      @click="closeAlert"
    />
  </div>

</template>

<script>
export default {
  name: 'Alert',
  computed: {
    alert () {
      return this.$store.state.alert
    }
  },
  methods: {
    closeAlert () {
      this.$store.commit('alert/closeAlert')
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
