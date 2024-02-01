import { useTelegram } from "./useTelegram"

export const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price * item.count
    }, 0)
}

export const showMainButton = (cart) => {
    const { tg } = useTelegram();

    if (cart.length > 0) {
        tg.MainButton.show()
        tg.MainButton.setParams({
            text: `В корзине на сумму ${getTotalPrice(cart)} $`
        })
    } else {
        tg.MainButton.hide()
    }
}

export const showCountCart = (cart) => {
    const countCart = document.querySelector('.count')

    if (cart.length > 0) {
        countCart.classList.remove('hide')
        countCart.innerText = cart.reduce((acc, item) => {
            return acc += item.count
        }, 0)
    } else {
        countCart.classList.add('hide')
    }
}