const getProducts = async (url) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url + '/products', false);
    xhr.send();

    let data

    if (xhr.status === 200 && xhr.responseText) {
        try {
            return JSON.parse(xhr.responseText)
        } catch (error) {
            console.log(error);
        }
    }
}

export default getProducts