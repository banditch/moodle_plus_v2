import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_data: 0,
  last_page: "H",
}

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user_data = 0
    },
    setUserData: (state, action) => {
      state.user_data = action.payload
    },
    setLastPage: (state, action) => {
        state.last_page = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetUser, setUserData, setLastPage } = userDataSlice.actions

export const getUserData = state => state.userData.user_data
export const getLastPage = state => state.userData.last_page

export default userDataSlice.reducer