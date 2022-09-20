import { createAction } from '@reduxjs/toolkit';

export const fetchCart = createAction('FETCH_CART');
export const addCart = createAction('ADD_CART');
export const deleteItemInCart = createAction('DELETE_CART');

