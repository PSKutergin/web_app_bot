import './styles/style.css'

import { API_URL } from './const';

import user from './modules/user';
import products from './modules/products';
import cart from './modules/cart';
import { CartItems } from './modules/cartItems';

const cartItems = new CartItems()

user()
products(API_URL, cartItems)
cart(cartItems)