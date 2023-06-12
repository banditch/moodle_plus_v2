import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'adminData',
  initialState: {
    user_list: []
  },
  reducers: {
    addUser: (state, action) => {
      state.user_list = [action.payload, ...state.user_list]
    },
    removeUser: (state, action) => {
      const index = state.user_list.findIndex((user) => user.uid === action.payload.uid)
      let new_users_list = [...state.user_list]
      if (index >= 0) {
          newTaskList.splice(index, 1)
      }else{
        console.warn(`Can't remove user with (id: ${action.payload.uid})`)
      }

      state.user_list = new_users_list
      console.warn(`Removed user with (id: ${action.payload.uid}), final List is ${new_users_list}`)

    },
    resetUsers: (state) => {
      state.user_list = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser, resetUsers } = adminSlice.actions

export default adminSlice.reducer