<template>
  <div class="for-users-page">

    <UIBreadcrumbs/>

    <section class="s-for-users">
      <div class="container">

        <UIPageTitle title="Пользователям"/>

        <div
          class="accordion"
          :class="{'active': activeAccordion !== 0}">

          <AccordionItem
            v-for="infoItem in infoList"
            :key="infoItem.key"
            :ref="infoItem.key"
            :opened="activeAccordion === infoItem.key"
            @toggle="toggle($event, infoItem.key)"
          >
            <template #header>
              {{ infoItem.title }}
            </template>
            <template #body>
              <div class="for-users-accordion-content">
                <component :is="infoItem.componentName"/>
              </div>
            </template>
          </AccordionItem>

        </div>

      </div>
    </section>

  </div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'

export default {
  name: 'ForUsers',
  mixins: [breadcrumbs],
  async fetch () {
    return await this.$store.dispatch('forUsers/getInfoForUsers')
  },
  watch: {
    '$route.query.page' (val) {
      this.activeAccordion = val
      this.scrollTo(val)
    }
  },
  data: () => ({
    breadcrumbs: [
      {
        title: 'Пользователям'
      }
    ],
    infoList: [
      {
        key: 'warranty',
        title: 'Гарантии',
        componentName: 'InfoGuarantee'
      },
      {
        key: 'payment-and-delivery',
        title: 'Оплата и доставка',
        componentName: 'InfoPaymentAndDelivery'
      },
      {
        key: 'terms-of-sale',
        title: 'Условия продажи',
        componentName: 'InfoTermsOfSale'
      },
      {
        key: 'purchase-returns',
        title: 'Обмен и возврат товара',
        componentName: 'InfoExchange'
      },
      {
        key: 'contacts',
        title: 'Контакты',
        componentName: 'InfoContacts'
      }
    ],
    activeAccordion: 0
  }),
  methods: {
    toggle (bool, id) {
      this.activeAccordion = bool ? 0 : id
    },
    scrollTo (val) {
      const item = this.$refs[val]
      if (item && item[0]) {
        const DOMEl = item[0].$el
        if (DOMEl) {
          window.scrollTo({
            top: DOMEl.getBoundingClientRect().top + window.pageYOffset - 30,
            left: 0,
            behavior: 'smooth'
          })
        }
      }
    }
  },
  mounted () {
    const page = this.$route.query.page
    if (page) {
      this.activeAccordion = page
      this.scrollTo(page)
    }
  }
}
</script>

<style scoped>

</style>
