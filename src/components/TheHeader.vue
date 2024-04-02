<script>
// imports
import CartWidget from './CartWidget.vue';
import { mapActions, mapState } from "pinia"
import { useAuthUserStore } from "@/stores/AuthUserStore"

export default {
  components: {
    CartWidget
  },
  methods: {
    ...mapActions(useAuthUserStore, {
      toTwitter: "visitTwitterProfile"
    })
  },
  computed: {
    ...mapState(useAuthUserStore, {
      user: (store) => `Hello, ${store.username}!`
    })
  }
}

</script>

<template>
  <header
      class="flex justify-between p-6 mb-10 items-center"
      style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <input type="text" v-model="user">
    <span class="mr-5" @click="toTwitter">{{ user }}</span>
    <CartWidget class="inline-block"/>
  </header>
</template>