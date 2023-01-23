import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import API from "../axios";

export const fetchNewsChecked = createAsyncThunk(
  'newsSlice/fetchNewsChecked',
  async (args, { rejectWithValue }) => {
    try {
      const response = await API.get('/news/reviewed')

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchNewsCheckedCreate = createAsyncThunk(
  'newsSlice/fetchNewsCheckedCreate',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await API.post('/news/reviewed', {
        title,
        description
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchNewsUnchecked = createAsyncThunk(
  'newsSlice/fetchNewsUnchecked',
  async (args, { rejectWithValue }) => {
    try {
      const response = await API.get('/news/underreview')

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchNewsUncheckedCreate = createAsyncThunk(
  'newsSlice/fetchNewsUncheckedCreate',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await API.post('/news/underreview', {
        title,
        description
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

const newsAdapter = createEntityAdapter()
const initialState = newsAdapter.getInitialState({
  loading: false,
  status: 0
})

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    unsetStatus (state) {
      state.status = 0
    }
  },
  extraReducers: {
    /* GET checked all */
    [fetchNewsChecked.pending]: (state) => {
      state.loading = true
    },
    [fetchNewsChecked.fulfilled]: (state, { payload }) => {
      newsAdapter.setAll(state, payload)
      state.loading = false
    },
    [fetchNewsChecked.rejected]: (state) => {
      newsAdapter.removeAll(state);
      state.status = 500
      state.loading = false
    },
    /* POST checked */
    [fetchNewsCheckedCreate.pending]: (state) => {
      state.loading = true
    },
    [fetchNewsCheckedCreate.fulfilled]: (state, { payload }) => {
      // newsAdapter.addOne(state, payload)
      state.status = 201
      state.loading = false
    },
    [fetchNewsCheckedCreate.rejected]: (state) => {
      state.status = 500
      state.loading = false
    },
    /* GET unchecked all */
    [fetchNewsUnchecked.pending]: (state) => {
      state.loading = true
    },
    [fetchNewsUnchecked.fulfilled]: (state, { payload }) => {
      newsAdapter.setAll(state, payload)
      state.loading = false
    },
    [fetchNewsUnchecked.rejected]: (state) => {
      newsAdapter.removeAll(state);
      state.status = 500
      state.loading = false
    },
    /* POST unchecked */
    [fetchNewsUncheckedCreate.pending]: (state) => {
      state.loading = true
    },
    [fetchNewsUncheckedCreate.fulfilled]: (state, { payload }) => {
      // newsAdapter.addOne(state, payload)
      state.status = 201
      state.loading = false
    },
    [fetchNewsUncheckedCreate.rejected]: (state) => {
      state.status = 500
      state.loading = false
    }
  }
})

export const selectors = newsAdapter.getSelectors((state) => state.news)
export const { unsetStatus } = newsSlice.actions
export default newsSlice.reducer
