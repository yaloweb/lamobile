<template>
  <div class="terms-of-sale">
    <div
      class="terms-of-sale-content"
      v-html="termsOfSale.content"
    />
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'TermsOfSale',

  computed: {
    ...mapState({
      termsOfSale: state => state.forUsers.termsOfSale
    })
  }
}
</script>
