import getProducts from "./getProducts"
import { showMainButton, showCountCart } from "./helpers"

const products = async (url, cartItems) => {
    const products = await getProducts(url)
    const container = document.querySelector('.products')
    // let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    let cart = cartItems.getCart()

    container.innerHTML = '';

    products.forEach(product => {
        container.insertAdjacentHTML('beforeend', `
        <div class="product" data-id="${product.id}">
            <img class="product_img" src="/images/${product.id}.png">
            <div class="product_title">${product.title}</div>
            <div class="product_description">${product.description}</div>
            <div class="product_extra">
                <div class="product_price">${product.price} $</div>
                <button class="product_btn">В корзину</button>
            </div>
        </div>
    `)
    })

    const btns = document.querySelectorAll('.product_btn')

    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            // cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
            cart = cartItems.getCart()

            const id = event.target.closest('.product').dataset.id
            const product = products.find(product => product.id === id)

            if (cart.length > 0 && cart.some(item => item.id === id)) {
                cart = cart.map(item => {
                    if (item.id === id) {
                        item.count++
                    }
                    return item
                })
            } else {
                cart.push({
                    ...product,
                    count: 1,
                })
            }

            showCountCart(cart)
            showMainButton(cart)

            // localStorage.setItem('cart', JSON.stringify(cart))
            cartItems.setCart(cart)
        })
    })

    showCountCart(cart)
    showMainButton(cart)
}

export default products