import { defineStore } from "pinia"
import { groupBy } from "lodash"

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => groupBy(state.items, item => item.name),
        groupedCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((acc, item) => acc + item.price, 0)
    },
    actions: {
        addToCart(count, item) {
            count = parseInt(count)
            for (let i = 0; i < count; i++) {
                this.items.push({ ...item })
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter((item) => item.name !== itemName)
        }
    }
})