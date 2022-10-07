import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carrito: [],
  openDrawnerCarro: false,

}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleDrawnerCarro: (state) => {     
      state.openDrawnerCarro = !state.openDrawnerCarro
    },
    addCart: (state, action) => {
      state.carrito.push(action.payload)
  },
    initCart: (state, action) => {
      state.carrito = [...action.payload]
  },
    deleteElementCart: (state, action) => {
      return {
        ...state,
        carrito: [...state.carrito].filter(item => item.idProducto !== action.payload.id)
     };
         
    }    
  },
})

// Action creators are generated for each case reducer function
export const { addCart ,deleteElementCart, toggleDrawnerCarro, initCart} = cartSlice.actions

export default cartSlice.reducer