<template>
  <div class="basket-total-promocode-block">
    <form class="basket-total-promocode">
      <input
        type="text"
        v-model="promocode"
        :class="{
          'invalid': $v.$error ? !$v.promocode.required : false,
          'success': promocodeApplied
        }"
        placeholder="Введите промокод">
      <button
        type="submit"
        :class="{
          'loading': promocodeLoading,
          'clear': promocodeApplied
        }"
        :disabled="promocode.trim().length <= 2 || promocodeLoading"
        @click.prevent="checkPromocode"
      >
        <span class="icon-angle-right-light" />
      </button>
    </form>
    <div
      v-if="promocodeApplied"
      class="basket-total-promocode-success">
      Промокод применен
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'FormPromocode',
  validations: {
    promocode: { required }
  },
  computed: {
    ...mapState({
      promocodeLoading: state => state.promocode.promocodeLoading,
      promocodeApplied: state => state.promocode.promocodeApplied
    })
  },
  data: () => ({
    promocode: '',
    text: '',
    type: 'success'
  }),
  methods: {
    checkPromocode () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return false
      }
      if (this.promocodeApplied) {
        this.promocode = ''
      }
      this.$store.commit('promocode/setPromocode', this.promocode)
    }
  },
  beforeDestroy () {
    this.$store.commit('promocode/setPromocode', '')
    this.$store.commit('promocode/setPromocodeApplied', false)
    this.$store.commit('promocode/setPromocodeLoading', false)
  }
}
</script>
