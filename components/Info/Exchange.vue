<template>
  <div class="exchange">
    <div
      class="exchange-content"
      v-html="exchange.content"
    />
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Exchange',
  computed: {
    ...mapState({
      exchange: state => state.forUsers.exchange
    })
  }
}
</script>
