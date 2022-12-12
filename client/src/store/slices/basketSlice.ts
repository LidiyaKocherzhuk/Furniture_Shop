import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { basketService, productsService } from '../../services';
import { IBasket, IBasketProdukt } from '../../interfaces';
import { setUserStorage } from './productSlice';

interface IInitialState {
    error: null | string | undefined;
    basketProducts: IBasketProdukt[];
    basketPriceCount: number;
    pending: boolean;
}

const initialState:IInitialState = {
    error: null,
    basketProducts: [],
    basketPriceCount: 0,
    pending: false,
};

export const saveBasketProductsThank = createAsyncThunk(
    'saveBasketProductsThank/basketSlice',
    async (basketData: IBasket, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await basketService.save(basketData);
            console.log(data);

            dispatch(setUserStorage({ user: data.user }));
            dispatch(setBasketProducts({ basketProducts: data.products }));
            return { basketPriceCount: data.basketPriceCount };
        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const getBasketProductsThank = createAsyncThunk(
    'getBasketProductsThank/basketSlice',
    async (id: number, {
        dispatch,
        rejectWithValue,
    }) => {
        try {
            const { data } = await productsService.getBaskets(id);

            dispatch(setUserStorage({ user: data.user }));
            dispatch(setBasketProducts({ basketProducts: data.products }));
            return { basketPriceCount: data.basketPriceCount };

        } catch (e: any) {
            rejectWithValue({ message: e.message });
        }
    }
);

export const updateBasketByParamsThank = createAsyncThunk(
    'updateBasketByParamsThank/basketSlice',
    async (updateData: any, { rejectWithValue }) => {
        try {
            await basketService.update(updateData.data, updateData.id);
        } catch (e: any){
            rejectWithValue(e);
        }
    }
);

export const deleteBasketByIdThank = createAsyncThunk(
    'updateBasketByParamsThank/basketSlice',
    async (deleteData: { id: number, userId: number }, {
        rejectWithValue,
    }) => {
        try {
            const { data } = await basketService.delete(deleteData.id, deleteData.userId);
            return { basketProducts: data.products };
        } catch (e: any){
            return rejectWithValue(e);
        }
    }
);

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: initialState,
    reducers: {
        setBasketProducts: (state, action) => {
            state.basketProducts = action.payload.basketProducts;
        },
        deleteBasketProduct: (state, action) => {
            state.basketProducts = state.basketProducts.filter(item => item.id !== action.payload.id);
        },
    },
    extraReducers: builder => {
        builder.addCase(saveBasketProductsThank.fulfilled, ((state, action) => {
            state.basketPriceCount = action.payload?.basketPriceCount;
        }));
        builder.addCase(saveBasketProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
        builder.addCase(getBasketProductsThank.fulfilled, ((state, action) => {
            state.basketPriceCount = action.payload?.basketPriceCount;
        }));
        builder.addCase(getBasketProductsThank.rejected, ((state, action) => {
            state.error = action.error.message;
        }));
        builder.addCase(deleteBasketByIdThank.pending, (state => {
            state.pending = true;
        }));
        builder.addCase(deleteBasketByIdThank.fulfilled, ((state, action) => {
            state.basketProducts = action.payload.basketProducts;
            state.pending = false;
        }));
        builder.addCase(deleteBasketByIdThank.rejected, ((state, action) => {
            state.error = action.error.message;
            state.pending = false;
        }));
    }
});

export const {
    setBasketProducts,
    deleteBasketProduct,
} = basketSlice.actions;

const basketReducer = basketSlice.reducer;
export default basketReducer;
