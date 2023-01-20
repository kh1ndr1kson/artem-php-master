import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from "../axios";

export const fetchRegistration = createAsyncThunk(
  'secureSlice/fetchRegistration',
  async ({ login, password, isAdmin }, { rejectWithValue }) => {
    try {
      const response = await API.post('/register', {
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
      const response = await API.post('/login', {
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
    isAuth: false,
    loading: false,
    status: 0
  },
  reducers: {
    unsetStatus (state) {
      state.status = 0
    },
    unsetAuth (state) {
      state.isAuth = false
      localStorage.clear();
    }
  },
  extraReducers: {
    /* POST register */
    [fetchRegistration.pending]: (state) => {
      state.loading = true
    },
    [fetchRegistration.fulfilled]: (state, { payload }) => {
      state.isAuth = true;
      state.status = 200
      localStorage.setItem('login', payload.login);
      localStorage.setItem('password', payload.password);
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
      state.isAuth = true;
      state.status = 200
      localStorage.setItem('login', payload.login);
      localStorage.setItem('password', payload.password);
      state.loading = false
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 500
      state.loading = false
    }
  }
})

export const { unsetStatus, unsetAuth } = secureSlice.actions
export default secureSlice.reducer
