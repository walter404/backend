import { configureStore } from '@reduxjs/toolkit'
import AdministradorSlice from './AdministradorSlice'
import carroSlice from './carroSlice'
import EditorSlice from './EditorSlice'

export const store = configureStore({
  reducer: {
    administrador: AdministradorSlice,
    editor: EditorSlice,
    carro: carroSlice
  },
})