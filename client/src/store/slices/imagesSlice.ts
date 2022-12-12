import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { imagesService } from '../../services';
import { IImage } from '../../interfaces';

interface IInitialState {
    images: IImage[],
    sliceImages: IImage[],
    error: undefined | string | null,
}

const initialState: IInitialState = {
    images: [],
    sliceImages: [],
    error: null,
};

export const getAllImagesThunk = createAsyncThunk(
    'getAllImagesThunk/imageSlice',
    async (_, { dispatch,rejectWithValue }) => {
        try {
            const { data } = await imagesService.getAll();
            dispatch(setSliceImages({ sliceImages: data }));
            return data;

        }catch (e: any) {
            rejectWithValue(e.message);
        }
    }
);

export const saveImageThunk = createAsyncThunk(
    'saveImageThunk/imageSlice',
    async (file: FormData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await imagesService.save(file);
            dispatch(setImages({ images: data }));
            dispatch(setSliceImages({ sliceImages: data }));

        }catch (e: any) {
            rejectWithValue(e.message);
        }
    }
);

export const getImagesByParamsThank = createAsyncThunk(
    'getImagesByParamsThank/imageSlice',
    async (params: Partial<IImage>, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await imagesService.getByParams(params);
            dispatch(setImages({ images: data }))
        }catch (e: any) {
            rejectWithValue(e.message);
        }
    }
);

export const updateImageThunk = createAsyncThunk(
    'updateImageThunk/imageSlice',
    async (file: FormData, { rejectWithValue }) => {
        try {
            const { data } = await imagesService.update(file);
            return data;

        }catch (e: any) {
            rejectWithValue(e.message);
        }
    }
);

const imagesSlice = createSlice({
    name: 'imageSlice',
    initialState: initialState,
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload.images;
        } ,
        setSliceImages: (state, action) => {
            const { sliceImages } = action.payload;
            state.sliceImages = sliceImages.filter((image: IImage) => image.location === 'slides');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllImagesThunk.fulfilled, ((state, action) => {
            state.images = action.payload
        }));
        builder.addCase(getAllImagesThunk.rejected, ((state, action) => {
            state.error = action.error.message
        }));

        builder.addCase(updateImageThunk.fulfilled, ((state, action) => {
            state.images = action.payload
        }))
    },
})

export const { setImages, setSliceImages } = imagesSlice.actions;
const imagesReducer = imagesSlice.reducer;
export default imagesReducer;
