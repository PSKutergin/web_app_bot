import getProducts from "./getProducts"

const products = async (url) => {
    const products = await getProducts(url)
    const container = document.querySelector('.products')

    container.innerHTML = '';

    products.forEach(product => {
        container.insertAdjacentHTML('beforeend', `
        <div class="product" />
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


}

export default products