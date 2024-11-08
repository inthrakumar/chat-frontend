import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface RefreshStore {
  token: string | null;
  persist: boolean;
}

const initialState: RefreshStore = {
  token: null,
  persist: false,
};

export const accessTokenStore = createSlice({
  name: 'refresh',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.persist = true;
    },
  },
});

export const { updateToken } = accessTokenStore.actions;

export const selectToken = (state: RootState) => state.aTokens.token;

export default accessTokenStore.reducer;
