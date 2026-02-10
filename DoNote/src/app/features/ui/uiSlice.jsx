import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isOpenSidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpenSidebar = !state.isOpenSidebar;
    },
    closeSidebar: (state) => {
      state.isOpenSidebar = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = uiSlice.actions;
export default uiSlice.reducer;
