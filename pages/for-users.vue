<template>
  <div class="for-users-page">

    <UIBreadcrumbs/>

    <section class="s-for-users">
      <div class="container">

        <UIPageTitle title="Пользователям"/>

        <div
          class="accordion"
          :class="{'active': accordionOpened.length !== 0}">

          <AccordionItem
            :opened="accordionOpened.indexOf(1) !== -1"
            @toggle="toggle($event, 1)">
            <template #header>Гарантии</template>
            <template #body>
              <InfoGuarantee/>
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(2) !== -1"
            @toggle="toggle($event, 2)">
            <template #header>Оплата и доставка</template>
            <template #body>
              <InfoPaymentAndDelivery />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(3) !== -1"
            @toggle="toggle($event, 3)">
            <template #header>Условия продажи</template>
            <template #body>
              <InfoTermsOfSale />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(4) !== -1"
            @toggle="toggle($event, 4)">
            <template #header>Обмен и возврат товара</template>
            <template #body>
              <InfoExchange />
            </template>
          </AccordionItem>

          <AccordionItem
            :opened="accordionOpened.indexOf(5) !== -1"
            @toggle="toggle($event, 5)">
            <template #header>Контакты</template>
            <template #body>
              <InfoContacts />
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
  data: () => ({
    accordionOpened: [],
    breadcrumbs: [
      {
        title: 'Пользователям'
      }
    ]
  }),
  methods: {
    toggle (bool, id) {
      bool ? this.accordionOpened = this.accordionOpened.filter(item => item !== id) : this.accordionOpened.push(id)
    }
  }
}
</script>

<style scoped>

</style>
