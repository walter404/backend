import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openDrawner: false,
  body: {},
  modalOpen: false,
  deleteModal: null
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    toggleDrawner: (state) => {     
      state.openDrawner = !state.openDrawner
    },
    updateBody: (state, action) => {
        state.body = action.payload
    },
    toggleModal: (state) => {
      state.modalOpen = !state.modalOpen
    },
    deleteId: (state, action) => {
      state.deleteModal = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { toggleDrawner ,updateBody, toggleModal, deleteId} = editorSlice.actions

export default editorSlice.reducer