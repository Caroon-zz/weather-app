import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UnitSystem = "metric" | "imperial";

export interface SettingsState {
  unitSystem: UnitSystem;
}

const initialState: SettingsState = {
  unitSystem: "metric",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUnitSystem: (state, action: PayloadAction<UnitSystem>) => {
      state.unitSystem = action.payload;
    },
  },
});

export const { setUnitSystem } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
