import { registerUser } from './auth/registerUser.js';
import { loginUser } from './auth/loginUser.js';
import { logoutUser } from './auth/logoutUser.js';
import { getCurrentUser } from './users/getCurrentUser.js';
import { updateCurrentUser } from './users/updateCurrentUser.js';
import { getCategories } from './categories/getCategories.js';
import { getGoods } from './goods/getGoods.js';
import { getGoodById } from './goods/getGoodById.js';
import { createOrder } from './orders/createOrder.js';
import { getOrders } from './orders/getOrders.js';
import { updateOrderStatus } from './orders/updateOrderStatus.js';
import { createFeedback } from './feedbacks/createFeedback.js';
import { getFeedbacks } from './feedbacks/getFeedbacks.js';
import { createSubscription } from './subscriptions/createSubscription.js';


export const auth = {
    registerUser,
    loginUser,
    logoutUser,
};

export const users = {
    getCurrentUser,
    updateCurrentUser,
};

export const categories = {
    getCategories,
};

export const goods = {
    getGoods,
    getGoodById,
};

export const orders = {
    createOrder,
    getOrders,
    updateOrderStatus,
};

export const feedbacks = {
    createFeedback,
    getFeedbacks,
};

export const subscriptions = {
    createSubscription,
};
