import { acceptHMRUpdate, defineStore } from "pinia"
import { groupBy } from "lodash"
import { useAuthUserStore } from "@/stores/AuthUserStore"
import { useLocalStorage } from "@vueuse/core"

export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("CartStore", [])
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.name)
            const sorted = Object.keys(grouped).sort()
            let inOrder = {}
            sorted.forEach((key) => {
                inOrder[key] = grouped[key]
            })
            return inOrder
        },
        groupedCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((acc, item) => acc + item.price, 0)
    },
    actions: {
        checkout() {
            const authUserStore = useAuthUserStore()
            alert(`Checkout for ${authUserStore.username} for $${this.total}`)
        },
        addItems(count, item) {
            count = parseInt(count)
            for (let i = 0; i < count; i++) {
                this.items.push({ ...item })
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter((item) => item.name !== itemName)
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addItems(count, item)
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}