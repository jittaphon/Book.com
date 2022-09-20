import { createAction } from '@reduxjs/toolkit';

export const getCustomer = createAction('GET_CUSTOMER');
export const setCustomer = createAction('SET_CUSTOMER');
export const removeCustomer = createAction('REMOVE_CUSTOMER');
