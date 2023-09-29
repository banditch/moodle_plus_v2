import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_data: 0,
  last_page: "H",
  classes: []
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user_data = 0
      state.is_creating_class_page = 1
    },
    setUserData: (state, action) => {
      state.user_data = action.payload
    },
    setLastPage: (state, action) => {
        state.last_page = action.payload
    },
    addClass: (state, action) => {
      state.classes = [...state.classes, action.payload]
    },
    resetClasses: (state) => {
      state.classes = []
    },
    removeClass: (state, action) => {
      const index = state.classes.findIndex((item) => item.id === action.payload.id)
      let new_class_list = [...state.classes]
      if (index >= 0) {
        new_class_list.splice(index, 1)
      }else{
        console.warn(`Can't remove class with (id: ${action.payload.id})`)
      }

      state.classes = new_class_list
      console.warn(`Removed class with (id: ${action.payload.id}), final List is ${new_class_list}`)

    }
   },
})

// Action creators are generated for each case reducer function
export const { resetUser, setUserData, setLastPage, addClass, resetClasses , removeClass } = userDataSlice.actions

export const getUserData = state => state.userData.user_data
export const getLastPage = state => state.userData.last_page
export const getClasses = state => state.userData.classes

export default userDataSlice.reducer