import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../axiosPrivate";

export const getBanners = createAsyncThunk(
  "banner/getBanners",
  async ({ toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get(`/banners`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addBanner = createAsyncThunk(
  "banner/addBanner",
  async ({ formData, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/banners`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });
      toast.success("Successfully added new banner.");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/banners/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    mutationResult: { success: false },
    bannerlist: { banners: [] },
  },
  reducers: {
    resetMutationResult: (state) => {
      state.mutationResult.success = false;
    },
    resetProducts: (state) => {
      state.bannerlist.banners = [];
    },
  },
  extraReducers: {
    [getBanners.pending]: (state, action) => {
      state.bannerlist.loading = true;
    },
    [getBanners.fulfilled]: (state, action) => {
      state.bannerlist.loading = false;
      state.bannerlist.banners = action.payload.banners;
    },
    [getBanners.rejected]: (state, action) => {
      state.bannerlist.loading = false;
      state.bannerlist.error = action.payload;
    },

    //add
    [addBanner.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [addBanner.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [addBanner.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },

    //delete
    [deleteBanner.pending]: (state, action) => {
      state.mutationResult.loading = true;
    },
    [deleteBanner.fulfilled]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.success = action.payload.success;
    },
    [deleteBanner.rejected]: (state, action) => {
      state.mutationResult.loading = false;
      state.mutationResult.error = action.payload;
    },
  },
});

export const selectBannerMutationResult = (state) =>
  state.banner.mutationResult;
export const selectAllBanners = (state) => state.banner.bannerlist;
// export const selectProductDetails = (state) => state.banner.productDetails;
export const { resetMutationResult, resetBanners } = bannerSlice.actions;

export default bannerSlice.reducer;
