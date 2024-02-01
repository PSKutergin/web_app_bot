import { useTelegram } from "./useTelegram"
import { getTotalPrice, showMainButton, showCountCart } from "./helpers"
import sendOrder from "./sendOrder"

const cart = (cartItems) => {
    const { tg } = useTelegram();
    const modal = document.querySelector('.overlay')
    const cartFull = document.querySelector('.cart')
    const cartEmpty = document.querySelector('.cart-empty')
    const cartList = document.querySelector('.cart-list')
    const cartOpenBtn = document.querySelector('.cart-button')
    const cartCloseBtn = document.querySelector('.close-btn')

    const openCart = () => {
        modal.classList.add('open')
        renderCart()
    }

    const addItemToCart = (id) => {
        // const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const cart = cartItems.getCart()
        const newCart = cart.map(item => {
            if (item.id === id) {
                item.count++
            }
            return item
        })

        cartItems.setCart(newCart)
        // localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const minusItemFromCart = (id) => {
        // const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const cart = cartItems.getCart()
        let newCart = cart.map(item => {
            if (item.id === id) {
                item.count--
            }
            return item
        })
        newCart = newCart.filter(item => item.count > 0)

        cartItems.setCart(newCart)
        // localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const removeItemFromCart = (id) => {
        // const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const cart = cartItems.getCart()
        const newCart = cart.filter(item => item.id !== id)
        // localStorage.setItem('cart', JSON.stringify(newCart))
        cartItems.setCart(newCart)
    }

    const renderCart = () => {
        // const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        const cart = cartItems.getCart()

        cartList.innerHTML = ''

        if (cart.length > 0) {
            cartEmpty.classList.add('hide')
            cartFull.classList.remove('hide')
        } else {
            cartEmpty.classList.remove('hide')
            cartFull.classList.add('hide')
        }

        cart.forEach(item => {
            cartList.insertAdjacentHTML('beforeend', `
                <li class="cart-item" data-id="${item.id}">
                    <div class="item-name">${item.title}</div>
                    <button class="minus-btn">
                        <svg viewBox="0 0 24 24" fill="#000000">
                        <path
                            d="M15 12.75C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H15Z" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" />
                        </svg>
                    </button>
                    <div class="item-count">${item.count}</div>
                    <button class="add-btn">
                        <svg viewBox="0 -0.5 21 21" version="1.1" fill="#000000">
                        <g id="Page-1" stroke="none" stroke-width="1">
                            <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -600.000000)">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                <path
                                d="M214.55,449 L217.7,449 L217.7,451 L214.55,451 L214.55,454 L212.45,454 L212.45,451 L209.3,451 L209.3,449 L212.45,449 L212.45,446 L214.55,446 L214.55,449 Z M213.5,458 C208.86845,458 205.1,454.411 205.1,450 C205.1,445.589 208.86845,442 213.5,442 C218.13155,442 221.9,445.589 221.9,450 C221.9,454.411 218.13155,458 213.5,458 L213.5,458 Z M213.5,440 C207.70085,440 203,444.477 203,450 C203,455.523 207.70085,460 213.5,460 C219.29915,460 224,455.523 224,450 C224,444.477 219.29915,440 213.5,440 L213.5,440 Z">
                                </path>
                            </g>
                            </g>
                        </g>
                        </svg>
                    </button>
                    <div class="item-total">${item.price * item.count} $</div>
                    <button class="remove-btn">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </li>
            `)
        });

        const addItemBtn = document.querySelectorAll('.add-btn');
        const minusItemBtn = document.querySelectorAll('.minus-btn');
        const removeItemBtn = document.querySelectorAll('.remove-btn');
        const cartTotal = document.querySelector('.total');
        const sendOrderBtn = document.querySelector('.order-btn');

        cartTotal.textContent = `${getTotalPrice(cart)} $`;

        addItemBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const parent = e.target.closest('.cart-item');
                const id = parent.getAttribute('data-id');

                addItemToCart(id);
                renderCart()
            })
        })

        minusItemBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const parent = e.target.closest('.cart-item');
                const id = parent.getAttribute('data-id');

                minusItemFromCart(id);
                renderCart()
            })
        })

        removeItemBtn.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const parent = e.target.closest('.cart-item');
                const id = parent.getAttribute('data-id');

                removeItemFromCart(id);
                renderCart()
            })
        })

        sendOrderBtn.addEventListener('click', () => {
            sendOrder(cart)
            // localStorage.setItem('cart', JSON.stringify([]))
            cartItems.setCart([])
        })

        showCountCart(cart)
        showMainButton(cart)
    }

    cartOpenBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', () => {
        modal.classList.remove('open')
    });

    (() => {
        tg.onEvent('mainButtonClicked', openCart)
        return () => {
            tg.offEvent('mainButtonClicked', openCart)
        }
    })();
}

export default cart