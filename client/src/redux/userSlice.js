
import { createSlice } from "@reduxjs/toolkit";

export const useSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state,action) => {
      state.user = action.payload;
    }
    
  },
});

export const { setUser } = useSlice.actions;

export default useSlice.reducer;
