import { useTelegram } from "./useTelegram"
import { getTotalPrice } from "./helpers"
import { API_URL } from "../const"

const sendOrder = async (addedItems) => {
    const { queryId } = useTelegram();
    const order = {
        products: addedItems,
        totalPrice: getTotalPrice(addedItems),
        queryId: queryId
    }

    await fetch(API_URL + '/web-data', {
        method: 'POST',
        headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
}

export default sendOrder