import './styles/style.css'

import { API_URL } from './const';

import products from './modules/products';
import cart from './modules/cart';

products(API_URL)
cart()