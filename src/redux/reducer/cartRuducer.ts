import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartReducerInitialState } from "../../types/reducer-types"
import { CartItem } from "../../types/types"

const initialState: CartReducerInitialState = {
    loading: false,
    cartItems: [],
    subtotal: 0,
    tax: 0,
    shippingCharges: 0,
    discount: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    }
}

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addTOCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const index = state.cartItems.findIndex(i => i.productId === action.payload.productId);

            if (index !== -1) state.cartItems[index] = action.payload;
            else {
                state.cartItems.push(action.payload);
                state.loading = false;
            }

        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.cartItems = state.cartItems.filter(i => i.productId !== action.payload);
            state.loading = false;
        },

        calculatePrice: (state) => {

            const subtotal = state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

            // let subtotal = 0;

            // for (let i = 0; i < state.cartItems.length; i++) {
            //     const item = state.cartItems[i];
            //     subtotal += item.price * item.quantity;

            // }

            state.subtotal = subtotal;
            state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
            state.tax = Math.round(state.subtotal * 0.18);
            state.total = state.subtotal + state.tax + state.shippingCharges + state.discount;
        },

        discountApplied: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;

        },
    }
})

export const { addTOCart, removeCartItem, calculatePrice, discountApplied } = cartReducer.actions;