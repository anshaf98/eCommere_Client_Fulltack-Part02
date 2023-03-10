import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../axiosPublic";
import axiosPrivate from "../axiosPrivate";

export const addOffer = createAsyncThunk(
  "offer/addOffer",
  async ({ jsonData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/offers`, jsonData);
      toast.success("Successfully added new offer.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getOffers = createAsyncThunk(
  "offer/getOffers",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/offers`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteOffer = createAsyncThunk(
  "offer/deleteOffer",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/offers/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    mutationResult: { success: false },
    offerlist: {},
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
  },
  extraReducers: {
    //add new offer
    [addOffer.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addOffer.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addOffer.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
    // get all offer list
    [getOffers.pending]: (state, action) => {
      state.offerlist.loading = true;
    },
    [getOffers.fulfilled]: (state, action) => {
      state.offerlist.loading = false;
      state.offerlist.categories = action.payload.categories;
    },
    [getOffers.rejected]: (state, action) => {
      state.offerlist.loading = false;
      state.offerlist.error = action.payload;
    },
    //delete a offer
    [deleteOffer.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteOffer.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteOffer.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectOfferMutationResult = (state) => state.offer.mutationResult;
export const selectAllOffers = (state) => state.offer.offerlist;
export const { resetMutationResult } = offerSlice.actions;

export default offerSlice.reducer;
