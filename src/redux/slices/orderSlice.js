import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    itemsPrice: 0,
    totalDiscount: 0,
    shippingPrice: 10000,
    totalPrice: 0,
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
        },
        selectedItemsRedux: (state, action) => {
            state.orderItemsSelected = action.payload
        },
        removeSelectedItemsRedux: (state) => {
            state.orderItemsSelected = []
        },
        clearCart: (state) => {
            state.orderItems = []
            state.orderItemsSelected = []
            state.shippingPrice = 10000
            state.itemsPrice = 0
            state.totalDiscount = 0
            state.totalPrice = 0
        },
        updatePrice: (state, action) => {
            state.itemsPrice = action.payload.price
            state.totalDiscount = action.payload.discount
            state.totalPrice = action.payload.total
        },
        updateShipPrice: (state, action) => {
            state.shippingPrice = action.payload
        },
        orderSuccess: (state) => {
            const idsToRemove = state.orderItemsSelected.map(item => item.product);
            const newOrderItems = state.orderItems.filter(item => !idsToRemove.includes(item.productId));
            state.orderItems = newOrderItems
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    addOrderProduct, removeOrderProduct,
    plusAmountOrderProduct, minusAmountOrderProduct,
    removeSelectedProduct, selectedItemsRedux, removeSelectedItemsRedux,
    clearCart, updatePrice, updateShipPrice, orderSuccess
} = orderSlice.actions;

export default orderSlice.reducer;
