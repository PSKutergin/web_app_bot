export class CartItems {
    cart = []

    getCart() {
        return this.cart
    }

    setCart(cart) {
        this.cart = cart
    }

    addToCart(item) {
        this.cart.push(item)
    }

    removeFromCart(item) {
        const index = this.cart.indexOf(item)
        if (index > -1) {
            this.cart.splice(index, 1)
        }
    }

    clearCart() {
        this.cart = []
    }
}