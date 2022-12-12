import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { textileService } from '../../services';
import { ITextileExtends } from '../../interfaces';

interface IInitialState {
    textiles: ITextileExtends[];
    productTextile: ITextileExtends[];
    error: null | string | undefined;

}

const initialState: IInitialState = {
    textiles: [],
    productTextile: [],
    error: null,

}

export const saveTextileThank = createAsyncThunk(
    'saveTextileThank/textileSlice',
    async (textile: FormData, { rejectWithValue }) => {
        try {
            const { data } = await textileService.save(textile)
            return { textiles: data };
        } catch (e: any) {
            rejectWithValue(e);
        }
    }
);

export const getAllTextileThank = createAsyncThunk(
    'getAllTextileThank/textileSlice',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await textileService.getAll()
            return { textiles: data };
        } catch (e: any) {
            rejectWithValue(e);
        }
    }
);

export const getByParamsTextileThank = createAsyncThunk(
    'getByParamsTextileThank/textileSlice',
    async (params: Partial<ITextileExtends>, { rejectWithValue }) => {
        try {
            const { data } = await textileService.getByParams(params)
            return { textiles: data };
        } catch (e: any) {
            rejectWithValue(e);
        }
    }
);


const textileSlice = createSlice({
    name: 'textileSlice',

    initialState: initialState,

    reducers: {
        setTextiles: (state, action) => {
            state.textiles = action.payload?.textiles;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getAllTextileThank.fulfilled, ((state, action) => {
            state.textiles = action.payload?.textiles;
        }));
        builder.addCase(getAllTextileThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
        builder.addCase(getByParamsTextileThank.fulfilled, ((state, action) => {
            state.productTextile = action.payload?.textiles;
        }));
        builder.addCase(getByParamsTextileThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
    },

});

export const { setTextiles } = textileSlice.actions;
const textileReducer = textileSlice.reducer;
export default textileReducer;
