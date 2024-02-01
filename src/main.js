import './styles/style.css'

import { API_URL } from './const';

import user from './modules/user';
import products from './modules/products';
import cart from './modules/cart';

user()
products(API_URL)
cart()