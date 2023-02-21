import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'userDetails',
  initialState: { userId: null, token: null, phone: null },
  reducers: {
    updateUserDetails: (state, { payload: { userId, token } }) => {
      if (typeof userId !== 'undefined') {
        state.userId = userId
      }
      if (typeof token !== 'undefined') {
        state.token = token
      }
    },
    updatePhone: (state, { payload: { phone } }) => {
      if (phone) {
        state.phone = phone
      }
    },
  },
})

export const { updateUserDetails, updatePhone } = slice.actions

export default slice.reducer
