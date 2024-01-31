import getProducts from "./getProducts"

const products = async (url) => {
    const products = await getProducts(url)
    const container = document.querySelector('.products')

    container.innerHTML = '';

    products.forEach(product => {
        container.insertAdjacentHTML('beforeend', `
        <div class="product" />
            <div class="product_img"></div>
            <div class="product_title">${product.title}</div>
            <div class="product_description">${product.description}</div>
            <div class="product_price">
                <span>Стоимость: <b>${product.price}</b></span>
            </div>
            <button class="product_btn">
                Добавить в корзину
            </button>
        </div>
    `)
    })


}

export default products