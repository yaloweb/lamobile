<template>
  <section class="s-products-content-nav">
    <div class="container">

      <nav class="products-content-nav">
        <a
          v-for="(link, idx) in links"
          :key="idx"
          :href="link.href"
          @click.prevent="scrollTo(link.href)"
        >
          {{ link.title }}
        </a>
      </nav>

    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductContentNav',
  data: () => ({
    links: [
      {
        href: '#s-description',
        title: 'Описание'
      },
      {
        href: '#s-characteristics',
        title: 'Характеристики'
      },
      {
        href: '#s-compare',
        title: 'Сравните модели'
      }
    ]
  }),
  methods: {
    scrollTo (id) {
      const DOMElement = document.querySelector(id)

      if (DOMElement) {
        window.scrollTo({
          top: DOMElement.getBoundingClientRect().top + window.pageYOffset - 30,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style
  lang="sass"
  scoped>

</style>
