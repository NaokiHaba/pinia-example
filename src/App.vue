<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "@/stores/ProductStore"
import { useCartStore } from "@/stores/CartStore"

const productStore = useProductStore()
const cartStore = useCartStore()

cartStore.$onAction((
    {
      name, // name of the action
      store, // store instance, same as `someStore`
      args, // array of parameters passed to the action
      after, // hook after the action returns or resolves
      onError // hook if the action throws or rejects
    }) => {
  if (name === 'addItems') {
    // this will trigger if the action succeeds and after it has fully run
    after(() => {
      console.log(`Added ${args[0]} ${args[1].name} to cart`)
    })

    // this will trigger if the action throws or returns a promise that rejects
    onError((error) => {
      console.warn(`Failed to add ${args[0].quantity} ${args[1].name} to cart`, error)
    })
  }
})

productStore.fill()

</script>

<template>
  <div class="container">
    <TheHeader/>
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton @click="cartStore.redo" class="ml-2">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
          v-for="product in productStore.products"
          :key="product.name"
          :product="product"
          @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
