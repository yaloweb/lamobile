<template>
  <transition name="popup-transition">
    <div
      v-if="show"
      class="popup-wrapper"
    >
      <div class="popup-flex">
        <div
          class="popup-block"
          :class="`${type}`"
        >
          <div
            class="popup-close"
            @click="hide"
          />

          <div class="popup-content">
            <slot :hide="hide" />
          </div>
        </div>

        <div
          class="popup-bg"
          @click="hide"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    show: Boolean,
    type: String
  },
  methods: {
    hide () {
      this.$emit('close')
    }
  }
}
</script>
