import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchRegistration = createAsyncThunk(
  'secureSlice/fetchRegistration',
  async ({ login, password, isAdmin }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/register', {
        login,
        password,
        isAdmin
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchLogin = createAsyncThunk(
  'secureSlice/fetchLogin',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/login', {
        login,
        password
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

const secureSlice = createSlice({
  name: 'secure',
  initialState: {
    loading: false,
    status: 0
  },
  reducers: {
    unsetStatus (state) {
      state.status = 0
    }
  },
  extraReducers: {
    /* POST register */
    [fetchRegistration.pending]: (state) => {
      state.loading = true
    },
    [fetchRegistration.fulfilled]: (state, { payload }) => {
      state.status = 200
      state.loading = false
    },
    [fetchRegistration.rejected]: (state) => {
      state.status = 500
      state.loading = false
    },
    /* POST login */
    [fetchLogin.pending]: (state) => {
      state.loading = true
    },
    [fetchLogin.fulfilled]: (state, { payload }) => {
      state.status = 200
      state.loading = false
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 500
      state.loading = false
    }
  }
})

export const { unsetStatus } = secureSlice.actions
export default secureSlice.reducer
