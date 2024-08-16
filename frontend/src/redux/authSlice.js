import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    // other auth-related states can be added here
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        // other reducers related to auth can be added here
    },
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
