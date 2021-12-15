<template>

  <div class="auth-page">

    <div class="container">

      <div class="auth-block">

        <div class="back-to-main-link">
          <a href="#" @click="prev"></a>
        </div>

        <RegistrationStep1
          ref="step1"
          v-if="step === 1"
          @next="step = 2"/>

        <RegistrationStep2
          ref="step2"
          v-if="step === 2"
          @next="step = 3"/>

        <RegistrationStep3
          ref="step3"
          v-if="step === 3"/>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'Registration',
  layout: 'auth',
  data: () => ({
    step: 1
  }),
  methods: {
    prev () {
      if (this.step > 1) {
        this.$refs[`step${this.step}`].saveData()
        this.step--
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style
  type="text/css"
  scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateY(40px);
  }
</style>
