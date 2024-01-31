import getProducts from "../modules/getProducts"

const products = (url) => {
    const products = getProducts(url)

    console.log(products);
}

export default products