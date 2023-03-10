import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

export const addSize = createAsyncThunk(
  "size/addSize",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/sizes`, jsonData);
      toast.success("Successfully added new size.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getSizes = createAsyncThunk(
  "size/getSizes",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/sizes`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/sizes/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const sizeDetails = createAsyncThunk(
  "size/sizeDetails",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/sizes/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateSize = createAsyncThunk(
  "size/updateSize",
  async ({ id, jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/sizes/${id}`, jsonData);
      toast.success("Size updated.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);
const sizeSlice = createSlice({
  name: "size",
  initialState: {
    mutationResult: { success: false },
    sizelist: {},
    sizeDetails: {},
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new size
    [addSize.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addSize.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addSize.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all size list
    [getSizes.pending]: (state, action) => {
      state.sizelist.loading = true;
    },
    [getSizes.fulfilled]: (state, action) => {
      state.sizelist.loading = false;
      state.sizelist.sizes = action.payload.sizes;
    },
    [getSizes.rejected]: (state, action) => {
      state.sizelist.loading = false;
      state.sizelist.error = action.payload;
    },
    //delete a size
    [deleteSize.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteSize.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteSize.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    //get size details
    [sizeDetails.pending]: (state, action) => {
      state.sizeDetails.loading = true;
    },
    [sizeDetails.fulfilled]: (state, action) => {
      state.sizeDetails.loading = false;
      state.sizeDetails.size = action.payload.size;
    },
    [sizeDetails.rejected]: (state, action) => {
      state.sizeDetails.loading = false;
      state.sizeDetails.error = action.payload;
    },
    //update size
    [updateSize.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [updateSize.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [updateSize.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectSizeMutationResult = (state) => state.size.mutationResult;
export const selectAllSize = (state) => state.size.sizelist;
export const selectsizeDetails = (state) => state.size.sizeDetails;
export const { resetMutationResult } = sizeSlice.actions;

export default sizeSlice.reducer;
