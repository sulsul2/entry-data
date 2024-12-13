import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomizationState {
  color: "primary" | "secondary" | "tersier";
  logo: string;
  favicon: string;
}

const initialState: CustomizationState = {
  color: 'primary',
  logo: '',
  favicon: '',
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setCustomization: (state, action: PayloadAction<CustomizationState>) => {
      state.color = action.payload.color;
      state.logo = action.payload.logo;
      state.favicon = action.payload.favicon;
    },
  },
});

export const { setCustomization } = customizationSlice.actions;
export default customizationSlice.reducer;
