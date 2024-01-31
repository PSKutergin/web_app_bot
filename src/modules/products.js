import getProducts from "./getProducts"
import { useTelegram } from "./useTelegram"

const products = async (url) => {
    const { tg, queryId } = useTelegram();
    const products = await getProducts(url)
    const container = document.querySelector('.products')
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => {
            return acc += item.price
        }, 0)
    }

    const showMainButton = (cart) => {
        if (cart.length > 0) {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `В корзине на сумму ${getTotalPrice(cart)} $`
            })
        } else {
            tg.MainButton.hide()
        }
    }

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
            const id = event.target.closest('.product').dataset.id
            const product = products.find(product => product.id === id)

            if (cart.some(item => item.id === id)) {
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

            showMainButton(cart)

            localStorage.setItem('cart', JSON.stringify(cart))
        })
    })

    showMainButton(cart)
}

export default products