const getProducts = async (url) => {
    const response = await fetch(url + '/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

export default getProducts