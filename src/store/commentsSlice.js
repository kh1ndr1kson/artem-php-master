import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchComments = createAsyncThunk(
  'commentsSlice/fetchComments',
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get('/comments')

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchCommentCreate = createAsyncThunk(
  'commentsSlice/fetchCommentCreate',
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/comments', {
        title,
        description
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

const commentsAdapter = createEntityAdapter()
const initialState = commentsAdapter.getInitialState({
  loading: false,
  status: 0
})

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    unsetStatus (state) {
      state.status = 0
    }
  },
  extraReducers: {
    /* GET checked all */
    [fetchComments.pending]: (state) => {
      state.loading = true
    },
    [fetchComments.fulfilled]: (state, { payload }) => {
      commentsAdapter.setAll(state, payload)
      state.loading = false
    },
    /* POST checked */
    [fetchCommentCreate.pending]: (state) => {
      state.loading = true
    },
    [fetchCommentCreate.fulfilled]: (state, { payload }) => {
      commentsAdapter.addOne(state, payload)
      state.status = 201
      state.loading = false
    },
    [fetchCommentCreate.rejected]: (state) => {
      state.status = 500
      state.loading = false
    }
  }
})

export const selectors = commentsAdapter.getSelectors((state) => state.comments)
export const { unsetStatus } = commentsSlice.actions
export default commentsSlice.reducer
