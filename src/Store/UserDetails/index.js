import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'userDetails',
  initialState: { userId: null, token: null },
  reducers: {
    updateUserDetails: (state, { payload: { userId, token } }) => {
      if (typeof userId !== 'undefined') {
        state.userId = userId
      }
      if (typeof token !== 'undefined') {
        state.token = token
      }
    },
  },
})

export const { updateUserDetails } = slice.actions

export default slice.reducer
