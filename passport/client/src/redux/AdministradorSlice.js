import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  userId: "",
  pass: "",
  user: null,
}

export const administradorSlice = createSlice({
  name: 'administrador',
  initialState,
  reducers: {
    toggleAdministrador: (state) => {
      state.value = !state.value
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setPass: (state, action) => {
      state.pass = action.payload
    },
    setCredentials: (state,action) => {
      state.user = action.payload.user;
      state.value = action.payload.isAdmin
    },
    logOut: (state) => {
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleAdministrador, setUserId, setPass, setCredentials, logOut } = administradorSlice.actions

export default administradorSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token