import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const newItem = action.payload.orderItem;
            const existingItemIndex = state.orderItems.findIndex(item => item.productId === newItem.productId)
            if (existingItemIndex !== -1) {
                state.orderItems[existingItemIndex].amount += newItem.amount;
            } else {
                state.orderItems.push(newItem)
            }
        },
        removeOrderProduct: (state, action) => {
            const { productId } = action.payload;
            const newState = state.orderItems.filter((item) => item.productId !== productId)
            state.orderItems = newState
        },
        removeSelectedProduct: (state, action) => {
            const arrItemId = action.payload
            const newState = state.orderItems.filter((item) => !arrItemId.includes(item.productId));
            state.orderItems = newState
        },
        plusAmountOrderProduct: (state, action) => {
            const { productId } = action.payload;
            const product = state.orderItems.find((item) => item.productId === productId)
            if (product) {
                product.amount += 1
            }
        },
        minusAmountOrderProduct: (state, action) => {
            const { productId } = action.payload;
            const product = state.orderItems.find((item) => item.productId === productId)
            if (product) {
                product.amount -= 1
            }
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct, removeOrderProduct,
    plusAmountOrderProduct, minusAmountOrderProduct,
    removeSelectedProduct
} = orderSlice.actions;

export default orderSlice.reducer;
