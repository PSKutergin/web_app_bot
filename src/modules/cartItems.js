export class CartItems {
    cart = []

    getCart() {
        return this.cart
    }

    setCart(cart) {
        this.cart = cart
    }

    addToCart(id) {
        this.cart = this.cart.map(item => {
            if (item.id === id) {
                item.count++
            }
            return item
        })
    }

    minusFromCart(id) {
        this.cart = this.cart.map(item => {
            if (item.id === id) {
                item.count--
            }
            return item
        })
        this.cart = this.cart.filter(item => item.count > 0)
    }

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id)
    }

    clearCart() {
        this.cart = []
    }
}