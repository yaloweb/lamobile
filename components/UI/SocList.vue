<template>
  <div class="soc-list">
    <a
      v-for="soc in list"
      :key="soc.id"
      :href="soc.url"
      target="_blank">
      <img
        :src="getImg(soc.title)"
        alt=""
        jsaction
      />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocList',
  props: {
    list: Array
  },
  methods: {
    getImg (name) {
      if (name === 'Instagram') {
        return '/img/icons/footer-soc/Instagram.svg'
      }
      if (name === 'Vk') {
        return '/img/icons/footer-soc/Vk.svg'
      }
      if (name === 'YouTube') {
        return '/img/icons/footer-soc/Youtube.svg'
      }
      if (name === 'Yandex Zen') {
        return '/img/icons/footer-soc/YZ.svg'
      }
      if (name === 'Live') {
        return '/img/icons/footer-soc/Ozon.png'
      }
    }
  }
}
</script>
