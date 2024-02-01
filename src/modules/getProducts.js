const getProducts = async (url) => {
    const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return data
}

export default getProducts