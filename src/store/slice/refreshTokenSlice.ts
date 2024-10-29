import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface RefreshStore {
  token: string | null;
}

const initialState: RefreshStore = {
  token: null,
};

export const accessTokenStore = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { updateToken } = accessTokenStore.actions;

export const selectToken = (state: RootState) => state.aTokens.token;

export default accessTokenStore.reducer;
