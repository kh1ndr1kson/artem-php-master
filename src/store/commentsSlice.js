import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import API from "../axios";

export const fetchComments = createAsyncThunk(
  'commentsSlice/fetchComments',
  async ({newsId}, { rejectWithValue }) => {
    try {
      const response = await API.get('/comments/', {
        params: {
          id: newsId
        }
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

export const fetchCommentCreate = createAsyncThunk(
  'commentsSlice/fetchCommentCreate',
  async ({ authorId, newsId, content }, { rejectWithValue }) => {
    try {
      const response = await API.post('/comments/', {
        authorId,
        newsId,
        content
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status)
    }
  }
)

const initialState = {
  data: [],
  loading: false,
  status: 0
};

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
      console.log(payload)
      state.data = payload;
      state.loading = false
    },
    /* POST checked */
    [fetchCommentCreate.pending]: (state) => {
      state.loading = true
    },
    [fetchCommentCreate.fulfilled]: (state, { payload }) => {
      state.data.push(payload);
      state.status = 201
      state.loading = false
    },
    [fetchCommentCreate.rejected]: (state) => {
      state.status = 500
      state.loading = false
    }
  }
})

export const { unsetStatus } = commentsSlice.actions
export default commentsSlice.reducer
